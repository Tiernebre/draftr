import { Route } from "@std/http/unstable-route";
import { page } from "../../html.ts";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: (_req) => page("home"),
  },
];
