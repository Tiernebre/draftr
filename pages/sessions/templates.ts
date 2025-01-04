export const sessionForm = () => /*html*/ `
    <h1>Accounts</h1>
    <form method="POST" action=".">
      <label for="username">Username</label>
      <input id="username" name="username" type="text" required>
      <label for="password">Password</label>
      <input id="password" name="password" type="password" required>
      <button>Login</button>
    </form>
`;
