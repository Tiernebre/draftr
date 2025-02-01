import { Route } from "@std/http/unstable-route";
import { page } from "../lib/page.ts";
import { METHOD } from "@std/http/unstable-method";
import { createAccountRequestSchema } from "../../types/dto/account.ts";
import { formRequestToSchema } from "../lib/request.ts";
import { createAccount } from "../../lib/account.ts";
import { accountForm } from "./templates.ts";
import { logInForAccount } from "../lib/session.ts";
import { requestHandler } from "../lib/handler.ts";
import { Context } from "../../types/mod.ts";

const pathname = "/accounts/";
const pattern = new URLPattern({ pathname });

const renderRegisterPage = (
  { context, error }: { context: Context; error?: Error },
) =>
  page({
    body: accountForm({ error }),
    head: /* html */ `<link rel="stylesheet" href="index.css">`,
    title: "Draftr | Create Account",
    context,
  });

export const routes: Route[] = [
  {
    pattern,
    method: METHOD.Get,
    handler: requestHandler((context) => renderRegisterPage({ context })),
  },
  {
    pattern,
    method: METHOD.Post,
    handler: requestHandler((context) =>
      formRequestToSchema(createAccountRequestSchema, context.request).then(
        createAccount,
      ).then(logInForAccount).catch((error) =>
        renderRegisterPage({ context, error })
      )
    ),
  },
];
