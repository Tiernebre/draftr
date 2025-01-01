import Account from "../types/db/public/Account.ts";
import { CreateAccountRequest } from "../types/dto/account.ts";
import { sql } from "./sql.ts";

export const insertAccount = ({ username, password }: CreateAccountRequest) =>
  sql<
    Account[]
  >`INSERT INTO account (username, password) VALUES (${username}, ${password}) RETURNING *`
    .then((accounts) => accounts[0])
    .then((account) => {
      if (account) return account;
      throw new Error("Account not created.");
    });
