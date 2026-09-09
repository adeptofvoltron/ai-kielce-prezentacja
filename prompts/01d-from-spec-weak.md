---
id: 01d
variant: "d - jak b, ale slabszy model i nizszy effort"
model: claude-haiku-4-5-20251001
effort: low
teza: "wartosc petli naprawczej zalezy od jakosci generacji"
tests: puste
zabronione: "docs/METODOLOGIA.md, docs/SPIKE.md, patches/, results/, artifacts/, RUNBOOK.md, inne branche"
uwaga: "tresc zadania jest identyczna jak w 01b - zmienna jest tylko model i effort"
---

Napisz testy jednostkowe weryfikujace, ze kod produkcyjny w tym repozytorium
realizuje uzgodniona regule biznesowa.

Zrodlem prawdy o wymaganiach jest `docs/SPEC.md`. Kod produkcyjny to
`src/pricing.ts`, `src/invoiceId.ts`, `src/loyalty.ts`, `src/cart.ts`.

Najwazniejsza zasada: **oracle wyprowadzasz ze specyfikacji, nie z kodu.**
Jesli kod robi cos innego niz mowi `docs/SPEC.md`, to test ma sprawdzac
zachowanie **zgodne ze specyfikacja** - czyli ma nie przechodzic na obecnym
kodzie. Nie dopasowuj asercji do tego, co kod aktualnie zwraca.

Wymagania techniczne:

- runner: vitest (juz skonfigurowany, patrz `vitest.config.ts`)
- testy w TypeScript, jeden plik na modul: `tests/<modul>.llm.test.ts`
- kazda asercja o regule biznesowej ma w komentarzu odwolanie do sekcji
  `docs/SPEC.md`, z ktorej wynika
- nie zmieniaj niczego w `src/`

Ograniczenia:

- NIE czytaj i nie otwieraj: `docs/METODOLOGIA.md`, `docs/SPIKE.md`,
  `RUNBOOK.md`, katalogow `patches/`, `results/`, `artifacts/` ani zawartosci
  innych branchy. Te pliki zawieraja rozwiazanie zadania pomiarowego, ktore
  jest prowadzone na tym repozytorium.

Na koniec napisz **liste rozbieznosci** miedzy kodem a specyfikacja, ktore
znalazles: plik, regula ze specyfikacji, co robi kod. Jesli nie znalazles
zadnej, napisz to wprost.
