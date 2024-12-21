import { Route } from "@std/http/unstable-route";
import { routes as draftRoutes } from "../features/draft/mod.ts";

export const routes: Route[] = [
  ...draftRoutes,
  {
    pattern: new URLPattern({ pathname: "*" }),
    handler: (_req) => new Response("index"),
  },
];
