import { assertEquals } from "@std/assert/equals";
import { CreateAccountRequest } from "../types/dto/account.ts";
import { sql } from "./sql.ts";
import { randomUUID } from "node:crypto";
import { assert, assertNotEquals } from "@std/assert";
import { createAccount } from "./account.ts";

Deno.test("creates an account", async () => {
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
  await sql.end();
});
