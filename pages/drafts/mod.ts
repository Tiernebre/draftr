import { Route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";
import { page } from "../layout.ts";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/drafts/" }),
    handler: () =>
      page({
        body: `
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
    pattern: new URLPattern({ pathname: "/drafts/*.css" }),
    handler: (req) =>
      serveDir(req, {
        fsRoot: import.meta.dirname,
      }),
  },
];
