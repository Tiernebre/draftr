import { Route } from "@std/http/unstable-route";
import { page } from "../../html.ts";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/drafts" }),
    handler: (_req) => page({ content: "drafts" }),
  },
];
