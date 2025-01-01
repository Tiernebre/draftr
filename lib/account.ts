import Account from "../types/db/public/Account.ts";
import { InsertAccountRequest } from "../types/dto/account.ts";
import { getFirstElementOrThrow } from "./array.ts";
import { sql } from "./sql.ts";

export const insertAccount = (
  { username, password, personId }: InsertAccountRequest,
) =>
  sql<
    Account[]
  >`INSERT INTO account (username, password, person_id) VALUES (${username}, ${password}, ${personId}) RETURNING *`
    .then(getFirstElementOrThrow(new Error("Could not create account")));
