import { METHOD } from "@std/http/unstable-method";
import { Route } from "@std/http/unstable-route";
import { getAccount } from "../../lib/account.ts";
import { page } from "../lib/page.ts";
import { formRequestToSchema } from "../lib/request.ts";
import { sessionForm } from "./templates.ts";
import { logInForAccount } from "../lib/session.ts";
import { createSessionRequestSchema } from "../../types/dto/session.ts";
import { requestHandler } from "../lib/handler.ts";

const pathname = "/sessions/";
const pattern = new URLPattern({ pathname });

export const routes: Route[] = [
  {
    pattern,
    method: METHOD.Get,
    handler: requestHandler((context) =>
      page({
        body: sessionForm(),
        title: "Draftr | Login",
        context,
      })
    ),
  },
  {
    pattern,
    method: METHOD.Post,
    handler: (request) =>
      formRequestToSchema(createSessionRequestSchema, request).then(
        getAccount,
      ).then(logInForAccount),
  },
];
