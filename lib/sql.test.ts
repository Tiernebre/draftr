import { sql } from "./sql.ts";
import { assertEquals } from "https://deno.land/std@0.132.0/testing/asserts.ts";

Deno.test("connects", async () => {
  const [result] = await sql`SELECT 1 as result`;
  assertEquals(result.result, 1);
  await sql.end();
});
