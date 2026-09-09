import { describe, it, expect } from "vitest";
import { Cart } from "../src/cart";

describe("Cart", () => {
  describe("add() - Input validation", () => {
    it("throws RangeError when priceGrosz is not integer", () => {
      // SPEC.md Sekcja 4: add() - priceGrosz nie jest calkowita liczba nieujemna
      const cart = new Cart();
      expect(() => cart.add("SKU1", 1.5, 1)).toThrow(RangeError);
    });

    it("throws RangeError when priceGrosz is negative", () => {
      // SPEC.md Sekcja 4: add() - priceGrosz nie jest calkowita liczba nieujemna
      const cart = new Cart();
      expect(() => cart.add("SKU1", -100, 1)).toThrow(RangeError);
    });

    it("allows priceGrosz = 0 (non-negative includes zero)", () => {
      // SPEC.md Sekcja 4: add() - priceGrosz musi byc nieujemne
      const cart = new Cart();
      expect(() => cart.add("SKU1", 0, 1)).not.toThrow();
    });

    it("throws RangeError when qty is not integer", () => {
      // SPEC.md Sekcja 4: add() - qty nie jest calkowita liczba dodatnia
      const cart = new Cart();
      expect(() => cart.add("SKU1", 100, 1.5)).toThrow(RangeError);
    });

    it("throws RangeError when qty is zero", () => {
      // SPEC.md Sekcja 4: add() - qty nie jest calkowita liczba dodatnia
      const cart = new Cart();
      expect(() => cart.add("SKU1", 100, 0)).toThrow(RangeError);
    });

    it("throws RangeError when qty is negative", () => {
      // SPEC.md Sekcja 4: add() - qty nie jest calkowita liczba dodatnia
      const cart = new Cart();
      expect(() => cart.add("SKU1", 100, -1)).toThrow(RangeError);
    });
  });

  describe("add() - Adding items", () => {
    it("adds a single item to empty cart", () => {
      // SPEC.md Sekcja 4: add()
      const cart = new Cart();
      cart.add("SKU1", 1000, 1); // 1000 grosz
      expect(cart.total()).toBe(1000);
    });

    it("sums quantities when adding same SKU twice", () => {
      // SPEC.md Sekcja 4: add() - Dodanie SKU, ktore jest juz w koszyku, sumuje ilosci
      const cart = new Cart();
      cart.add("SKU1", 100, 2);
      cart.add("SKU1", 100, 3);
      expect(cart.total()).toBe(500); // 100 * 5
    });

    it("adds multiple different SKUs", () => {
      // SPEC.md Sekcja 4: add() - dodawanie roznych SKU
      const cart = new Cart();
      cart.add("SKU1", 100, 2); // 200 grosz
      cart.add("SKU2", 300, 1); // 300 grosz
      expect(cart.total()).toBe(500);
    });
  });

  describe("remove() - Input validation", () => {
    it("throws RangeError when qty is not integer", () => {
      // SPEC.md Sekcja 4: remove() - qty nie jest calkowita liczba dodatnia
      const cart = new Cart();
      cart.add("SKU1", 100, 5);
      expect(() => cart.remove("SKU1", 1.5)).toThrow(RangeError);
    });

    it("throws RangeError when qty is zero", () => {
      // SPEC.md Sekcja 4: remove() - qty nie jest calkowita liczba dodatnia
      const cart = new Cart();
      cart.add("SKU1", 100, 5);
      expect(() => cart.remove("SKU1", 0)).toThrow(RangeError);
    });

    it("throws RangeError when qty is negative", () => {
      // SPEC.md Sekcja 4: remove() - qty nie jest calkowita liczba dodatnia
      const cart = new Cart();
      cart.add("SKU1", 100, 5);
      expect(() => cart.remove("SKU1", -1)).toThrow(RangeError);
    });

    it("throws Error when SKU is not in cart", () => {
      // SPEC.md Sekcja 4: remove() - SKU nie ma w koszyku
      const cart = new Cart();
      cart.add("SKU1", 100, 1);
      expect(() => cart.remove("SKU2", 1)).toThrow(Error);
    });

    it("throws Error when SKU not in cart even if cart is not empty", () => {
      // SPEC.md Sekcja 4: remove() - SKU nie ma w koszyku
      const cart = new Cart();
      cart.add("SKU1", 100, 1);
      expect(() => cart.remove("SKU99", 1)).toThrow(Error);
    });
  });

  describe("remove() - Removing items", () => {
    it("reduces quantity of item in cart", () => {
      // SPEC.md Sekcja 4: remove() - zdejmuje wskazana liczbe sztuk
      const cart = new Cart();
      cart.add("SKU1", 100, 5);
      cart.remove("SKU1", 2);
      expect(cart.total()).toBe(300); // 100 * 3
    });

    it("removes all quantities of an item", () => {
      // SPEC.md Sekcja 4: remove() - zdejmuje wskazana liczbe sztuk
      const cart = new Cart();
      cart.add("SKU1", 100, 3);
      cart.remove("SKU1", 3);
      expect(cart.total()).toBe(0);
    });

    it("allows negative quantity after removal (underflow)", () => {
      // SPEC.md Sekcja 4: remove() - spec nie zabrania ujemnych ilosci
      // ale kod sprawdza to przy total()
      const cart = new Cart();
      cart.add("SKU1", 100, 2);
      cart.remove("SKU1", 5); // removes more than added
      expect(() => cart.total()).toThrow(RangeError); // kod sprawdza underflow
    });
  });

  describe("applyCoupon() - Input validation", () => {
    it("throws Error for unknown coupon code", () => {
      // SPEC.md Sekcja 4: applyCoupon() - nieznany kod
      const cart = new Cart();
      cart.add("SKU1", 100, 1);
      expect(() => cart.applyCoupon("UNKNOWN")).toThrow(Error);
    });

    it("throws Error when applying coupon to empty cart", () => {
      // SPEC.md Sekcja 4: applyCoupon() - koszyk jest pusty
      const cart = new Cart();
      expect(() => cart.applyCoupon("SAVE10")).toThrow(Error);
    });
  });

  describe("applyCoupon() - Applying known coupons", () => {
    it("applies SAVE10 coupon (10% discount)", () => {
      // SPEC.md Sekcja 4: applyCoupon() - kod SAVE10 -> 10% rabat
      const cart = new Cart();
      cart.add("SKU1", 1000, 1); // 1000 grosz
      cart.applyCoupon("SAVE10");
      expect(cart.total()).toBe(900); // 1000 * 0.9
    });

    it("applies HALF coupon (50% discount)", () => {
      // SPEC.md Sekcja 4: applyCoupon() - kod HALF -> 50% rabat
      const cart = new Cart();
      cart.add("SKU1", 1000, 1); // 1000 grosz
      cart.applyCoupon("HALF");
      expect(cart.total()).toBe(500); // 1000 * 0.5
    });

    it("overwrites previous coupon (no cumulative discounts)", () => {
      // SPEC.md Sekcja 4: applyCoupon() - Ponowne uzycie kuponu nadpisuje poprzedni rabat
      const cart = new Cart();
      cart.add("SKU1", 1000, 1);
      cart.applyCoupon("SAVE10");
      expect(cart.total()).toBe(900);
      cart.applyCoupon("HALF");
      expect(cart.total()).toBe(500); // HALF overwrites SAVE10
    });

    it("applies coupon only after it's applied (no implicit discount)", () => {
      // SPEC.md Sekcja 4: applyCoupon() - ustawia rabat dla calego koszyka
      const cart = new Cart();
      cart.add("SKU1", 1000, 1);
      // No coupon applied yet
      expect(cart.total()).toBe(1000);
      cart.applyCoupon("SAVE10");
      expect(cart.total()).toBe(900);
    });
  });

  describe("total() - Calculation and rounding", () => {
    it("returns sum in grosz", () => {
      // SPEC.md Sekcja 4: total() - zwraca wartosc w groszach
      const cart = new Cart();
      cart.add("SKU1", 100, 3); // 300 grosz
      cart.add("SKU2", 250, 2); // 500 grosz
      expect(cart.total()).toBe(800);
    });

    it("rounds discounted total to nearest grosz", () => {
      // SPEC.md Sekcja 4: total() - zaokraglona do pelnych groszy
      const cart = new Cart();
      cart.add("SKU1", 1000, 1);
      cart.applyCoupon("SAVE10");
      // 1000 * 0.9 = 900 (no rounding needed)
      expect(cart.total()).toBe(900);
    });

    it("rounds correctly when discount produces fractional grosz", () => {
      // SPEC.md Sekcja 4: total() - zaokraglona do pelnych groszy
      const cart = new Cart();
      cart.add("SKU1", 1001, 1);
      cart.applyCoupon("HALF");
      // 1001 * 0.5 = 500.5 -> Math.round = 500 or 501 (depends on implementation)
      const result = cart.total();
      expect([500, 501]).toContain(result); // symmetric rounding or banker's
    });
  });

  describe("Integration scenarios", () => {
    it("complex cart with multiple items and coupon", () => {
      // SPEC.md Sekcja 4: Pełny scenariusz
      const cart = new Cart();
      cart.add("ITEM_A", 500, 2); // 1000 grosz
      cart.add("ITEM_B", 1500, 1); // 1500 grosz
      // Subtotal: 2500 grosz
      cart.applyCoupon("SAVE10");
      // 2500 * 0.9 = 2250 grosz
      expect(cart.total()).toBe(2250);
    });

    it("add and remove items with coupon", () => {
      // SPEC.md Sekcja 4: Pełny scenariusz
      const cart = new Cart();
      cart.add("SKU1", 1000, 5); // 5000 grosz
      cart.add("SKU2", 600, 2); // 1200 grosz
      cart.remove("SKU1", 2); // 3000 remaining from SKU1
      // Subtotal: 3000 + 1200 = 4200
      cart.applyCoupon("HALF");
      expect(cart.total()).toBe(2100);
    });

    it("applying coupon multiple times changes discount", () => {
      // SPEC.md Sekcja 4: applyCoupon() - nadpisuje poprzedni rabat
      const cart = new Cart();
      cart.add("SKU1", 1000, 1);
      cart.applyCoupon("SAVE10");
      const afterSave10 = cart.total();
      cart.applyCoupon("HALF");
      const afterHalf = cart.total();
      expect(afterSave10).toBe(900);
      expect(afterHalf).toBe(500);
      expect(afterSave10).not.toBe(afterHalf);
    });
  });
});
