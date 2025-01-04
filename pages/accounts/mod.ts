import { Route } from "@std/http/unstable-route";
import { page } from "../page.ts";
import { METHOD } from "@std/http/unstable-method";
import { createAccountRequestSchema } from "../../types/dto/account.ts";
import { formRequestToJson } from "../../lib/request.ts";
import { createAccount } from "../../lib/account.ts";
import { accountForm } from "./templates.ts";
import { insertSession } from "../../lib/session.ts";
import { Cookie, setCookie } from "@std/http/cookie";
import { STATUS_CODE } from "@std/http";
import { HEADER } from "@std/http/unstable-header";

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
      ).then((account) => insertSession(account.person_id))
        .then((session) => {
          const headers = new Headers();
          setCookie(headers, {
            name: "session",
            value: session.id,
            maxAge: 300000,
            path: "/",
            sameSite: "Strict",
            secure: true,
          });
          headers.set(HEADER.Location, "/");
          return new Response(null, {
            status: STATUS_CODE.MovedPermanently,
            headers,
          });
        }),
  },
];
