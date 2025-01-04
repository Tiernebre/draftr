import { randomUUID } from "node:crypto";
import { createAccount } from "./account.ts";
import { insertSession } from "./session.ts";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";
import { sql } from "./sql.ts";

Deno.test("inserts a session", async () => {
  const { person_id } = await createAccount({
    username: `username-${randomUUID()}`,
    password: "password",
  });
  const session = await insertSession(person_id);
  assert(session.id);
  assertEquals(session.person_id, person_id);
  await sql.end();
});
