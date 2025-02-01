import { Handler } from "@std/http/unstable-route";
import { withSessionHandler } from "./session.ts";
import { RequestCallback } from "./types.ts";

export const requestHandler = (callback: RequestCallback): Handler =>
  withSessionHandler(callback);
