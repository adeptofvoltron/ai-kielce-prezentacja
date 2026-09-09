# Branch `demo/01-llm-only`: testy z samego LLM-a

Zero SBST. Testy pochodza wylacznie z modelu jezykowego, uruchamianego
bezgłowo (`claude -p`), zeby kazde uruchomienie bylo zapisane i odtwarzalne.

Katalog [`prompts/`](prompts/) zawiera **dokladna tresc kazdego promptu**
razem z uzytym modelem i poziomem effortu we frontmatterze. Katalog
[`artifacts/llm/`](artifacts/llm/) zawiera pelny strumien zdarzen z kazdego
uruchomienia: kazde wywolanie narzedzia, kazda komenda, zuzycie tokenow
i koszt.

---

## Piec wariantow, trzy tezy

Branch nie generuje jednego suite, a piec - zeby rozdzielic trzy rozne
twierdzenia o LLM-ach w testowaniu i zmierzyc kazde osobno.

| Wariant | Prompt | Model / effort | Co dostaje model | Teza |
|---|---|---|---|---|
| **a** | [`01a-from-code-only`](prompts/01a-from-code-only.md) | opus-5 / high | tylko kod z `src/` | agent wyprowadza oczekiwania z zachowania kodu |
| **b** | [`01b-from-spec`](prompts/01b-from-spec.md) | opus-5 / high | kod + `docs/SPEC.md` | ekstrakcja intencji: oracle z wymagan |
| **c** | [`01c-repair-loop`](prompts/01c-repair-loop.md) | sonnet-5 / medium | wynik wariantu b | petla naprawcza bez oslabiania asercji |
| **d** | [`01d-from-spec-weak`](prompts/01d-from-spec-weak.md) | haiku-4.5 / low | kod + `docs/SPEC.md` | jak b, ale tanszy model i nizszy effort |
| **e** | [`01e-repair-weak`](prompts/01e-repair-weak.md) | sonnet-5 / medium | wynik wariantu d | petla naprawcza na slabszej generacji |

Pary b/c i d/e roznia sie **wylacznie** modelem i effortem - tresc zadania
w promptach `01b` i `01d` jest identyczna bajt w bajt, podobnie `01c` i `01e`.
Mozna to sprawdzic:

```bash
diff <(sed '1,/^---$/d;1,/^---$/d' prompts/01b-from-spec.md) \
     <(sed '1,/^---$/d;1,/^---$/d' prompts/01d-from-spec-weak.md)
```

Wariantem kanonicznym brancha (`tests/`, `results/demo-01-llm-only.json`) jest
**c**: najmocniejszy model plus petla naprawcza, czyli konfiguracja, ktora
zespol faktycznie by uruchomil. Pozostale sa zarchiwizowane w `variants/`
- poza wzorcem `tests/**/*.test.ts`, wiec nie mieszaja sie do pomiaru
kanonicznego.

### Dlaczego prompty zabraniaja czytania czesci repozytorium

Kazdy prompt zawiera liste plikow, ktorych model nie ma otwierac:
`docs/METODOLOGIA.md`, `docs/SPIKE.md`, `RUNBOOK.md`, `patches/`, `results/`,
`artifacts/`.

To nie kosmetyka. `patches/fix-loyalty.patch` zawiera **poprawna** wersje
funkcji z zasianym defektem, a `docs/METODOLOGIA.md` wprost wymienia oba
zasiane bledy. Model, ktory je przeczyta, nie rozwiazuje zadania - odczytuje
odpowiedz. Zgodnosc jest weryfikowana po fakcie, przez przeszukanie logu
wywolan narzedzi:

```bash
bash scripts/check-compliance.sh
```

---

## Komenda po komendzie

### 1. Punkt wyjscia

```bash
git checkout main
git checkout -b demo/01-llm-only
```

`tests/` jest puste.

### 2. Wariant a: generacja z samego kodu

```bash
bash scripts/run-llm.sh prompts/01a-from-code-only.md
```

Skrypt czyta model i effort z frontmatteru promptu i uruchamia:

```bash
claude -p \
  --model claude-opus-5 \
  --effort high \
  --permission-mode bypassPermissions \
  --output-format stream-json \
  --verbose
```

`--effort high` to poziom rozumowania (dostepne: `low`, `medium`, `high`,
`xhigh`, `max`). `stream-json --verbose` zapisuje kazde wywolanie narzedzia,
nie tylko koncowa odpowiedz - dzieki temu w repo jest log tego, **co model
faktycznie zrobil**, a nie tylko co powiedzial.

### 3. Warianty b, c: specyfikacja i petla naprawcza

```bash
rm -f tests/*.llm.test.ts
bash scripts/run-llm.sh prompts/01b-from-spec.md
cp tests/*.llm.test.ts variants/b/

bash scripts/run-llm.sh prompts/01c-repair-loop.md
```

Prompt `01c` idzie do **tanszego modelu z nizszym effortem**
(`claude-sonnet-5`, `--effort medium`). Naprawa bledow typow i triage
niezdanych testow to zadanie mechaniczne - sprawdzamy, czy trzeba do niego
najmocniejszego modelu.

### 4. Warianty d, e: to samo zadanie, tanszy model

```bash
rm -f tests/*.llm.test.ts
bash scripts/run-llm.sh prompts/01d-from-spec-weak.md
cp tests/*.llm.test.ts variants/d/

bash scripts/run-llm.sh prompts/01e-repair-weak.md
```

`scripts/run-llm.sh` pilnuje stanu wejsciowego: prompt generujacy suite od
zera odmawia startu, jesli `tests/` nie jest puste, a prompt pracujacy na
istniejacym suite odmawia, jesli jest. Ten straznik powstal po realnym
wypadku - patrz "Co poszlo nie tak" na koncu.

### 5. Pomiar wszystkich wariantow

```bash
bash scripts/measure-all-variants.sh a b d e c
bash scripts/check-compliance.sh
```

Ostatni wariant na liscie jest kanoniczny: zostaje w `tests/` i trafia do
`results/<branch>.json`. Kazdy wariant mierzony jest tym samym harnessem,
w tej samej wersji.

---

## Wynik

Wszystkie pomiary z 2026-09-09, tym samym harnessem.
Pelne dane: `results/demo-01-llm-{a,b,c,d,e}.json`.

### Metryki suite

| | a (kod) | b (+spec) | c (b+naprawa) | d (+spec, tanio) | e (d+naprawa) |
|---|---|---|---|---|---|
| pokrycie galezi | **100%** | 98,41% | 98,41% | 98,5% | 98,5% |
| mutation score | 99,48% | 95% | 95% | **niemierzalne** | **niemierzalne** |
| mutacje mierzone na | kodzie z defektami | kodzie poprawionym | kodzie poprawionym | — | — |
| testow | 104 | 59 | 59 | 88 | 88 |
| linii kodu testow | 578 | 619 | 619 | 686 | 686 |
| nazw bez intencji | 0 | 0 | 0 | 0 | 0 |

### Werdykty wobec defektow

| Defekt | a | b | c | d | e |
|---|---|---|---|---|---|
| rozbieznosc `awardPoints` ze spec | utrwalony | **wykryty** | **wykryty** | **wykryty** | **wykryty** |
| awaria `Cart` (underflow) | utrwalony | nietkniety | nietkniety | utrwalony | utrwalony |
| kupon z prototypu (niezasiany) | utrwalony | **wykryty** | **wykryty** | nietkniety | nietkniety |

### Koszt

| Wariant | Model | Effort | Czas | Tur | Wywolan narzedzi | Koszt |
|---|---|---|---|---|---|---|
| a | opus-5 | high | 205 s | 13 | 12 | 0,73 USD |
| b | opus-5 | high | 248 s | 11 | 10 | 1,06 USD |
| c | sonnet-5 | medium | 72 s | 13 | 12 | 0,32 USD |
| d | haiku-4.5 | low | 183 s | 18 | 17 | **0,22 USD** |
| e | sonnet-5 | medium | 80 s | 17 | 16 | 0,32 USD |

---

## Co z tego wynika

### 1. Mutation score nie ustawia tych suite w kolejnosci. Czesci nie umie nawet zmierzyc

Stryker przerywa przebieg, jesli **poczatkowe** uruchomienie testow nie jest
zielone. Suite, ktory poprawnie wykrywa zasiany defekt, wlasnie nie
przechodzi - wiec na kodzie z `src/` nie da sie go zmierzyc. Harness probuje
wtedy zmierzyc go po nalozeniu wszystkich patchy z `patches/` i zapisuje,
w ktorym stanie kodu liczba powstala.

Efekt jest taki:

| Wariant | Mutation score | Mierzone na | Werdykty |
|---|---|---|---|
| a | **99,48%** | kodzie z defektami | utrwalil wszystkie trzy |
| b, c | 95% | kodzie poprawionym | wykryl dwa z trzech |
| d, e | **niemierzalne** | — | wykryl jeden, jeden utrwalil |

Trzy wnioski, w kolejnosci waznosci.

**Najwyzszy mutation score ma suite, ktory utrwalil kazdy defekt.** Wariant
`a` osiaga 99,48% i 100% pokrycia galezi - i jednoczesnie zapisuje wszystkie
trzy bledy jako wymagania. Gdyby kryterium wyboru byly metryki strukturalne,
wygralby ranking.

**Liczb 99,48% i 95% nie wolno porownywac bezposrednio**, bo powstaly na dwoch
roznych wersjach kodu. To nie jest wada harnessu, tylko wlasnosc mutation
score: pyta on "czy asercje cokolwiek sprawdzaja", ale zadaje to pytanie
**zakladajac, ze kod jest poprawny**. Tam, gdzie testy i kod nie zgadzaja sie
co do wymagan, narzedzie nie ma jak zaczac.

**Warianty d i e sa niemierzalne w obu stanach**, bo poza wykryciem
rozbieznosci w `awardPoints` utrwalily awarie koszyka - wiec nie sa zielone
ani przed naprawa, ani po niej. Metryka po prostu nie ma tu odpowiedzi.

Pokrycie galezi tymczasem miesci sie u wszystkich pieciu w przedziale
98,4-100%. Zaden z tych dwoch wskaznikow nie odrozniloby suite, ktory chroni
wymagania, od suite, ktory chroni bledy.

> **Sprostowanie.** Pierwsza wersja tego pomiaru raportowala identyczne
> 99,48% dla wszystkich pieciu wariantow. Byl to artefakt bledu w harnessie:
> `measureMutation()` odczytywalo `reports/mutation/mutation.json` zawsze, gdy
> plik istnial, bez sprawdzenia, czy powstal w tym przebiegu. Przy wariantach,
> na ktorych Stryker przerywal, wracaly liczby poprzedniego pomiaru. Naprawa
> jest w commicie "Stop reporting one branch's mutation score as another's":
> raport jest usuwany przed przebiegiem, a jego brak jest bledem, nie
> wartoscia domyslna.

### 2. Wariant a: nazwy testow opisuja bledy jako wymagania

Model, ktory dostal tylko kod, napisal miedzy innymi to:

```ts
it("obcina czesc niepelna w dol", () => {
  expect(awardPoints(9.99, 0)).toBe(0);
  expect(awardPoints(19.99, 0)).toBe(1);
  expect(awardPoints(10.5, 0)).toBe(1);
});

it("nie podwaja punktow dokladnie na progu 5000", () => {
  expect(awardPoints(100, 5000)).toBe(10);
});

it("pozwala zejsc ponizej zera, co wykrywa dopiero total()", () => {
  expect(() => cart.remove("A", 6)).not.toThrow();
  expect(() => cart.total()).toThrow("cart quantity underflow");
});
```

Zgodnie ze specyfikacja poprawne wartosci sa inne:

| Wywolanie | Kod zwraca (i test to przypina) | Specyfikacja wymaga |
|---|---|---|
| `awardPoints(9.99, 0)` | 0 | **1** (0,999 zaokraglone bankiersko) |
| `awardPoints(19.99, 0)` | 1 | **2** (1,999) |
| `awardPoints(10.5, 0)` | 1 | 1 - tu zgodnie, przypadkiem |
| `awardPoints(100, 5000)` | 10 | **20** (prog VIP jest domkniety) |

O zdejmowaniu z koszyka wiekszej liczby sztuk niz jest w nim specyfikacja nie
mowi nic - `total()` rzucajacy wyjatek na ujemnej ilosci to defekt
implementacyjny, nie wymaganie.

Zadna z tych nazw nie jest przypadkowa ani niedbala - opisuja dokladnie to,
co kod robi. Problem polega na tym, ze nazwa testu jest **zdaniem
o wymaganiu**, a tu wymaganie zostalo odczytane z implementacji. Efekt: kto
teraz naprawi zaokraglenie zgodnie ze specyfikacja, zobaczy czerwony build
i komunikat, ze zepsul dzialajaca funkcje.

### 3. Specyfikacja w promptcie odwraca wynik - i znajduje blad, ktorego nikt nie zasiał

Wariant `b` rozni sie od `a` jedna rzecza: dostal `docs/SPEC.md` i polecenie,
zeby przy rozbieznosci pisac asercje **zgodne ze specyfikacja**, nawet jesli
test nie bedzie przechodzil.

Wykryl obie zasiane rozbieznosci w `awardPoints` (cztery testy, wszystkie
z odwolaniem do sekcji `SPEC.md` w nazwie) - i dodatkowo znalazl defekt,
ktorego autor repozytorium tam nie umiescil:

```
Cart > applyCoupon > odrzuca kody, ktore nie sa kuponami,
                     a sa nazwami wlasnosci obiektu
  -> constructor: expected [Function] to throw an error
```

`COUPONS` byl zwyklym obiektem, wiec `COUPONS["constructor"]` zwraca
odziedziczona funkcje z `Object.prototype`, a nie `undefined`. Wyjatek
`unknown coupon` nie leci, rabat zostaje ustawiony na funkcje i `total()`
zwraca **NaN**. Sekcja 4 specyfikacji mowi wprost, ze nieznany kod ma dac
blad.

Defekt zostal w kodzie, a doszedl trzeci patch
(`patches/fix-coupon-prototype.patch`), zeby dal sie mierzyc tym samym
mechanizmem co dwa zasiane. To jedyny defekt w tym repozytorium, ktory nie
zostal umieszczony tam swiadomie.

### 4. Tanszy model wykryl wiecej rozbieznosci, ale mniej defektow

Wariant `d` (haiku 4.5, effort `low`) dostal **identyczna tresc zadania** co
`b`. Kosztowal 0,22 USD zamiast 1,06 - niemal piec razy mniej.

Wykryl te sama rozbieznosc w `awardPoints`, i to **dokladniej**: nie cztery
testy, a dziewiec, obejmujacych takze interakcje zaokraglenia z limitem
5000 punktow i z progiem VIP. Kazdy sprawdzony recznie - wszystkie dziewiec
to poprawne asercje ze specyfikacji, na przyklad `awardPoints(99, 2000)`
(spec: 10, kod: 9) oraz `awardPoints(15, 5000)` (spec: 4, kod: 1, czyli oba
zasiane defekty naraz).

Przegapil natomiast defekt kuponu, a awarie koszyka utrwalil - dokladnie tam,
gdzie `b` przynajmniej jej nie dotknal.

Z wlasnej inicjatywy napisal tez raport rozbieznosci
([`variants/d/DIVERGENCES.md`](variants/d/DIVERGENCES.md)), zestawiajac cytat
ze specyfikacji z fragmentem kodu i konkretnymi wartosciami. Prompt tego nie
wymagal - kazal tylko wypisac liste na koniec odpowiedzi.

Wniosek jest wezszy, niz sie wydaje na pierwszy rzut oka: przy zadaniu, ktore
sprowadza sie do systematycznego przelozenia tabeli z wymagan na asercje,
tanszy model wystarcza. Przy zauwazeniu czegos, czego w wymaganiach nie ma -
juz nie.

### 5. Petla naprawcza nie miala co naprawiac. Dwa razy

Warianty `c` i `e` to ta sama petla naprawcza (`sonnet-5`, effort `medium`)
puszczona na wynik `b` i na wynik `d`. W obu przypadkach efekt jest ten sam:

```bash
$ diff variants/b/loyalty.llm.test.ts tests/loyalty.llm.test.ts
$ echo $?
0
```

**Zero zmienionych linii.** W obu przebiegach model przeczytal specyfikacje,
kod i testy, uruchomil `npx tsc --noEmit` (czysto) i `npm test`, rozpoznal
niezdane testy jako prawdziwe rozbieznosci ze specyfikacja i - zgodnie
z instrukcja - nie ruszyl ich.

Jest to wynik zerowy i nie zamierzamy go upiekszac. Petla naprawcza z artykulu
ma sens wtedy, gdy generacja produkuje kod, ktory sie nie kompiluje albo testy
z bledami. Tutaj nie wyprodukowala takiego kodu **nawet przy haiku na effort
`low`** - `tsc --noEmit` przeszedl czysto w kazdym z czterech przebiegow
generacyjnych.

Prawdziwa wartosc tego kroku okazala sie inna niz naprawianie: to **triage**.
Model rozstrzygnal, ze dziewiec niezdanych testow to nie usterki testow,
a wykryte rozbieznosci - i zablokowal sam sobie droge do "naprawienia" ich
przez oslabienie asercji. Za 0,32 USD to tanie potwierdzenie, ze suite
faktycznie mowi to, co mial powiedziec.

Wartosc petli naprawczej w tym repozytorium jest wiec **niezmierzona, nie
zerowa**: zeby ja zmierzyc, trzeba by generacji, ktora sie psuje - a takiej
nie udalo sie wywolac.

### 6. Awaria koszyka: zaden wariant jej nie wykryl

Trzy kolumny werdyktow dla `cartUnderflowCrash` to `utrwalony`, `nietkniety`,
`utrwalony`. Zero `wykryty`.

Warianty czytajace kod (`a`, `d`) widza `throw new RangeError("cart quantity
underflow")` i pisza test, ktory tego wyjatku oczekuje - utrwalajac stan
niespojny jako zachowanie docelowe. Warianty pracujace ze specyfikacji nie
maja o tej sciezce skad wiedziec, bo `docs/SPEC.md` nie mowi nic o zdejmowaniu
wiekszej liczby sztuk niz jest w koszyku.

To luka, ktorej sam LLM nie zamyka - ani z kodu, ani z wymagan. Branch
`demo/03-hybrid` sprawdza, czy zamyka ja przeszukiwanie z ziarnami.

---

## Co poszlo nie tak

Dwa wypadki w trakcie zbierania danych, oba unieważniły przebieg. Zostaja
opisane, bo oba sa powtarzalne i oba dotycza wiarygodnosci wynikow.

### Model sam z siebie przeczytal specyfikacje

Pierwotny prompt `01a` zabranial czytania `docs/METODOLOGIA.md`
i `docs/SPIKE.md`, ale nie `docs/SPEC.md` - zakladalismy, ze skoro prompt
mowi "testuj kod", to model nie pojdzie szukac wymagan. Poszedl, trzecim
wywolaniem narzedzia:

```
3. Bash: ls -la tests docs 2>/dev/null; echo "--- SPEC ---"; cat docs/SPEC.md
```

To unieważnia caly kontrast a vs b, bo wariant "tylko kod" mial wtedy
wymagania. Zakaz zostal rozszerzony na caly katalog `docs/`, a przebieg
powtorzony. Unieważniony transkrypt zostaje w repo jako
`artifacts/llm/01a-aborted-read-spec.jsonl`.

Stad tez `scripts/check-compliance.sh`: lista zabronionych sciezek nie jest
wpisana w skrypt, tylko czytana z pola `zabronione:` we frontmatterze
promptu - zeby jedno nie moglo sie rozjechac z drugim.

### Dwa pliki z unieważnionego przebiegu przezyly czystke

Przy przerywaniu tamtego przebiegu skasowalismy `tests/*.llm.test.ts`, ale
proces `claude -p` jeszcze zyl i dopisal `pricing` oraz `invoiceId` **po**
skasowaniu. Powtorzony wariant `a` zastal je na miejscu, przeczytal
i uznal za swoje - dopisal tylko brakujace `loyalty` i `cart`.

Wyszlo to z logu wywolan narzedzi (tylko dwa `Write` zamiast czterech)
i z porownania czasow modyfikacji plikow z czasem startu przebiegu.
Wariant `a` zostal wygenerowany trzeci raz, tym razem od czysta.

`scripts/run-llm.sh` sprawdza teraz stan wejsciowy przed uruchomieniem:
prompt generujacy suite od zera odmawia startu, jesli `tests/` nie jest
puste, a prompt pracujacy na istniejacym suite odmawia, jesli jest.
