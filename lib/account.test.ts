import { assertEquals } from "@std/assert/equals";
import { CreateAccountRequest } from "../types/dto/account.ts";
import { sql } from "./sql.ts";
import { randomUUID } from "node:crypto";
import { assert, assertNotEquals } from "@std/assert";
import { createAccount, getAccount } from "./account.ts";
import { afterAll, describe, it } from "@std/testing/bdd";
import Argon2id from "@rabbit-company/argon2id";

describe("account", () => {
  afterAll(async () => {
    await sql.end();
  });

  it("creates an account", async () => {
    const request: CreateAccountRequest = {
      username: `username-${randomUUID()}`,
      password: "password",
    };
    const account = await createAccount(request);
    assert(account.id);
    assert(account.person_id);
    assertEquals(account.username, request.username);
    assert(account.password);
    assertNotEquals(account.password, request.password);
    assert(Argon2id.hashDecode(account.password));
  });

  it("gets an account", async () => {
    const request: CreateAccountRequest = {
      username: `username-${randomUUID()}`,
      password: "password",
    };
    const account = await createAccount(request);
    const gottenAccount = await getAccount(request);
    assertEquals(account, gottenAccount);
    assert(Argon2id.hashDecode(gottenAccount.password));
  });
});
