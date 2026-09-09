# Testy: gdy ekspert spotyka LLM-a

Kod towarzyszacy artykulowi
[*Testy: gdy ekspert spotyka LLM-a, czyli czym jest i w czym pomaga SBST w AI*](https://www.linkedin.com/pulse/testy-gdy-ekspert-spotyka-llma-czyli-czym-jest-i-w-ai-van-der-esch-58gof/).

Artykul stawia teze, ze polaczenie **SBST** (Search-Based Software Testing)
z **LLM-em** daje wynik lepszy niz kazde z tych podejsc osobno, bo ich slabosci
sa rozlaczne. To repozytorium sprawdza te teze pomiarem, a nie retoryka.

Nie jest to benchmark - to cztery scenariusze dobrane tak, by kazdy mechanizm
dal sie zobaczyc osobno, plus jeden harness, ktory mierzy wszystkie branche
identycznie. Ograniczenia sa wypisane wprost w
[docs/METODOLOGIA.md](docs/METODOLOGIA.md).

## Co jest gdzie

| Branch | Zawartosc |
|---|---|
| `main` | kod produkcyjny, specyfikacja biznesowa, harness metryk. **Zero testow.** |
| `demo/01-llm-only` | testy wygenerowane wylacznie przez LLM-a |
| `demo/02-sbst-only` | testy wygenerowane wylacznie przez SBST (SynTest / DynaMOSA) |
| `demo/03-hybrid` | pipeline neuro-symboliczny: LLM -> ziarna -> SBST -> LLM |
| `demo/04-results` | zestawienie wynikow ze wszystkich branchy |

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
