import { getCookies } from "@std/http";
import { Handler } from "@std/http/unstable-route";
import { Optional } from "../../lib/optional.ts";
import { selectSession } from "../../lib/session.ts";
import Session from "../../types/db/public/Session.ts";

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
