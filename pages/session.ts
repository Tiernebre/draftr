import { getCookies } from "@std/http";
import { selectSession } from "../lib/session.ts";
import Session from "../types/db/public/Session.ts";
import { Optional } from "../lib/optional.ts";
import { Handler } from "@std/http/unstable-route";

export const SESSION_COOKIE_NAME = "session";

export const getSession = async (request: Request) => {
  const sessionId = getCookies(request.headers)[SESSION_COOKIE_NAME];
  if (sessionId) return await selectSession(sessionId);
};

export const withSession = (
  callback: (
    request: Request,
    session?: Optional<Session>,
  ) => Response | Promise<Response>,
): Handler =>
async (request: Request) => {
  const session = await getSession(request);
  return callback(request, session);
};
