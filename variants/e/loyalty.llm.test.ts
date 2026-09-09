import { describe, it, expect } from "vitest";
import { awardPoints } from "../src/loyalty";

describe("awardPoints", () => {
  describe("Input validation", () => {
    it("throws TypeError when orderValuePLN is not finite", () => {
      // SPEC.md Sekcja 3: Walidacja - ktorakolwiek kwota nie jest liczba skonczona
      expect(() => awardPoints(Infinity, 0)).toThrow(TypeError);
      expect(() => awardPoints(NaN, 0)).toThrow(TypeError);
    });

    it("throws TypeError when lifetimeSpendPLN is not finite", () => {
      // SPEC.md Sekcja 3: Walidacja - ktorakolwiek kwota nie jest liczba skonczona
      expect(() => awardPoints(100, Infinity)).toThrow(TypeError);
      expect(() => awardPoints(100, NaN)).toThrow(TypeError);
    });

    it("throws RangeError when orderValuePLN is negative", () => {
      // SPEC.md Sekcja 3: Walidacja - ktorakolwiek kwota jest ujemna
      expect(() => awardPoints(-1, 0)).toThrow(RangeError);
    });

    it("throws RangeError when lifetimeSpendPLN is negative", () => {
      // SPEC.md Sekcja 3: Walidacja - ktorakolwiek kwota jest ujemna
      expect(() => awardPoints(0, -1)).toThrow(RangeError);
    });
  });

  describe("Points calculation - 1 point per 10 PLN", () => {
    it("awards 0 points for order < 5 PLN (rounds down with banker's rounding)", () => {
      // SPEC.md Sekcja 3: Przelicznik - 1 punkt za kazde 10 zlotych, zaokraglenie metodą bankierska
      const result = awardPoints(4.99, 0);
      expect(result).toBe(0);
    });

    it("awards 1 point for order exactly 10 PLN", () => {
      // SPEC.md Sekcja 3: Przelicznik - 1 punkt za kazde 10 zlotych
      const result = awardPoints(10, 0);
      expect(result).toBe(1);
    });

    it("awards 1 point for order 15 PLN (1.5 points rounds to 2 with banker's rounding)", () => {
      // SPEC.md Sekcja 3: Przelicznik - zaokraglenie do parzystej przy dokladnej polowie
      // 15 / 10 = 1.5, banker's rounding: 1.5 -> 2 (nearest even)
      const result = awardPoints(15, 0);
      expect(result).toBe(2);
    });

    it("awards 2 points for order 25 PLN (2.5 points rounds to 2 with banker's rounding)", () => {
      // SPEC.md Sekcja 3: Przelicznik - zaokraglenie do parzystej przy dokladnej polowie
      // 25 / 10 = 2.5, banker's rounding: 2.5 -> 2 (nearest even)
      const result = awardPoints(25, 0);
      expect(result).toBe(2);
    });

    it("awards 2 points for order 24 PLN (2.4 points rounds to 2)", () => {
      // SPEC.md Sekcja 3: Przelicznik - zaokraglenie metodą bankierska
      // 24 / 10 = 2.4, rounds to 2
      const result = awardPoints(24, 0);
      expect(result).toBe(2);
    });

    it("awards 3 points for order 26 PLN (2.6 points rounds to 3)", () => {
      // SPEC.md Sekcja 3: Przelicznik - zaokraglenie metodą bankierska
      // 26 / 10 = 2.6, rounds to 3
      const result = awardPoints(26, 0);
      expect(result).toBe(3);
    });

    it("awards 35 points for order 350 PLN (35 points rounds to 35)", () => {
      // SPEC.md Sekcja 3: Przelicznik - 1 punkt za kazde 10 zlotych
      // 350 / 10 = 35
      const result = awardPoints(350, 0);
      expect(result).toBe(35);
    });
  });

  describe("VIP multiplier - 2x points for lifetime spend >= 5000 PLN", () => {
    it("applies 2x multiplier when lifetimeSpend is exactly 5000 PLN", () => {
      // SPEC.md Sekcja 3: Mnoznik VIP - co najmniej 5000 zlotych
      // 100 PLN order -> 10 points * 2 = 20 points
      const result = awardPoints(100, 5000);
      expect(result).toBe(20);
    });

    it("applies 2x multiplier when lifetimeSpend > 5000 PLN", () => {
      // SPEC.md Sekcja 3: Mnoznik VIP - co najmniej 5000 zlotych
      const result = awardPoints(100, 5001);
      expect(result).toBe(20);
    });

    it("does NOT apply 2x multiplier when lifetimeSpend < 5000 PLN", () => {
      // SPEC.md Sekcja 3: Mnoznik VIP - co najmniej 5000 zlotych (not < 5000)
      const result = awardPoints(100, 4999);
      expect(result).toBe(10);
    });

    it("applies 2x multiplier to rounded points", () => {
      // SPEC.md Sekcja 3: Limit - stosujemy po naliczeniu mnoznika VIP
      // 15 PLN -> 1.5 -> rounds to 2 -> 2*2 = 4 (for VIP)
      const result = awardPoints(15, 5000);
      expect(result).toBe(4);
    });
  });

  describe("Points cap - max 5000 points per order (after VIP multiplier)", () => {
    it("caps points at 5000 for non-VIP customer", () => {
      // SPEC.md Sekcja 3: Limit - maksymalnie 5000 punktow, po naliczeniu mnoznika VIP
      // 50000 PLN / 10 = 5000 points
      const result = awardPoints(50000, 0);
      expect(result).toBe(5000);
    });

    it("caps points at 5000 even when order value would exceed after 2x multiplier", () => {
      // SPEC.md Sekcja 3: Limit - maksymalnie 5000 punktow, stosujemy po mnoznika VIP
      // 30000 PLN / 10 = 3000 points * 2 = 6000 points, but capped at 5000
      const result = awardPoints(30000, 5000);
      expect(result).toBe(5000);
    });

    it("allows points below cap for VIP", () => {
      // SPEC.md Sekcja 3: Limit - maksymalnie 5000 punktow
      // 20000 PLN / 10 = 2000 points * 2 = 4000 points (below cap)
      const result = awardPoints(20000, 5000);
      expect(result).toBe(4000);
    });

    it("caps at exactly 5000 when VIP multiplier would result in cap", () => {
      // SPEC.md Sekcja 3: Limit - maksymalnie 5000 punktow
      // 25000 PLN / 10 = 2500 points * 2 = 5000 points
      const result = awardPoints(25000, 5000);
      expect(result).toBe(5000);
    });
  });

  describe("Integration scenarios", () => {
    it("calculates points for regular customer with small order", () => {
      // SPEC.md Sekcja 3: Pełny scenariusz
      const result = awardPoints(99, 2000);
      // 99 / 10 = 9.9 -> banker's rounding: 10 (nearest even)
      expect(result).toBe(10);
    });

    it("calculates points for VIP customer with large order hitting cap", () => {
      // SPEC.md Sekcja 3: Pełny scenariusz
      const result = awardPoints(50000, 5000);
      // 50000 / 10 = 5000 * 2 = 10000, capped at 5000
      expect(result).toBe(5000);
    });

    it("calculates points for customer transitioning to VIP at threshold", () => {
      // SPEC.md Sekcja 3: Mnoznik VIP - co najmniej 5000 zlotych
      // lifetimeSpend = 5000 is the exact threshold - should be VIP
      const nonVIP = awardPoints(100, 4999.99);
      const VIP = awardPoints(100, 5000);
      expect(nonVIP).toBe(10);
      expect(VIP).toBe(20);
    });
  });
});
