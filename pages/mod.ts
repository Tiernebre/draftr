import { Route } from "@std/http/unstable-route";

export const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () =>
      new Response("<html>hi</html>", {
        headers: {
          "Content-Type": "text/html",
        },
      }),
  },
];
