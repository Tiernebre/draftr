export const accountForm = (error?: Error) => /* html */ `
        <h1>Register</h1>
        ${error ? /*html*/ `Error: ${error.message}` : ""}
        <form method="POST" action=".">
          <label for="username">Username</label>
          <input id="username" name="username" type="text" required>
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required>
          <button>Register</button>
        </form>
        `;
