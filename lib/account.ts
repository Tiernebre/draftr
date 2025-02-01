import Account from "../types/db/public/Account.ts";
import {
  CreateAccountRequest,
  GetAccountRequest,
  InsertAccountRequest,
} from "../types/dto/account.ts";
import { getFirstElementOrThrow } from "./array.ts";
import { ClientError } from "./error.ts";
import { insertPerson } from "./person.ts";
import { sql } from "./sql.ts";
import Argon2id from "@rabbit-company/argon2id";

const NON_EXISTENT_ACCOUNT_ERROR_MESSAGE =
  "An account does not exist with the provided username or password.";

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
    .then(getFirstElementOrThrow(new ClientError("Could not create account")));

const selectAccountByUsername = (username: string) =>
  sql<
    Account[]
  >`SELECT * FROM account WHERE username = ${username}`
    .then(
      getFirstElementOrThrow(
        new ClientError(
          NON_EXISTENT_ACCOUNT_ERROR_MESSAGE,
        ),
      ),
    );

const verifyAccountPassword =
  ({ password }: GetAccountRequest) => (account: Account) =>
    Argon2id.verify(account.password, password).then((verified) => {
      if (verified) return account;
      throw new ClientError(
        NON_EXISTENT_ACCOUNT_ERROR_MESSAGE,
      );
    });

const hashCreationRequest = (
  request: CreateAccountRequest,
): Promise<CreateAccountRequest> =>
  Promise.resolve(request.password).then(Argon2id.hashEncoded).then((
    password,
  ) => ({
    ...request,
    password,
  }));
