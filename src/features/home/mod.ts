import { Route } from "@std/http/unstable-route";
import { page } from "../../html.ts";
import { serveDir } from "@std/http/file-server";

export const routes: Route[] = [
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/" }),
    handler: (_req) =>
      page({
        content: "home",
        head: `<link rel="stylesheet" href="index.css">`,
      }),
  },
  {
    method: "GET",
    pattern: new URLPattern({ pathname: "/*" }),
    handler: (req) =>
      serveDir(req, {
        fsRoot: import.meta.dirname,
      }),
  },
];
