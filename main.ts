import { route } from "@std/http/unstable-route";
import { STATUS_CODE } from "@std/http";
import { routes } from "./pages/mod.ts";
import { sql } from "./lib/mod.ts";

const [result] = await sql`SELECT 1`;
console.log({ result });

Deno.serve(
  route(
    routes,
    () => new Response("Not Found", { status: STATUS_CODE.NotFound }),
  ),
);
