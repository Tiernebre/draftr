import Account from "../types/db/public/Account.ts";
import {
  CreateAccountRequest,
  GetAccountRequest,
  InsertAccountRequest,
} from "../types/dto/account.ts";
import { getFirstElementOrThrow } from "./array.ts";
import { insertPerson } from "./person.ts";
import { sql } from "./sql.ts";
import Argon2id from "@rabbit-company/argon2id";

export const createAccount = (request: CreateAccountRequest) =>
  Promise.all([hashCreationRequest(request), insertPerson()])
    .then(([request, { id: personId }]) =>
      insertAccount({ ...request, personId })
    );

export const getAccount = (request: GetAccountRequest) =>
  selectAccountByUsername(request.username)
    .then(verifyAccountPassword(request));

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
    .then(
      getFirstElementOrThrow(
        new Error("Account does not exist with provided username or password."),
      ),
    );

const verifyAccountPassword =
  ({ password }: GetAccountRequest) => (account: Account) =>
    Argon2id.verify(account.password, password).then((verified) => {
      if (verified) return account;
      throw new Error(
        "Account does not exist with provided username or password.",
      );
    });

const hashCreationRequest = (
  request: CreateAccountRequest,
): Promise<CreateAccountRequest> =>
  Promise.resolve(request.password).then(Argon2id.hash).then((password) => ({
    ...request,
    password,
  }));
