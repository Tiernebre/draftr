import { assert, assertFalse } from "@std/assert";
import { getSession, SESSION_COOKIE_NAME } from "./session.ts";
import { randomUUID } from "node:crypto";
import { createAccount } from "../lib/account.ts";
import { insertSession } from "../lib/session.ts";
import { sql } from "../lib/sql.ts";

Deno.test("returns properly for a sessionless request", async () => {
  const request = new Request("http://0.0.0.0");
  assertFalse(await getSession(request));
});

Deno.test("gets a session", async () => {
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
  await sql.end();
});
