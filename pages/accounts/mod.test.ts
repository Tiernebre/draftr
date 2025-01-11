import { route } from "@std/http/unstable-route";
import { routes } from "./mod.ts";
import { DOMParser } from "@b-fuze/deno-dom";
import { assert } from "@std/assert";
import { afterAll, beforeAll, describe, it } from "@std/testing/bdd";

describe("accounts page", () => {
  let server: Deno.HttpServer;

  beforeAll(() => {
    server = Deno.serve(route(routes, () => new Response("Not Found")));
  });

  it("renders the form on GET", async () => {
    const response = await fetch("http://localhost:8000/accounts/");
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    assert(doc.querySelector("form"));
  });

  afterAll(async () => {
    await server.shutdown();
  });
});
