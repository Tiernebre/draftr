import Session from "../types/db/public/Session.ts";
import { getFirstElement, getFirstElementOrThrow } from "./array.ts";
import { Optional } from "./optional.ts";
import { sql } from "./sql.ts";

export const insertSession = (personId: string) =>
  sql<
    Session[]
  >`INSERT INTO session (person_id) VALUES (${personId}) RETURNING *`
    .then(getFirstElementOrThrow(new Error("Could not insert session.")));

export const selectSession = (id: string): Promise<Optional<Session>> =>
  sql<
    Session[]
  >`SELECT * FROM session WHERE id = ${id}`
    .then(getFirstElement);
