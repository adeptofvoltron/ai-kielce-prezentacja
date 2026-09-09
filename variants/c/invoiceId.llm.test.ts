import { describe, expect, it } from "vitest";

import { parseInvoiceId } from "../src/invoiceId";

/**
 * Oracle dla tych testow pochodzi wylacznie z docs/SPEC.md, sekcja 2
 * ("Identyfikator faktury").
 */
describe("parseInvoiceId - docs/SPEC.md sekcja 2", () => {
  describe("format i wynik", () => {
    it("rozklada poprawny identyfikator na rok, miesiac i numer kolejny", () => {
      // SPEC sekcja 2, "Format" + "Wynik": FV/RRRR/MM/NNNN -> { year, month, seq }
      // jako liczby calkowite (bez wiodacych zer); przyklad z SPEC: FV/2026/09/0042
      expect(parseInvoiceId("FV/2026/09/0042")).toEqual({
        year: 2026,
        month: 9,
        seq: 42,
      });
    });

    it("zwraca liczby calkowite bez wiodacych zer", () => {
      // SPEC sekcja 2, "Wynik": pola year, month, seq jako liczby calkowite
      const parsed = parseInvoiceId("FV/2000/01/0001");
      expect(parsed).toEqual({ year: 2000, month: 1, seq: 1 });
      for (const value of Object.values(parsed)) {
        expect(Number.isInteger(value)).toBe(true);
      }
    });

    it("ignoruje biale znaki na poczatku i koncu", () => {
      // SPEC sekcja 2: "Biale znaki na poczatku i koncu sa ignorowane."
      expect(parseInvoiceId("  FV/2026/09/0042  ")).toEqual({
        year: 2026,
        month: 9,
        seq: 42,
      });
      expect(parseInvoiceId("\tFV/2026/09/0042\n")).toEqual({
        year: 2026,
        month: 9,
        seq: 42,
      });
    });

    it("akceptuje wszystkie miesiace z zakresu 01-12", () => {
      // SPEC sekcja 2, "Format": MM to dokladnie dwie cyfry z zakresu 01-12
      for (let month = 1; month <= 12; month = month + 1) {
        const mm = String(month).padStart(2, "0");
        expect(parseInvoiceId(`FV/2026/${mm}/0007`)).toEqual({
          year: 2026,
          month,
          seq: 7,
        });
      }
    });

    it("akceptuje najwyzszy numer kolejny", () => {
      // SPEC sekcja 2, "Format": NNNN to dokladnie cztery cyfry
      expect(parseInvoiceId("FV/2026/12/9999")).toEqual({
        year: 2026,
        month: 12,
        seq: 9999,
      });
    });
  });

  describe("walidacja", () => {
    it("odrzuca wartosc, ktora nie jest typu string", () => {
      // SPEC sekcja 2, "Walidacja":
      // raw nie jest typu string -> TypeError: invoice id must be a string
      for (const bad of [42, null, undefined, {}, ["FV/2026/09/0042"]] as unknown[]) {
        expect(() => parseInvoiceId(bad as string)).toThrow(TypeError);
        expect(() => parseInvoiceId(bad as string)).toThrow(
          "invoice id must be a string",
        );
      }
    });

    it("odrzuca wartosc niepasujaca do formatu", () => {
      // SPEC sekcja 2, "Walidacja":
      // wartosc nie pasuje do formatu -> Error: malformed invoice id
      const malformed = [
        "",
        "FV/2026/09",
        "FV/2026/09/0042/1",
        "FV/2026/9/0042", // MM musi miec dokladnie dwie cyfry
        "FV/2026/009/0042",
        "FV/2026/00/0042", // miesiac poza zakresem 01-12
        "FV/2026/13/0042",
        "FV/2026/09/042", // NNNN musi miec dokladnie cztery cyfry
        "FV/2026/09/00042",
        "FV/26/09/0042", // RRRR musi miec cztery cyfry
        "IN/2026/09/0042", // prefiks jest staly
        "fv/2026/09/0042",
        "FV-2026-09-0042",
        "FV/2026/09/00a2",
        "FV/2026 /09/0042", // biale znaki tylko na brzegach sa ignorowane
      ];
      for (const raw of malformed) {
        expect(() => parseInvoiceId(raw), raw).toThrow("malformed invoice id");
      }
    });

    it("odrzuca rok poza zakresem 2000-2100", () => {
      // SPEC sekcja 2, "Walidacja":
      // rok poza zakresem 2000-2100 -> RangeError: year out of supported range
      for (const raw of ["FV/1999/09/0042", "FV/0000/09/0042", "FV/2101/09/0042", "FV/9999/09/0042"]) {
        expect(() => parseInvoiceId(raw), raw).toThrow(RangeError);
        expect(() => parseInvoiceId(raw), raw).toThrow(
          "year out of supported range",
        );
      }
    });

    it("akceptuje granice zakresu lat", () => {
      // SPEC sekcja 2, "Walidacja": zakres 2000-2100 jest domkniety
      expect(parseInvoiceId("FV/2000/09/0042").year).toBe(2000);
      expect(parseInvoiceId("FV/2100/09/0042").year).toBe(2100);
    });

    it("odrzuca numer kolejny 0000", () => {
      // SPEC sekcja 2, "Walidacja":
      // numer kolejny rowny 0000 -> RangeError: sequence number must not be zero
      expect(() => parseInvoiceId("FV/2026/09/0000")).toThrow(RangeError);
      expect(() => parseInvoiceId("FV/2026/09/0000")).toThrow(
        "sequence number must not be zero",
      );
    });
  });
});
