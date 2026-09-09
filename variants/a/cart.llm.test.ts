import { beforeEach, describe, expect, it } from "vitest";

import { Cart } from "../src/cart";

describe("Cart.add - walidacja ceny", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("odrzuca cene niecalkowita", () => {
    expect(() => cart.add("A", 10.5, 1)).toThrow(RangeError);
    expect(() => cart.add("A", 10.5, 1)).toThrow(
      "price must be a non-negative integer of grosz",
    );
  });

  it("odrzuca cene ujemna", () => {
    expect(() => cart.add("A", -1, 1)).toThrow(RangeError);
  });

  it("odrzuca cene NaN i Infinity", () => {
    expect(() => cart.add("A", Number.NaN, 1)).toThrow(RangeError);
    expect(() => cart.add("A", Number.POSITIVE_INFINITY, 1)).toThrow(RangeError);
  });

  it("przyjmuje cene zerowa", () => {
    cart.add("GRATIS", 0, 3);
    expect(cart.total()).toBe(0);
  });
});

describe("Cart.add - walidacja ilosci", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("odrzuca ilosc zerowa", () => {
    expect(() => cart.add("A", 100, 0)).toThrow(RangeError);
    expect(() => cart.add("A", 100, 0)).toThrow("quantity must be a positive integer");
  });

  it("odrzuca ilosc ujemna", () => {
    expect(() => cart.add("A", 100, -2)).toThrow(RangeError);
  });

  it("odrzuca ilosc niecalkowita", () => {
    expect(() => cart.add("A", 100, 1.5)).toThrow(RangeError);
  });

  it("odrzuca ilosc NaN", () => {
    expect(() => cart.add("A", 100, Number.NaN)).toThrow(RangeError);
  });

  it("odrzucona pozycja nie trafia do koszyka", () => {
    expect(() => cart.add("A", 100, 0)).toThrow(RangeError);
    expect(cart.total()).toBe(0);
  });
});

describe("Cart.add - scalanie pozycji", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("dodaje nowa pozycje", () => {
    cart.add("A", 250, 2);
    expect(cart.total()).toBe(500);
  });

  it("sumuje ilosc dla tego samego SKU", () => {
    cart.add("A", 250, 2);
    cart.add("A", 250, 3);
    expect(cart.total()).toBe(1250);
  });

  it("zachowuje cene z pierwszego dodania przy scalaniu", () => {
    cart.add("A", 250, 1);
    cart.add("A", 999, 1);
    expect(cart.total()).toBe(500);
  });

  it("trzyma osobne pozycje dla roznych SKU", () => {
    cart.add("A", 250, 2);
    cart.add("B", 100, 1);
    expect(cart.total()).toBe(600);
  });

  it("rozroznia SKU po wielkosci liter", () => {
    cart.add("a", 100, 1);
    cart.add("A", 100, 1);
    expect(cart.total()).toBe(200);
  });
});

describe("Cart.remove", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
    cart.add("A", 100, 5);
  });

  it("odrzuca ilosc zerowa, ujemna i niecalkowita", () => {
    expect(() => cart.remove("A", 0)).toThrow("quantity must be a positive integer");
    expect(() => cart.remove("A", -1)).toThrow(RangeError);
    expect(() => cart.remove("A", 1.5)).toThrow(RangeError);
    expect(() => cart.remove("A", Number.NaN)).toThrow(RangeError);
  });

  it("odrzuca SKU nieobecne w koszyku", () => {
    expect(() => cart.remove("B", 1)).toThrow("sku not in cart");
  });

  it("waliduje ilosc przed sprawdzeniem SKU", () => {
    expect(() => cart.remove("B", 0)).toThrow("quantity must be a positive integer");
  });

  it("zmniejsza ilosc pozycji", () => {
    cart.remove("A", 2);
    expect(cart.total()).toBe(300);
  });

  it("pozwala zejsc dokladnie do zera", () => {
    cart.remove("A", 5);
    expect(cart.total()).toBe(0);
  });

  it("pozycja o ilosci zero nadal istnieje i przyjmuje kolejne dodania", () => {
    cart.remove("A", 5);
    cart.add("A", 999, 2);
    expect(cart.total()).toBe(200);
  });

  it("pozwala zejsc ponizej zera, co wykrywa dopiero total()", () => {
    expect(() => cart.remove("A", 6)).not.toThrow();
    expect(() => cart.total()).toThrow(RangeError);
    expect(() => cart.total()).toThrow("cart quantity underflow");
  });

  it("ujemna ilosc jednej pozycji psuje caly koszyk", () => {
    cart.add("B", 100, 1);
    cart.remove("A", 10);
    expect(() => cart.total()).toThrow("cart quantity underflow");
  });
});

describe("Cart.applyCoupon", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("odrzuca nieznany kupon", () => {
    cart.add("A", 100, 1);
    expect(() => cart.applyCoupon("NOPE")).toThrow("unknown coupon");
  });

  it("odrzuca kupon o innej wielkosci liter", () => {
    cart.add("A", 100, 1);
    expect(() => cart.applyCoupon("save10")).toThrow("unknown coupon");
  });

  it("odrzuca kupon na pustym koszyku", () => {
    expect(() => cart.applyCoupon("SAVE10")).toThrow(
      "cannot apply coupon to an empty cart",
    );
  });

  it("nieznany kod ma pierwszenstwo nad pustym koszykiem", () => {
    expect(() => cart.applyCoupon("NOPE")).toThrow("unknown coupon");
  });

  it("SAVE10 obniza wartosc o 10 procent", () => {
    cart.add("A", 1000, 1);
    cart.applyCoupon("SAVE10");
    expect(cart.total()).toBe(900);
  });

  it("HALF obniza wartosc o 50 procent", () => {
    cart.add("A", 1000, 1);
    cart.applyCoupon("HALF");
    expect(cart.total()).toBe(500);
  });

  it("kolejny kupon nadpisuje poprzedni zamiast sie kumulowac", () => {
    cart.add("A", 1000, 1);
    cart.applyCoupon("SAVE10");
    cart.applyCoupon("HALF");
    expect(cart.total()).toBe(500);
  });

  it("nadpisanie dziala rowniez w kierunku mniejszego rabatu", () => {
    cart.add("A", 1000, 1);
    cart.applyCoupon("HALF");
    cart.applyCoupon("SAVE10");
    expect(cart.total()).toBe(900);
  });

  it("kupon obowiazuje takze pozycje dodane po jego uzyciu", () => {
    cart.add("A", 1000, 1);
    cart.applyCoupon("HALF");
    cart.add("B", 1000, 1);
    expect(cart.total()).toBe(1000);
  });

  it("kod dziedziczony z prototypu Object nie jest odrzucany i psuje total", () => {
    cart.add("A", 1000, 1);
    expect(() => cart.applyCoupon("toString")).not.toThrow();
    expect(cart.total()).toBeNaN();
  });
});

describe("Cart.total", () => {
  let cart: Cart;

  beforeEach(() => {
    cart = new Cart();
  });

  it("pusty koszyk ma wartosc zero", () => {
    expect(cart.total()).toBe(0);
  });

  it("sumuje cene razy ilosc dla wszystkich pozycji", () => {
    cart.add("A", 199, 3);
    cart.add("B", 1050, 2);
    expect(cart.total()).toBe(597 + 2100);
  });

  it("zaokragla wynik rabatu do pelnych groszy w gore od polowy", () => {
    cart.add("A", 5, 1);
    cart.applyCoupon("HALF");
    expect(cart.total()).toBe(3);
  });

  it("zaokragla wynik rabatu w dol ponizej polowy", () => {
    cart.add("A", 101, 1);
    cart.applyCoupon("SAVE10");
    expect(cart.total()).toBe(91);
  });

  it("jest idempotentny", () => {
    cart.add("A", 333, 3);
    cart.applyCoupon("SAVE10");
    expect(cart.total()).toBe(cart.total());
  });
});
