import { describe, expect, it } from "vitest";

import { generateEmptyProductMessage, parsePrice } from "./lib";


const PRODUCTS = [
  { category: "Fruits", price: "$5", stocked: true, name: "Dragon" },
  { category: "Fruits", price: "$3", stocked: false, name: "Apple" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Carrot" },
];

const MAX_PRICE = Math.max(...PRODUCTS.map((p) => parsePrice(p.price)));

describe("parsePrice", () => {
  it("converts product price strings from controlled data", () => {
    const expected = PRODUCTS.map((p) => Number(p.price.replace("$", "")));
    const converted = PRODUCTS.map((p) => parsePrice(p.price));
    expect(converted).toEqual(expected);
  });
});

describe("generateEmptyProductMessage", () => {
  it("returns generic message when no filters active", () => {
    expect(generateEmptyProductMessage("", false, MAX_PRICE, MAX_PRICE)).toBe(
      "No products found"
    );
  });

  it("shows search term when only search filter active", () => {
  const { name } = PRODUCTS[1]; // Apple
    expect(
      generateEmptyProductMessage(name, false, MAX_PRICE, MAX_PRICE)
    ).toBe(`No products matching "${name}"`);
  });

  it("shows stock status when only stock filter active", () => {
    expect(generateEmptyProductMessage("", true, MAX_PRICE, MAX_PRICE)).toBe(
      "No products in stock"
    );
  });

  it("shows price limit when only price filter active", () => {
    expect(generateEmptyProductMessage("", false, 3, MAX_PRICE)).toBe(
      "No products under $3"
    );
  });

  it('combines two conditions with "and"', () => {
  const { name } = PRODUCTS[1]; // Apple
    expect(
      generateEmptyProductMessage(name, true, MAX_PRICE, MAX_PRICE)
    ).toBe(`No products matching "${name}" and in stock`);
  });

  it('combines three conditions with commas and "and"', () => {
  const { name } = PRODUCTS[0]; // Dragon
    expect(generateEmptyProductMessage(name, true, 2, MAX_PRICE)).toBe(
      `No products matching "${name}", in stock and under $2`
    );
  });
});
