import { describe, expect, it } from "vitest";

import { Cart } from "../src/cart";

/**
 * Oracle dla tych testow pochodzi wylacznie z docs/SPEC.md, sekcja 4
 * ("Koszyk zakupowy"). Wszystkie ceny sa w groszach.
 */
describe("Cart - docs/SPEC.md sekcja 4", () => {
  describe("add", () => {
    it("odrzuca cene, ktora nie jest calkowita liczba nieujemna", () => {
      // SPEC sekcja 4, "add": priceGrosz nie jest calkowita liczba nieujemna
      // -> RangeError: price must be a non-negative integer of grosz
      const bad: unknown[] = [-1, 1.5, NaN, Infinity, "100", null, undefined];
      for (const price of bad) {
        const cart = new Cart();
        expect(() => cart.add("SKU-1", price as number, 1)).toThrow(RangeError);
        expect(() => cart.add("SKU-1", price as number, 1)).toThrow(
          "price must be a non-negative integer of grosz",
        );
      }
    });

    it("dopuszcza cene zerowa", () => {
      // SPEC sekcja 4, "add": zero jest calkowita liczba nieujemna
      const cart = new Cart();
      cart.add("SKU-FREE", 0, 3);
      expect(cart.total()).toBe(0);
    });

    it("odrzuca ilosc, ktora nie jest calkowita liczba dodatnia", () => {
      // SPEC sekcja 4, "add": qty nie jest calkowita liczba dodatnia
      // -> RangeError: quantity must be a positive integer
      const bad: unknown[] = [0, -1, 1.5, NaN, Infinity, "2", null, undefined];
      for (const qty of bad) {
        const cart = new Cart();
        expect(() => cart.add("SKU-1", 100, qty as number)).toThrow(RangeError);
        expect(() => cart.add("SKU-1", 100, qty as number)).toThrow(
          "quantity must be a positive integer",
        );
      }
    });

    it("sumuje ilosci przy dodaniu SKU juz obecnego w koszyku", () => {
      // SPEC sekcja 4, "add": "Dodanie SKU, ktore jest juz w koszyku,
      // sumuje ilosci."
      const cart = new Cart();
      cart.add("SKU-1", 250, 2);
      cart.add("SKU-1", 250, 3);
      expect(cart.total()).toBe(1250); // 250 * 5
    });

    it("traktuje rozne SKU jako osobne pozycje", () => {
      // SPEC sekcja 4, "total": suma cena * ilosc po wszystkich pozycjach
      const cart = new Cart();
      cart.add("SKU-1", 100, 2);
      cart.add("SKU-2", 350, 1);
      expect(cart.total()).toBe(550);
    });
  });

  describe("remove", () => {
    it("zdejmuje wskazana liczbe sztuk danego SKU", () => {
      // SPEC sekcja 4, "remove": zdejmuje z koszyka wskazana liczbe sztuk
      const cart = new Cart();
      cart.add("SKU-1", 500, 3);
      cart.remove("SKU-1", 1);
      expect(cart.total()).toBe(1000); // 500 * 2
    });

    it("pozwala zdjac wszystkie sztuki danego SKU", () => {
      // SPEC sekcja 4, "remove" + "total": po zdjeciu wszystkich sztuk
      // suma cena * ilosc dla tej pozycji wynosi 0
      const cart = new Cart();
      cart.add("SKU-1", 500, 2);
      cart.remove("SKU-1", 2);
      expect(cart.total()).toBe(0);
    });

    it("odrzuca ilosc, ktora nie jest calkowita liczba dodatnia", () => {
      // SPEC sekcja 4, "remove": qty nie jest calkowita liczba dodatnia
      // -> RangeError: quantity must be a positive integer
      const bad: unknown[] = [0, -1, 1.5, NaN, Infinity, "2", null, undefined];
      for (const qty of bad) {
        const cart = new Cart();
        cart.add("SKU-1", 100, 5);
        expect(() => cart.remove("SKU-1", qty as number)).toThrow(RangeError);
        expect(() => cart.remove("SKU-1", qty as number)).toThrow(
          "quantity must be a positive integer",
        );
      }
    });

    it("odrzuca SKU, ktorego nie ma w koszyku", () => {
      // SPEC sekcja 4, "remove": SKU nie ma w koszyku -> Error: sku not in cart
      const cart = new Cart();
      cart.add("SKU-1", 100, 1);
      expect(() => cart.remove("SKU-2", 1)).toThrow("sku not in cart");
      expect(() => new Cart().remove("SKU-1", 1)).toThrow("sku not in cart");
    });
  });

  describe("applyCoupon", () => {
    it("ustawia rabat 10% dla kodu SAVE10", () => {
      // SPEC sekcja 4, "applyCoupon": SAVE10 -> 10%
      const cart = new Cart();
      cart.add("SKU-1", 1000, 1);
      cart.applyCoupon("SAVE10");
      expect(cart.total()).toBe(900);
    });

    it("ustawia rabat 50% dla kodu HALF", () => {
      // SPEC sekcja 4, "applyCoupon": HALF -> 50%
      const cart = new Cart();
      cart.add("SKU-1", 1000, 1);
      cart.applyCoupon("HALF");
      expect(cart.total()).toBe(500);
    });

    it("odrzuca nieznany kod kuponu", () => {
      // SPEC sekcja 4, "applyCoupon": nieznany kod -> Error: unknown coupon
      // Tabela kodow w SPEC wymienia wylacznie SAVE10 i HALF.
      const unknown = ["", "SAVE20", "save10", "half", "SAVE10 ", "FREE"];
      for (const code of unknown) {
        const cart = new Cart();
        cart.add("SKU-1", 1000, 1);
        expect(() => cart.applyCoupon(code), code).toThrow("unknown coupon");
        expect(cart.total(), code).toBe(1000);
      }
    });

    it("odrzuca kody, ktore nie sa kuponami, a sa nazwami wlasnosci obiektu", () => {
      // SPEC sekcja 4, "applyCoupon": nieznany kod -> Error: unknown coupon.
      // Kody takie jak "constructor" czy "toString" nie wystepuja w tabeli
      // kodow, wiec sa nieznanymi kuponami.
      const notCoupons = [
        "constructor",
        "toString",
        "valueOf",
        "hasOwnProperty",
        "__proto__",
      ];
      for (const code of notCoupons) {
        const cart = new Cart();
        cart.add("SKU-1", 1000, 1);
        expect(() => cart.applyCoupon(code), code).toThrow("unknown coupon");
        expect(cart.total(), code).toBe(1000);
      }
    });

    it("odrzuca kupon dla pustego koszyka", () => {
      // SPEC sekcja 4, "applyCoupon": koszyk jest pusty
      // -> Error: cannot apply coupon to an empty cart
      const cart = new Cart();
      expect(() => cart.applyCoupon("SAVE10")).toThrow(
        "cannot apply coupon to an empty cart",
      );
    });

    it("nadpisuje poprzedni rabat, rabaty sie nie kumuluja", () => {
      // SPEC sekcja 4, "applyCoupon": "Ponowne uzycie kuponu nadpisuje
      // poprzedni rabat (rabaty sie nie kumuluja)."
      const cart = new Cart();
      cart.add("SKU-1", 1000, 1);
      cart.applyCoupon("SAVE10");
      cart.applyCoupon("HALF");
      expect(cart.total()).toBe(500); // nie 450

      const other = new Cart();
      other.add("SKU-1", 1000, 1);
      other.applyCoupon("HALF");
      other.applyCoupon("SAVE10");
      expect(other.total()).toBe(900); // nie 450
    });
  });

  describe("total", () => {
    it("zwraca 0 dla pustego koszyka", () => {
      // SPEC sekcja 4, "total": suma po wszystkich pozycjach - dla pustego
      // koszyka suma jest zerowa
      expect(new Cart().total()).toBe(0);
    });

    it("sumuje cena * ilosc po wszystkich pozycjach bez rabatu", () => {
      // SPEC sekcja 4, "total": suma cena * ilosc po wszystkich pozycjach
      const cart = new Cart();
      cart.add("SKU-1", 199, 3);
      cart.add("SKU-2", 1000, 2);
      expect(cart.total()).toBe(2597); // 597 + 2000
    });

    it("pomniejsza sume o rabat i zaokragla do pelnych groszy", () => {
      // SPEC sekcja 4, "total": suma pomniejszona o rabat, zaokraglona
      // do pelnych groszy (999 - 10% = 899,1 gr -> 899 gr)
      const cart = new Cart();
      cart.add("SKU-1", 999, 1);
      cart.applyCoupon("SAVE10");
      const value = cart.total();
      expect(value).toBe(899);
      expect(Number.isInteger(value)).toBe(true);
    });

    it("uwzglednia pozycje dodane po naliczeniu rabatu", () => {
      // SPEC sekcja 4, "total": rabat dotyczy "calego koszyka", wiec liczy sie
      // stan koszyka w momencie wywolania total()
      const cart = new Cart();
      cart.add("SKU-1", 1000, 1);
      cart.applyCoupon("HALF");
      cart.add("SKU-2", 2000, 1);
      expect(cart.total()).toBe(1500); // (1000 + 2000) * 50%
    });
  });
});
