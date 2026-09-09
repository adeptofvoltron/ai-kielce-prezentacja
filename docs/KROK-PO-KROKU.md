# Krok po kroku

Instrukcja do pokazania na zywo. Kazda komenda jest szybka: najdluzsza trwa
**26 sekund**, wiekszosc mniej niz sekunde. Nic nie wymaga wywolania API.

Wszystko dzieje sie na jednym module - `src/loyalty.ts` (osiem linii logiki)
oraz `src/invoiceId.ts` (jedno wyrazenie regularne). Nie trzeba znac
pozostalych.

---

## 0. Przygotowanie (raz, przed prezentacja)

```bash
git clone https://github.com/adeptofvoltron/ai-kielce-prezentacja
cd ai-kielce-prezentacja
nvm use          # Node 24.16.0, wersja z .nvmrc
npm ci
npm run build
```

Sprawdzenie, ze wszystko dziala:

```bash
npx vitest run --passWithNoTests    # ma byc zielono, zero testow
```

---

## 1. Kod, ktory dziala i realizuje zla regule

To jest caly przyklad. Osiem linii.

```bash
sed -n '/let points/,/return points/p' src/loyalty.ts
```

```ts
let points = Math.floor(orderValuePLN / 10);

if (lifetimeSpendPLN > VIP_THRESHOLD_PLN) {
  points = points * 2;
}

if (points > POINTS_CAP) {
  return POINTS_CAP;
}
return points;
```

Specyfikacja (`docs/SPEC.md`, sekcja 3) mowi dwie rzeczy inaczej:

- punkty zaokraglamy **metoda bankierska**, nie w dol,
- VIP to suma zakupow **co najmniej** 5000 zl, czyli `>=`, nie `>`.

Gdzie to widac na liczbach:

```bash
npx tsx -e '
function bankers(v){const l=Math.floor(v),r=v-l;
  if(r>0.5)return l+1; if(r<0.5)return l; return l%2===0?l:l+1;}
for (const [order, life] of [[79,50],[99,2000],[100,5000]]) {
  let kod  = Math.floor(order/10); if (life >  5000) kod  *= 2;
  let spec = bankers(order/10);    if (life >= 5000) spec *= 2;
  console.log(`awardPoints(${order}, ${life}) -> kod ${kod}, spec ${spec}`);
}'
```

```
awardPoints(79, 50) -> kod 7, spec 8
awardPoints(99, 2000) -> kod 9, spec 10
awardPoints(100, 5000) -> kod 10, spec 20
```

**Zaden wyjatek nie leci. Kod jest wewnetrznie spojny.** Po prostu liczy
inaczej, niz uzgodniono.

---

## 2. SBST: 26 sekund, testy z zachowania kodu

```bash
bash scripts/run-syntest.sh --seed 42 --search-time 20 --only-target loyalty
```

Na koniec wypisze tabele pokrycia i liczbe wygenerowanych testow:

```
tests/loyalty.sbst.test.ts: 13 testow, 19 asercji
```

Zobaczmy, jak wygladaja oczekiwania:

```bash
grep -B2 'ReturnValue).to.equal' tests/loyalty.sbst.test.ts | head -12
```

Kazda asercja jest **przepisana z zachowania kodu** - narzedzie uruchomilo
funkcje, zobaczylo, co zwrocila, i to zapisalo jako oczekiwanie.

```bash
npx vitest run tests/loyalty.sbst.test.ts
```

```
Tests  13 passed (13)
```

Zielono - i nie moglo byc inaczej.

> **Uwaga o powtarzalnosci.** Przeszukiwanie jest stochastyczne. Przy
> `--search-time 20` dostaniesz 13 testow z innymi wartosciami niz przy 90 s.
> Wersja z pelnym budzetem jest zacommitowana, wiec zawsze mozna pokazac
> dokladnie ten sam przypadek:
>
> ```bash
> git show demo/02-sbst-only:tests/loyalty.sbst.test.ts \
>   | grep -B3 'to.equal(7)' | head -6
> ```
>
> ```ts
> const orderValuePLN = 79;
> const lifetimeSpendPLN = 50;
> expect(awardPointsReturnValue).to.equal(7)
> ```
>
> Specyfikacja mowi tu `8`. Test przypial `7`.

## 3. Naprawiamy kod - i testy sie psuja

```bash
git apply patches/fix-loyalty.patch
npx vitest run tests/loyalty.sbst.test.ts
```

```
AssertionError: expected 74 to equal 73
AssertionError: expected 66 to equal 64
AssertionError: expected 42 to equal 41

Tests  3 failed | 10 passed (13)
```

**Naprawilem blad zgodnie ze specyfikacja i testy zrobily sie czerwone.**
Suite dziala jako zapora regresji chroniaca zle zachowanie.

To nie jest awaria narzedzia - to jego zalozenie: kod jest zrodlem prawdy
o tym, co ma sie dziac.

Cofamy patch:

```bash
git apply -R patches/fix-loyalty.patch
```

Harness nazywa ten werdykt `cemented`:

```bash
npx tsx scripts/metrics.ts --no-mutation
```

Na koncu wyniku:

```
oracle loyalty: cemented   oracle cart: silent   oracle kupon: silent
```

Mechanizm to **Fails Without / Passes With**: nakladamy patch, sprawdzamy
kazdy test osobno przed i po. Test, ktory przechodzil przed naprawa
i przestal po niej, utrwalil blad.

## 4. Ten sam model, jedna rzecz wiecej w promptcie

Bez wywolywania API - wyniki sa zacommitowane. Wariant `a` dostal tylko kod,
wariant `b` dodatkowo `docs/SPEC.md`. Ten sam model, ten sam effort.

```bash
git show demo/01-llm-only:variants/a/loyalty.llm.test.ts | grep -A2 'it("obcina'
```

```ts
it("obcina czesc niepelna w dol", () => {
  expect(awardPoints(9.99, 0)).toBe(0);
  expect(awardPoints(19.99, 0)).toBe(1);
```

**Nazwa testu opisuje blad jako wymaganie.** Kto teraz naprawi zaokraglanie,
zobaczy czerwony build i komunikat, ze zepsul dzialajaca funkcje.

Ten sam model z dostepem do specyfikacji:

```bash
git show demo/01-llm-only:variants/b/loyalty.llm.test.ts \
  | grep 'it("' | head -4
```

```ts
it("przyznaje 1 punkt za kazde 10 zlotych", () => {
it("zaokragla w dol wartosci ponizej polowy", () => {
it("zaokragla w gore wartosci powyzej polowy", () => {
it("przy dokladnej polowie zaokragla do liczby parzystej (metoda bankierska)", () => {
```

Te testy **nie przechodza** na obecnym kodzie i to jest poprawny wynik.

Metryki obu wariantow obok siebie:

```bash
git show demo/04-results:results/COMPARISON.md | sed -n '/Warianty/,/^$/p'
```

---

## 5. Bramka formatu: jeden literal zmienia wszystko

Druga funkcja, jedna linia, ktora decyduje o wszystkim:

```bash
grep 'exec' src/invoiceId.ts
```

```ts
const match = /^FV\/(\d{4})\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(raw.trim());
```

### 5a. Przeszukiwanie bez pomocy (26 s)

```bash
bash scripts/run-syntest.sh --seed 42 --search-time 20 --only-target invoiceId
```

```
invoiceId.js | 10 / 23 instrukcji | 3 / 8 galezi
```

Ile wygenerowanych stringow zaczyna sie choc od `FV`:

```bash
grep -c '"FV' tests/invoiceId.sbst.test.ts
```

```
0
```

**Zero.** Cala logika za bramka - zakres roku, zerowy numer, zwracany obiekt -
jest nietkniete. Alfabet losowania ma 100 znakow, a poprawny prefiks to 15
znakow w ustalonej kolejnosci.

### 5b. To samo, z ziarnami od LLM-a (26 s)

Plik z ziarnami to sama lista literalow, wygenerowana wczesniej przez model:

```bash
git show demo/03-hybrid:seeds/semantic-seeds.js > seeds/semantic-seeds.js
grep -m3 '^  "FV/' seeds/semantic-seeds.js
```

```
  "FV/2026/09/0042",
  "FV/2026/01/0001",
  "FV/2026/12/9999",
```

Ten sam seed, ten sam budzet, jedyna zmiana to ziarna:

```bash
bash scripts/run-syntest.sh --seed 42 --search-time 20 \
  --only-target invoiceId --seeds seeds/semantic-seeds.js
```

```
invoiceId.js | 22 / 23 instrukcji | 7 / 8 galezi
```

```bash
grep -c '"FV' tests/invoiceId.sbst.test.ts
```

```
3
```

Z **3/8 na 7/8 galezi** i z 10/23 na 22/23 instrukcji. Przy pelnym budzecie
(90 s, `--search-time 90`) modul osiaga **8/8 galezi i 23/23 instrukcji**.

---

## 6. Cala tabela

```bash
git show demo/04-results:results/COMPARISON.md
```

Interpretacja i lista tego, czego repozytorium **nie** dowodzi:
[`docs/PRESENTATION.md`](PRESENTATION.md).

---

## Porzadki po demo

```bash
rm -f tests/*.sbst.test.ts seeds/semantic-seeds.js
rm -rf artifacts syntest .syntest dist reports .coverage
git checkout -- src/
git status --short          # ma byc pusto
```

---

## Gdyby cos nie wyszlo

| Objaw | Przyczyna |
|---|---|
| `Crossover plugin not found` | uzyty `--preset` zamiast `.syntest.json`; preset nie ustawia `crossover` ani `sampler` |
| przebieg konczy sie bez zadnego pliku testowego | literal ze znakiem spoza alfabetu samplera; patrz `docs/SPIKE.md` |
| `Cannot use 'in' operator` przy `cart` | `tsconfig.build.json` musi miec `"target": "ES2018"` |
| `The given path is not in the given root path` | plik z ziarnami musi lezec w `dist/`; robi to `run-syntest.sh` |
| Stryker: `Initial test run failed` | suite nie jest zielony, wiec mutacji nie da sie zmierzyc - to oczekiwane |

Wszystkie siedem obejsc, ktorych wymagal SynTest, jest opisane z cytatami ze
zrodel w [`docs/SPIKE.md`](SPIKE.md).
