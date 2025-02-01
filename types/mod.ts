import { Optional } from "../lib/optional.ts";
import Session from "./db/public/Session.ts";

export type Context = {
  request: Request;
  session?: Optional<Session>;
};
