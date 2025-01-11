import { route } from "@std/http/unstable-route";
import { afterAll, beforeAll, describe } from "@std/testing/bdd";
import { routes } from "../pages/mod.ts";
import { STATUS_CODE } from "@std/http/status";
import { sql } from "../lib/sql.ts";

export const createWebTestingSuite = (name: string, tests: () => unknown) =>
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
