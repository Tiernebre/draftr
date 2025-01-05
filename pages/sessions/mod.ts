import { STATUS_CODE } from "@std/http/status";
import { HEADER } from "@std/http/unstable-header";
import { METHOD } from "@std/http/unstable-method";
import { Route } from "@std/http/unstable-route";
import { createAccount } from "../../lib/account.ts";
import { insertSession } from "../../lib/session.ts";
import { page } from "../lib/page.ts";
import { formRequestToSchema } from "../lib/request.ts";
import { sessionForm } from "./templates.ts";
import { setSessionInHeaders } from "../lib/session.ts";
import { createSessionRequestSchema } from "../../types/dto/session.ts";

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
      formRequestToSchema(createSessionRequestSchema, request).then(
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
