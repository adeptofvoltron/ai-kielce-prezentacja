export type Zone = "PL" | "EU" | "WORLD";

/**
 * Koszt dostawy zamowienia w zlotych.
 * Regula biznesowa: docs/SPEC.md, sekcja 1.
 */
export function calculateShipping(
  weightKg: number,
  zone: string,
  isPremium: boolean,
): number {
  if (!Number.isFinite(weightKg)) {
    throw new TypeError("weight must be a finite number");
  }
  if (weightKg <= 0) {
    throw new RangeError("weight must be positive");
  }
  if (weightKg > 100) {
    throw new RangeError("weight above carrier limit");
  }

  let base: number;
  if (zone === "PL") {
    base = 12;
  } else if (zone === "EU") {
    base = 29;
  } else {
    base = 79;
  }

  if (weightKg > 30) {
    base = base + 40;
  } else if (weightKg > 10) {
    base = base + 15;
  }

  if (isPremium) {
    base = base * 0.8;
  }

  return Math.round(base * 100) / 100;
}
