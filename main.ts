import { route } from "@std/http/unstable-route";
import { STATUS_CODE } from "@std/http";
import { routes } from "./pages/mod.ts";

Deno.serve(
  route(
    routes,
    () => new Response("Not Found", { status: STATUS_CODE.NotFound }),
  ),
);
