interface CartLine {
  sku: string;
  priceGrosz: number;
  qty: number;
}

const COUPONS: Record<string, number> = {
  SAVE10: 10,
  HALF: 50,
};

/**
 * Koszyk zakupowy.
 * Regula biznesowa: docs/SPEC.md, sekcja 4.
 */
export class Cart {
  private lines: CartLine[] = [];
  private discountPct = 0;

  add(sku: string, priceGrosz: number, qty: number): void {
    if (!Number.isInteger(priceGrosz) || priceGrosz < 0) {
      throw new RangeError("price must be a non-negative integer of grosz");
    }
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError("quantity must be a positive integer");
    }

    const existing = this.lines.find((line) => line.sku === sku);
    if (existing === undefined) {
      this.lines.push({ sku, priceGrosz, qty });
    } else {
      existing.qty = existing.qty + qty;
    }
  }

  /** Zdejmuje wskazana liczbe sztuk z koszyka. */
  remove(sku: string, qty: number): void {
    if (!Number.isInteger(qty) || qty <= 0) {
      throw new RangeError("quantity must be a positive integer");
    }

    const existing = this.lines.find((line) => line.sku === sku);
    if (existing === undefined) {
      throw new Error("sku not in cart");
    }
    existing.qty = existing.qty - qty;
  }

  applyCoupon(code: string): void {
    const pct = COUPONS[code];
    if (pct === undefined) {
      throw new Error("unknown coupon");
    }
    if (this.lines.length === 0) {
      throw new Error("cannot apply coupon to an empty cart");
    }
    this.discountPct = pct;
  }

  /** Wartosc koszyka w groszach. */
  total(): number {
    let subtotal = 0;
    for (const line of this.lines) {
      if (line.qty < 0) {
        throw new RangeError("cart quantity underflow");
      }
      subtotal = subtotal + line.priceGrosz * line.qty;
    }
    const discounted = (subtotal * (100 - this.discountPct)) / 100;
    return Math.round(discounted);
  }
}
