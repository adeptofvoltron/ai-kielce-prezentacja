# Mapa: teza artykulu -> dowod w repozytorium

Sciagawka. Kazdy wiersz mowi, gdzie siedzi dowod, jaka komenda go odtwarza
i jaka liczba go potwierdza. Pelna tabela:
[`results/COMPARISON.md`](../results/COMPARISON.md) na branchu
`demo/04-results`.

## Liczby w jednym miejscu

| | SBST | LLM | hybryda |
|---|---|---|---|
| pokrycie galezi (`src/`) | 87,27% | **98,41%** | 93,44% |
| `invoiceId.ts` (bramka formatu) | **60%** | 100% | 100% |
| mutation score | 62,5% | 95% | niemierzalne |
| — mierzone na | kodzie z defektami | kodzie poprawionym | — |
| testow | 96 | 59 | 89 |
| linii kodu testow | **3929** | **619** | 1289 |
| nazw `Test N for '<modul>'` | **96 / 96** | 0 | 0 |
| rozbieznosc ze spec | **utrwalona** | wykryta | wykryta |
| awaria sekwencyjna | nietknieta | nietknieta | nietknieta |
| defekt niezasiany | nietkniety | **wykryty** | utrwalony* |
| koszt API | **0 USD** | 1,38 USD | 6,48 USD |

\* z zastrzezeniem - patrz `RUNBOOK.md` na `demo/03-hybrid`, punkt 4.

## Tezy o samym LLM-ie

| Teza z artykulu | Dowod | Gdzie |
|---|---|---|
| agent powiela bledy, ktore sa w kodzie | wariant `a`: **100% galezi, 99,48% mutation score i wszystkie trzy defekty utrwalone**; nazwy testow to zdania o wymaganiach wziete z implementacji (`"obcina czesc niepelna w dol"`) | `demo/01-llm-only`, `variants/a/` |
| agent testuje oczywiste przypadki | zaden z pieciu wariantow nie dosiegl awarii `Cart` wymagajacej sekwencji trzech wywolan | `demo/01-llm-only`, tabela werdyktow |
| ekstrakcja intencji zmienia wynik | wariant `a` vs `b`: te same metryki strukturalne, werdykty z `utrwalony/utrwalony/utrwalony` na `wykryty/nietkniety/wykryty` | `prompts/01a` vs `prompts/01b` |
| petla naprawcza | **wynik zerowy**: `c` i `e` nie zmienily ani jednej linii. `tsc` byl czysty w kazdym przebiegu generacyjnym, takze przy haiku na effort `low` | `demo/01-llm-only`, punkt 5 |
| tanszy model wystarcza do zadan mechanicznych | `d` (haiku, `low`, 0,22 USD) wykryl rozbieznosc **dokladniej** niz `b` (opus, `high`, 1,06 USD): 9 testow vs 4 | `variants/d/DIVERGENCES.md` |

## Tezy o samym SBST

| Teza z artykulu | Dowod | Gdzie |
|---|---|---|
| SBST zaklada poprawnosc kodu | asercja `expect(awardPoints(79, 50)).to.equal(7)` przy specyfikacji mowiacej `8`; po nalozeniu patcha suite **przestaje** przechodzic | `demo/02-sbst-only`, punkt 1 |
| SBST utyka na precyzyjnych formatach | `invoiceId`: **60% galezi, 28,95% mutation score**; zaden z 13 wygenerowanych stringow nie zaczyna sie nawet od `FV` | `demo/02-sbst-only`, punkt 2 |
| SBST nie rozumie semantyki | wydobyl z kodu `"cart quantity underflow"`, zmutowal jedna litere i uzyl jako **kod kuponu** | `tests/cart.sbst.test.ts:594` |
| SBST dobrze wykrywa awarie | **czesciowo obalone**: awaria wymagajaca tej samej wartosci w dwoch wywolaniach pozostala nieosiagnieta, bo losowe stringi sie nie powtarzaja | `demo/02-sbst-only`, punkt 3 |
| testy sa nieczytelne | 3929 linii na 156 asercji, **96 z 96 testow** nazwanych `Test N for '<modul>'` | metryka `genericTestNames` |
| SBST jest tani i deterministyczny | 0 tokenow, 0 USD, odtwarzalny z `--random-seed`; 100% galezi i 95,74% mutation score na `pricing.ts` w 90 s | `demo/02-sbst-only` |

## Tezy o hybrydzie

| Teza z artykulu | Dowod | Gdzie |
|---|---|---|
| ziarna semantyczne odblokowuja przeszukiwanie | **najczystszy wynik w repo**: to samo ziarno, ten sam budzet, jedyna zmienna to ziarna. `invoiceId` z **3/8 na 8/8 galezi** i z 10/23 na 23/23 instrukcji; srednia galezi 72,92% -> 89,58% | `demo/03-hybrid`, punkt 1 |
| dane z przeszukiwania + oracle z wymagan | `awardPoints(447, 274)`: wartosc, ktorej nie wymysli czlowiek, i oczekiwanie `45`, ktorego nie zna algorytm | `demo/03-hybrid`, punkt 2 |
| ekstrakcja intencji przed pisaniem testow | krok 1 sam znalazl 4 rozbieznosci, w tym dwie niezasiane, i postawil 5 pytan do wlasciciela specyfikacji zamiast zgadywac | `intent.json` |
| walidacja tautologiczna | mechanizm Fails Without / Passes With dla kazdego branchu, per test | `scripts/metrics.ts`, `checkOracle` |
| hybryda > kazde z osobna | **nie w tym repozytorium.** Hybryda wygrywa na pokryciu bramki formatu i na czytelnosci wobec SBST, ale LLM ze specyfikacja ma lepsze pokrycie ogolne i wykryl wiecej defektow. Hybryda jest tez najdrozsza (6,48 USD) | `results/COMPARISON.md` |

## Czego to repozytorium NIE dowodzi

1. **Nie jest benchmarkiem.** Cztery moduly wobec 486 w CodaMosa. Scenariusze
   sa dobrane, by *pokazac mechanizmy*, nie zmierzyc przewage w ogolnosci.
2. **Nie pokazuje przewagi hybrydy nad LLM-em.** Na tych czterech modulach LLM
   ze specyfikacja wygrywa na wiekszosci metryk i jest piec razy tanszy.
   Hybryda wygrywa dokladnie tam, gdzie przewiduje artykul - na bramkach
   wartosci, ktorych model nie zgadnie sam z kodu - i przegrywa na koszcie.
3. **Defekty sa zasiane** (poza dwoma znalezionymi przypadkiem), wiec sa
   wykrywalne z zalozenia.
4. **SynTest 0.1.0 to narzedzie badawcze.** Wymagalo siedmiu obejsc opisanych
   w [SPIKE.md](SPIKE.md). Czesc slabszych wynikow SBST moze byc wynikiem
   narzedzia, nie metody.
5. **LLM jest niedeterministyczny.** Prompty, modele i effort sa zalogowane,
   ale powtorzenie da inne liczby.
6. **Rozrzut miedzy ziarnami nie jest zmierzony.** Kazdy wynik SBST pochodzi
   z jednego przebiegu (`--seed 42`). `scripts/seed-sweep.sh` istnieje, ale
   sweep 10 ziaren nie zostal jeszcze przepuszczony.

## Trzy rzeczy, ktore wyszly przypadkiem i sa najciekawsze

1. **Najwyzszy mutation score ma suite, ktory utrwalil wszystkie trzy
   defekty.** Gdyby kryterium byly metryki strukturalne, wygralby ranking.
2. **Mutation score bywa niemierzalny.** Stryker wymaga zielonego przebiegu
   poczatkowego, a suite poprawnie wykrywajacy defekt wlasnie nie przechodzi.
   Metryka zaklada, ze kod jest poprawny - czyli dokladnie to, co jest tu
   przedmiotem badania.
3. **Ziarna nie zamykaja luki sekwencyjnej i nie chodzi o dawkowanie.**
   Zawezenie puli podnioslo uzycie ziaren z 0 do 3 testow i **nie zmienilo
   pokrycia ani o jedna galaz**. Constant pool przenosi wartosci bez
   informacji, do ktorego argumentu naleza - sampler wstawil `"SKU-2"` jako
   kod kuponu. `intent.json` te wiedze mial; nie ma kanalu, ktorym da sie ja
   przekazac. Patrz [APPENDIX-dilution.md](APPENDIX-dilution.md).
