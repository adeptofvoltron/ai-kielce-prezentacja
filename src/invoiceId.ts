export interface InvoiceId {
  year: number;
  month: number;
  seq: number;
}

/**
 * Parsuje identyfikator faktury na czesci skladowe.
 * Regula biznesowa: docs/SPEC.md, sekcja 2.
 */
export function parseInvoiceId(raw: string): InvoiceId {
  if (typeof raw !== "string") {
    throw new TypeError("invoice id must be a string");
  }

  const match = /^FV\/(\d{4})\/(0[1-9]|1[0-2])\/(\d{4})$/.exec(raw.trim());
  if (match === null) {
    throw new Error("malformed invoice id");
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const seq = Number(match[3]);

  if (year < 2000 || year > 2100) {
    throw new RangeError("year out of supported range");
  }
  if (seq === 0) {
    throw new RangeError("sequence number must not be zero");
  }

  return { year, month, seq };
}
