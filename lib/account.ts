import Account from "../types/db/public/Account.ts";
import Person from "../types/db/public/Person.ts";
import {
  CreateAccountRequest,
  GetAccountRequest,
  InsertAccountRequest,
} from "../types/dto/account.ts";
import { getFirstElement, getFirstElementOrThrow } from "./array.ts";
import { insertPerson } from "./person.ts";
import { sql } from "./sql.ts";

export const createAccount = (request: CreateAccountRequest) =>
  insertPerson().then(insertAccountForPerson(request));

export const getAccount = (request: GetAccountRequest) =>
  selectAccountByUsername(request.username);

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

const selectAccountByUsername = (username: string) =>
  sql<
    Account[]
  >`SELECT * FROM account WHERE username = ${username}`
    .then(getFirstElement);
