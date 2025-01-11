import { DOMParser } from "@b-fuze/deno-dom";
import { assert } from "@std/assert";
import { it } from "@std/testing/bdd";
import { createWebTestingSuite } from "../../test/lib.ts";

createWebTestingSuite("accounts page", () => {
  it("renders the form on GET", async () => {
    const response = await fetch("http://localhost:8000/accounts/");
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    assert(doc.querySelector("form"));
  });
});
