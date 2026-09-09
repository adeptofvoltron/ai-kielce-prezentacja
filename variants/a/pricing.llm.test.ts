import { describe, expect, it } from "vitest";

import { calculateShipping } from "../src/pricing";

describe("calculateShipping - walidacja wagi", () => {
  it("odrzuca NaN", () => {
    expect(() => calculateShipping(Number.NaN, "PL", false)).toThrow(TypeError);
    expect(() => calculateShipping(Number.NaN, "PL", false)).toThrow(
      "weight must be a finite number",
    );
  });

  it("odrzuca Infinity i -Infinity", () => {
    expect(() => calculateShipping(Number.POSITIVE_INFINITY, "PL", false)).toThrow(
      TypeError,
    );
    expect(() => calculateShipping(Number.NEGATIVE_INFINITY, "PL", false)).toThrow(
      TypeError,
    );
  });

  it("odrzuca zero", () => {
    expect(() => calculateShipping(0, "PL", false)).toThrow(RangeError);
    expect(() => calculateShipping(0, "PL", false)).toThrow("weight must be positive");
  });

  it("odrzuca -0 (traktowane jak zero)", () => {
    expect(() => calculateShipping(-0, "PL", false)).toThrow(RangeError);
  });

  it("odrzuca wagi ujemne", () => {
    expect(() => calculateShipping(-1, "EU", true)).toThrow(RangeError);
  });

  it("przyjmuje najmniejsza dodatnia wage", () => {
    expect(calculateShipping(Number.MIN_VALUE, "PL", false)).toBe(12);
  });

  it("przyjmuje graniczne 100 kg", () => {
    expect(calculateShipping(100, "PL", false)).toBe(52);
  });

  it("odrzuca wage powyzej 100 kg", () => {
    expect(() => calculateShipping(100.0001, "PL", false)).toThrow(RangeError);
    expect(() => calculateShipping(101, "PL", false)).toThrow(
      "weight above carrier limit",
    );
  });
});

describe("calculateShipping - stawka bazowa wg strefy", () => {
  it("PL kosztuje 12", () => {
    expect(calculateShipping(1, "PL", false)).toBe(12);
  });

  it("EU kosztuje 29", () => {
    expect(calculateShipping(1, "EU", false)).toBe(29);
  });

  it("WORLD kosztuje 79", () => {
    expect(calculateShipping(1, "WORLD", false)).toBe(79);
  });

  it("nieznana strefa wpada w stawke WORLD", () => {
    expect(calculateShipping(1, "MARS", false)).toBe(79);
    expect(calculateShipping(1, "", false)).toBe(79);
  });

  it("kody strefy sa wrazliwe na wielkosc liter", () => {
    expect(calculateShipping(1, "pl", false)).toBe(79);
    expect(calculateShipping(1, "eu", false)).toBe(79);
  });
});

describe("calculateShipping - dodatki wagowe", () => {
  it("nie dolicza nic do 10 kg wlacznie", () => {
    expect(calculateShipping(10, "PL", false)).toBe(12);
  });

  it("dolicza 15 powyzej 10 kg", () => {
    expect(calculateShipping(10.5, "PL", false)).toBe(27);
    expect(calculateShipping(30, "PL", false)).toBe(27);
  });

  it("dolicza 40 powyzej 30 kg", () => {
    expect(calculateShipping(30.0001, "PL", false)).toBe(52);
    expect(calculateShipping(90, "PL", false)).toBe(52);
  });

  it("dodatki nakladaja sie na kazda strefe", () => {
    expect(calculateShipping(20, "EU", false)).toBe(44);
    expect(calculateShipping(40, "EU", false)).toBe(69);
    expect(calculateShipping(20, "WORLD", false)).toBe(94);
    expect(calculateShipping(40, "WORLD", false)).toBe(119);
  });
});

describe("calculateShipping - rabat premium", () => {
  it("obniza cene o 20 procent", () => {
    expect(calculateShipping(1, "PL", true)).toBe(9.6);
    expect(calculateShipping(1, "EU", true)).toBe(23.2);
    expect(calculateShipping(1, "WORLD", true)).toBe(63.2);
  });

  it("liczy rabat po dodatkach wagowych", () => {
    expect(calculateShipping(20, "PL", true)).toBe(21.6);
    expect(calculateShipping(40, "PL", true)).toBe(41.6);
    expect(calculateShipping(40, "EU", true)).toBe(55.2);
    expect(calculateShipping(40, "WORLD", true)).toBe(95.2);
  });

  it("zwraca wynik zaokraglony do dwoch miejsc", () => {
    const value = calculateShipping(40, "EU", true);
    expect(Math.round(value * 100) / 100).toBe(value);
  });
});
