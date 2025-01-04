import { Route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";
import { page } from "./lib/page.ts";
import { routes as draftRoutes } from "./drafts/mod.ts";
import { routes as accountRoutes } from "./accounts/mod.ts";
import { withSessionHandler } from "./lib/session.ts";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: withSessionHandler((_request, session) =>
      page({
        body: /* html */ `<h1>
          Home</h1>
          <p>
            <a href="/drafts/">Drafts</a>
          </p>
          <p>
            ${JSON.stringify(session)}
          </p>
        `,
        head: /* html */ `<link rel="stylesheet" href="./index.css">`,
        title: "Draftr",
      })
    ),
  },
  {
    pattern: new URLPattern({ pathname: "*.css" }),
    handler: (req) =>
      serveDir(req, {
        fsRoot: import.meta.dirname,
      }),
  },
  ...draftRoutes,
  ...accountRoutes,
];
