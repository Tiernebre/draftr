import { assertEquals, assertThrows } from "@std/assert";
import { getFirstElement, getFirstElementOrThrow } from "./array.ts";
import { Optional } from "./optional.ts";

Deno.test("getFirstElement", () => {
  const cases: [unknown[], Optional<unknown>][] = [
    [[], undefined],
    [[1], 1],
    [[1, 2], 1],
    [[2, 1], 2],
  ];

  cases.forEach(([input, expected]) => {
    assertEquals(getFirstElement(input), expected);
  });
});

Deno.test("getFirstElementOrThrow throws for empty", () => {
  const error = new Error("Expected Error");
  assertThrows(() => getFirstElementOrThrow(error)([]), error.message);
});

Deno.test("getFirstElementOrThrow returns present value", () => {
  const error = new Error("Unexpected Error");
  const value = 1;
  assertEquals(getFirstElementOrThrow(error)([value]), value);
});
