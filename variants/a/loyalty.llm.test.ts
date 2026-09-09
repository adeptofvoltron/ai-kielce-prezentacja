import { describe, expect, it } from "vitest";

import { awardPoints } from "../src/loyalty";

describe("awardPoints - walidacja wejscia", () => {
  it("odrzuca NaN w wartosci zamowienia", () => {
    expect(() => awardPoints(Number.NaN, 0)).toThrow(TypeError);
    expect(() => awardPoints(Number.NaN, 0)).toThrow("amounts must be finite numbers");
  });

  it("odrzuca NaN w wydatkach zyciowych", () => {
    expect(() => awardPoints(100, Number.NaN)).toThrow(TypeError);
  });

  it("odrzuca nieskonczonosci w obu argumentach", () => {
    expect(() => awardPoints(Number.POSITIVE_INFINITY, 0)).toThrow(TypeError);
    expect(() => awardPoints(0, Number.NEGATIVE_INFINITY)).toThrow(TypeError);
  });

  it("odrzuca ujemna wartosc zamowienia", () => {
    expect(() => awardPoints(-1, 0)).toThrow(RangeError);
    expect(() => awardPoints(-1, 0)).toThrow("amounts must not be negative");
  });

  it("odrzuca ujemne wydatki zyciowe", () => {
    expect(() => awardPoints(0, -0.01)).toThrow(RangeError);
  });

  it("przyjmuje same zera", () => {
    expect(awardPoints(0, 0)).toBe(0);
  });
});

describe("awardPoints - klient standardowy", () => {
  it("przyznaje 1 punkt za kazde pelne 10 zl", () => {
    expect(awardPoints(10, 0)).toBe(1);
    expect(awardPoints(100, 0)).toBe(10);
    expect(awardPoints(1234, 0)).toBe(123);
  });

  it("obcina czesc niepelna w dol", () => {
    expect(awardPoints(9.99, 0)).toBe(0);
    expect(awardPoints(19.99, 0)).toBe(1);
    expect(awardPoints(10.5, 0)).toBe(1);
  });
});

describe("awardPoints - progr VIP", () => {
  it("nie podwaja punktow dokladnie na progu 5000", () => {
    expect(awardPoints(100, 5000)).toBe(10);
  });

  it("nie podwaja punktow ponizej progu", () => {
    expect(awardPoints(100, 4999.99)).toBe(10);
  });

  it("podwaja punkty powyzej progu", () => {
    expect(awardPoints(100, 5000.01)).toBe(20);
    expect(awardPoints(100, 100000)).toBe(20);
  });

  it("podwojenie zera nadal daje zero", () => {
    expect(awardPoints(0, 9999)).toBe(0);
    expect(awardPoints(9, 9999)).toBe(0);
  });
});

describe("awardPoints - limit punktow", () => {
  it("nie przycina wyniku dokladnie na limicie 5000", () => {
    expect(awardPoints(50000, 0)).toBe(5000);
    expect(awardPoints(25000, 6000)).toBe(5000);
  });

  it("przycina wynik powyzej limitu dla klienta standardowego", () => {
    expect(awardPoints(50010, 0)).toBe(5000);
    expect(awardPoints(10_000_000, 0)).toBe(5000);
  });

  it("przycina wynik powyzej limitu dla VIP", () => {
    expect(awardPoints(25010, 6000)).toBe(5000);
    expect(awardPoints(40000, 5001)).toBe(5000);
  });

  it("VIP osiaga limit przy dwukrotnie mniejszym zamowieniu", () => {
    expect(awardPoints(30000, 0)).toBe(3000);
    expect(awardPoints(30000, 6000)).toBe(5000);
  });
});
