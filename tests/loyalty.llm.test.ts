import { describe, expect, it } from "vitest";

import { awardPoints } from "../src/loyalty";

/**
 * Oracle dla tych testow pochodzi wylacznie z docs/SPEC.md, sekcja 3
 * ("Punkty lojalnosciowe"). Liczby punktow policzone sa recznie z regul
 * specyfikacji: 1 punkt za 10 zl, zaokraglenie bankierskie, mnoznik VIP
 * od 5000 zl sumy zakupow, limit 5000 punktow po mnozniku.
 */
describe("awardPoints - docs/SPEC.md sekcja 3", () => {
  describe("przelicznik 1 punkt za 10 zl", () => {
    it("przyznaje 1 punkt za kazde 10 zlotych", () => {
      // SPEC sekcja 3, "Przelicznik": 1 punkt za kazde 10 zlotych
      expect(awardPoints(0, 0)).toBe(0);
      expect(awardPoints(10, 0)).toBe(1);
      expect(awardPoints(100, 0)).toBe(10);
      expect(awardPoints(1230, 0)).toBe(123);
    });

    it("zaokragla w dol wartosci ponizej polowy", () => {
      // SPEC sekcja 3, "Przelicznik", przyklad z SPEC: 2,4 -> 2
      expect(awardPoints(24, 0)).toBe(2);
      expect(awardPoints(101, 0)).toBe(10); // 10,1 -> 10
    });

    it("zaokragla w gore wartosci powyzej polowy", () => {
      // SPEC sekcja 3, "Przelicznik", przyklad z SPEC: 2,6 -> 3
      expect(awardPoints(26, 0)).toBe(3);
      expect(awardPoints(99, 0)).toBe(10); // 9,9 -> 10
      expect(awardPoints(36, 0)).toBe(4); // 3,6 -> 4
    });

    it("przy dokladnej polowie zaokragla do liczby parzystej (metoda bankierska)", () => {
      // SPEC sekcja 3, "Przelicznik": zaokraglenie bankierskie,
      // przyklady z SPEC: 2,5 -> 2 oraz 3,5 -> 4
      expect(awardPoints(25, 0)).toBe(2); // 2,5 -> 2 (parzysta)
      expect(awardPoints(35, 0)).toBe(4); // 3,5 -> 4 (parzysta)
      expect(awardPoints(5, 0)).toBe(0); // 0,5 -> 0 (parzysta)
      expect(awardPoints(15, 0)).toBe(2); // 1,5 -> 2 (parzysta)
      expect(awardPoints(105, 0)).toBe(10); // 10,5 -> 10 (parzysta)
      expect(awardPoints(115, 0)).toBe(12); // 11,5 -> 12 (parzysta)
    });
  });

  describe("mnoznik VIP", () => {
    it("podwaja punkty klientowi o sumie zakupow co najmniej 5000 zl", () => {
      // SPEC sekcja 3, "Mnoznik VIP": suma dotychczasowych zakupow
      // co najmniej 5000 zl -> podwojona liczba punktow
      expect(awardPoints(100, 5000)).toBe(20); // granica wlaczna: 10 * 2
      expect(awardPoints(100, 5000.01)).toBe(20);
      expect(awardPoints(100, 99999)).toBe(20);
    });

    it("nie podwaja punktow ponizej progu VIP", () => {
      // SPEC sekcja 3, "Mnoznik VIP": prog to 5000 zl sumy zakupow
      expect(awardPoints(100, 0)).toBe(10);
      expect(awardPoints(100, 4999.99)).toBe(10);
    });

    it("stosuje mnoznik VIP do punktow po zaokragleniu bankierskim", () => {
      // SPEC sekcja 3: najpierw przelicznik z zaokragleniem bankierskim,
      // potem mnoznik VIP
      expect(awardPoints(35, 5000)).toBe(8); // 3,5 -> 4, VIP -> 8
      expect(awardPoints(25, 6000)).toBe(4); // 2,5 -> 2, VIP -> 4
    });
  });

  describe("limit punktow", () => {
    it("ogranicza punkty do 5000 za jedno zamowienie", () => {
      // SPEC sekcja 3, "Limit": maksymalnie 5000 punktow za zamowienie
      expect(awardPoints(60000, 0)).toBe(5000); // 6000 -> limit
      expect(awardPoints(1000000, 0)).toBe(5000);
    });

    it("stosuje limit po naliczeniu mnoznika VIP", () => {
      // SPEC sekcja 3, "Limit": "Limit stosujemy po naliczeniu mnoznika VIP"
      expect(awardPoints(30000, 9000)).toBe(5000); // 3000 * 2 = 6000 -> limit
      expect(awardPoints(25000, 9000)).toBe(5000); // 2500 * 2 = 5000 -> dokladnie limit
      expect(awardPoints(24000, 9000)).toBe(4800); // 2400 * 2 = 4800 -> bez limitu
    });

    it("nie obniza wyniku rownego limitowi", () => {
      // SPEC sekcja 3, "Limit": limit to maksimum, wartosc 5000 jest dozwolona
      expect(awardPoints(50000, 0)).toBe(5000);
    });
  });

  describe("walidacja", () => {
    it("odrzuca kwoty, ktore nie sa liczbami skonczonymi", () => {
      // SPEC sekcja 3, "Walidacja": ktorakolwiek kwota nie jest liczba
      // skonczona -> TypeError: amounts must be finite numbers
      const bad: unknown[] = [NaN, Infinity, -Infinity, "100", null, undefined, {}];
      for (const value of bad) {
        expect(() => awardPoints(value as number, 0)).toThrow(TypeError);
        expect(() => awardPoints(value as number, 0)).toThrow(
          "amounts must be finite numbers",
        );
        expect(() => awardPoints(100, value as number)).toThrow(TypeError);
        expect(() => awardPoints(100, value as number)).toThrow(
          "amounts must be finite numbers",
        );
      }
    });

    it("odrzuca kwoty ujemne", () => {
      // SPEC sekcja 3, "Walidacja": ktorakolwiek kwota jest ujemna
      // -> RangeError: amounts must not be negative
      expect(() => awardPoints(-1, 0)).toThrow(RangeError);
      expect(() => awardPoints(-1, 0)).toThrow("amounts must not be negative");
      expect(() => awardPoints(100, -1)).toThrow(RangeError);
      expect(() => awardPoints(100, -1)).toThrow("amounts must not be negative");
    });

    it("dopuszcza kwoty zerowe", () => {
      // SPEC sekcja 3, "Walidacja": zero nie jest ani nieskonczonoscia,
      // ani wartoscia ujemna
      expect(awardPoints(0, 0)).toBe(0);
    });
  });
});
