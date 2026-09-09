# Metodologia

Dokument opisuje, jak w tym repozytorium mierzymy jakosc testow i dlaczego
akurat tak. Zawiera **rozwiazanie eksperymentu** - jesli chcesz sam sprawdzic,
co znajda poszczegolne podejscia, przeczytaj go po obejrzeniu wynikow.

## Zasada: metryka przed danymi

Cala warstwa pomiarowa (`scripts/metrics.ts`, oba patche w `patches/`,
`stryker.conf.json`) powstala i zostala zacommitowana **przed** wygenerowaniem
pierwszego testu. Zaden prog ani zadna metryka nie byly pozniej dopasowywane
do wyniku.

## Cztery scenariusze i po co sa

Kazda funkcja w `src/` istnieje po to, zeby sfalsyfikowac lub potwierdzic
jedna konkretna teze o automatycznej generacji testow.

### 1. `calculateShipping` - baseline pokrycia

Czysta arytmetyka, ~12 galezi, zero stanu, zero bramek formatu. Zadne
podejscie nie ma tu strukturalnej przewagi. Sluzy jako punkt odniesienia:
ile czasu i pieniedzy kosztuje dojscie do 100% pokrycia galezi.

### 2. `parseInvoiceId` - bramka formatu

Logika jest schowana za wyrazeniem `/^FV\/(\d{4})\/(0[1-9]|1[0-2])\/(\d{4})$/`.
Losowe przeszukiwanie musialoby zgadnac ten wzorzec, zeby dotrzec do czegos
poza `throw new Error("malformed invoice id")`.

Wazny szczegol techniczny: SynTest zasila przeszukiwanie *constant poolem*
literalow wydobytych ze zrodla, ale `ConstantVisitor` jawnie **pomija literaly
regex** (`case "RegExpLiteral": break;`). Format nie jest wiec nigdzie w kodzie
dostepny jako string. Bramka jest szczelna i przewaga LLM-a nie jest
sztucznie zaaranzowana.

To uzasadnia krok "ziaren semantycznych" w branchu hybrydowym: LLM zna format
z jednego spojrzenia na specyfikacje, a wstrzykniete przez niego literaly
wpadaja do context constant poola i odblokowuja przeszukiwanie.

### 3. `awardPoints` - zasiane rozbieznosci kod / specyfikacja

W kodzie sa **dwie** celowe rozbieznosci wobec `docs/SPEC.md` sekcja 3:

| Specyfikacja mowi | Kod robi |
|---|---|
| zaokraglenie bankierskie (half-to-even) | `Math.floor` |
| prog VIP `lifetimeSpendPLN >= 5000` | `lifetimeSpendPLN > 5000` |

Zadna z nich nie powoduje wyjatku ani awarii. Kod jest wewnetrznie spojny -
po prostu realizuje inna regule niz uzgodniona. Dlatego podejscie, ktore
wyprowadza oczekiwania z *zachowania kodu*, nie ma jak ich zauwazyc, a
podejscie ktore czyta *intencje*, ma.

W `src/` nie ma zadnego komentarza wskazujacego te miejsca. Prompty w branchu
LLM dostaja kod i specyfikacje, nie ten dokument.

### 4. `Cart` - awaria osiagalna tylko przez sekwencje

`remove()` nie przycina ilosci do zera, wiec `total()` moze trafic na pozycje
z ujemna iloscia i rzucic `RangeError: cart quantity underflow`. Awaria jest
nieosiagalna jednym wywolaniem - trzeba `add`, potem `remove` ponad stan,
potem `total`.

Specyfikacja **milczy** na temat zdejmowania wiekszej liczby sztuk niz jest
w koszyku. To celowe: to defekt implementacyjny, ktorego nie widac ani
w wymaganiach, ani na sciezce happy path.

## Jak rozstrzygamy, czy suite "znalazl" defekt

Samo pokrycie nic tu nie mowi - test moze wykonac zabugowana linie i przyjac
jej wynik jako poprawny. Uzywamy wiec walidacji tautologicznej
(**Fails Without / Passes With**), zaimplementowanej w `checkOracle()`:

1. uruchom podzbior testow na kodzie z defektem,
2. naloz patch naprawiajacy defekt (`git apply`),
3. uruchom te same testy ponownie,
4. cofnij patch.

Wynik:

| Na kodzie z defektem | Po naprawie | Werdykt | Znaczenie |
|---|---|---|---|
| nie przechodzi | przechodzi | `caught` | poprawne wykrycie |
| przechodzi | nie przechodzi | `cemented` | testy utrwalily blad jako wymaganie |
| przechodzi | przechodzi | `silent` | defekt nietkniety |
| nie przechodzi | nie przechodzi | `silent` | testy zle z innego powodu |

Patche: `patches/fix-loyalty.patch` (scenariusz 3),
`patches/fix-cart-underflow.patch` (scenariusz 4).

Werdykt `cemented` jest tu najciekawszy. Nie znaczy "testy sa slabe" -
znaczy "testy dzialaja jako zapora regresji wokol zlego zachowania". Dokladnie
to robi narzedzie, ktore zaklada poprawnosc kodu.

## Pozostale metryki

- **pokrycie galezi i linii** - vitest + v8, liczone na `src/**/*.ts`
  (nie na `dist/`, w ktorym pracuje SBST).
- **mutation score** - Stryker 10, `(killed + timeout) / (killed + timeout +
  survived + noCoverage)`. Odpowiada na pytanie, ktorego nie odpowiada
  pokrycie: czy asercje w ogole cokolwiek sprawdzaja.
- **liczba testow, linie, asercje na test** - koszt utrzymania suite.
- **nazwy bez intencji** - liczba testow nazwanych `Test N for '<modul>'`.
  Prosty, mechaniczny wskaznik czytelnosci.

## Powtarzalnosc

SBST jest stochastyczny. Kazdy pomiar branchy SBST i hybrydowego jest
powtarzany dla 10 roznych wartosci `--random-seed`; raportujemy mediane
i rozrzut. Pojedynczy przebieg z jednym ziarnem nie jest dowodem.

Wersje sa przypiete co do patcha (`package-lock.json` w repozytorium),
wersja Node w `.nvmrc`.

## Ograniczenia tego eksperymentu

Warto je znac, zanim ktos zacytuje liczby z `results/COMPARISON.md`:

1. **Cztery funkcje to nie benchmark.** CodaMosa mierzyla 486 modulow.
   Tutaj scenariusze sa dobrane tak, by *zilustrowac* mechanizmy - nie da sie
   z nich wyliczyc, o ile procent hybryda jest lepsza "w ogolnosci".
2. **Defekty sa zasiane celowo**, wiec sa wykrywalne z zalozenia. Realne bledy
   rzadko sa tak czyste.
3. **SynTest 0.1.0 to narzedzie badawcze** (ostatni commit: luty 2024,
   nie parsuje TypeScriptu). Nie jest to poziom dojrzalosci EvoSuite dla Javy;
   slabszy wynik SBST moze byc po czesci wynikiem narzedzia, nie metody.
4. **LLM jest niedeterministyczny.** Prompty i modele sa zalogowane co do
   wersji, ale powtorzenie da inny kod. To jest wlasnie mierzona wlasciwosc.
