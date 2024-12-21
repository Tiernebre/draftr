import { type Route, route } from "@std/http/unstable-route";
import { STATUS_CODE } from "@std/http";
import { serveDir } from "@std/http/file-server";

const routes: Route[] = [{
  pattern: new URLPattern({ pathname: "/*" }),
  handler: (req) =>
    serveDir(req, {
      fsRoot: ".",
    }),
}];

Deno.serve(
  route(
    routes,
    () => new Response("Not Found", { status: STATUS_CODE.NotFound }),
  ),
);
