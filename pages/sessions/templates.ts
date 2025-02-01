import { errorMessageTemplate } from "../lib/error.ts";

export const sessionForm = ({ error }: { error?: Error } = {}) => /*html*/ `
    <h1>Login</h1>
    ${errorMessageTemplate(error)}
    <form method="POST" action=".">
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required>
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required>
      <button>Login</button>
    </form>
`;
