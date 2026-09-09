# Metodologia

Dokument opisuje, jak w tym repozytorium mierzymy jakosc testow i dlaczego
akurat tak. Zawiera **rozwiazanie eksperymentu** - jesli chcesz sam sprawdzic,
co znajda poszczegolne podejscia, przeczytaj go po obejrzeniu wynikow.

## Zasada: metryka przed danymi

Cala warstwa pomiarowa (`scripts/metrics.ts`, oba patche w `patches/`,
`stryker.conf.json`) powstala i zostala zacommitowana **przed** wygenerowaniem
pierwszego testu. Zaden prog ani zadna metryka nie byly pozniej dopasowywane
do wyniku.

## Piec scenariuszy i po co sa

Kazda funkcja w `src/` istnieje po to, zeby sfalsyfikowac lub potwierdzic
jedna konkretna teze o automatycznej generacji testow. Cztery pierwsze
scenariusze byly zaplanowane; piaty dopisala rzeczywistosc.

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

**Doprecyzowanie po pierwszym przebiegu.** Scenariusz mial izolowac jedna
rzecz - eksploracje sekwencji wywolan. Okazalo sie, ze izoluje dwie, i to ta
druga decyduje o wyniku: zeby dosiegnac awarii, `add` i `remove` musza dostac
**ten sam** SKU. Mutacja sekwencji radzi sobie z kolejnoscia wywolan, ale nie
z tym, ze dwa argumenty w roznych wywolaniach maja byc rowne - losowane
stringi nigdy sie nie powtarzaja.

Zostawilismy scenariusz bez zmian, bo w tej formie mierzy cos ciekawszego niz
pierwotny zamysl: **sprzegniecie wartosci miedzy wywolaniami**. Jest to
dokladnie ten rodzaj bariery, ktory ziarna semantyczne maja znosic - podanie
2-3 sensownych SKU do constant poola sprawia, ze powtorzenie wartosci
przestaje byc przypadkiem. Branch hybrydowy sprawdza to wprost.

### 5. Kupon z lancucha prototypow - defekt niezasiany

Ten defekt **nie byl planowany**. Znalazl go wariant `b` na branchu
`demo/01-llm-only` - LLM, ktory dostal specyfikacje i mial pisac oracle
z wymagan, a nie z kodu.

Sekcja 4 specyfikacji mowi: nieznany kod kuponu ma dac `Error: unknown
coupon`. Kod sprawdzal to przez `COUPONS[code] === undefined`, gdzie `COUPONS`
byl zwyklym obiektem. Dla `code = "constructor"` (albo `"toString"`,
`"valueOf"`, `"__proto__"`) wyrazenie zwraca odziedziczona wlasnosc
`Object.prototype`, czyli funkcje - nie `undefined`. Wyjatek nie leci, rabat
zostaje ustawiony na funkcje, a `total()` zwraca **NaN**.

Zostawilismy defekt w kodzie i dodalismy trzeci patch
(`patches/fix-coupon-prototype.patch`, przejscie na `Map`), zeby dal sie
mierzyc tym samym mechanizmem co dwa zasiane. Jest to jedyny defekt w tym
repozytorium, ktorego autor nie umiescil tam swiadomie - i chyba najlepsza
ilustracja tego, po co w ogole wyprowadzac oracle z wymagan.

## Jak rozstrzygamy, czy suite "znalazl" defekt

Samo pokrycie nic tu nie mowi - test moze wykonac zabugowana linie i przyjac
jej wynik jako poprawny. Uzywamy wiec walidacji tautologicznej
(**Fails Without / Passes With**), zaimplementowanej w `checkOracle()`:

1. uruchom podzbior testow na kodzie z defektem,
2. naloz patch naprawiajacy defekt (`git apply`),
3. uruchom te same testy ponownie,
4. cofnij patch.

Wynik:

Porownanie jest robione **per pojedynczy test**, nie po statusie calego
pliku. Pierwsza wersja harnessu patrzyla na status pliku i natychmiast sie
wywrocila: jedna niepowiazana awaria w `tests/cart` (ta z punktu 5 powyzej)
maskowala sygnal z awarii underflow i dawala werdykt `silent` tam, gdzie
powinno byc `caught`.

| Jest test, ktory... | Werdykt | Znaczenie |
|---|---|---|
| nie przechodzi przed naprawa i przechodzi po | `caught` | poprawne wykrycie |
| przechodzi przed naprawa i nie przechodzi po | `cemented` | test utrwalil blad jako wymaganie |
| jedno i drugie, w roznych testach | `mixed` | czesc suite wykryla, czesc utrwalila |
| ani jedno, ani drugie | `silent` | defekt nie zmienil wyniku zadnego testu |

Patche: `patches/fix-loyalty.patch` (scenariusz 3),
`patches/fix-cart-underflow.patch` (scenariusz 4),
`patches/fix-coupon-prototype.patch` (scenariusz 5).

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

## Pulapka pomiarowa, o ktora sie potknelismy

`coverage.reportOnFailure` w vitescie jest domyslnie **wylaczone**: gdy
ktorykolwiek test nie przechodzi, raport pokrycia nie jest zapisywany wcale.

W normalnym projekcie to sensowny domysl. Tutaj bylo odwrotnie: suite, ktory
poprawnie wykrywa zasiany defekt, **nie przechodzi** - i wlasnie tym branchom
harness zerowal pokrycie, podczas gdy branche utrwalajace blad dostawaly pelne
liczby. `vitest.config.ts` ustawia wiec `reportOnFailure: true`.

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
