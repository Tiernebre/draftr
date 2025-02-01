import { Context } from "../../types/mod.ts";

export type RequestCallback = (
  context: Context,
) => Response | Promise<Response>;
