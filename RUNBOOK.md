# Branch `demo/03-hybrid`: pipeline neuro-symboliczny

Cztery kroki, dwa narzedzia. LLM dostarcza semantyke, przeszukiwanie
dostarcza rygor. Kolejnosc jest istotna i odpowiada czterem krokom
wdrozeniowym z artykulu.

| Krok | Co robi | Kto | Model / effort | Wynik |
|---|---|---|---|---|
| 1 | ekstrakcja intencji | LLM | opus-5 / high | `intent.json` |
| 2 | ziarna semantyczne | LLM | opus-5 / high | `seeds/semantic-seeds.js` |
| 3 | przeszukiwanie z ziarnami | SBST | — (0 tokenow) | `tests/*.sbst.test.ts` |
| 4 | podmiana oracle + triage | LLM | sonnet-5 / medium | `tests/*.hybrid.test.ts`, `FINDINGS.md` |

Pelna tresc kazdego promptu: [`prompts/`](prompts/). Transkrypty z kazdym
wywolaniem narzedzia: [`artifacts/llm/`](artifacts/llm/).

---

## Komenda po komendzie

### 1. Punkt wyjscia

```bash
git checkout main
git checkout -b demo/03-hybrid
```

### 2. Krok 1/4 — ekstrakcja intencji

```bash
bash scripts/run-llm.sh prompts/03a-extract-intent.md
```

Model czyta `docs/SPEC.md` i `src/`, i buduje strukturalny opis intencji:
dla kazdej funkcji reguly biznesowe z odwolaniem do sekcji specyfikacji,
wartosci graniczne, wymagane **formaty tekstowe** z przykladami poprawnymi
i niepoprawnymi, oraz - dla klas - ktore argumenty musza byc **wspolne**
miedzy wywolaniami w sensownej sekwencji.

Ten ostatni punkt jest tu najwazniejszy: to on generuje ziarna, ktore w kroku
3 maja odblokowac sekwencje niedostepne dla losowania.

### 3. Krok 2/4 — ziarna semantyczne

```bash
bash scripts/run-llm.sh prompts/03b-semantic-seeds.md
```

Z `intent.json` powstaje plik z samymi literalami. Prompt zawiera twarde
ograniczenia skladniowe, bo plik nie jest uruchamiany - jest **skanowany**
przez SynTest w poszukiwaniu literalow do constant poola:

- czysty JavaScript (parser narzedzia nie zna TypeScriptu),
- kazda wartosc wpisana wprost jako literal; sklejanie, szablony i regexy
  nie zostana wydobyte,
- zero generowania programowego.

### 4. Krok 3/4 — przeszukiwanie z ziarnami

```bash
bash scripts/run-syntest.sh --seed 42 --search-time 90 \
  --seeds seeds/semantic-seeds.js
```

Identyczne parametry jak na `demo/02-sbst-only` - to samo ziarno losowe, ten
sam budzet, ta sama konfiguracja. Rozni sie **wylacznie** obecnosc ziaren.

Uruchomienie tego kroku wymagalo czterech obejsc w narzedziu, opisanych
w [docs/SPIKE.md](docs/SPIKE.md): sciezka analizy musi lezec wewnatrz
katalogu celow, `--target-exclude` nie wyklucza pliku z listy celow,
a literal ze znakiem spoza alfabetu samplera konczy caly przebieg bez
zadnego wygenerowanego testu.

### 5. Krok 4/4 — podmiana oracle i triage

```bash
bash scripts/run-llm.sh prompts/03c-oracle-upgrade.md
```

Model zachowuje **dane wejsciowe** z przeszukiwania i wymienia
**oczekiwania**: asercje niezgodne z `docs/SPEC.md` zostaja poprawione na
zgodne ze specyfikacja, nawet jesli test przez to nie przechodzi. Dodatkowo
nadaje testom nazwy i - to nowy krok wobec brancha 01 - zapisuje w
`FINDINGS.md` zachowania, o ktorych **specyfikacja milczy**, zamiast zgadywac,
jak powinny wygladac.

### 6. Pomiar

```bash
npm run metrics
bash scripts/check-compliance.sh
```

---

## Wynik

Pomiary z 2026-09-09. Pelne dane: [`results/demo-03-hybrid.json`](results/demo-03-hybrid.json).

### Efekt ziaren na samo przeszukiwanie

To najczystsze porownanie w calym repozytorium: **to samo ziarno losowe (42),
ten sam budzet (90 s na modul), ta sama konfiguracja.** Rozni sie wylacznie
obecnosc ziaren semantycznych w context constant poolu.

| Cel | SBST samo (`demo/02`) | SBST + ziarna | Zmiana |
|---|---|---|---|
| `invoiceId.js` galezie | **3 / 8** | **8 / 8** | +5 |
| `invoiceId.js` instrukcje | 10 / 23 | **23 / 23** | +13 |
| `loyalty.js` galezie | 7 / 8 | **8 / 8** | +1 |
| `cart.js` galezie | 9 / 16 | 11 / 16 | +2 |
| `pricing.js` galezie | 16 / 16 | 16 / 16 | — |
| **srednia galezi** | **72,92%** | **89,58%** | **+16,7 pkt** |
| srednia instrukcji | 78,05% | 91,87% | +13,8 pkt |

`invoiceId` byl na `demo/02` najgorszym modulem na kazdej metryce - zaden
z 13 wygenerowanych stringow nie zaczynal sie nawet od `FV`, wiec cala logika
za bramka formatu byla nietknięta. Z ziarnami przeszukiwanie osiaga **pelne
pokrycie instrukcji i galezi**. Jeden literal w puli (`FV/2026/09/0042`)
wystarczyl, by odblokowac funkcje, ktorej losowanie ze 100-znakowego alfabetu
nie dosiegloby w zadnym rozsadnym budzecie.

### Metryki suite po podmianie oracle

| Metryka | Wartosc |
|---|---|
| pokrycie galezi (`src/`) | **93,44%** |
| pokrycie linii | 92,8% |
| `invoiceId.ts` galezie | **100%** |
| `loyalty.ts` galezie | **100%** |
| `pricing.ts` galezie | 100% |
| `cart.ts` galezie | 84% |
| testow | 89 |
| linii kodu testow | 1289 |
| nazw postaci `Test N for '<modul>'` | **0 / 89** |
| mutation score | **niemierzalne** (patrz nizej) |

Krok 4 zredukowal suite z 3901 linii (surowe wyjscie SBST dla tych samych
89 testow) do **1289 linii**, nie usuwajac ani jednego wywolania funkcji
produkcyjnej. Zniknely bloki metadanych przeszukiwania, nieuzywane zmienne
i nadmiarowe argumenty doklejane do wywolan przez sampler.

### Werdykty wobec defektow

| Defekt | Werdykt |
|---|---|
| rozbieznosc `awardPoints` ze specyfikacja | **wykryty** |
| awaria `Cart` (underflow) | nietkniety |
| kupon z lancucha prototypow | utrwalony (z zastrzezeniem, patrz nizej) |

---

## Co z tego wynika

### 1. Ziarna semantyczne robia dokladnie to, co obiecuje artykul

Bramka formatu jest przypadkiem, w ktorym przewaga jest jakosciowa, nie
ilosciowa. Przeszukiwanie musialoby zgadnac 15 znakow w ustalonej kolejnosci;
LLM zna ten format z jednego spojrzenia na specyfikacje. Po wstrzyknieciu
`invoiceId` przechodzi z **najgorszego modulu w repozytorium na w pelni
pokryty**.

Warto zauwazyc, ze ziarna pomogly tez tam, gdzie ich nie planowano:
`loyalty.js` doszlo do 8/8 galezi, bo w puli byly kwoty dokladnie na progach
(`4999`, `5000`, `5000.01`) i wartosci powodujace remis przy zaokraglaniu.

### 2. Dane wejsciowe z przeszukiwania + oracle ze specyfikacji

Trzy testy w `loyalty` nie przechodza, i to jest wynik zamierzony. Wartosci
wejsciowe pochodza z przeszukiwania, oczekiwania ze specyfikacji:

| Wywolanie | Asercja SBST (zachowanie kodu) | Asercja po kroku 4 (specyfikacja) |
|---|---|---|
| `awardPoints(29.99, 2000)` | `2` | **`3`** |
| `awardPoints(217, 5000.01)` | `42` | **`44`** |
| `awardPoints(447, 274)` | `44` | **`45`** |

Zaden czlowiek nie napisalby testu dla `awardPoints(447, 274)`. Zadne
przeszukiwanie nie wiedzialoby, ze poprawna odpowiedz to `45`, a nie `44`.
To jest ta hybryda w jednym wierszu tabeli.

### 3. Mutation score okazal sie niemierzalny - i to jest informacja

Stryker przerywa przebieg, jesli **poczatkowe** uruchomienie testow nie jest
zielone (`Initial test run failed`). Suite, ktory poprawnie wykrywa zasiany
defekt, wlasnie nie przechodzi. Harness probuje wiec zmierzyc mutacje po
nalozeniu wszystkich patchy z `patches/` - ale ten suite nie jest zielony
rowniez wtedy, bo utrwalil kolejnosc sprawdzania bledow w `applyCoupon`
(patrz punkt 4). Werdykt: `niemierzalne`.

Nie jest to porazka pomiaru, tylko jego granica. Mutation score odpowiada na
pytanie "czy asercje cokolwiek sprawdzaja", ale zadaje je **zakladajac, ze kod
jest poprawny** - czyli dokladnie w tym zalozeniu, ktore w tym repozytorium
jest przedmiotem badania. Tam, gdzie testy i kod nie zgadzaja sie co do
wymagan, narzedzie nie ma jak zaczac.

Kolumna "mierzone na" w [`results/COMPARISON.md`](results/COMPARISON.md) mowi,
w ktorym stanie kodu powstala kazda liczba. Liczb z dwoch roznych stanow nie
nalezy porownywac.

### 4. Werdykt "utrwalony" dla kuponu wymaga zastrzezenia

Formalnie suite utrwalil defekt kuponu. Faktycznie utrwalil co innego -
**kolejnosc sprawdzania bledow**, ktorej specyfikacja nie definiuje.

Test nazywa sie tak:

```
applyCoupon('hasOwnProperty') on an empty cart still throws the empty-cart
error (prototype-name code masked by emptiness)
```

Przeszukiwanie trafilo w nazwe z lancucha prototypow (`hasOwnProperty`), ale
na **pustym** koszyku - a tam walidacja pustosci wyprzedza problem
z prototypem. Po nalozeniu patcha kolejnosc sie odwraca (`unknown coupon`
leci pierwszy), wiec test przestaje przechodzic.

`intent.json` wymienia to jako otwarte pytanie do wlasciciela specyfikacji
(`DIV-CART-6`: "ktory blad ma pierwszenstwo w `applyCoupon` przy jednoczesnie
nieznanym kodzie i pustym koszyku?"). Nazwa testu, nadana w kroku 4, sama
dokumentuje maskowanie. To najlepsze, co da sie zrobic bez decyzji czlowieka -
i dlatego werdykt `utrwalony` nalezy tu czytac razem z ta nazwa.

### 5. Ziarna nie zamknely luki sekwencyjnej - i nie chodzi o dawkowanie

Awaria `Cart` pozostaje `nietknieta`, mimo ze krok 2 wygenerowal dokladnie to,
czego bylo potrzeba: zamkniety zbior `SKU-1`, `SKU-2`. Zaden test
w `cart.hybrid.test.ts` nie uzyl zadnego z nich.

Pierwsza hipoteza brzmiala: pula jest za duza, ziarna sie w niej rozcienczyly.
Sampler siega po constant pool przez `getRandomString()` **bez** argumentu,
czyli losuje jednostajnie po zbiorze roznych wartosci (sprawdzone
w `JavaScriptRandomSampler.js:417`), a pula ma 151 wartosci tekstowych.

Hipoteza okazala sie **falszywa**. Przy puli zawezonej do grupy `CART_`
(42 wartosci tekstowe zamiast 151, to samo ziarno, ten sam budzet):

| | pula pelna | pula `CART_` |
|---|---|---|
| testow uzywajacych `SKU-*` | 0 | **3** |
| testow z powtorzonym tym samym SKU | 0 | **0** |
| pokrycie galezi `cart.js` | 11 / 16 | **11 / 16** |
| awaria osiagnieta | nie | **nie** |

Ziarna zaczely byc uzywane, ale pokrycie nie drgnelo ani o jedna galaz.
Powod widac w tym, **jak** zostaly uzyte - jedno z trzech uzyc to:

```ts
const code = "SKU-2";
```

`code` jest parametrem `applyCoupon`. Sampler wstawil identyfikator produktu
jako kod kuponu, bo constant pool jest **plaska lista wartosci bez przypisania
do parametrow**. Nie wie, ze `"SKU-2"` jest kandydatem na `sku`, a tym bardziej
nie wie, ze wartosc podana raz jako `sku` ma wrocic pod tym samym argumentem
w nastepnym wywolaniu.

Krok 1 te informacje mial i zapisal - `intent.json` zawiera `sharedArguments`
z uzasadnieniem i gotowym przykladem sekwencji. Nie ma jednak kanalu, ktorym
mozna by ja przekazac: przez `--analysis-include` przeplywaja same wartosci.

Wniosek jest wezszy i mocniejszy niz "ziarna dzialaja": krok semantycznych
ziaren rozwiazuje **bramki wartosci pojedynczych** (jeden poprawny numer
faktury przenosi modul z 3/8 na 8/8 galezi), ale **sprzegniecia wartosci
miedzy wywolaniami nie rozwiaze przy zadnym dawkowaniu** - punkt wstrzykniecia
jest za slaby. Pelny pomiar: [`docs/APPENDIX-dilution.md`](docs/APPENDIX-dilution.md).

---

## Koszt

| Krok | Model | Effort | Czas | Wywolan narzedzi | Koszt |
|---|---|---|---|---|---|
| 1 ekstrakcja intencji | opus-5 | high | 629 s | 9 | 2,29 USD |
| 2 ziarna semantyczne | opus-5 | high | 311 s | 20 | 1,80 USD |
| 3 przeszukiwanie | — | — | ~400 s | — | **0 USD** |
| 4 podmiana oracle | sonnet-5 | medium | 421 s | 52 | 2,39 USD |
| **razem** | | | ~29 min | 81 | **6,48 USD** |

Dla porownania: `demo/01-llm-only` w wariancie kanonicznym kosztowal 1,38 USD
(prompty b + c), a `demo/02-sbst-only` 0 USD. Hybryda jest najdrozsza
i najbardziej pracochlonna we wdrozeniu - cztery kroki, cztery obejscia
w narzedziu. Placi za to jednym: jest jedynym podejsciem w tym repozytorium,
ktore dostarcza **i** dane wejsciowe niedostepne czlowiekowi, **i** oczekiwania
wynikajace z wymagan.

---

## Co poszlo nie tak

### Krok 1 przezyl przelaczenie brancha

Ekstrakcja intencji trwala 10 minut, a w tym czasie przelaczylem branch, zeby
popchnac inna prace. Transkrypt kroku 1 wylandowal w drzewie brancha
`demo/01-llm-only` i tam zostal na chwile zacommitowany.

Wynik jest wazny, co dalo sie sprawdzic w logu wywolan narzedzi: krok 1 czytal
wylacznie `docs/SPEC.md`, `src/*.ts` i wlasny prompt, i sondowal zachowanie
kodu przez `tsx`. Nie tknal `tests/` ani niczego, co zmienilo sie przy
przelaczeniu brancha. Pliki zostaly przeniesione tam, gdzie naleza.

### Cztery obejscia w SynTescie

Opisane w [docs/SPIKE.md](docs/SPIKE.md). Najdrozsze: literal ze znakiem spoza
alfabetu samplera konczy caly przebieg **bez zadnego wygenerowanego testu**,
przy poprawnie wypisanej tabeli pokrycia. Ziarna zawieraly trzy takie literaly
- numer faktury cyframi arabsko-indyjskimi, ten sam cyframi pelnej szerokosci
i emoji flagi - czyli dokladnie te "nieoczywiste naruszenia formatu", o ktore
prosil prompt.
