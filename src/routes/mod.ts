import { Route } from "@std/http/unstable-route";
import { routes as draftRoutes } from "../features/draft/mod.ts";
import { page } from "../html/mod.ts";

export const routes: Route[] = [
  ...draftRoutes,
  {
    pattern: new URLPattern({ pathname: "*" }),
    handler: (_req) => page("index"),
  },
];
