# Testy: gdy ekspert spotyka LLM-a

Kod towarzyszacy artykulowi
[*Testy: gdy ekspert spotyka LLM-a, czyli czym jest i w czym pomaga SBST w AI*](https://www.linkedin.com/pulse/testy-gdy-ekspert-spotyka-llma-czyli-czym-jest-i-w-ai-van-der-esch-58gof/).

Artykul stawia teze, ze polaczenie **SBST** (Search-Based Software Testing)
z **LLM-em** daje wynik lepszy niz kazde z tych podejsc osobno, bo ich slabosci
sa rozlaczne. To repozytorium sprawdza te teze pomiarem, a nie retoryka.

Nie jest to benchmark - to piec scenariuszy dobranych tak, by kazdy mechanizm
dal sie zobaczyc osobno, plus jeden harness, ktory mierzy wszystkie branche
identycznie. Ograniczenia sa wypisane wprost w
[docs/METODOLOGIA.md](docs/METODOLOGIA.md), a to, czego repozytorium **nie**
dowodzi - w [docs/PRESENTATION.md](docs/PRESENTATION.md).

## Wynik w jednej tabeli

| | SBST | LLM | hybryda |
|---|---|---|---|
| pokrycie galezi (`src/`) | 87,27% | **98,41%** | 93,44% |
| `invoiceId.ts` - bramka formatu | **60%** | 100% | 100% |
| mutation score | 62,5% | 95% | niemierzalne |
| linii kodu testow | **3929** | **619** | 1289 |
| nazw `Test N for '<modul>'` | **96 / 96** | 0 | 0 |
| rozbieznosc kodu ze spec | **utrwalona** | wykryta | wykryta |
| koszt API | **0 USD** | 1,38 USD | 6,48 USD |

Trzy rzeczy, ktorych nie planowalismy, a ktore okazaly sie najciekawsze:

1. **Najwyzszy mutation score (99,48%) ma suite, ktory utrwalil wszystkie trzy
   defekty jako wymagania.** Gdyby kryterium byly metryki strukturalne,
   wygralby ranking.
2. **Mutation score bywa niemierzalny** - Stryker wymaga zielonego przebiegu
   poczatkowego, a suite poprawnie wykrywajacy defekt wlasnie nie przechodzi.
3. **Jeden literal w constant poolu** przeniosl `invoiceId` z 3/8 na 8/8
   galezi. Ten sam mechanizm **nie zamknal** luki wymagajacej tej samej
   wartosci w dwoch wywolaniach - i nie chodzi o dawkowanie ziaren.

## Co jest gdzie

| Branch | Zawartosc |
|---|---|
| `main` | kod produkcyjny, specyfikacja biznesowa, harness metryk. **Zero testow.** |
| `demo/01-llm-only` | testy wylacznie z LLM-a, piec wariantow (rozne modele i wejscia promptu) |
| `demo/02-sbst-only` | testy wylacznie z SBST (SynTest / DynaMOSA), zero tokenow |
| `demo/03-hybrid` | pipeline neuro-symboliczny: intencja -> ziarna -> SBST -> oracle |
| `demo/04-results` | `results/COMPARISON.md` - zestawienie wszystkich pomiarow |

Chcesz to pokazac na zywo? [`docs/KROK-PO-KROKU.md`](docs/KROK-PO-KROKU.md)
- osiem linii kodu i lista komend do przepisania, najdluzsza trwa 26 sekund.

Jesli masz czas na jedna rzecz: [`docs/PRESENTATION.md`](docs/PRESENTATION.md)
mapuje kazda teze artykulu na konkretna liczbe i miejsce w repozytorium,
razem z lista tego, czego to repozytorium **nie** dowodzi.

Kazdy branch `demo/*` ma wlasny **`RUNBOOK.md`**: komenda po komendzie, co
zostalo uruchomione, oraz katalog `prompts/` z **dokladna trescia kazdego
promptu**, uzytym modelem, poziomem effortu i kosztem w tokenach.

## Cztery scenariusze

`src/` zawiera cztery niezalezne kawalki logiki. Kazdy testuje inna slabosc
automatycznej generacji testow.

| Plik | Funkcja | Co sprawdza |
|---|---|---|
| `src/pricing.ts` | `calculateShipping` | baseline: ile kosztuje 100% pokrycia galezi |
| `src/invoiceId.ts` | `parseInvoiceId` | logika za bramka formatu `FV/RRRR/MM/NNNN` |
| `src/loyalty.ts` | `awardPoints` | kod rozjezdza sie ze specyfikacja, nie rzucajac bledu |
| `src/cart.ts` | `class Cart` | awaria osiagalna tylko przez sekwencje wywolan |

Regula biznesowa dla kazdego z nich: [docs/SPEC.md](docs/SPEC.md). Ten plik
gra role strony w Confluence - opisuje **intencje**, nie aktualne zachowanie
kodu. W jednym miejscu kod i intencja sie roznia; to jest celowe i o tym jest
cale cwiczenie.

> Jesli chcesz sam zgadnac, gdzie, nie zagladaj do
> [docs/METODOLOGIA.md](docs/METODOLOGIA.md) - jest tam rozwiazanie.

## Jak mierzymy

Pokrycie nie wystarcza: test moze wykonac zabugowana linie i zapisac jej wynik
jako poprawny. Poza pokryciem i mutation score liczy sie wiec **walidacja
tautologiczna** (Fails Without / Passes With): nakladamy patch naprawiajacy
zasiany defekt i patrzymy, czy suite zmienil zdanie.

Kazdy suite dostaje jeden z trzech werdyktow:

- **wykryty** - nie przechodzi przed naprawa, przechodzi po. Poprawne wykrycie.
- **utrwalony** - przechodzi przed naprawa, nie przechodzi po. Testy zapisaly
  blad jako oczekiwane zachowanie.
- **nietkniety** - defekt w ogole nie zostal dotkniety.

Werdykt "utrwalony" to nie awaria narzedzia. Tak wlasnie zachowuje sie kazde
narzedzie, ktore wyprowadza oczekiwania z zachowania kodu, zamiast z wymagan.

Cala warstwa pomiarowa powstala **przed** wygenerowaniem pierwszego testu.

## Uruchomienie

```bash
nvm use                 # Node 24.16.0 (.nvmrc)
npm ci

npm run build           # src/*.ts -> dist/*.js (SBST nie parsuje TypeScriptu)
npm test                # vitest
npm run coverage        # pokrycie na src/
npm run mutation        # Stryker
npm run metrics         # -> results/<branch>.json
npm run compare         # -> results/COMPARISON.md
```

Generacja testow przez SBST (dziala na kazdym branchu):

```bash
npm run sbst -- --seed 42 --search-time 90
```

## Stos

- **TypeScript** - kod produkcyjny i testy
- **vitest** + **@vitest/coverage-v8** - jedyny runner, na ktorym mierzone sa
  wszystkie branche
- **Stryker 10** - mutation testing
- **SynTest** (`@syntest/cli` 0.2.1, `@syntest/javascript` 0.1.0) - SBST,
  preset DynaMOSA. Autorzy: Annibale Panichella, Mitchell Olsthoorn,
  Dimitri Stallenberg (TU Delft)
- **Claude Code** - generacja i naprawa testow w branchach LLM i hybrydowym

Wszystkie wersje przypiete co do patcha. Uruchomienie SynTesta wymagalo
obejscia kilku niescislosci w jego dokumentacji - sa opisane
w [docs/SPIKE.md](docs/SPIKE.md).

## Dane

Domena (faktury, punkty lojalnosciowe, koszyk) jest w calosci syntetyczna.
Repozytorium nie zawiera zadnego kodu ani danych klienckich.
