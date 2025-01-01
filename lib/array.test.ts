import { assertEquals } from "@std/assert";
import { getFirstElement } from "./array.ts";
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
