import { describe, it, expect } from "vitest";
import { formatPrice, storeProducts } from "./store";

describe("store content", () => {
  it("formats whole-dollar cents with two decimal places", () => {
    expect(formatPrice(1200)).toBe("$12.00");
  });

  it("formats cents with a non-zero remainder correctly", () => {
    expect(formatPrice(1250)).toBe("$12.50");
  });

  it("has at least one product with the fields the store UI relies on", () => {
    expect(storeProducts.length).toBeGreaterThan(0);
    storeProducts.forEach((product) => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(typeof product.priceCents).toBe("number");
      expect(product.swatch).toBeTruthy();
    });
  });
});
