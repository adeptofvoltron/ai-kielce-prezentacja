# Specyfikacja biznesowa: modul zamowien

> Wersja 1.4 - dokument zrodlowy dla wymagan. W razie rozbieznosci miedzy tym
> dokumentem a implementacja, obowiazuje ten dokument.

Ten plik odgrywa w repozytorium role, jaka w prawdziwym projekcie ma strona
w Confluence: opisuje **intencje**, nie aktualne zachowanie kodu.

---

## Sekcja 1: Koszt dostawy

`calculateShipping(weightKg, zone, isPremium) -> PLN`

**Walidacja wejscia**

| Warunek | Reakcja |
|---|---|
| `weightKg` nie jest liczba skonczona | `TypeError: weight must be a finite number` |
| `weightKg <= 0` | `RangeError: weight must be positive` |
| `weightKg > 100` | `RangeError: weight above carrier limit` |

**Stawka bazowa wedlug strefy**

| Strefa | Stawka |
|---|---|
| `"PL"` | 12,00 PLN |
| `"EU"` | 29,00 PLN |
| dowolna inna wartosc | 79,00 PLN |

**Doplata wagowa** (naliczana raz, do stawki bazowej)

| Waga | Doplata |
|---|---|
| powyzej 30 kg | +40,00 PLN |
| powyzej 10 kg, do 30 kg wlacznie | +15,00 PLN |
| do 10 kg wlacznie | brak |

**Rabat premium.** Klient premium (`isPremium === true`) placi 80% kwoty
wyliczonej powyzej.

**Wynik.** Kwota w zlotych, zaokraglona do dwoch miejsc po przecinku.

---

## Sekcja 2: Identyfikator faktury

`parseInvoiceId(raw) -> { year, month, seq }`

**Format.** Identyfikator ma postac `FV/RRRR/MM/NNNN`, gdzie:

- `FV` - staly prefiks,
- `RRRR` - rok, cztery cyfry,
- `MM` - miesiac, dokladnie dwie cyfry z zakresu `01`-`12`,
- `NNNN` - numer kolejny, dokladnie cztery cyfry.

Przyklad poprawnej wartosci: `FV/2026/09/0042`.

Biale znaki na poczatku i koncu sa ignorowane.

**Walidacja**

| Warunek | Reakcja |
|---|---|
| `raw` nie jest typu string | `TypeError: invoice id must be a string` |
| wartosc nie pasuje do formatu | `Error: malformed invoice id` |
| rok poza zakresem 2000-2100 | `RangeError: year out of supported range` |
| numer kolejny rowny `0000` | `RangeError: sequence number must not be zero` |

**Wynik.** Obiekt z polami `year`, `month`, `seq` jako liczby calkowite
(bez wiodacych zer).

---

## Sekcja 3: Punkty lojalnosciowe

`awardPoints(orderValuePLN, lifetimeSpendPLN) -> punkty`

**Przelicznik.** Klient otrzymuje **1 punkt za kazde 10 zlotych** wartosci
zamowienia. Wynik dzielenia zaokraglamy **metoda bankierska**
(zaokraglenie do najblizszej liczby calkowitej, a przy dokladnej polowie -
do liczby parzystej).

> Przyklady zaokraglenia bankierskiego: `2,5 -> 2`, `3,5 -> 4`, `2,4 -> 2`,
> `2,6 -> 3`.

**Mnoznik VIP.** Klient, ktorego suma dotychczasowych zakupow
(`lifetimeSpendPLN`) wynosi **co najmniej 5000 zlotych**, jest klientem VIP
i otrzymuje podwojona liczbe punktow.

**Limit.** Za jedno zamowienie mozna otrzymac maksymalnie **5000 punktow**.
Limit stosujemy po naliczeniu mnoznika VIP.

**Walidacja**

| Warunek | Reakcja |
|---|---|
| ktorakolwiek kwota nie jest liczba skonczona | `TypeError: amounts must be finite numbers` |
| ktorakolwiek kwota jest ujemna | `RangeError: amounts must not be negative` |

---

## Sekcja 4: Koszyk zakupowy

`class Cart` z metodami `add`, `remove`, `applyCoupon`, `total`.

Wszystkie ceny wyrazone sa w **groszach** i sa liczbami calkowitymi.

**`add(sku, priceGrosz, qty)`**

| Warunek | Reakcja |
|---|---|
| `priceGrosz` nie jest calkowita liczba nieujemna | `RangeError: price must be a non-negative integer of grosz` |
| `qty` nie jest calkowita liczba dodatnia | `RangeError: quantity must be a positive integer` |

Dodanie SKU, ktore jest juz w koszyku, sumuje ilosci.

**`remove(sku, qty)`** - zdejmuje z koszyka wskazana liczbe sztuk danego SKU.

| Warunek | Reakcja |
|---|---|
| `qty` nie jest calkowita liczba dodatnia | `RangeError: quantity must be a positive integer` |
| SKU nie ma w koszyku | `Error: sku not in cart` |

**`applyCoupon(code)`** - ustawia rabat procentowy dla calego koszyka.

| Kod | Rabat |
|---|---|
| `SAVE10` | 10% |
| `HALF` | 50% |

| Warunek | Reakcja |
|---|---|
| nieznany kod | `Error: unknown coupon` |
| koszyk jest pusty | `Error: cannot apply coupon to an empty cart` |

Ponowne uzycie kuponu nadpisuje poprzedni rabat (rabaty sie nie kumuluja).

**`total()`** - zwraca wartosc koszyka w groszach: suma `cena * ilosc` po
wszystkich pozycjach, nastepnie pomniejszona o rabat, zaokraglona do pelnych
groszy.
