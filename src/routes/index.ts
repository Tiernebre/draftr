import { Route } from "@std/http/unstable-route";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "*" }),
    handler: (_req) => new Response("index"),
  },
];
