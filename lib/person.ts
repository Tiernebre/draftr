import Person from "../types/db/public/Person.ts";
import { sql } from "./sql.ts";

export const insertPerson = () =>
  sql<Person[]>`INSERT INTO person values(default) RETURNING *`
    .then((rows) => rows[0])
    .then((person) => {
      if (person) {
        return person;
      }

      throw new Error("Person was not created.");
    });
