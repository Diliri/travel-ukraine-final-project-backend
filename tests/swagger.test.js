import test from "node:test";
import assert from "node:assert/strict";
import { swaggerSpec } from "../src/docs/swagger.js";

test("OpenAPI contract documents story creation", () => {
  const operation = swaggerSpec.paths["/api/stories"].post;

  assert.equal(operation.requestBody.required, true);
  assert.ok(operation.responses[201]);
  assert.ok(operation.security);
});

test("OpenAPI contract documents public recommendations", () => {
  const operation =
    swaggerSpec.paths["/api/stories/{storyId}/recommendations"].get;

  assert.equal(operation.security, undefined);
  assert.ok(operation.responses[200]);
  assert.equal(operation.parameters[2].schema.default, 3);
});
