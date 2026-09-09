/*
 * seeds/semantic-seeds.js - ziarna semantyczne dla generatora SBST (SynTest).
 *
 * CZYM JEST TEN PLIK
 * Zbiorem literalow wydobytym z intent.json. SynTest, majac wlaczone
 * `constant-pool`, skanuje pliki w zakresie analizy i zbiera z nich WSZYSTKIE
 * literaly tekstowe i liczbowe, a potem podstawia je jako wartosci wejsciowe
 * w trakcie przeszukiwania. Ten plik istnieje wylacznie po to, zeby dostarczyc
 * pool takich wartosci: liczy sie tylko to, jakie literaly w nim wystepuja,
 * a nie to, jak sa pogrupowane ani jak nazwano zmienne.
 *
 * CZYM TEN PLIK NIE JEST
 * Nie jest testem. Nie zawiera zadnej asercji, nie importuje kodu z src/,
 * nie jest uruchamiany ani importowany przez cokolwiek. Nazwy stalych
 * i komentarze sa tu dla czlowieka - narzedzie ich nie czyta. Wartosci
 * `expected*` sa spisane jako literaly liczbowe celowo (progi i kwoty
 * wynikowe tez sa dobrymi kandydatami na wejscia), ale NIE sa oracle -
 * oracle jest w tests/ i w intent.json.
 *
 * OGRANICZENIA SKLADNI - dlaczego plik wyglada tak, a nie inaczej
 * - czysty JavaScript, bez adnotacji typow, bez `import`/`export`: parser
 *   narzedzia obsluguje tylko skladnie JS.
 * - kazda wartosc wpisana wprost. Konkatenacja ("FV/" + rok), backticki
 *   i wyrazenia regularne NIE sa wydobywane, wiec nie wystepuja tu wcale.
 *   Wzorce z intent.json podano tylko w komentarzach - jako string trafily by
 *   do poola jako bezuzyteczny kandydat na wejscie.
 * - brak generowania programowego i losowego: zadnych petli, `Array.from`
 *   ani `Math.random`. Wartosc, ktorej nie ma tu wpisanej wprost,
 *   nie istnieje dla narzedzia.
 *
 * CZEGO TU NIE MA - I NIE DA SIE DODAC
 * `NaN`, `Infinity` i `-Infinity` nie sa literalami, tylko identyfikatorami,
 * wiec constant pool ich nie zbierze. Musi je dostarczyc wlasne probkowanie
 * typow narzedzia. Zamiennikami literalowymi objete sa tylko te wartosci
 * specjalne, ktore da sie zapisac: 9007199254740991 (MAX_SAFE_INTEGER)
 * i 5e-324 (MIN_VALUE). Wartosci ujemne zapisano naturalnie (-1, -0.01),
 * ale w JS to operator jednoargumentowy nad literalem - parser moze wydobyc
 * sama wartosc dodatnia. Ujemne wejscia sa wiec ziarnem slabszym niz dodatnie.
 *
 * Zrodlo: intent.json (specSource docs/SPEC.md 1.4). Przy zmianie intent.json
 * ten plik nalezy wygenerowac ponownie.
 */

/* ------------------------------------------------------------------ *
 * 1. parseInvoiceId(raw)  -  src/invoiceId.ts
 *    Format FV/RRRR/MM/NNNN. Dopasowanie wzorca to warunek konieczny,
 *    nie wystarczajacy: potem jeszcze rok 2000-2100 (INV-R3) i seq != 0000
 *    (INV-R4). Kolejnosc walidacji: typ -> format -> rok -> numer.
 * ------------------------------------------------------------------ */

/* (1) W PELNI POPRAWNE identyfikatory - przechodza CALA walidacje.
 *     Format + rok w zakresie + numer niezerowy. */
const INVOICE_ID_VALID = [
  "FV/2026/09/0042",
  "FV/2026/01/0001",
  "FV/2026/12/9999",
  "FV/2026/09/0001",
  "FV/2026/09/9999",
  "FV/2026/08/0008",
  "FV/2026/10/0100",
  "FV/2000/01/0001",
  "FV/2100/12/9999",
  "FV/2050/10/0100",
  "FV/2099/11/1234",
];

/* Poprawne z bialymi znakami na brzegach - parseInvoiceId trimuje wejscie
 * (INV-R2). To jedyny parametr tekstowy w calym SUT, ktory trimuje. */
const INVOICE_ID_VALID_TRIMMABLE = [
  "  FV/2026/09/0042  ",
  " FV/2026/09/0042",
  "FV/2026/09/0042 ",
  "\tFV/2026/09/0042\n",
  "\tFV/2099/11/1234\n",
  "\n\nFV/2000/01/0001\t",
];

/* (2) DOKLADNIE NA GRANICY i po obu jej stronach.
 *     Rok: zakres [2000, 2100] domkniety z obu stron. */
const INVOICE_ID_YEAR_BOUNDARY = [
  "FV/1999/12/0001",
  "FV/2000/01/0001",
  "FV/2001/01/0001",
  "FV/2099/12/9999",
  "FV/2100/12/9999",
  "FV/2101/01/0001",
  "FV/0000/01/0001",
  "FV/9999/12/9999",
];

/* Miesiac: zakres [01, 12], zapis dokladnie dwucyfrowy. */
const INVOICE_ID_MONTH_BOUNDARY = [
  "FV/2026/00/0001",
  "FV/2026/01/0001",
  "FV/2026/11/0001",
  "FV/2026/12/0001",
  "FV/2026/13/0001",
  "FV/2026/99/0001",
];

/* Numer kolejny: 0000 odrzucone (INV-R4), 0001 to pierwsza dopuszczalna. */
const INVOICE_ID_SEQ_BOUNDARY = [
  "FV/2026/09/0000",
  "FV/2026/09/0001",
  "FV/2026/09/0002",
  "FV/2026/09/9998",
  "FV/2026/09/9999",
  "FV/2000/01/0000",
];

/* (3) NARUSZENIA FORMATU NIEOCZYWISTE - takie, ktorych losowy string
 *     nie trafi, a ktore lamia dokladnie jeden warunek wzorca. */

/* Dobra dlugosc i dobry uklad separatorow, zly prefiks. */
const INVOICE_ID_BAD_PREFIX = [
  "fv/2026/09/0042",
  "Fv/2026/09/0042",
  "fV/2026/09/0042",
  "FX/2026/09/0042",
  "VF/2026/09/0042",
  "F/2026/09/0042",
  "FVV/2026/09/0042",
  "/2026/09/0042",
];

/* Dobry prefiks, zla liczba cyfr w segmencie. */
const INVOICE_ID_BAD_DIGIT_COUNT = [
  "FV/26/09/0042",
  "FV/202/09/0042",
  "FV/20266/09/0042",
  "FV/2026/9/0042",
  "FV/2026/009/0042",
  "FV/2026/09/042",
  "FV/2026/09/00042",
  "FV/2026/09/42",
];

/* Dobry prefiks i dobre liczby cyfr, zle separatory lub arnosc. */
const INVOICE_ID_BAD_SEPARATORS = [
  "FV-2026-09-0042",
  "FV.2026.09.0042",
  "FV_2026_09_0042",
  "FV\\2026\\09\\0042",
  "FV/2026/09/0042/1",
  "FV/2026/09/0042/",
  "FV/2026//09/0042",
  "FV/2026/0042",
  "FV2026090042",
];

/* Biale znaki WEWNATRZ - trim ich nie usuwa, wiec wzorzec nie pasuje. */
const INVOICE_ID_INNER_WHITESPACE = [
  "FV /2026/09/0042",
  "FV/ 2026/09/0042",
  "FV/2026 /09/0042",
  "FV/2026/09/00 42",
  "FV/2026/09 /0042",
  "FV\t2026/09/0042",
];

/* Znaki niecyfrowe w segmentach liczbowych. */
const INVOICE_ID_NON_DIGIT = [
  "FV/2026/09/00A2",
  "FV/2026/09/004a",
  "FV/20X6/09/0042",
  "FV/2026/0O/0042",
  "FV/2026/09/-042",
  "FV/2026/09/+042",
  "FV/2026/09/0x42",
];

/* Cyfry arabsko-indyjskie: `\d` bez flagi `u` jest ASCII-only,
 * wiec te wejscia daja Error: malformed invoice id, nie poprawny wynik. */
const INVOICE_ID_NON_ASCII_DIGITS = [
  "FV/٢٠٢٦/٠٩/٠٠٤٢",
  "FV/２０２６/０９/００４２",
];

/* Puste i zdegenerowane wejscia. */
const INVOICE_ID_EMPTY = [
  "",
  " ",
  "   ",
  "\t",
  "\n",
  "FV",
  "FV/",
];

/* Wiele bledow naraz - sprawdzaja KOLEJNOSC walidacji, nie sam fakt bledu.
 * "FV/1999/13/0000" -> malformed (format przed rokiem).
 * "FV/1999/12/0000" -> year out of range (rok przed numerem). */
const INVOICE_ID_MULTI_ERROR = [
  "FV/1999/13/0000",
  "FV/1999/12/0000",
  "FV/2101/13/0000",
  "fv/1999/13/0000",
  "  FV/1999/12/0000  ",
];

/* Segmenty jako liczby - wartosci zwracane w wyniku (year, month, seq)
 * oraz granice ich zakresow. Parsowanie dziesietne, nie oktalne (INV-R5). */
const INVOICE_ID_RESULT_NUMBERS = [
  1999, 2000, 2001, 2026, 2050, 2099, 2100, 2101,
  0, 1, 8, 9, 10, 11, 12, 13,
  42, 100, 1234, 9998, 9999,
];

/* Komunikaty bledow (INV-R1..R4) - literaly tekstowe, na wypadek
 * gdyby oracle dopasowywal komunikat. */
const INVOICE_ID_ERROR_MESSAGES = [
  "invoice id must be a string",
  "malformed invoice id",
  "year out of supported range",
  "sequence number must not be zero",
];

/* ------------------------------------------------------------------ *
 * 2. calculateShipping(weightKg, zone, isPremium)  -  src/pricing.ts
 *    zone NIE ma wymaganego formatu: kazdy string jest legalny, a wszystko
 *    poza "PL" i "EU" wpada w galaz domyslna 79.00. Brak trim.
 *    Waga: (0, 100], progi ostre (>) na 10 i 30.
 * ------------------------------------------------------------------ */

/* (5) Stale tekstowe z regul biznesowych: nazwy strefy. */
const SHIPPING_ZONE_SIGNIFICANT = [
  "PL",
  "EU",
  "WORLD",
];

/* (3) Naruszenia nieoczywiste dla strefy: dobra litera, zla wielkosc lub
 *     zbedna spacja. Kazde z nich wpada w galaz 79.00, nie w swoja stawke. */
const SHIPPING_ZONE_NEAR_MISS = [
  "pl",
  "eu",
  "Pl",
  "pL",
  "Eu",
  "eU",
  "PL ",
  " PL",
  " PL ",
  "EU ",
  " EU",
  "P L",
  "PLN",
  "EUR",
  "US",
  "DE",
  "",
  "🇵🇱",
];

/* (2) Waga - DOKLADNIE na progach 10 i 30 oraz po obu stronach.
 *     Progi sa ostre (>), wiec wartosc rowna progowi nalezy do nizszego
 *     przedzialu: 10 -> brak doplaty, 30 -> +15. */
const SHIPPING_WEIGHT_THRESHOLD = [
  9.99,
  10,
  10.0001,
  10.5,
  29.99,
  30,
  30.0001,
  31,
];

/* Waga - granice domeny (0, 100]. 0 odrzucone, 100 dopuszczalne. */
const SHIPPING_WEIGHT_DOMAIN_BOUNDARY = [
  0,
  0.01,
  99.99,
  100,
  100.0001,
  101,
  1000,
  1000000,
  5e-324,
];

/* Waga - wartosci odrzucane (RangeError: weight must be positive).
 * -0 przechodzi warunek `<= 0`, wiec tez jest odrzucane. */
const SHIPPING_WEIGHT_NON_POSITIVE = [
  0,
  -0,
  -0.01,
  -1,
  -100,
];

/* Waga - reprezentanci klas rownowaznosci (lekka / srednia / ciezka). */
const SHIPPING_WEIGHT_TYPICAL = [
  1,
  2,
  5,
  15,
  20,
  25,
  50,
  75,
];

/* (5) Stale liczbowe z regul SHIP-R1..R4: stawki bazowe, doplaty wagowe,
 *     mnoznik premium, progi. */
const SHIPPING_RULE_CONSTANTS = [
  12,
  29,
  79,
  15,
  40,
  0.8,
  0.2,
  10,
  30,
  100,
  2,
];

/* Kwoty wynikowe - min i max obserwowalne oraz punkty z granic regul.
 * Wchodza do poola takze jako kandydaci na wejscie `weightKg`. */
const SHIPPING_EXPECTED_AMOUNTS = [
  9.6,
  12,
  21.6,
  23.2,
  27,
  29,
  35.2,
  41.6,
  52,
  55.2,
  69,
  79,
  95.2,
  119,
];

const SHIPPING_ERROR_MESSAGES = [
  "weight must be a finite number",
  "weight must be positive",
  "weight above carrier limit",
];

/* ------------------------------------------------------------------ *
 * 3. awardPoints(orderValuePLN, lifetimeSpendPLN)  -  src/loyalty.ts
 *    1 punkt / 10 PLN, zaokraglenie BANKIERSKIE (half-to-even).
 *    VIP: lifetimeSpendPLN >= 5000 podwaja punkty. Limit 5000 pkt PO VIP.
 * ------------------------------------------------------------------ */

/* (2) Kwoty dajace DOKLADNA POLOWE punktu - jedyne, ktore rozrozniaja
 *     zaokraglenie bankierskie od half-up i od Math.floor.
 *     5 -> 0 (0 parzyste), 15 -> 2, 25 -> 2, 35 -> 4, 45 -> 4, 55 -> 6. */
const LOYALTY_ORDER_ROUNDING_TIES = [
  5,
  15,
  25,
  35,
  45,
  55,
  65,
  75,
  105,
  115,
];

/* Kwoty niebedace wielokrotnoscia 10 z reszta >= 5 - w tych punktach
 * Math.floor rozjezdza sie z zaokragleniem wymaganym przez SPEC.
 * Losowa wielokrotnosc 10 nigdy tego nie pokaze. */
const LOYALTY_ORDER_NON_MULTIPLES = [
  4.9,
  5.01,
  9.99,
  14.9,
  16,
  24,
  26,
  34.99,
  36,
  99.99,
  1234.56,
];

/* Kwoty bedace dokladna wielokrotnoscia 10 - klasa kontrolna,
 * w ktorej wszystkie reguly zaokraglania daja ten sam wynik. */
const LOYALTY_ORDER_MULTIPLES = [
  0,
  10,
  20,
  30,
  100,
  1000,
];

/* (2) Limit 5000 punktow - DOKLADNIE na limicie i po obu stronach,
 *     wyrazony w kwocie zamowienia. 50000 PLN -> 5000 pkt (nie obcinane,
 *     warunek to `> 5000`), 50010 PLN -> 5001 pkt -> obciete. */
const LOYALTY_ORDER_CAP_BOUNDARY = [
  49980,
  49990,
  50000,
  50010,
  50020,
  1000000000,
  9007199254740991,
];

/* Kwoty, przy ktorych limit dziala DOPIERO po mnozniku VIP - rozrozniaja
 * kolejnosc "limit po VIP" od "limit przed VIP".
 * 25000 -> 2500*2 = 5000; 25010 -> 2501*2 = 5002 -> obciete;
 * 30000 -> 3000 pkt pod limitem, 6000 po VIP -> obciete. */
const LOYALTY_ORDER_CAP_AFTER_VIP = [
  24990,
  25000,
  25010,
  30000,
  40000,
];

/* Kwoty odrzucane (RangeError: amounts must not be negative).
 * -0 przechodzi walidacje (`-0 < 0` jest falszem) i daje 0 punktow. */
const LOYALTY_ORDER_NEGATIVE = [
  -0,
  -0.01,
  -1,
  -5000,
];

/* (2) Prog VIP - DOKLADNIE 5000 oraz po obu stronach. Wartosc dokladnie
 *     rowna progowi jest jedynym wejsciem rozrozniajacym `>=` od `>`.
 *     Losowanie liczb zmiennoprzecinkowych nie trafi w nia nigdy. */
const LOYALTY_LIFETIME_VIP_BOUNDARY = [
  4999,
  4999.99,
  5000,
  5000.01,
  5001,
];

const LOYALTY_LIFETIME_TYPICAL = [
  0,
  -0,
  1,
  100,
  2500,
  6000,
  10000,
  1000000000,
];

const LOYALTY_LIFETIME_NEGATIVE = [
  -0.01,
  -1,
];

/* (5) Stale z regul LOY-R1..R3: przelicznik, prog VIP, mnoznik, limit. */
const LOYALTY_RULE_CONSTANTS = [
  10,
  5000,
  2,
];

/* Liczby punktow z granic regul - takze kandydaci na wejscia liczbowe. */
const LOYALTY_EXPECTED_POINTS = [
  0,
  1,
  2,
  3,
  4,
  6,
  10,
  12,
  20,
  4000,
  4999,
  5000,
  5001,
  5002,
  6000,
];

const LOYALTY_ERROR_MESSAGES = [
  "amounts must be finite numbers",
  "amounts must not be negative",
];

/* ------------------------------------------------------------------ *
 * 4. Cart.add / remove / applyCoupon / total  -  src/cart.ts
 *    Koszyk operuje na GROSZACH (liczby calkowite), nie na PLN.
 * ------------------------------------------------------------------ */

/* (4) SEKWENCJE STANOWE - maly, ZAMKNIETY zbior identyfikatorow SKU.
 *
 * To najwazniejszy fragment tego pliku. `sku` jest jedynym argumentem
 * wspolnym miedzy wywolaniami: `remove` trafia w pozycje tylko wtedy, gdy
 * uzyje DOKLADNIE tego samego stringa co poprzedzajacy `add` (porownanie
 * ===, bez trim, case-sensitive). Przy losowaniu stringow prawdopodobienstwo
 * trafienia dwa razy w te sama wartosc jest praktycznie zerowe, wiec cala
 * rodzina sekwencji biznesowych jest wtedy NIEOSIAGALNA:
 *   - SEQ-ADD-1  sumowanie ilosci przy powtornym add tego samego SKU
 *   - SEQ-REM-1  czesciowe zdjecie z pozycji
 *   - SEQ-REM-2  oproznienie pozycji do zera
 *   - SEQ-REM-3  underflow (remove wieksze niz stan)
 *   - SEQ-TOTAL-2 pelny przebieg add -> add -> remove -> applyCoupon -> total
 *
 * Zbior jest celowo DWUELEMENTOWY. Kazda dodana wartosc obniza szanse,
 * ze przeszukiwanie wylosuje ten sam identyfikator dwa razy - a to, nie
 * roznorodnosc, jest tu celem. Dwa elementy wystarczaja, bo SEQ-REM-4
 * wymaga drugiej pozycji o INNYM sku. */
const CART_SKU_SHARED = [
  "SKU-1",
  "SKU-2",
];

/* (3) SKU lamiace tozsamosc w sposob nieoczywisty: ta sama tresc, inna
 *     wielkosc liter albo spacja konczaca. Brak trim i porownanie ===
 *     powoduja, ze `remove("sku-1")` po `add("SKU-1")` konczy sie
 *     Error: sku not in cart, a `add("SKU-1 ")` tworzy DRUGA pozycje.
 *     Lista jest krotka celowo - patrz uwaga przy CART_SKU_SHARED. */
const CART_SKU_NEAR_MISS = [
  "sku-1",
  "SKU-1 ",
  "",
];

/* (5) Stale tekstowe z reguly CART-COUPON-R1: kody kuponow.
 *     Domena to ZAMKNIETA ENUMERACJA dwuelementowa, nie wzorzec -
 *     SPEC (Sekcja 4, tabela kuponow) nie definiuje zadnego trzeciego kodu. */
const CART_COUPON_VALID = [
  "SAVE10",
  "HALF",
];

/* (3) Kody nieoczywiscie niepoprawne: zla wielkosc liter, spacja, prefiks
 *     poprawnego kodu, poprawny kod z dopiskiem, dwa kody naraz.
 *     applyCoupon NIE trimuje - inaczej niz parseInvoiceId. */
const CART_COUPON_NEAR_MISS = [
  "save10",
  "Save10",
  "SAVE10 ",
  " SAVE10",
  "SAVE 10",
  "SAVE1",
  "SAVE100",
  "SAVE20",
  "SAVE0",
  "half",
  "Half",
  "HALF ",
  " HALF",
  "HAL",
  "HALFF",
  "HALF,SAVE10",
  "SAVE10,HALF",
  "NIE-ISTNIEJE",
  "",
];

/* Nazwy odziedziczone z Object.prototype. Wg SPEC to zwykle nieznane
 * kupony (Error: unknown coupon); `COUPONS[code]` je przepuszcza, po czym
 * total() zwraca NaN. Zadne losowanie stringow tych wartosci nie trafi -
 * musza byc wpisane wprost. */
const CART_COUPON_PROTOTYPE_KEYS = [
  "constructor",
  "__proto__",
  "toString",
  "valueOf",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "prototype",
  "length",
  "name",
];

/* (2) priceGrosz - granice domeny: calkowita nieujemna, 0 dopuszczalne
 *     (pozycja gratisowa). -0 przechodzi walidacje. */
const CART_PRICE_BOUNDARY = [
  -1,
  -0,
  0,
  1,
  2,
  9007199254740991,
];

/* priceGrosz - wartosci nie-calkowite, odrzucane
 * (RangeError: price must be a non-negative integer of grosz). */
const CART_PRICE_NON_INTEGER = [
  0.5,
  0.99,
  1.01,
  1.5,
  99.999,
  -0.01,
];

/* priceGrosz - ceny dobrane tak, zeby rabat dal DOKLADNA POLOWE grosza.
 * Nieparzyste ceny z kuponem HALF (50%) oraz ceny przystajace do 5 mod 10
 * z kuponem SAVE10 (10%) trafiaja w granice zaokraglenia, ktorej SPEC nie
 * rozstrzyga (DIV-CART-7): 1 gr -> 0.5, 3 gr -> 1.5, 5 gr -> 2.5. */
const CART_PRICE_HALF_GROSZ = [
  1,
  3,
  5,
  7,
  9,
  15,
  25,
  1995,
  1999,
];

const CART_PRICE_TYPICAL = [
  0,
  1,
  99,
  100,
  500,
  1000,
  1999,
  5000,
  12345,
];

/* (2) qty w add - granice domeny: calkowita DODATNIA, 0 odrzucone. */
const CART_QTY_BOUNDARY = [
  -10,
  -1,
  -0,
  0,
  1,
  2,
  9007199254740991,
];

/* qty - wartosci nie-calkowite, odrzucane
 * (RangeError: quantity must be a positive integer). */
const CART_QTY_NON_INTEGER = [
  0.5,
  0.9,
  1.5,
  2.0001,
  -0.5,
];

const CART_QTY_TYPICAL = [
  1,
  2,
  3,
  4,
  5,
  10,
  100,
  1000000,
];

/* (4) Ilosci do sekwencji add/remove przy WSPOLNYM sku. Gorna granica
 *     `remove.qty` jest ZALEZNA OD STANU (suma qty wczesniejszych add),
 *     nie statyczna - te male liczby pozwalaja przeszukiwaniu trafic
 *     w kazdy z trzech przypadkow bez arytmetyki:
 *       remove.qty <  stan  -> zdjecie czesciowe (SEQ-REM-1)
 *       remove.qty == stan  -> oproznienie do zera (SEQ-REM-2)
 *       remove.qty >  stan  -> underflow (SEQ-REM-3, DIV-CART-1)
 *     Przy add(qty=1..5) kazda z wartosci ponizej realizuje ktorys z nich. */
const CART_SEQUENCE_QTY = [
  1,
  2,
  3,
  4,
  5,
  6,
];

/* (2) Rabaty procentowe osiagalne wg SPEC oraz granice 0 / 100. */
const CART_DISCOUNT_PCT = [
  0,
  10,
  50,
  100,
  90,
];

/* Liczba pozycji w koszyku - granice stanu (pusty / jedna / wiele). */
const CART_LINE_COUNT_BOUNDARY = [
  0,
  1,
  2,
  10,
];

/* Kwoty wynikowe total() z granic regul CART-TOTAL-R1..R4 i sekwencji.
 * Wchodza do poola takze jako kandydaci na `priceGrosz`. */
const CART_EXPECTED_TOTALS = [
  0,
  1,
  2,
  3,
  1000,
  1796,
  1799,
  1800,
  2000,
  2700,
  3000,
  4500,
  5000,
  6997,
  9000,
];

const CART_ERROR_MESSAGES = [
  "price must be a non-negative integer of grosz",
  "quantity must be a positive integer",
  "sku not in cart",
  "unknown coupon",
  "cannot apply coupon to an empty cart",
  "cart quantity underflow",
];
