import { Route } from "@std/http/unstable-route";
import { page } from "../lib/page.ts";
import { METHOD } from "@std/http/unstable-method";
import { createAccountRequestSchema } from "../../types/dto/account.ts";
import { formRequestToSchema } from "../lib/request.ts";
import { createAccount } from "../../lib/account.ts";
import { accountForm } from "./templates.ts";
import { logInForAccount } from "../lib/session.ts";
import { requestHandler } from "../lib/handler.ts";

const pathname = "/accounts/";
const pattern = new URLPattern({ pathname });

export const routes: Route[] = [
  {
    pattern,
    method: METHOD.Get,
    handler: requestHandler((context) =>
      page({
        body: accountForm(),
        head: /* html */ `<link rel="stylesheet" href="index.css">`,
        title: "Draftr | Create Account",
        context,
      })
    ),
  },
  {
    pattern,
    method: METHOD.Post,
    handler: (request) =>
      formRequestToSchema(createAccountRequestSchema, request).then(
        createAccount,
      ).then(logInForAccount),
  },
];
