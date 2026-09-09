import { describe, expect, it } from "vitest";

import { parseInvoiceId } from "../src/invoiceId";

describe("parseInvoiceId - poprawne identyfikatory", () => {
  it("rozklada identyfikator na rok, miesiac i numer", () => {
    expect(parseInvoiceId("FV/2024/03/0007")).toEqual({
      year: 2024,
      month: 3,
      seq: 7,
    });
  });

  it("obsluguje wszystkie dozwolone miesiace", () => {
    for (let month = 1; month <= 12; month += 1) {
      const raw = `FV/2024/${String(month).padStart(2, "0")}/0001`;
      expect(parseInvoiceId(raw)).toEqual({ year: 2024, month, seq: 1 });
    }
  });

  it("przyjmuje graniczne lata 2000 i 2100", () => {
    expect(parseInvoiceId("FV/2000/01/0001").year).toBe(2000);
    expect(parseInvoiceId("FV/2100/12/9999").year).toBe(2100);
  });

  it("przyjmuje graniczne numery sekwencji", () => {
    expect(parseInvoiceId("FV/2024/01/0001").seq).toBe(1);
    expect(parseInvoiceId("FV/2024/01/9999").seq).toBe(9999);
  });

  it("ucina biale znaki na koncach", () => {
    expect(parseInvoiceId("  FV/2024/03/0007  ")).toEqual({
      year: 2024,
      month: 3,
      seq: 7,
    });
    expect(parseInvoiceId("\tFV/2024/03/0007\n")).toEqual({
      year: 2024,
      month: 3,
      seq: 7,
    });
  });
});

describe("parseInvoiceId - walidacja typu", () => {
  it("odrzuca wartosci nie bedace stringiem", () => {
    for (const value of [null, undefined, 42, {}, [], true]) {
      expect(() => parseInvoiceId(value as unknown as string)).toThrow(TypeError);
    }
    expect(() => parseInvoiceId(42 as unknown as string)).toThrow(
      "invoice id must be a string",
    );
  });
});

describe("parseInvoiceId - zle sformatowane identyfikatory", () => {
  const malformed = [
    "",
    "   ",
    "FV/2024/03",
    "FV/2024/03/0007/1",
    "FV/24/03/0007",
    "FV/20244/03/0007",
    "FV/2024/3/0007",
    "FV/2024/03/007",
    "FV/2024/03/00007",
    "fv/2024/03/0007",
    "FV-2024-03-0007",
    "PROFORMA/2024/03/0007",
    "FV/2024/00/0007",
    "FV/2024/13/0007",
    "FV/2024/99/0007",
    "FV/20a4/03/0007",
    "FV/2024/03/00o7",
    "FV / 2024 / 03 / 0007",
    "xFV/2024/03/0007",
    "FV/2024/03/0007x",
  ];

  it.each(malformed)("odrzuca %s", (raw) => {
    expect(() => parseInvoiceId(raw)).toThrow("malformed invoice id");
  });

  it("biale znaki w srodku nie sa usuwane", () => {
    expect(() => parseInvoiceId("FV/2024/0 3/0007")).toThrow("malformed invoice id");
  });
});

describe("parseInvoiceId - walidacja zakresow", () => {
  it("odrzuca rok ponizej 2000", () => {
    expect(() => parseInvoiceId("FV/1999/12/0001")).toThrow(RangeError);
    expect(() => parseInvoiceId("FV/0000/01/0001")).toThrow(
      "year out of supported range",
    );
  });

  it("odrzuca rok powyzej 2100", () => {
    expect(() => parseInvoiceId("FV/2101/01/0001")).toThrow(RangeError);
    expect(() => parseInvoiceId("FV/9999/01/0001")).toThrow(
      "year out of supported range",
    );
  });

  it("odrzuca zerowy numer sekwencji", () => {
    expect(() => parseInvoiceId("FV/2024/01/0000")).toThrow(RangeError);
    expect(() => parseInvoiceId("FV/2024/01/0000")).toThrow(
      "sequence number must not be zero",
    );
  });

  it("bledny rok ma pierwszenstwo nad zerowa sekwencja", () => {
    expect(() => parseInvoiceId("FV/1999/01/0000")).toThrow(
      "year out of supported range",
    );
  });
});
