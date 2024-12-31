import { Route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";
import { page } from "./page.ts";
import { routes as draftRoutes } from "./drafts/mod.ts";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () =>
      page({
        body: /* html */ `<h1>
          Home</h1>
          <p>
            <a href="/drafts/">Drafts</a>
          </p>
        `,
        head: /* html */ `<link rel="stylesheet" href="./index.css">`,
        title: "Draftr",
      }),
  },
  {
    pattern: new URLPattern({ pathname: "*.css" }),
    handler: (req) =>
      serveDir(req, {
        fsRoot: import.meta.dirname,
      }),
  },
  ...draftRoutes,
];
