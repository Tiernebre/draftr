import { Route, route } from "@std/http/unstable-route";
import { afterAll, beforeAll, describe } from "@std/testing/bdd";
import { STATUS_CODE } from "@std/http/status";
import { sql } from "../lib/sql.ts";

export const createWebTestingSuite = (
  name: string,
  routes: Route[],
  tests: () => unknown,
) =>
  describe(name, () => {
    let server: Deno.HttpServer;

    beforeAll(() => {
      server = Deno.serve(
        route(routes, () =>
          new Response("Not Found", {
            status: STATUS_CODE.NotFound,
          })),
      );
    });

    tests();

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
