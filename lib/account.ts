import Account from "../types/db/public/Account.ts";
import Person from "../types/db/public/Person.ts";
import {
  CreateAccountRequest,
  InsertAccountRequest,
} from "../types/dto/account.ts";
import { getFirstElementOrThrow } from "./array.ts";
import { insertPerson } from "./person.ts";
import { sql } from "./sql.ts";

export const createAccount = (request: CreateAccountRequest) =>
  insertPerson().then(insertAccountForPerson(request));

const insertAccountForPerson =
  (request: CreateAccountRequest) => ({ id: personId }: Person) =>
    insertAccount({ ...request, personId });

const insertAccount = (
  { username, password, personId }: InsertAccountRequest,
) =>
  sql<
    Account[]
  >`INSERT INTO account (username, password, person_id) VALUES (${username}, ${password}, ${personId}) RETURNING *`
    .then(getFirstElementOrThrow(new Error("Could not create account")));
