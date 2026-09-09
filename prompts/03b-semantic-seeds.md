---
id: 03b
krok: "2/4 - ziarna semantyczne"
model: claude-opus-5
effort: high
teza: "LLM generuje brakujace formaty danych, wstrzykiwane do SBST jako seeds"
tests: nieistotne
zabronione: "docs/METODOLOGIA.md, docs/SPIKE.md, patches/, results/, artifacts/, RUNBOOK.md, inne branche"
wejscie: "intent.json"
wyjscie: "seeds/semantic-seeds.js"
---

Na podstawie `intent.json` wygeneruj plik z ziarnami semantycznymi dla
generatora testow opartego na przeszukiwaniu.

Zapisz go do `seeds/semantic-seeds.js`.

Jak ten plik zostanie uzyty: narzedzie SBST (SynTest) wydobywa z plikow
w zakresie analizy **wszystkie literaly tekstowe i liczbowe** i uzywa ich
jako kandydatow na wartosci wejsciowe w trakcie przeszukiwania (mechanizm
constant pool). Plik nie jest uruchamiany ani importowany - liczy sie
wylacznie to, jakie literaly w nim wystepuja.

Z tego wynikaja twarde wymagania:

- **czysty JavaScript**, nie TypeScript: bez adnotacji typow, bez `import`,
  bez `export`. Parser narzedzia obsluguje tylko skladnie JS.
- kazda wartosc musi wystepowac jako **literal tekstowy lub liczbowy**
  wpisany wprost. Wartosc zlozona z fragmentow (`"FV/" + rok`), szablon
  (backticki) albo wyrazenie regularne **nie zostana wydobyte** - narzedzie
  pomija literaly regex i szablonowe.
- nie generuj wartosci losowych ani programowo - wypisz je jawnie.

Co ma sie w nim znalezc:

1. wartosci poprawne dla kazdego formatu tekstowego z `intent.json`
   (np. pelne, poprawne identyfikatory faktur - takie, ktore przechodza
   walidacje)
2. wartosci lezace **dokladnie na** granicach z `intent.json` oraz po obu
   ich stronach
3. wartosci naruszajace format w sposob nieoczywisty (dobra dlugosc, zly
   prefiks; dobry prefiks, zly zakres miesiaca itd.)
4. dla sekwencji stanowych z `intent.json`: **maly, zamkniety zbior**
   identyfikatorow (2-3 wartosci). Chodzi o to, by przeszukiwanie mialo
   szanse uzyc **tego samego** identyfikatora w dwoch roznych wywolaniach -
   przy losowaniu stringow to sie nie zdarza, a bez tego czesc sekwencji
   biznesowych jest nieosiagalna.
5. wszystkie stale tekstowe wystepujace w regulach biznesowych (np. kody
   kuponow, nazwy strefy)

Dodaj na gorze pliku komentarz wyjasniajacy, czym jest ten plik i dlaczego
nie jest testem.

Nie zmieniaj niczego w `src/`, `tests/` ani w `.syntest.json`.

Ograniczenia:

- NIE czytaj i nie otwieraj: `docs/METODOLOGIA.md`, `docs/SPIKE.md`,
  `RUNBOOK.md`, katalogow `patches/`, `results/`, `artifacts/` ani zawartosci
  innych branchy.
