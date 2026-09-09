# Branch `demo/02-sbst-only`: testy z samego SBST

**Udzial LLM-a w tym branchu: zaden.** Nie zostal wyslany ani jeden prompt.
Katalog `prompts/` nie istnieje, bo nie ma czego dokumentowac. Wszystko ponizej
to deterministyczne uruchomienie narzedzia z zapisanym ziarnem.

Narzedzie: **SynTest** (`@syntest/cli` 0.2.1, `@syntest/javascript` 0.1.0),
preset **DynaMOSA** (Panichella, Kifetew, Tonella - dynamiczny wybor celow
w wielokryterialnym przeszukiwaniu).

---

## Komenda po komendzie

### 1. Punkt wyjscia

```bash
git checkout main
git checkout -b demo/02-sbst-only
```

`tests/` jest puste. Zero testow napisanych przez czlowieka, zero podpowiedzi.

### 2. Kompilacja do JavaScriptu

```bash
npm run build     # tsc -p tsconfig.build.json
```

SynTest nie parsuje TypeScriptu (patrz [docs/SPIKE.md](docs/SPIKE.md),
ustalenie 1), wiec przeszukiwanie dziala na `dist/**/*.js`.

Jedno ustawienie ma tu znaczenie: `tsconfig.build.json` ma `"target": "ES2018"`,
a nie `ES2022`. Przy `ES2022` TypeScript emituje prawdziwe pola klasy
(`lines = []` w ciele klasy), na czym SynTest 0.1.0 wywala sie w trakcie
inferencji typow:

```
TypeError: Cannot use 'in' operator to search for 'name' in undefined
    at InferenceTypeModelFactory._classProperty (...)
```

Przy `ES2018` pola sa inicjalizowane w konstruktorze (`this.lines = []`)
i narzedzie radzi sobie bez problemu. To obejscie ograniczenia narzedzia,
nie zmiana kodu produkcyjnego - `src/` jest identyczne jak na `main`.

### 3. Przeszukiwanie

```bash
bash scripts/run-syntest.sh --seed 42 --search-time 90
```

Co robi ten skrypt (`scripts/run-syntest.sh`):

```bash
npx syntest javascript test \
  --random-seed 42 \
  --search-time 90 \
  --total-time 120
```

Parametry przeszukiwania siedza w `.syntest.json`, wersjonowanym w repo:

| parametr | wartosc | znaczenie |
|---|---|---|
| `search-algorithm` | `MOSAFamily` | rodzina MOSA (DynaMOSA) |
| `objective-manager` | `structural-uncovered` | dynamiczny wybor nieosiagnietych celow |
| `crossover` | `javascript-tree` | krzyzowanie drzew wywolan |
| `sampler` | `javascript-random` | losowe probkowanie wartosci |
| `population-size` | 50 | rozmiar populacji |
| `max-action-statements` | 5 | do 5 wywolan w jednym tescie (sekwencje) |
| `constant-pool` | `true` | literaly wydobyte ze zrodla jako kandydaci |
| `constant-pool-probability` | 0.5 | jak czesto siegac po literal zamiast losowac |
| `test-minimization` | `true` | minimalizacja testow po przeszukiwaniu |

Budzet jest **na cel**, nie na caly przebieg: cztery moduly, wiec ~4 x 90 s
przeszukiwania.

### 4. Transformacja wyniku

Surowy wynik SynTesta nie uruchamia sie: miesza `import` (ESM) z
`require.cache` (CJS) i celuje w `dist/`, nie w `src/`. Skrypt
`scripts/syntest-to-vitest.ts` naprawia dokladnie te dwie rzeczy:

1. dopisuje `import { describe, it, beforeEach, vi } from 'vitest'`
   (chai zostaje - vitest wykonuje je bez zmian),
2. zamienia hack na `require.cache` na `vi.resetModules()` + dynamiczne
   importy z `../src/<modul>`,
3. dopisuje `: any` na deklaracjach `let`, bo plik jest teraz TypeScriptem,
4. skraca absolutne sciezki w komentarzach z metadanymi.

**Asercje i dane wejsciowe zostaja bajt w bajt takie, jakie wyprodukowal
algorytm.** Surowy wynik jest w repo, wiec da sie to sprawdzic:

```bash
diff artifacts/syntest-raw/test-cart.spec.js tests/cart.sbst.test.ts
```

### 5. Pomiar

```bash
npm test
npm run metrics          # -> results/demo-02-sbst-only.json
```

### 6. Rozrzut miedzy ziarnami

Jeden przebieg z jednym ziarnem nie jest dowodem, bo przeszukiwanie jest
stochastyczne:

```bash
bash scripts/seed-sweep.sh --seeds "1 2 3 4 5 6 7 8 9 10" --search-time 90
npx tsx scripts/aggregate-sweep.ts    # -> results/sweep/SUMMARY.md
```

Sweep nadpisuje `tests/`, wiec na koniec odtwarzamy przebieg kanoniczny:

```bash
bash scripts/run-syntest.sh --seed 42 --search-time 90
```

---

## Wynik

Przebieg kanoniczny: `--seed 42 --search-time 90`, 2026-09-09.
Pelne dane: [`results/demo-02-sbst-only.json`](results/demo-02-sbst-only.json).

### Pokrycie zgloszone przez samo przeszukiwanie (na `dist/`)

| Cel | Instrukcje | Galezie | Funkcje |
|---|---|---|---|
| `pricing.js` | 29 / 29 | **16 / 16** | 1 / 1 |
| `loyalty.js` | 20 / 21 | 7 / 8 | 1 / 1 |
| `cart.js` | 37 / 50 | 9 / 16 | 5 / 7 |
| `invoiceId.js` | 10 / 23 | **3 / 8** | 1 / 1 |
| srednia | 78,05% | 72,92% | |

### Pokrycie mierzone przez harness (na `src/`, vitest + v8)

| Modul | Galezie | Linie | Mutation score |
|---|---|---|---|
| `pricing.ts` | **100%** | 100% | 95,74% |
| `loyalty.ts` | 90,9% | 90,47% | 83,87% |
| `cart.ts` | 80,95% | 77,35% | 50% |
| `invoiceId.ts` | **60%** | 47,36% | **28,95%** |
| **razem** | **87,27%** | 80,8% | **62,5%** |

Mutanty: 120 zabitych, 31 przezylo, 41 bez pokrycia. Pomiar wykonany na
**kodzie z defektami** - ten suite przechodzi na `src/` bez zmian, wiec Stryker
mial zielony przebieg poczatkowy i mogl wystartowac. To nie jest oczywistosc:
suite, ktory poprawnie wykrywa zasiany defekt, jest dla Strykera niemierzalny
(patrz `docs/METODOLOGIA.md`, sekcja o granicach mutation score). Fakt, ze
tutaj pomiar sie udal, jest konsekwencja tego, ze testy zgadzaja sie z kodem
we wszystkim - takze w bledach.

Dwie liczby pokrycia galezi (72,92% na `dist/` i 87,27% na `src/`) nie sa
sprzeczne - to dwa rozne pomiary. SynTest liczy na skompilowanym, zinstrumen-
towanym JavaScripcie, w ktorym `tsc` rozbija czesc konstrukcji na wiecej
galezi; harness liczy na zrodle TypeScript przez v8. Do porownywania branchy
uzywamy wylacznie tej drugiej, bo jest identyczna dla wszystkich.

### Kształt suite

| | |
|---|---|
| plikow | 4 |
| testow | 96 |
| linii kodu testow | 3929 |
| asercji | 156 |
| asercji na test | 1,63 |
| nazw postaci `Test N for '<modul>'` | **96 / 96** |

### Werdykty wobec zasianych defektow

| Defekt | Werdykt |
|---|---|
| rozbieznosc `awardPoints` ze specyfikacja | **utrwalony** (`cemented`) |
| awaria `Cart` przy sekwencji wywolan | **nietkniety** (`silent`) |
| kupon z lancucha prototypow (niezasiany) | **nietkniety** (`silent`) |

Trzeci defekt nie byl planowany - znalazl go LLM ze specyfikacja na branchu
`demo/01-llm-only`. Przeszukiwanie go nie dotknelo, mimo ze constant pool
mial do dyspozycji literaly `"SAVE10"` i `"HALF"`: zeby trafic w blad, trzeba
podac `applyCoupon("constructor")` albo `"toString"` - czyli **nazwe wlasnosci
`Object.prototype`**. Tego nie ma w kodzie jako literalu, wiec do puli nie
wpadl, a losowanie ze 88-znakowego alfabetu nie wygeneruje slowa
`constructor`.

---

## Czego SBST nie zrobil

### 1. Utrwalil zasiany blad jako wymaganie

`awardPoints` realizuje inna regule niz `docs/SPEC.md`. Suite tego nie
zglosil - i nie mial jak. Wygenerowal asercje z **zaobserwowanego** wyniku
(`tests/loyalty.sbst.test.ts`, "Test 23 for 'loyalty'"):

```ts
const orderValuePLN = 79;
const lifetimeSpendPLN = 50;
const awardPointsReturnValue = await awardPoints(orderValuePLN, lifetimeSpendPLN, anon)
...
expect(awardPointsReturnValue).to.equal(7)
```

Specyfikacja mowi tu `8`: 79/10 = 7,9, zaokraglenie bankierskie daje 8. Kod
zwraca 7, bo obcina w dol. Test przypial `7` jako oczekiwanie.

Drugi przypadek trafia w oba zasiane defekty naraz - `orderValuePLN =
988.3802381397945`, `lifetimeSpendPLN = 5001.179791185319`, asercja `196`.
Wedlug specyfikacji ma byc `198` (zaokraglenie 98,838 do 99, potem mnoznik
VIP x2).

Efekt jest mierzalny: po nalozeniu `patches/fix-loyalty.patch` suite
**przestaje** przechodzic. Testy dzialaja jako zapora regresji chroniaca zle
zachowanie. To nie awaria narzedzia - to jego zalozenie: kod jest oracle'em.

Warto zauwazyc trzeci argument w wywolaniu: `awardPoints(orderValuePLN,
lifetimeSpendPLN, anon)`, gdzie `anon` to `new Cart()`. Funkcja przyjmuje dwa
parametry. Przeszukiwanie dokleja trzeci, bo nie ma pojecia o sygnaturze -
w JavaScripcie nadmiarowy argument nie boli, wiec nic go nie zatrzymuje.

### 2. Nie przeszedl przez bramke formatu

`invoiceId` to najgorszy wynik na wszystkich metrykach: 60% galezi
i **28,95% mutation score**. Zeby dotrzec za `/^FV\/(\d{4})\/(0[1-9]|1[0-2])\/(\d{4})$/`,
przeszukiwanie musialoby zgadnac caly format. W 90 sekundach nie zgadlo ani
razu. Wszystkie 13 wygenerowanych testow zatrzymuje sie na walidacji wejscia:
7 asercji to `invoice id must be a string`, 6 to `malformed invoice id`. Ani
jeden string nie zaczyna sie choćby od `FV`, wiec cala logika za bramka -
zakres roku, zerowy numer kolejny, zwracany obiekt - jest nietkniety.

Nie jest to kwestia budzetu, tylko rozkladu: alfabet losowania ma 88 znakow,
a poprawny prefiks to 15 znakow w ustalonej kolejnosci. Constant pool tez nie
pomaga, bo `ConstantVisitor` pomija literaly regex (patrz
[docs/SPIKE.md](docs/SPIKE.md)).

### 3. Nie znalazl awarii, ktorej nazwe mial w rekach

Awaria `Cart` wymaga trzech wywolan po kolei, z **tym samym** SKU:
`add("X", cena, 1)`, `remove("X", 5)`, `total()`. Mutacja sekwencji radzi
sobie z kolejnoscia, ale nie z tym, ze dwa argumenty w roznych wywolaniach
musza byc **rowne** - losowe stringi nigdy sie nie powtarzaja.

Najlepsza ilustracja jest w `tests/cart.sbst.test.ts:594`. Przeszukiwanie
wydobylo z kodu komunikat bledu przez constant pool, zmutowalo mu jedna
litere i uzylo jako **kod kuponu**:

```ts
const anon1 = "cart quantit underflow";
await expect((async () => {
    await cart1.applyCoupon(code, anon1)
})()).to.be.rejectedWith(`unknown coupon`)
```

Algorytm mial w rece string nazywajacy awarie i uzyl go w zupelnie innym
miejscu, bo nie wie, co ten string znaczy. To dokladnie ta "slepota
semantyczna", ktora hybryda ma naprawiac: wystarczy podac jeden sensowny
SKU jako ziarno, zeby sprzegniecie wartosci miedzy wywolaniami stalo sie
osiagalne. Sprawdzamy to na branchu `demo/03-hybrid`.

### 4. Nie da sie tego czytac

Wszystkie 96 testow nazywa sie `Test N for '<modul>'`. 3929 linii na 156
asercji - 25 linii na asercje, bo kazdy test wlecze za soba blok metadanych
przeszukiwania i losowe wartosci nieuzywane w asercjach. Suite jest
uzyteczny jako zapora regresji, ale nie jako dokumentacja tego, co system
ma robic.

### Czego natomiast SBST nie potrzebowal

Zero promptow, zero tokenow, zero kosztu API. Deterministycznie odtwarzalny
z ziarna. Na `pricing.ts` - czystej arytmetyce bez bramek i bez stanu -
osiagnal **100% galezi i 95,74% mutation score** w 90 sekundach.
