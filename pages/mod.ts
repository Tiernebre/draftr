import { Route } from "@std/http/unstable-route";
import { serveDir } from "@std/http/file-server";
import { page } from "./layout.ts";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () =>
      page({
        body: `<h1>Home</h1>`,
        head: `<link rel="stylesheet" href="./index.css">`,
        title: "Draftr",
      }),
  },
  {
    pattern: new URLPattern({ pathname: "/*.css" }),
    handler: (req) =>
      serveDir(req, {
        fsRoot: import.meta.dirname,
      }),
  },
];
