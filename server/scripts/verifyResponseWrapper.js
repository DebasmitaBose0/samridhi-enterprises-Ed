import assert from "assert";
import responseWrapper from "../middleware/responseWrapper.js";

function createMockRes() {
  const mockRes = {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
  return mockRes;
}

const req = {};
const res = createMockRes();
let nextCalled = false;

responseWrapper(req, res, () => {
  nextCalled = true;
});

assert.strictEqual(nextCalled, true, "middleware should call next()");
assert.strictEqual(typeof res.sendSuccess, "function", "res.sendSuccess should be a function");
assert.strictEqual(typeof res.sendError, "function", "res.sendError should be a function");

res.sendSuccess({ test: 123 });
assert.strictEqual(res.statusCode, 200);
assert.deepStrictEqual(res.body, { success: true, test: 123 });

res.sendSuccess({ id: 1 }, 201);
assert.strictEqual(res.statusCode, 201);
assert.deepStrictEqual(res.body, { success: true, id: 1 });

res.sendSuccess({ item: "book" }, "Created item successfully", 201);
assert.strictEqual(res.statusCode, 201);
assert.deepStrictEqual(res.body, { success: true, message: "Created item successfully", item: "book" });

res.sendError("Resource not found", 404);
assert.strictEqual(res.statusCode, 404);
assert.deepStrictEqual(res.body, { success: false, message: "Resource not found" });

res.sendError("Validation Error", 400, { field: "email" });
assert.strictEqual(res.statusCode, 400);
assert.deepStrictEqual(res.body, { success: false, message: "Validation Error", error: { field: "email" } });

console.log("✅ All responseWrapper verification tests passed!");
