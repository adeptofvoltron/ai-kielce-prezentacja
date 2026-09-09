# Branch `demo/04-results`: zestawienie

Ten branch nie zawiera testow. Zawiera wynik zebrany ze wszystkich pozostalych
branchy i zlozony w jedna tabele.

## Jak to odtworzyc

```bash
git checkout main
git checkout -b demo/04-results

npm run collect     # bash scripts/collect-results.sh
npm run compare     # npx tsx scripts/compare.ts
```

`collect-results.sh` czyta pliki wynikowe **wprost z gita**
(`git show <branch>:results/<plik>.json`), a nie z katalogu roboczego.
Dzieki temu zestawienie zawsze odpowiada temu, co jest zacommitowane na danym
branchu, i da sie je odtworzyc z samego repozytorium, bez powtarzania
pomiarow.

## Co tu jest

| Plik | Zawartosc |
|---|---|
| [`results/COMPARISON.md`](results/COMPARISON.md) | dwie tabele: trzy podejscia oraz piec wariantow brancha LLM |
| `results/demo-02-sbst-only.json` | pomiar SBST |
| `results/demo-01-llm-only.json` | pomiar LLM (wariant kanoniczny `c`) |
| `results/demo-01-llm-{a..e}.json` | pomiary pieciu wariantow LLM |
| `results/demo-03-hybrid.json` | pomiar hybrydy |

Kazdy plik zawiera te same pola, wyprodukowane ta sama wersja
`scripts/metrics.ts`: pokrycie per modul, mutation score razem ze **stanem
kodu**, w ktorym powstal, kształt suite oraz werdykt dla kazdego z trzech
defektow, z lista nazw testow, ktore go wykryly albo utrwalily.

## Czego w tej tabeli nie ma

**Rozrzutu miedzy ziarnami przeszukiwania.** Kazdy wynik SBST i hybrydy
pochodzi z jednego przebiegu (`--random-seed 42`). Przeszukiwanie jest
stochastyczne, wiec pojedynczy przebieg jest anekdota, nie pomiarem.
`scripts/seed-sweep.sh` powtarza generacje dla 10 ziaren i liczy mediane
z rozrzutem, ale nie zostal jeszcze przepuszczony - to jedyna luka
metodologiczna, o ktorej wiemy i ktorej nie zamknelismy:

```bash
bash scripts/seed-sweep.sh --seeds "1 2 3 4 5 6 7 8 9 10" --search-time 90
npx tsx scripts/aggregate-sweep.ts
```

**Porownywalnosci mutation score miedzy kolumnami.** Wiersz "mierzone na"
istnieje dlatego, ze liczby powstaly na roznych wersjach kodu. Szczegoly
w [`results/COMPARISON.md`](results/COMPARISON.md) i w
[`docs/METODOLOGIA.md`](docs/METODOLOGIA.md).

Interpretacja wynikow: [`docs/PRESENTATION.md`](docs/PRESENTATION.md).
