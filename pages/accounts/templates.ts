import {
  MAXIMUM_PASSWORD_LENGTH,
  MINIMUM_PASSWORD_LENGTH,
} from "../../types/dto/account.ts";
import { errorMessageTemplate } from "../lib/error.ts";

export const accountForm = ({ error }: { error?: Error } = {}) => /* html */ `
        <h2>Register</h2>
        ${errorMessageTemplate(error)}
        <form method="POST" action=".">
          <label for="username">Username</label>
          <input id="username" name="username" type="text" required>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required minlength="${MINIMUM_PASSWORD_LENGTH}" maxlength="${MAXIMUM_PASSWORD_LENGTH}">
          <button>Register</button>
        </form>
        `;
