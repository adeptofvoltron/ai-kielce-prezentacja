import { describe, it, expect } from "vitest";
import { parseInvoiceId } from "../src/invoiceId";

describe("parseInvoiceId", () => {
  describe("Input validation", () => {
    it("throws TypeError when input is not a string", () => {
      // SPEC.md Sekcja 2: Walidacja - raw nie jest typu string
      expect(() => parseInvoiceId(123 as any)).toThrow(TypeError);
      expect(() => parseInvoiceId(null as any)).toThrow(TypeError);
      expect(() => parseInvoiceId(undefined as any)).toThrow(TypeError);
      expect(() => parseInvoiceId({} as any)).toThrow(TypeError);
    });

    it("throws Error for malformed format", () => {
      // SPEC.md Sekcja 2: Walidacja - wartosc nie pasuje do formatu
      expect(() => parseInvoiceId("FV/2026/9/0042")).toThrow(Error); // month should be 2 digits
      expect(() => parseInvoiceId("FV/26/09/0042")).toThrow(Error); // year should be 4 digits
      expect(() => parseInvoiceId("FV/2026/09/42")).toThrow(Error); // seq should be 4 digits
      expect(() => parseInvoiceId("FV2026090042")).toThrow(Error); // missing slashes
      expect(() => parseInvoiceId("FX/2026/09/0042")).toThrow(Error); // wrong prefix
    });

    it("throws RangeError when year is out of range 2000-2100", () => {
      // SPEC.md Sekcja 2: Walidacja - rok poza zakresem 2000-2100
      expect(() => parseInvoiceId("FV/1999/09/0042")).toThrow(RangeError);
      expect(() => parseInvoiceId("FV/2101/09/0042")).toThrow(RangeError);
    });

    it("throws RangeError when sequence number is 0000", () => {
      // SPEC.md Sekcja 2: Walidacja - numer kolejny rowny 0000
      expect(() => parseInvoiceId("FV/2026/09/0000")).toThrow(RangeError);
    });
  });

  describe("Format parsing", () => {
    it("parses valid invoice ID", () => {
      // SPEC.md Sekcja 2: Format - przyklad poprawnej wartosci
      const result = parseInvoiceId("FV/2026/09/0042");
      expect(result).toEqual({ year: 2026, month: 9, seq: 42 });
    });

    it("strips leading and trailing whitespace", () => {
      // SPEC.md Sekcja 2: Biale znaki na poczatku i koncu sa ignorowane
      const result = parseInvoiceId("  FV/2026/09/0042  ");
      expect(result).toEqual({ year: 2026, month: 9, seq: 42 });
    });

    it("removes leading zeros from parsed numbers", () => {
      // SPEC.md Sekcja 2: Wynik - liczby calkowite bez wiodacych zer
      const result = parseInvoiceId("FV/2026/09/0042");
      expect(result.year).toBe(2026);
      expect(result.month).toBe(9);
      expect(result.seq).toBe(42);
    });
  });

  describe("Month validation", () => {
    it("accepts months 01-09", () => {
      // SPEC.md Sekcja 2: MM - miesiac, dokladnie dwie cyfry z zakresu 01-12
      for (let m = 1; m <= 9; m++) {
        const month = String(m).padStart(2, "0");
        const result = parseInvoiceId(`FV/2026/${month}/0042`);
        expect(result.month).toBe(m);
      }
    });

    it("accepts months 10-12", () => {
      // SPEC.md Sekcja 2: MM - miesiac, dokladnie dwie cyfry z zakresu 01-12
      for (let m = 10; m <= 12; m++) {
        const result = parseInvoiceId(`FV/2026/${m}/0042`);
        expect(result.month).toBe(m);
      }
    });

    it("rejects month 00", () => {
      // SPEC.md Sekcja 2: Format - MM z zakresu 01-12
      expect(() => parseInvoiceId("FV/2026/00/0042")).toThrow(Error);
    });

    it("rejects month 13", () => {
      // SPEC.md Sekcja 2: Format - MM z zakresu 01-12
      expect(() => parseInvoiceId("FV/2026/13/0042")).toThrow(Error);
    });
  });

  describe("Year boundaries", () => {
    it("accepts year 2000", () => {
      // SPEC.md Sekcja 2: Walidacja - rok w zakresu 2000-2100
      const result = parseInvoiceId("FV/2000/01/0001");
      expect(result.year).toBe(2000);
    });

    it("accepts year 2100", () => {
      // SPEC.md Sekcja 2: Walidacja - rok w zakresu 2000-2100
      const result = parseInvoiceId("FV/2100/12/9999");
      expect(result.year).toBe(2100);
    });

    it("rejects year 1999", () => {
      // SPEC.md Sekcja 2: Walidacja - rok poza zakresem 2000-2100
      expect(() => parseInvoiceId("FV/1999/06/0100")).toThrow(RangeError);
    });

    it("rejects year 2101", () => {
      // SPEC.md Sekcja 2: Walidacja - rok poza zakresem 2000-2100
      expect(() => parseInvoiceId("FV/2101/06/0100")).toThrow(RangeError);
    });
  });

  describe("Sequence number boundaries", () => {
    it("accepts sequence 0001", () => {
      // SPEC.md Sekcja 2: Walidacja - numer kolejny != 0000
      const result = parseInvoiceId("FV/2026/01/0001");
      expect(result.seq).toBe(1);
    });

    it("accepts sequence 9999", () => {
      // SPEC.md Sekcja 2: Format - NNNN dokladnie cztery cyfry
      const result = parseInvoiceId("FV/2026/01/9999");
      expect(result.seq).toBe(9999);
    });

    it("rejects sequence 0000", () => {
      // SPEC.md Sekcja 2: Walidacja - numer kolejny rowny 0000
      expect(() => parseInvoiceId("FV/2026/01/0000")).toThrow(RangeError);
    });
  });

  describe("Return types", () => {
    it("returns numbers for all fields (no string conversion)", () => {
      // SPEC.md Sekcja 2: Wynik - liczby calkowite
      const result = parseInvoiceId("FV/2050/03/1234");
      expect(typeof result.year).toBe("number");
      expect(typeof result.month).toBe("number");
      expect(typeof result.seq).toBe("number");
      expect(Number.isInteger(result.year)).toBe(true);
      expect(Number.isInteger(result.month)).toBe(true);
      expect(Number.isInteger(result.seq)).toBe(true);
    });
  });
});
