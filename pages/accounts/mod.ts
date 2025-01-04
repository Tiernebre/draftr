import { Route } from "@std/http/unstable-route";
import { page } from "../page.ts";
import { METHOD } from "@std/http/unstable-method";
import { createAccountRequestSchema } from "../../types/dto/account.ts";
import { formRequestToJson } from "../../lib/request.ts";
import { createAccount } from "../../lib/account.ts";
import { accountForm } from "./templates.ts";

const pathname = "/accounts/";
const pattern = new URLPattern({ pathname });

export const routes: Route[] = [
  {
    pattern,
    method: METHOD.Get,
    handler: () =>
      page({
        body: accountForm(),
        title: "Draftr | Create Account",
      }),
  },
  {
    pattern,
    method: METHOD.Post,
    handler: (request) =>
      formRequestToJson(request).then(createAccountRequestSchema.parse).then(
        createAccount,
      ).then((account) =>
        new Response(`Account Created. ${JSON.stringify(account)}`)
      ),
  },
];
