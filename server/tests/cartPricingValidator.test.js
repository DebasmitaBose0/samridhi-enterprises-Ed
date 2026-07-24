import test from "node:test";
import assert from "node:assert";
import Part from "../models/partModel.js";
import { validateAndFetchFreshPrices } from "../utils/cartPricingValidator.js";

test("cartPricingValidator - should validate and calculate subtotal correctly", async () => {
  const originalFindOne = Part.findOne;

  // Mock Part.findOne
  Part.findOne = async (query) => {
    if (query._id === "part1") {
      return {
        _id: "part1",
        name: "Spark Plug",
        price: 15,
        stock: 10,
      };
    }
    if (query._id === "part2") {
      return {
        _id: "part2",
        name: "Brake Pad",
        price: 45,
        stock: 5,
      };
    }
    return null;
  };

  try {
    const items = [
      { part: "part1", name: "Spark Plug", quantity: 2, image: "plug.jpg" },
      { part: "part2", name: "Brake Pad", quantity: 1, image: "pad.jpg" },
    ];

    const result = await validateAndFetchFreshPrices(items);

    assert.strictEqual(result.subtotal, 75); // (15 * 2) + (45 * 1) = 75
    assert.strictEqual(result.validatedItems.length, 2);
    assert.strictEqual(result.validatedItems[0].price, 15);
    assert.strictEqual(result.validatedItems[1].price, 45);
  } finally {
    // Restore original function
    Part.findOne = originalFindOne;
  }
});

test("cartPricingValidator - should throw error if stock is insufficient", async () => {
  const originalFindOne = Part.findOne;

  Part.findOne = async (query) => {
    if (query._id === "part1") {
      return {
        _id: "part1",
        name: "Spark Plug",
        price: 15,
        stock: 1,
      };
    }
    return null;
  };

  try {
    const items = [
      { part: "part1", name: "Spark Plug", quantity: 5, image: "plug.jpg" },
    ];

    await assert.rejects(
      async () => {
        await validateAndFetchFreshPrices(items);
      },
      /Insufficient stock for Spark Plug/
    );
  } finally {
    Part.findOne = originalFindOne;
  }
});
