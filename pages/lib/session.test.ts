import { assert, assertEquals, assertFalse } from "@std/assert";
import {
  getSession,
  SESSION_COOKIE_NAME,
  withSessionHandler,
} from "./session.ts";
import { randomUUID } from "node:crypto";
import { createAccount } from "../../lib/account.ts";
import { sql } from "../../lib/sql.ts";
import { insertSession } from "../../lib/session.ts";
import { afterAll, describe, it } from "@std/testing/bdd";

describe("session", () => {
  afterAll(async () => {
    await sql.end();
  });

  it("returns properly for a sessionless request", async () => {
    const request = new Request("http://0.0.0.0");
    assertFalse(await getSession(request));
  });

  it("gets a session", async () => {
    const { person_id } = await createAccount({
      username: `username-${randomUUID()}`,
      password: "password",
    });
    const session = await insertSession(person_id);
    const request = new Request("http://0.0.0.0", {
      headers: {
        "Cookie": `${SESSION_COOKIE_NAME}=${session.id}`,
      },
    });
    const gottenSession = await getSession(request);
    assert(gottenSession);
  });

  it("can extend a session onto a route handler", async () => {
    const { person_id } = await createAccount({
      username: `username-${randomUUID()}`,
      password: "password",
    });
    const session = await insertSession(person_id);
    const request = new Request("http://0.0.0.0", {
      headers: {
        "Cookie": `${SESSION_COOKIE_NAME}=${session.id}`,
      },
    });
    const response = await withSessionHandler((_req, session) =>
      new Response(JSON.stringify(session))
    )(
      request,
    );
    assertEquals(await response.text(), JSON.stringify(session));
  });

  it("can extend lack of a session onto a route handler", async () => {
    const request = new Request("http://0.0.0.0");
    const response = await withSessionHandler((_req, session) =>
      new Response(JSON.stringify(session))
    )(
      request,
    );
    assertEquals(await response.text(), "");
  });
});
