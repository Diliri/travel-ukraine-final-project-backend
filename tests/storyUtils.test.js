import test from "node:test";
import assert from "node:assert/strict";
import { buildStoryDescription } from "../src/utils/story.js";

test("story description normalizes whitespace", () => {
  assert.equal(
    buildStoryDescription("  Подорож   мальовничими\nКарпатами  "),
    "Подорож мальовничими Карпатами",
  );
});

test("story description is limited to 160 characters", () => {
  const result = buildStoryDescription("а".repeat(200));

  assert.equal(result.length, 160);
  assert.ok(result.endsWith("…"));
});
