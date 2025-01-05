import { randomUUID } from "node:crypto";
import { createAccount } from "./account.ts";
import { insertSession, selectSession } from "./session.ts";
import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";
import { sql } from "./sql.ts";
import { assertFalse } from "@std/assert";
import { afterAll, describe, it } from "@std/testing/bdd";

describe("session", () => {
  afterAll(async () => {
    await sql.end();
  });

  it("inserts a session", async () => {
    const { person_id } = await createAccount({
      username: `username-${randomUUID()}`,
      password: "password",
    });
    const session = await insertSession(person_id);
    assert(session.id);
    assert(session.created_at);
    assertEquals(session.person_id, person_id);
  });

  it("selects a session", async () => {
    const { person_id } = await createAccount({
      username: `username-${randomUUID()}`,
      password: "password",
    });
    const session = await insertSession(person_id);
    assertEquals(session, await selectSession(session.id));
  });

  it("returns an empty session", async () => {
    assertFalse(await selectSession(randomUUID()));
  });
});
