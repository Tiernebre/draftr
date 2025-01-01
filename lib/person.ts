import Person from "../types/db/public/Person.ts";
import { getFirstElementOrThrow } from "./array.ts";
import { sql } from "./sql.ts";

export const insertPerson = () =>
  sql<Person[]>`INSERT INTO person values(default) RETURNING *`
    .then(getFirstElementOrThrow(new Error("Could not insert person.")));
