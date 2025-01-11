import { DOMParser } from "@b-fuze/deno-dom";
import { assert } from "@std/assert";
import { it } from "@std/testing/bdd";
import { createWebTestingSuite } from "../../test/lib.ts";
import { routes } from "./mod.ts";

const PATH = "http://localhost:8000/sessions/";

createWebTestingSuite("sessions page", routes, () => {
  it("renders the form on GET", async () => {
    const response = await fetch(PATH);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    assert(doc.querySelector("form"));
  });
});
