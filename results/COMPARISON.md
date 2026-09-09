# Porownanie podejsc

Wygenerowane przez `npm run compare` z plikow `results/*.json`, zebranych
z branchy `demo/*` przez `npm run collect`.

## Trzy podejscia

| metryka | SBST | LLM | hybryda |
| --- | --- | --- | --- |
| pokrycie galezi (`src/`) | 87.27% | 98.41% | 93.44% |
| `pricing.ts` | 100% | 100% | 100% |
| `invoiceId.ts` | 60% | 100% | 100% |
| `loyalty.ts` | 90.9% | 100% | 100% |
| `cart.ts` | 80.95% | 96% | 84% |
| mutation score | 62.5% | 95% | niemierzalne |
| mutacje mierzone na | kod-z-defektami | kod-poprawiony | niemierzalne |
| testow | 96 | 59 | 89 |
| linii kodu testow | 3929 | 619 | 1289 |
| nazw bez intencji | 96 | 0 | 0 |
| rozbieznosc ze spec (loyalty) | utrwalony | wykryty | wykryty |
| awaria koszyka (cart) | nietkniety | nietkniety | nietkniety |
| kupon z prototypu | nietkniety | wykryty | utrwalony |

## Warianty brancha LLM

Ta sama metodologia pomiaru, rozne modele i rozne wejscia promptu.
Szczegoly: `RUNBOOK.md` na branchu `demo/01-llm-only`.

| metryka | a: kod | b: +spec | c: b+naprawa | d: +spec, tanio | e: d+naprawa |
| --- | --- | --- | --- | --- | --- |
| pokrycie galezi (`src/`) | 100% | 98.41% | 98.41% | 98.5% | 98.5% |
| `pricing.ts` | 100% | 100% | 100% | 100% | 100% |
| `invoiceId.ts` | 100% | 100% | 100% | 100% | 100% |
| `loyalty.ts` | 100% | 100% | 100% | 90.9% | 90.9% |
| `cart.ts` | 100% | 96% | 96% | 100% | 100% |
| mutation score | 99.48% | 95% | 95% | niemierzalne | niemierzalne |
| mutacje mierzone na | kod-z-defektami | kod-poprawiony | kod-poprawiony | niemierzalne | niemierzalne |
| testow | 104 | 59 | 59 | 88 | 88 |
| linii kodu testow | 578 | 619 | 619 | 686 | 686 |
| nazw bez intencji | 0 | 0 | 0 | 0 | 0 |
| rozbieznosc ze spec (loyalty) | utrwalony | wykryty | wykryty | wykryty | wykryty |
| awaria koszyka (cart) | utrwalony | nietkniety | nietkniety | utrwalony | utrwalony |
| kupon z prototypu | utrwalony | wykryty | wykryty | nietkniety | nietkniety |

## Jak czytac wiersze o defektach

- **wykryty** - istnieje test, ktory nie przechodzi na kodzie z defektem
  i przechodzi po nalozeniu patcha. Poprawne wykrycie.
- **utrwalony** - istnieje test, ktory przechodzi przed naprawa i przestaje
  po niej. Test zapisal blad jako oczekiwane zachowanie.
- **mieszany** - jeden test wykryl defekt, a inny go utrwalil.
- **nietkniety** - defekt nie zmienil wyniku zadnego testu.

Porownanie jest robione **per test**, nie po statusie calego pliku - inaczej
jedna niepowiazana awaria maskowalaby sygnal.

## Dlaczego przy mutation score jest wiersz "mierzone na"

Stryker przerywa, jesli poczatkowy przebieg testow nie jest zielony. Suite,
ktory poprawnie wykrywa zasiany defekt, wlasnie nie przechodzi - wiec na
kodzie z `src/` nie da sie go zmierzyc. Harness mierzy taki suite po
nalozeniu wszystkich patchy z `patches/` i zapisuje, w ktorym stanie kodu
liczba powstala. **Liczb z dwoch roznych stanow nie nalezy porownywac.**
Suite niezielony w zadnym z tych stanow jest raportowany jako
`niemierzalne`.

Metodologia pomiaru: [../docs/METODOLOGIA.md](../docs/METODOLOGIA.md).

Zrodla pomiarow: llm-a (2026-09-09 12:45:05), llm-b (2026-09-09 12:45:28), llm-c (2026-09-09 12:46:12), llm-d (2026-09-09 12:45:39), llm-e (2026-09-09 12:45:48), llm-only (c) (2026-09-09 12:46:36), demo/02-sbst-only (2026-09-09 12:43:25), demo/03-hybrid (2026-09-09 12:35:08).
