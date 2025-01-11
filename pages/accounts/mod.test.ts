import { DOMParser } from "@b-fuze/deno-dom";
import { assert, assertEquals } from "@std/assert";
import { it } from "@std/testing/bdd";
import { createWebTestingSuite } from "../../test/lib.ts";
import { METHOD } from "@std/http/unstable-method";
import { randomUUID } from "node:crypto";
import { STATUS_CODE } from "@std/http/status";
import { getSetCookies } from "@std/http";
import { SESSION_COOKIE_NAME } from "../lib/session.ts";

createWebTestingSuite("accounts page", () => {
  it("renders the form on GET", async () => {
    const response = await fetch("http://localhost:8000/accounts/");
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    assert(doc.querySelector("form"));
  });

  it("creates an account and logs in on POST", async () => {
    const formData = new FormData();
    const username = randomUUID();
    formData.append("username", username);
    formData.append("password", "password");
    const response = await fetch("http://localhost:8000/accounts/", {
      method: METHOD.Post,
      redirect: "manual",
      body: new URLSearchParams(formData as unknown as Record<string, string>),
    });
    await response.body?.cancel();
    assertEquals(response.status, STATUS_CODE.MovedPermanently);
    const headers = response.headers;
    assertEquals(headers.get("location"), "/");
    const sessionCookie = getSetCookies(headers).find((cookie) =>
      cookie.name === SESSION_COOKIE_NAME
    );
    assert(sessionCookie);
    assert(sessionCookie.value);
    assert(sessionCookie.secure);
    assertEquals(sessionCookie.sameSite, "Strict");
  });
});
