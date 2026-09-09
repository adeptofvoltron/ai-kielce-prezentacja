---
id: 01e
variant: "e - petla naprawcza na wyniku wariantu d"
model: claude-sonnet-5
effort: medium
teza: "petla naprawcza: automatyczne przechwycenie bledow i poprawa, bez oslabiania asercji"
tests: istniejace
zabronione: "docs/METODOLOGIA.md, docs/SPIKE.md, patches/, results/, artifacts/, RUNBOOK.md, inne branche"
wejscie: "suite wygenerowany promptem 01d, lezacy w tests/"
uwaga: "tresc zadania identyczna jak w 01c - zmienne jest tylko wejscie"
---

W katalogu `tests/` lezy suite testow wygenerowany w poprzednim kroku na
podstawie `docs/SPEC.md`. Doprowadz go do stanu uruchamialnego.

Petla, ktora masz wykonac:

1. `npx tsc --noEmit` - napraw wszystkie bledy typow i skladni
2. `npm test` - zobacz, ktore testy nie przechodza
3. dla **kazdego** niezdanego testu rozstrzygnij i zapisz jedna z dwoch
   diagnoz:
   - **blad testu** - zla asercja, zle dane wejsciowe, zle uzycie API.
     Popraw test.
   - **rozbieznosc kodu ze specyfikacja** - test poprawnie sprawdza regule
     z `docs/SPEC.md`, a kod realizuje inna. **Zostaw taki test niezdany.**
4. powtarzaj, dopoki jedyne niezdane testy to potwierdzone rozbieznosci

Twarda zasada: **nie wolno oslabiac ani usuwac asercji, zeby test przeszedl.**
Jesli asercja wynika z `docs/SPEC.md`, jest poprawna z definicji - niezdany
test jest wtedy wynikiem, nie problemem.

Nie zmieniaj niczego w `src/`.

Ograniczenia:

- NIE czytaj i nie otwieraj: `docs/METODOLOGIA.md`, `docs/SPIKE.md`,
  `RUNBOOK.md`, katalogow `patches/`, `results/`, `artifacts/` ani zawartosci
  innych branchy.

Na koniec podaj tabele: test | diagnoza (blad testu / rozbieznosc ze spec) |
sekcja `docs/SPEC.md`, z ktorej wynika asercja.
