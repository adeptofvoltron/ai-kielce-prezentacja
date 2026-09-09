---
id: 01a
variant: "a - tylko kod"
model: claude-opus-5
effort: high
teza: "agent kodujacy wyprowadza oczekiwania z zachowania kodu"
tests: puste
zabronione: "docs/, patches/, results/, artifacts/, RUNBOOK.md, inne branche"
uwaga: "pierwszy przebieg uniewazniony - model sam z siebie przeczytal docs/SPEC.md; zakaz zostal rozszerzony na caly katalog docs/"
---

Napisz testy jednostkowe dla kodu produkcyjnego w tym repozytorium.

Kod do przetestowania:

- `src/pricing.ts`
- `src/invoiceId.ts`
- `src/loyalty.ts`
- `src/cart.ts`

Wymagania techniczne:

- runner: vitest (juz skonfigurowany, patrz `vitest.config.ts`)
- testy w TypeScript, jeden plik na modul: `tests/<modul>.llm.test.ts`
- celuj w wysokie pokrycie galezi
- nie zmieniaj niczego w `src/`

Ograniczenia:

- NIE czytaj i nie otwieraj **zadnego** pliku z katalogu `docs/`, ani
  `RUNBOOK.md`, ani katalogow `patches/`, `results/`, `artifacts/`, ani
  zawartosci innych branchy. Twoim jedynym zrodlem wiedzy o zachowaniu
  systemu jest kod w `src/`.

Na koniec uruchom `npx tsc --noEmit` i `npm test`. Napraw wylacznie bledy
techniczne (importy, typy, skladnia).
