# Lista rozbieżności między kodem a specyfikacją

## Moduł: `src/loyalty.ts` - Punkty lojalnościowe

### Rozbieżność 1: Zaokrąglenie punktów

**Specyfikacja (SPEC.md, Sekcja 3):**
> Wynik dzielenia zaokraglamy **metoda bankierska** (zaokraglenie do najblizszej liczby calkowitej, a przy dokladnej polowie - do liczby parzystej).
> Przyklady zaokraglenia bankierskiego: `2,5 -> 2`, `3,5 -> 4`, `2,4 -> 2`, `2,6 -> 3`.

**Co robi kod:**
```typescript
let points = Math.floor(orderValuePLN / 10);
```

Kod zawsze zaokrągla w dół (`Math.floor()`), a nie metoda bankierską.

**Konkrety:**
- Spec wymaga: `15 PLN / 10 = 1.5` → **2 punkty** (1.5 zaokrąglone do parzystej)
- Kod zwraca: **1 punkt** (floor(1.5) = 1)

- Spec wymaga: `26 PLN / 10 = 2.6` → **3 punkty** (zaokrąglenie w górę)
- Kod zwraca: **2 punkty** (floor(2.6) = 2)

- Spec wymaga: `99 PLN / 10 = 9.9` → **10 punktów** (zaokrąglenie w górę)
- Kod zwraca: **9 punktów** (floor(9.9) = 9)

---

### Rozbieżność 2: Próg VIP dla podwojenia punktów

**Specyfikacja (SPEC.md, Sekcja 3):**
> Klient, ktorego suma dotychczasowych zakupow (`lifetimeSpendPLN`) wynosi **co najmniej 5000 zlotych**, jest klientem VIP i otrzymuje podwojona liczbe punktow.

"Co najmniej" oznacza **>= 5000 PLN**.

**Co robi kod:**
```typescript
const VIP_THRESHOLD_PLN = 5000;
if (lifetimeSpendPLN > VIP_THRESHOLD_PLN) {
    points = points * 2;
}
```

Kod sprawdza `> 5000` (ściśle większe), a nie `>= 5000` (co najmniej).

**Konkrety:**
- Spec wymaga: klient z `lifetimeSpend = 5000 PLN` jest VIP → 100 PLN order = **20 punktów** (10 * 2)
- Kod zwraca: **10 punktów** (nie uważa za VIP, bo 5000 > 5000 jest fałsz)

- Spec wymaga: klient z `lifetimeSpend = 4999.99 PLN` nie jest VIP → 100 PLN order = **10 punktów**
- Kod zwraca: **10 punktów** ✓ (poprawnie, bo 4999.99 > 5000 jest fałsz)

- Spec wymaga: klient z `lifetimeSpend = 5000.01 PLN` jest VIP → **20 punktów**
- Kod zwraca: **20 punktów** ✓ (poprawnie, bo 5000.01 > 5000 jest prawda)

---

## Moduły bez rozbieżności

✓ **`src/pricing.ts`** - `calculateShipping()` - całkowicie zgodne ze specyfikacją
- Walidacja wejścia: ✓
- Stawka bazowa: ✓
- Dodatkowa opłata wagowa: ✓
- Rabat premium: ✓
- Zaokrąglenie: ✓

✓ **`src/invoiceId.ts`** - `parseInvoiceId()` - całkowicie zgodne ze specyfikacją
- Walidacja wejścia: ✓
- Format parsowania: ✓
- Zakresy dat i numerów: ✓
- Obsługa białych znaków: ✓

✓ **`src/cart.ts`** - `Cart` - całkowicie zgodne ze specyfikacją
- Walidacja `add()`: ✓
- Dodawanie i sumowanie ilości: ✓
- Walidacja `remove()`: ✓
- Usuwanie przedmiotów: ✓
- Walidacja `applyCoupon()`: ✓
- Zastosowanie kuponów: ✓
- Obliczanie `total()`: ✓
- Zaokrąglenie rabatu: ✓

---

## Streszczenie

**Rozbieżności znalezione: 2**
- Oba w module `src/loyalty.ts`
- Oba będą powodować błędy biznesowe w obliczeniach punktów lojalnościowych
