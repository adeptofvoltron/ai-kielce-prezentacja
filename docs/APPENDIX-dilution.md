# Aneks: czy ziarna zamykaja luke sekwencyjna?

Krok 2 pipeline'u hybrydowego wygenerowal dokladnie to, czego wymagala awaria
`Cart`: zamkniety zbior identyfikatorow `SKU-1`, `SKU-2`. Awaria jest osiagalna
tylko wtedy, gdy `add` i `remove` dostana **ten sam** SKU:

```ts
cart.add("SKU-1", 100, 1);
cart.remove("SKU-1", 5);   // ilosc schodzi ponizej zera
cart.total();              // RangeError: cart quantity underflow
```

W przebiegu kanonicznym (`demo/03-hybrid`) awaria pozostala nietknieta,
a **zaden** test nie uzyl zadnego z wygenerowanych SKU. Pierwsza hipoteza
brzmiala: pula jest za duza. Sampler siega po constant pool przez
`getRandomString()` bez argumentu, czyli losuje **jednostajnie po zbiorze
roznych wartosci** (`@syntest/search-javascript/dist/lib/testcase/sampling/JavaScriptRandomSampler.js:417`),
a po filtrowaniu pula ma 151 wartosci tekstowych i 119 liczbowych.

## Eksperyment

Ten sam modul, to samo ziarno losowe, ten sam budzet. Zmienna: rozmiar puli.

```bash
# pula pelna (jak w przebiegu kanonicznym)
bash scripts/run-syntest.sh --seed 42 --search-time 90 \
  --seeds seeds/semantic-seeds.js --only-target cart

# pula zawezona do grupy CART_
bash scripts/run-syntest.sh --seed 42 --search-time 90 \
  --seeds seeds/semantic-seeds.js --seed-group CART_ --only-target cart
```

## Wynik

| | pula pelna | pula `CART_` |
|---|---|---|
| wartosci w puli | 151 tekstowych, 119 liczbowych | **42 tekstowych, 41 liczbowych** |
| pokrycie galezi `cart.js` | 11 / 16 | **11 / 16** |
| pokrycie instrukcji | 40 / 50 | **40 / 50** |
| testow uzywajacych `SKU-*` | **0** | **3** |
| testow z **powtorzonym** tym samym SKU | 0 | **0** |
| awaria underflow osiagnieta | nie | **nie** |

Zawezenie puli poskutkowalo tam, gdzie mialo: ziarna zaczely byc **uzywane**
(z zera do trzech testow). Nie poskutkowalo tam, gdzie chodzilo: **ani jeden
test nie uzyl tej samej wartosci dwa razy**, pokrycie nie drgnelo ani o jedna
galaz, awaria nadal nieosiagnieta.

## Dlaczego pula nie byla prawdziwym ograniczeniem

Najlepiej widac to na tym, **jak** zawezona pula zostala uzyta. Jedno
z trzech uzyc wyglada tak:

```ts
const code = "SKU-2";
```

`code` to parametr `applyCoupon`. Sampler wstawil identyfikator produktu jako
kod kuponu, bo constant pool jest **plaska lista wartosci bez przypisania do
parametrow**. Nie wie, ze `"SKU-2"` jest kandydatem na `sku`, a nie na `code`,
i tym bardziej nie wie, ze wartosc podana raz jako `sku` powinna wrocic pod
tym samym argumentem w nastepnym wywolaniu.

To nie jest kwestia dawkowania. Brakuje **mechanizmu wyrazania zaleznosci
miedzy argumentami roznych wywolan** - a to jest wlasnie informacja, ktora
krok 1 poprawnie wydobyl i zapisal w `intent.json`:

```json
{
  "id": "SEQ-ADD-1",
  "name": "akumulacja tego samego SKU",
  "calls": ["add", "add", "total"],
  "sharedArguments": ["sku"],
  "sharedArgumentsNote": "Oba wywolania `add` MUSZA uzyc identycznego stringa
    `sku` - inaczej testowana jest zla galaz (nowa pozycja zamiast sumowania
    ilosci).",
  "example": [
    { "call": "add", "args": ["SKU-1", 1000, 2] },
    { "call": "add", "args": ["SKU-1", 1000, 3] },
    { "call": "total", "expectedPerSpec": 5000 }
  ]
}
```

Krok 1 nie tylko **wie**, ze `sku` musi byc wspolne - potrafi to uzasadnic
i podac gotowy przyklad z oczekiwanym wynikiem wedlug specyfikacji. Constant
pool nie ma jak tej wiedzy przyjac: przez `--analysis-include` przeplywaja
same wartosci, bez informacji o tym, do ktorego parametru naleza i ktore maja
byc rowne. Punkt wstrzykniecia jest za slaby wobec informacji, ktora juz mamy
na dysku.

## Co z tego wynika dla wdrozenia

Krok "semantycznych ziaren" z artykulu dziala rewelacyjnie dla **bramek
wartosci pojedynczych**: jeden poprawny `FV/2026/09/0042` w puli przenosi
`invoiceId` z 3/8 na 8/8 galezi, bo kazda poprawna wartosc odblokowuje te sama
galaz i wystarczy trafic raz.

Dla **sprzegniecia wartosci miedzy wywolaniami** ziarna w constant poolu sa
niewystarczajace z zalozenia, nie z powodu zlego dawkowania. Zamkniecie tej
luki wymaga albo generatora sekwencji przyjmujacego szablony wywolan (czego
SynTest 0.1.0 nie ma), albo dopisania takich sekwencji jako testow przez LLM
obok wyniku przeszukiwania - czyli piatego kroku, ktorego w tym repozytorium
nie ma.

Warto to znac, zanim ktos zaplanuje wdrozenie hybrydy z zalozeniem, ze ziarna
zalatwiaja wszystkie klasy trudnych wejsc. Zalatwiaja jedna, bardzo czesta,
i to spektakularnie.
