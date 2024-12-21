import { assertEquals } from "@std/assert";
import { html } from "./html.ts";

Deno.test("templates an empty string", () => {
  assertEquals(html``, "");
});

Deno.test("templates a non tagged string", () => {
  assertEquals(html`<h1>hello world</h1>`, "<h1>hello world</h1>");
});

Deno.test("templates a tagged string", () => {
  const tag = "hello world";
  assertEquals(html`<h1>${tag}</h1>`, `<h1>${tag}</h1>`);
});
