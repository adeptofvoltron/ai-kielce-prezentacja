---
id: 03a
krok: "1/4 - ekstrakcja intencji"
model: claude-opus-5
effort: high
teza: "agent analizuje wymog biznesowy przed pisaniem testow"
tests: nieistotne
zabronione: "docs/METODOLOGIA.md, docs/SPIKE.md, patches/, results/, artifacts/, RUNBOOK.md, inne branche"
wyjscie: "intent.json"
---

Przeczytaj specyfikacje biznesowa `docs/SPEC.md` oraz kod produkcyjny
w `src/` i zbuduj z nich strukturalny opis intencji.

Zapisz go do pliku `intent.json`. Dla kazdej funkcji publicznej podaj:

- `module` i `function` - gdzie to jest
- `rules` - lista regul biznesowych, kazda z: trescia reguly, sekcja
  `docs/SPEC.md`, z ktorej wynika, oraz `boundaries` - wartosciami
  granicznymi, przy ktorych reguła zmienia zachowanie
- `inputDomains` - dla kazdego parametru: typ, dozwolony zakres i - jesli
  parametr ma wymagany **format tekstowy** - ten format opisany wzorcem
  oraz co najmniej trzy przykłady wartosci poprawnych i trzy niepoprawnych
- `errors` - jakie wyjatki i przy jakich warunkach
- `statefulSequences` - jesli funkcja jest metoda klasy: jakie sekwencje
  wywolan maja sens biznesowy i ktore argumenty musza byc **wspolne** miedzy
  wywolaniami w takiej sekwencji (np. ten sam identyfikator)

Ten plik posluzy dalej jako wejscie do generatora danych testowych, wiec
wartosci graniczne i formaty musza byc konkretne - nie "poprawny numer
faktury", a dokladny string.

Nie pisz jeszcze zadnych testow. Nie zmieniaj niczego w `src/`.

Ograniczenia:

- NIE czytaj i nie otwieraj: `docs/METODOLOGIA.md`, `docs/SPIKE.md`,
  `RUNBOOK.md`, katalogow `patches/`, `results/`, `artifacts/` ani zawartosci
  innych branchy.
