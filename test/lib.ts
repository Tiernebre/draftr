import { Route, route } from "@std/http/unstable-route";
import { afterAll, beforeAll, describe } from "@std/testing/bdd";
import { STATUS_CODE } from "@std/http/status";
import { sql } from "../lib/sql.ts";
import getPort from "npm:get-port@7.1.0";

const hostname = "0.0.0.0";
const port = await getPort();

export const createWebTestingSuite = (
  name: string,
  routes: Route[],
  path: string,
  tests: (url: string) => unknown,
) =>
  describe(name, () => {
    const url = `http://${hostname}:${port}${path}`;
    let server: Deno.HttpServer;

    beforeAll(() => {
      server = Deno.serve(
        {
          hostname,
          port,
        },
        route(routes, () =>
          new Response("Not Found", {
            status: STATUS_CODE.NotFound,
          })),
      );
    });

    tests(url);

    afterAll(async () => {
      await sql.end();
      await server.shutdown();
    });
  });

export const createDatabaseTestingSuite = (
  name: string,
  tests: () => unknown,
) =>
  describe(name, () => {
    tests();

    afterAll(async () => {
      await sql.end();
    });
  });
