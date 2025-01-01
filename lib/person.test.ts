import { assert } from "@std/assert";
import { insertPerson } from "./person.ts";
import { sql } from "./sql.ts";

Deno.test("inserts a person", async () => {
  const person = await insertPerson();
  assert(person.id);
  await sql.end();
});
