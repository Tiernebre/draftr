import { setCookie } from "@std/http/cookie";
import { STATUS_CODE } from "@std/http/status";
import { HEADER } from "@std/http/unstable-header";
import { METHOD } from "@std/http/unstable-method";
import { Route } from "@std/http/unstable-route";
import { createAccount } from "../../lib/account.ts";
import { insertSession } from "../../lib/session.ts";
import { createAccountRequestSchema } from "../../types/dto/account.ts";
import { page } from "../lib/page.ts";
import { formRequestToJson } from "../lib/request.ts";
import { sessionForm } from "./templates.ts";

const pathname = "/sessions/";
const pattern = new URLPattern({ pathname });

export const routes: Route[] = [
  {
    pattern,
    method: METHOD.Get,
    handler: () =>
      page({
        body: sessionForm(),
        title: "Draftr | Login",
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
