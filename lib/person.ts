import Person from "../types/db/public/Person.ts";
import { getFirstElement } from "./array.ts";
import { orElseThrow } from "./optional.ts";
import { sql } from "./sql.ts";

export const insertPerson = () =>
  sql<Person[]>`INSERT INTO person values(default) RETURNING *`
    .then(getFirstElement)
    .then(orElseThrow(new Error("Could not insert person.")));
