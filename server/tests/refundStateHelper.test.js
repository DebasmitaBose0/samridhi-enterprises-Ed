import test from "node:test";
import assert from "node:assert";
import { getRefundStatusMap } from "../utils/refundStateHelper.js";

test("refundStateHelper - should return the correct refund status mapping", () => {
  const statusMap = getRefundStatusMap();

  assert.deepStrictEqual(statusMap, {
    NOT_REFUNDED: "Not Refunded",
    PENDING: "Pending",
    REFUNDED: "Refunded",
    FAILED: "Failed",
  });
});
