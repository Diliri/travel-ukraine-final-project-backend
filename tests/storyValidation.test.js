import test from "node:test";
import assert from "node:assert/strict";
import { recommendationsQuerySchema } from "../src/validations/storyValidation.js";

test("recommendations pagination uses the UI default of three stories", () => {
  const { value, error } = recommendationsQuerySchema.validate({});

  assert.equal(error, undefined);
  assert.deepEqual(value, { page: 1, perPage: 3 });
});

test("recommendations pagination converts query strings to numbers", () => {
  const { value, error } = recommendationsQuerySchema.validate({
    page: "2",
    perPage: "2",
  });

  assert.equal(error, undefined);
  assert.deepEqual(value, { page: 2, perPage: 2 });
});

test("recommendations pagination rejects invalid values", () => {
  const { error } = recommendationsQuerySchema.validate({
    page: 0,
    perPage: 4,
  });

  assert.ok(error);
});
