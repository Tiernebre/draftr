import Session from "../types/db/public/Session.ts";
import { getFirstElementOrThrow } from "./array.ts";
import { sql } from "./sql.ts";

export const insertSession = (personId: string) =>
  sql<
    Session[]
  >`INSERT INTO session (person_id) VALUES (${personId}) RETURNING *`
    .then(getFirstElementOrThrow(new Error("Could not insert session.")));

export const selectSession = (id: string) =>
  sql<
    Session[]
  >`SELECT * FROM session WHERE id = ${id}`
    .then(getFirstElementOrThrow(new Error("Could not insert session.")));
