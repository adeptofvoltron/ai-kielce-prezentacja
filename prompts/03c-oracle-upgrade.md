---
id: 03c
krok: "4/4 - podmiana oracle i petla naprawcza"
model: claude-sonnet-5
effort: medium
teza: "hybryda: dane wejsciowe z przeszukiwania, oczekiwania ze specyfikacji"
tests: istniejace
zabronione: "docs/METODOLOGIA.md, docs/SPIKE.md, patches/, results/, artifacts/, RUNBOOK.md, inne branche"
wejscie: "tests/*.sbst.test.ts - suite wygenerowany przez SBST z ziarnami semantycznymi"
wyjscie: "tests/*.hybrid.test.ts, FINDINGS.md"
---

W `tests/` lezy suite wygenerowany przez narzedzie oparte na przeszukiwaniu
(SBST). Narzedzie dobralo **dane wejsciowe** tak, by pokryc jak najwiecej
galezi kodu, ale **oczekiwania** wpisalo na podstawie tego, co kod aktualnie
zwraca. Nie mialo dostepu do wymagan.

Twoje zadanie: zachowac dane wejsciowe, wymienic oracle.

Zrodlem prawdy o wymaganiach jest `docs/SPEC.md` oraz `intent.json`.

Krok po kroku:

1. Zmien nazwy plikow z `<modul>.sbst.test.ts` na `<modul>.hybrid.test.ts`.
2. Dla kazdego testu **zostaw dane wejsciowe bez zmian**. To wynik
   przeszukiwania i jego wartosc polega na tym, ze dosiega galezi, ktorych
   czlowiek by nie wymyslil.
3. Dla kazdej asercji rozstrzygnij, czy oczekiwana wartosc jest zgodna
   z `docs/SPEC.md`:
   - jesli tak - zostaw ja,
   - jesli nie - **zmien asercje na wartosc wynikajaca ze specyfikacji**,
     nawet jesli test przez to nie bedzie przechodzil. Dopisz komentarz
     z sekcja `docs/SPEC.md`, z ktorej wynika.
4. Nadaj testom nazwy mowiace, co sprawdzaja. `Test 7 for 'cart'` nie jest
   nazwa. Nazwa ma opisywac regule biznesowa albo warunek brzegowy.
5. Usun z testow martwy balast: zmienne, ktore nigdzie nie sa uzyte,
   i bloki komentarzy z metadanymi przeszukiwania. Nie usuwaj natomiast
   zadnego wywolania funkcji produkcyjnej ani zadnej asercji.
6. Jesli w danych wejsciowych widzisz wywolanie z **nadmiarowymi
   argumentami** (przeszukiwanie nie zna sygnatur i dokleja losowe), usun
   nadmiarowe argumenty, zostawiajac wywolanie zgodne z sygnatura.
7. Uruchom `npx tsc --noEmit` i `npm test`. Napraw bledy techniczne.
   Dla kazdego niezdanego testu zapisz diagnoze: **blad testu** (popraw)
   albo **rozbieznosc kodu ze specyfikacja** (zostaw niezdany).
8. Przeszukiwanie dosiega czasem zachowan, o ktorych specyfikacja **milczy**.
   Jesli natrafisz na takie zachowanie i wyglada ono na defekt - na przyklad
   funkcja zwraca `NaN`, rzuca wyjatek nieprzewidziany w wymaganiach albo
   pozwala doprowadzic obiekt do stanu niespojnego - **nie zgaduj, jak
   powinno byc**. Opisz je w pliku `FINDINGS.md`: co sie dzieje, jaka
   sekwencja wywolan to wywoluje, dlaczego uwazasz to za defekt i czego
   specyfikacja nie precyzuje. Test opisujacy takie zachowanie zostaw, ale
   oznacz go komentarzem `// zachowanie nieopisane w SPEC.md - patrz
   FINDINGS.md`.

   To najwazniejszy krok tego etapu. Dane wejsciowe z przeszukiwania sa cenne
   wlasnie tym, ze dosiegaja stanow, ktorych czlowiek nie wymysli - ale bez
   kogos, kto oceni je wobec intencji, zostaja tylko zapisem tego, co kod
   robi dzisiaj.

Twarda zasada: **nie wolno oslabiac ani usuwac asercji, zeby test przeszedl.**
Asercja wynikajaca z `docs/SPEC.md` jest poprawna z definicji.

Nie zmieniaj niczego w `src/`.

Ograniczenia:

- NIE czytaj i nie otwieraj: `docs/METODOLOGIA.md`, `docs/SPIKE.md`,
  `RUNBOOK.md`, katalogow `patches/`, `results/`, `artifacts/` ani zawartosci
  innych branchy.

Na koniec podaj trzy tabele:

1. asercje zmienione: plik, test, stara wartosc, nowa wartosc, sekcja `SPEC.md`
2. testy niezdane: test, diagnoza, sekcja `SPEC.md`
3. wpisy w `FINDINGS.md`: zachowanie, sekwencja wywolan, dlaczego defekt
