import { route } from "@std/http/unstable-route";
import { routes } from "./mod.ts";
import { DOMParser } from "@b-fuze/deno-dom";
import { assert } from "@std/assert";

Deno.serve(route(routes, () => new Response("Not Found")));

Deno.test("renders the form on GET", async () => {
  const response = await fetch("http://localhost:8000/accounts");
  const html = await response.text();
  const doc = new DOMParser().parseFromString(html, "text/html");
  assert(doc.querySelector("form"));
});
