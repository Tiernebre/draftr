import { Route } from "@std/http/unstable-route";
import { page } from "../lib/page.ts";
import { METHOD } from "@std/http/unstable-method";
import { createAccountRequestSchema } from "../../types/dto/account.ts";
import { formRequestToSchema } from "../lib/request.ts";
import { createAccount } from "../../lib/account.ts";
import { accountForm } from "./templates.ts";
import { insertSession } from "../../lib/session.ts";
import { STATUS_CODE } from "@std/http";
import { HEADER } from "@std/http/unstable-header";
import { setSessionInHeaders } from "../lib/session.ts";

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
      formRequestToSchema(createAccountRequestSchema, request).then(
        createAccount,
      ).then((account) => insertSession(account.person_id))
        .then((session) => {
          const headers = setSessionInHeaders(new Headers(), session);
          headers.set(HEADER.Location, "/");
          return new Response(null, {
            status: STATUS_CODE.MovedPermanently,
            headers,
          });
        }),
  },
];
