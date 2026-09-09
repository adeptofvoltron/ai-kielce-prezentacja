# Krok 0: spike SynTesta (wyniki)

Zanim powstala reszta repozytorium, sprawdzilismy czy SBST dla JS/TS w ogole
da sie uruchomic. Ponizej ustalenia - wszystkie potwierdzone empirycznie, nie
z dokumentacji, bo dokumentacja SynTesta jest w kilku miejscach nieaktualna.

## Wersje

| Pakiet | Wersja | Uwaga |
|---|---|---|
| `@syntest/cli` | 0.2.1 | ostatnia stabilna (marzec 2024) |
| `@syntest/javascript` | 0.1.0 | ostatnia stabilna; beta to `0.2.0-beta.25` |
| Node | 24.16.0 | `engines` deklaruje `>=10.24.0`, co znaczy "nietestowane" |

Repozytorium `syntest-framework/syntest-javascript`: ostatni push luty 2024,
5 gwiazdek. To narzedzie badawcze, nie produkcyjne - patrz "Ograniczenia"
w [METODOLOGIA.md](METODOLOGIA.md).

## Ustalenie 1: SynTest nie parsuje TypeScriptu

Opis repozytorium mowi "JavaScript **and TypeScript** languages", ale
`libraries/analysis-javascript/lib/ast/defaultBabelConfig.ts` ustawia
`parserOpts.plugins` na `["asyncGenerators", "classProperties",
"dynamicImport", "objectRestSpread"]` - **bez pluginu `typescript`**.

Konsekwencja dla tego repo: SBST celuje w skompilowany `dist/**/*.js`
(`npm run build`), a nie w `src/**/*.ts`. Pomiar odbywa sie potem na `src/`.
Rozdzielenie generacji i pomiaru wyszlo na plus - patrz README.

## Ustalenie 2: `syntest init config` zostawia konfiguracje niedokonczona

Wygenerowany `.syntest.json` ma dosłownie `"TODO fill this in yourself"`
w polach `search-algorithm`, `objective-manager`, `crossover`, `sampler`.
Preset `DynaMOSA` (`@syntest/base-language/dist/lib/presets/DynaMOSAPreset.js`)
ustawia tylko cztery z nich:

```js
arguments_.searchAlgorithm = "MOSAFamily";
arguments_.objectiveManager = "structural-uncovered";
arguments_.procreation = "default";
arguments_.secondaryObjectives = ["length"];
arguments_.populationSize = 50;
```

`crossover` i `sampler` zostaja niezdefiniowane, wiec uruchomienie konczy sie
`Error: Crossover plugin not found. Specified Crossover plugin: 'undefined'`.

Trzeba je podac wprost. Poprawne nazwy pluginow dla modulu JavaScript:

- `crossover`: `javascript-tree`
- `sampler`: `javascript-random`

Dodatkowo `secondary-objectives: ["length"]` z presetu **nie przechodzi
walidacji yargs** (lista dostepnych wartosci jest pusta), wiec w `.syntest.json`
trzymamy `[]`. Dlatego repo nie uzywa flagi `--preset`, tylko zapisuje
komplet parametrow jawnie w `.syntest.json`.

## Ustalenie 3: wygenerowane testy nie uruchamiaja sie same z siebie

SynTest emituje mocha + chai i **miesza dwa systemy modulow** w jednym pliku:

```js
import chai from 'chai'                                  // ESM
...
delete require.cache[require.resolve("../../dist/pricing.js")]   // CJS
({calculateShipping} = require("../../dist/pricing.js"));
```

Uruchomienie przez `npx mocha` daje `SyntaxError: Cannot use import statement
outside a module`. Jako ESM padnie na `require`.

Dlatego istnieje `scripts/syntest-to-vitest.ts`: podmienia naglowek i hack na
`require.cache` (na `vi.resetModules()` + dynamiczny import z `src/`), dopisuje
adnotacje typow na deklaracjach `let`. **Asercji i danych wejsciowych nie
dotyka** - chai dziala pod vitestem bez zmian, wiec zostaja bajt w bajt takie,
jakie wyprodukowal algorytm. Surowe wyjscie SynTesta jest commitowane
w `artifacts/syntest-raw/`, wiec transformacja jest audytowalna.

## Ustalenie 4: constant pool dziala i pomija regex

`ConstantVisitor` wydobywa `StringLiteral`, `NumericLiteral`, `BigIntLiteral`
i `DecimalLiteral`. Jawnie pomija `RegExpLiteral`, `TemplateLiteral`,
`BooleanLiteral` i `NullLiteral`.

W spike'u na funkcji `calculateShipping` przeszukiwanie znalazlo oba literaly
stref (`"PL"` i `"EU"`) wlasnie przez constant pool - obok losowych smieci
w rodzaju `"5^ >+ /;[{§z>6{a:~-~twpzDttaZ>\\jOW#&w?"`. To potwierdza, ze
`ConstantPoolManager` (pule `target` / `context` / `dynamic`) jest wlasciwym
miejscem na wstrzykniecie ziaren semantycznych w branchu hybrydowym: wystarczy
dodac plik z literalami do `--analysis-include`, bez patchowania narzedzia.

## Wynik spike'a

Na funkcji o 12 galeziach, przy `--search-time 40 --random-seed 42`:

- SynTest: **100% pokrycia** instrukcji, galezi i funkcji (na `dist/`),
- po transformacji: 10 testow, 24 asercje, przechodza pod vitestem,
- pokrycie liczone na `src/pricing.ts`: **100% linii i galezi**.

Sciezka `TS -> tsc -> dist -> DynaMOSA -> transformacja -> vitest na src`
jest wiec przejezdna od konca do konca. Fallback na wlasny silnik GA nie byl
potrzebny.

---

## Ustalenia z pierwszego pelnego przebiegu

Dwie rzeczy wyszly dopiero na czterech modulach, nie na jednej funkcji ze spike'a.

### Klasy: `target: ES2022` wywala inferencje typow

Przy `"target": "ES2022"` TypeScript emituje prawdziwe pola klasy
(`lines = []` w ciele klasy). SynTest przewraca sie na nich w fazie
`Resolving types`:

```
warn:  Cannot find binding for lines at dist/cart.js:13:4
warn:  Cannot find binding for discountPct at dist/cart.js:14:4
TypeError: Cannot use 'in' operator to search for 'name' in undefined
    at InferenceTypeModelFactory._classProperty (...)
```

Rozwiazanie: `tsconfig.build.json` ma `"target": "ES2018"`, przy ktorym pola
sa inicjalizowane w konstruktorze (`this.lines = []`). Zmiana dotyczy
wylacznie artefaktu budowania dla SBST - `src/` jest wspolne dla wszystkich
branchy i nietkniete.

### Testy dla modulu A importuja bindingi z modulu B

SynTest ma *statement pool*: wartosci uzyte w jednym miejscu moga posluzyc
jako kandydaci w innym. Efektem jest to, ze `test-pricing.spec.js` deklaruje
i importuje takze `Cart`:

```js
let Cart;
let calculateShipping;
beforeEach(() => {
  delete require.cache[require.resolve("../../dist/cart.js")];
  delete require.cache[require.resolve("../../dist/pricing.js")];
  ({Cart} = require("../../dist/cart.js"));
  ({calculateShipping} = require("../../dist/pricing.js"));
});
```

Kazdy binding dostaje osobna linie `let`, a modulow moze byc wiele. Pierwsza
wersja transformacji zakladala jeden binding i jeden modul wyprowadzony
z nazwy pliku - efekt byl taki, ze 39 z 82 testow padalo na
`calculateShipping is not a function`.

`scripts/syntest-to-vitest.ts` czyta wiec mapowanie binding -> modul
z samego bloku `beforeEach`, a nie z nazwy pliku.
