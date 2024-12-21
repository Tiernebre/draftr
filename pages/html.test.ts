import { assertEquals } from "@std/assert";
import { html } from "./html.ts";

Deno.test("templates an empty string", () => {
  assertEquals(html``, "");
});
