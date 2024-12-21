import { Route } from "@std/http/unstable-route";
import { routes as homeRoutes } from "./features/home/mod.ts";
import { routes as draftRoutes } from "./features/draft/mod.ts";

export const routes: Route[] = [
  ...homeRoutes,
  ...draftRoutes,
];
