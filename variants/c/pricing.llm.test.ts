import { describe, expect, it } from "vitest";

import { calculateShipping } from "../src/pricing";

/**
 * Oracle dla tych testow pochodzi wylacznie z docs/SPEC.md, sekcja 1
 * ("Koszt dostawy"). Wartosci oczekiwane sa wyliczone z tabel w specyfikacji,
 * nie z aktualnego zachowania src/pricing.ts.
 */
describe("calculateShipping - docs/SPEC.md sekcja 1", () => {
  describe("walidacja wejscia", () => {
    it("odrzuca wage, ktora nie jest liczba skonczona", () => {
      // SPEC sekcja 1, "Walidacja wejscia":
      // weightKg nie jest liczba skonczona -> TypeError: weight must be a finite number
      for (const bad of [NaN, Infinity, -Infinity]) {
        expect(() => calculateShipping(bad, "PL", false)).toThrow(TypeError);
        expect(() => calculateShipping(bad, "PL", false)).toThrow(
          "weight must be a finite number",
        );
      }
    });

    it("odrzuca wage, ktora nie jest liczba", () => {
      // SPEC sekcja 1, "Walidacja wejscia": wartosc nieliczbowa tez nie jest
      // liczba skonczona -> TypeError: weight must be a finite number
      for (const bad of ["5", null, undefined, {}] as unknown[]) {
        expect(() => calculateShipping(bad as number, "PL", false)).toThrow(
          TypeError,
        );
        expect(() => calculateShipping(bad as number, "PL", false)).toThrow(
          "weight must be a finite number",
        );
      }
    });

    it("odrzuca wage niedodatnia", () => {
      // SPEC sekcja 1, "Walidacja wejscia":
      // weightKg <= 0 -> RangeError: weight must be positive
      for (const bad of [0, -0.001, -5]) {
        expect(() => calculateShipping(bad, "PL", false)).toThrow(RangeError);
        expect(() => calculateShipping(bad, "PL", false)).toThrow(
          "weight must be positive",
        );
      }
    });

    it("odrzuca wage powyzej limitu przewoznika", () => {
      // SPEC sekcja 1, "Walidacja wejscia":
      // weightKg > 100 -> RangeError: weight above carrier limit
      for (const bad of [100.01, 1000]) {
        expect(() => calculateShipping(bad, "PL", false)).toThrow(RangeError);
        expect(() => calculateShipping(bad, "PL", false)).toThrow(
          "weight above carrier limit",
        );
      }
    });

    it("dopuszcza wage dokladnie 100 kg", () => {
      // SPEC sekcja 1: bledem jest dopiero weightKg > 100, wiec 100 kg jest
      // wartoscia poprawna (strefa PL 12 + doplata powyzej 30 kg 40 = 52)
      expect(calculateShipping(100, "PL", false)).toBe(52);
    });
  });

  describe("stawka bazowa wedlug strefy", () => {
    it("nalicza 12 PLN dla strefy PL", () => {
      // SPEC sekcja 1, "Stawka bazowa wedlug strefy": "PL" -> 12,00 PLN
      expect(calculateShipping(1, "PL", false)).toBe(12);
    });

    it("nalicza 29 PLN dla strefy EU", () => {
      // SPEC sekcja 1, "Stawka bazowa wedlug strefy": "EU" -> 29,00 PLN
      expect(calculateShipping(1, "EU", false)).toBe(29);
    });

    it("nalicza 79 PLN dla dowolnej innej strefy", () => {
      // SPEC sekcja 1, "Stawka bazowa wedlug strefy":
      // dowolna inna wartosc -> 79,00 PLN
      for (const zone of ["WORLD", "US", "", "pl", "eu"]) {
        expect(calculateShipping(1, zone, false)).toBe(79);
      }
    });
  });

  describe("doplata wagowa", () => {
    it("nie nalicza doplaty do 10 kg wlacznie", () => {
      // SPEC sekcja 1, "Doplata wagowa": do 10 kg wlacznie -> brak doplaty
      expect(calculateShipping(0.1, "PL", false)).toBe(12);
      expect(calculateShipping(10, "PL", false)).toBe(12);
    });

    it("nalicza +15 PLN powyzej 10 kg do 30 kg wlacznie", () => {
      // SPEC sekcja 1, "Doplata wagowa":
      // powyzej 10 kg, do 30 kg wlacznie -> +15,00 PLN
      expect(calculateShipping(10.01, "PL", false)).toBe(27);
      expect(calculateShipping(20, "PL", false)).toBe(27);
      expect(calculateShipping(30, "PL", false)).toBe(27);
    });

    it("nalicza +40 PLN powyzej 30 kg", () => {
      // SPEC sekcja 1, "Doplata wagowa": powyzej 30 kg -> +40,00 PLN
      expect(calculateShipping(30.01, "PL", false)).toBe(52);
      expect(calculateShipping(50, "PL", false)).toBe(52);
    });

    it("nalicza doplate wagowa tylko raz", () => {
      // SPEC sekcja 1, "Doplata wagowa": doplata jest "naliczana raz, do
      // stawki bazowej" - progi sie nie kumuluja (nie 12+15+40)
      expect(calculateShipping(40, "PL", false)).toBe(52);
    });

    it("nalicza doplate wagowa do stawki bazowej kazdej strefy", () => {
      // SPEC sekcja 1, "Doplata wagowa": doplata dodawana do stawki bazowej
      expect(calculateShipping(20, "EU", false)).toBe(44); // 29 + 15
      expect(calculateShipping(40, "EU", false)).toBe(69); // 29 + 40
      expect(calculateShipping(20, "WORLD", false)).toBe(94); // 79 + 15
      expect(calculateShipping(40, "WORLD", false)).toBe(119); // 79 + 40
    });
  });

  describe("rabat premium", () => {
    it("klient premium placi 80% kwoty", () => {
      // SPEC sekcja 1, "Rabat premium": isPremium === true -> 80% kwoty
      expect(calculateShipping(1, "PL", true)).toBe(9.6); // 12 * 0.8
      expect(calculateShipping(1, "EU", true)).toBe(23.2); // 29 * 0.8
      expect(calculateShipping(1, "WORLD", true)).toBe(63.2); // 79 * 0.8
    });

    it("nalicza rabat premium po doplacie wagowej", () => {
      // SPEC sekcja 1, "Rabat premium": 80% "kwoty wyliczonej powyzej",
      // czyli stawki bazowej wraz z doplata wagowa
      expect(calculateShipping(20, "PL", true)).toBe(21.6); // (12 + 15) * 0.8
      expect(calculateShipping(40, "PL", true)).toBe(41.6); // (12 + 40) * 0.8
      expect(calculateShipping(40, "WORLD", true)).toBe(95.2); // (79 + 40) * 0.8
    });

    it("nie nalicza rabatu klientowi bez premium", () => {
      // SPEC sekcja 1, "Rabat premium": rabat tylko dla isPremium === true
      expect(calculateShipping(1, "PL", false)).toBe(12);
    });
  });

  describe("wynik", () => {
    it("zwraca kwote zaokraglona do dwoch miejsc po przecinku", () => {
      // SPEC sekcja 1, "Wynik": kwota w zlotych, zaokraglona do dwoch
      // miejsc po przecinku (bez artefaktow arytmetyki zmiennoprzecinkowej)
      const value = calculateShipping(20, "EU", true); // (29 + 15) * 0.8 = 35.2
      expect(value).toBe(35.2);
      expect(Number(value.toFixed(2))).toBe(value);
    });
  });
});
