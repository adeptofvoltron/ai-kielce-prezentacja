import { describe, it, expect } from "vitest";
import { calculateShipping } from "../src/pricing";

describe("calculateShipping", () => {
  describe("Input validation", () => {
    it("throws TypeError when weight is not finite", () => {
      // SPEC.md Sekcja 1: Walidacja wejścia
      expect(() => calculateShipping(Infinity, "PL", false)).toThrow(
        TypeError,
      );
      expect(() => calculateShipping(NaN, "PL", false)).toThrow(TypeError);
    });

    it("throws RangeError when weight <= 0", () => {
      // SPEC.md Sekcja 1: Walidacja wejścia
      expect(() => calculateShipping(0, "PL", false)).toThrow(RangeError);
      expect(() => calculateShipping(-5, "PL", false)).toThrow(RangeError);
    });

    it("throws RangeError when weight > 100", () => {
      // SPEC.md Sekcja 1: Walidacja wejścia
      expect(() => calculateShipping(100.1, "PL", false)).toThrow(RangeError);
      expect(() => calculateShipping(150, "PL", false)).toThrow(RangeError);
    });
  });

  describe("Base rate by zone", () => {
    it("applies 12 PLN base rate for PL zone", () => {
      // SPEC.md Sekcja 1: Stawka bazowa wedlug strefy
      const result = calculateShipping(5, "PL", false);
      expect(result).toBe(12.0);
    });

    it("applies 29 PLN base rate for EU zone", () => {
      // SPEC.md Sekcja 1: Stawka bazowa wedlug strefy
      const result = calculateShipping(5, "EU", false);
      expect(result).toBe(29.0);
    });

    it("applies 79 PLN base rate for other zones", () => {
      // SPEC.md Sekcja 1: Stawka bazowa wedlug strefy
      const result = calculateShipping(5, "WORLD", false);
      expect(result).toBe(79.0);
    });

    it("applies 79 PLN base rate for unknown zone string", () => {
      // SPEC.md Sekcja 1: Stawka bazowa wedlug strefy
      const result = calculateShipping(5, "UNKNOWN", false);
      expect(result).toBe(79.0);
    });
  });

  describe("Weight surcharge", () => {
    it("adds no surcharge for weight <= 10 kg", () => {
      // SPEC.md Sekcja 1: Doplata wagowa
      const result = calculateShipping(10, "PL", false);
      expect(result).toBe(12.0);
    });

    it("adds 15 PLN surcharge for weight between 10 and 30 kg (exclusive lower, inclusive upper)", () => {
      // SPEC.md Sekcja 1: Doplata wagowa - powyzej 10 kg, do 30 kg wlacznie
      const result = calculateShipping(10.1, "PL", false);
      expect(result).toBe(12.0 + 15.0);
    });

    it("adds 15 PLN surcharge for weight exactly 30 kg", () => {
      // SPEC.md Sekcja 1: Doplata wagowa - do 30 kg wlacznie
      const result = calculateShipping(30, "PL", false);
      expect(result).toBe(12.0 + 15.0);
    });

    it("adds 40 PLN surcharge for weight > 30 kg", () => {
      // SPEC.md Sekcja 1: Doplata wagowa - powyzej 30 kg
      const result = calculateShipping(30.1, "PL", false);
      expect(result).toBe(12.0 + 40.0);
    });

    it("adds 40 PLN surcharge for weight 100 kg", () => {
      // SPEC.md Sekcja 1: Doplata wagowa - powyzej 30 kg
      const result = calculateShipping(100, "PL", false);
      expect(result).toBe(12.0 + 40.0);
    });
  });

  describe("Premium discount", () => {
    it("applies 80% multiplier (20% discount) for premium customer", () => {
      // SPEC.md Sekcja 1: Rabat premium - placi 80% kwoty
      const baseCost = calculateShipping(5, "PL", false); // 12 PLN
      const premiumCost = calculateShipping(5, "PL", true);
      expect(premiumCost).toBeCloseTo(baseCost * 0.8, 2);
      expect(premiumCost).toBeCloseTo(9.6, 2);
    });

    it("applies premium discount to shipping with weight surcharge", () => {
      // SPEC.md Sekcja 1: Rabat premium
      const regularCost = calculateShipping(35, "PL", false); // 12 + 40 = 52
      const premiumCost = calculateShipping(35, "PL", true);
      expect(premiumCost).toBeCloseTo(regularCost * 0.8, 2);
      expect(premiumCost).toBeCloseTo(41.6, 2);
    });
  });

  describe("Rounding to 2 decimal places", () => {
    it("rounds final cost to 2 decimal places", () => {
      // SPEC.md Sekcja 1: Wynik - zaokraglona do dwoch miejsc po przecinku
      const result = calculateShipping(5, "PL", true); // (12) * 0.8 = 9.6
      expect(result).toBe(9.6);
      expect(Number(result.toFixed(2))).toBe(result);
    });

    it("correctly rounds 41.6 to 2 decimals", () => {
      // SPEC.md Sekcja 1: Wynik
      const result = calculateShipping(35, "PL", true); // (52) * 0.8 = 41.6
      expect(result).toBeCloseTo(41.6, 2);
    });
  });

  describe("Integration scenarios", () => {
    it("calculates shipping for EU premium customer with heavy weight", () => {
      // SPEC.md Sekcja 1: Pełny scenariusz
      const result = calculateShipping(50, "EU", true); // (29 + 40) * 0.8 = 69 * 0.8 = 55.2
      expect(result).toBeCloseTo(55.2, 2);
    });

    it("calculates shipping for WORLD zone with light weight", () => {
      // SPEC.md Sekcja 1: Pełny scenariusz
      const result = calculateShipping(3, "WORLD", false); // 79
      expect(result).toBe(79.0);
    });
  });
});
