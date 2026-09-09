const VIP_THRESHOLD_PLN = 5000;
const POINTS_CAP = 5000;

/**
 * Punkty lojalnosciowe przyznane za zamowienie.
 * Regula biznesowa: docs/SPEC.md, sekcja 3.
 */
export function awardPoints(
  orderValuePLN: number,
  lifetimeSpendPLN: number,
): number {
  if (!Number.isFinite(orderValuePLN) || !Number.isFinite(lifetimeSpendPLN)) {
    throw new TypeError("amounts must be finite numbers");
  }
  if (orderValuePLN < 0 || lifetimeSpendPLN < 0) {
    throw new RangeError("amounts must not be negative");
  }

  let points = Math.floor(orderValuePLN / 10);

  if (lifetimeSpendPLN > VIP_THRESHOLD_PLN) {
    points = points * 2;
  }

  if (points > POINTS_CAP) {
    return POINTS_CAP;
  }
  return points;
}
