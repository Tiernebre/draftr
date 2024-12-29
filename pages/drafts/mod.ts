import { Route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";
import { page } from "../page.ts";

const pathname = "/drafts/";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname }),
    handler: () =>
      page({
        body: /* html */ `
        <h1>Drafts</h1>
        <p>
            <a href="/">Home</a>
        </p>
        `,
        head: `<link rel="stylesheet" href="./index.css">`,
        title: "Draftr | Drafts",
      }),
  },
  {
    pattern: new URLPattern({ pathname }),
    handler: (req) =>
      serveDir(req, {
        fsRoot: import.meta.dirname,
      }),
  },
];
