import { assertEquals, assertThrows } from "@std/assert";
import { orElseThrow } from "./optional.ts";

Deno.test("orElseThrow returns a present value", () => {
  const value = 1;
  assertEquals(orElseThrow(new Error("Unexpected Error"))(value), value);
});

Deno.test("orElseThrow handles the zero case", () => {
  const value = 0;
  assertEquals(orElseThrow(new Error("Unexpected Error"))(value), value);
});

Deno.test("orElseThrow throws an error if empty", () => {
  const cases = [null, undefined];
  const error = new Error("Expected Error");
  cases.forEach((value) => {
    assertThrows(() => orElseThrow(error)(value), error.message);
  });
});
