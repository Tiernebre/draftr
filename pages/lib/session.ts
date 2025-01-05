import { getCookies, setCookie, STATUS_CODE } from "@std/http";
import { Handler } from "@std/http/unstable-route";
import { Optional } from "../../lib/optional.ts";
import { insertSession, selectSession } from "../../lib/session.ts";
import Session from "../../types/db/public/Session.ts";
import Account from "../../types/db/public/Account.ts";
import { HEADER } from "@std/http/unstable-header";

export const SESSION_COOKIE_NAME = "session";

export const getSession = async (request: Request) => {
  const sessionId = getCookies(request.headers)[SESSION_COOKIE_NAME];
  if (sessionId) return await selectSession(sessionId);
};

export const withSessionHandler = (
  callback: (
    request: Request,
    session?: Optional<Session>,
  ) => Response | Promise<Response>,
): Handler =>
async (request: Request) => {
  const session = await getSession(request);
  return callback(request, session);
};

export const logInForAccount = (account: Account) =>
  insertSession(account.person_id)
    .then((session) => setSessionInHeaders(new Headers(), session))
    .then(redirectToHome);

const setSessionInHeaders = (headers: Headers, session: Session) => {
  setCookie(headers, {
    name: SESSION_COOKIE_NAME,
    value: session.id,
    maxAge: 300000,
    path: "/",
    sameSite: "Strict",
    secure: true,
  });
  return headers;
};

const redirectToHome = (headers: Headers) => {
  headers.set(HEADER.Location, "/");
  return new Response(null, {
    status: STATUS_CODE.MovedPermanently,
    headers,
  });
};
