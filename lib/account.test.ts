import { assertEquals } from "@std/assert/equals";
import { insertAccount } from "./account.ts";
import { insertPerson } from "./person.ts";
import { InsertAccountRequest } from "../types/dto/account.ts";
import { sql } from "./sql.ts";
import { randomUUID } from "node:crypto";
import { assert } from "@std/assert";

Deno.test("inserts an account", async () => {
  const { id: personId } = await insertPerson();
  const request: InsertAccountRequest = {
    username: `username-${randomUUID()}`,
    password: "password",
    personId,
  };
  const account = await insertAccount(request);
  assert(account.id);
  assertEquals(account, {
    id: account.id,
    username: request.username,
    password: request.password,
    person_id: request.personId,
  });
  await sql.end();
});
