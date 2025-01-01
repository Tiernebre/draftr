import { Route } from "@std/http/unstable-route";
import { page } from "../page.ts";
import { METHOD } from "@std/http/unstable-method";
import { createAccountRequestSchema } from "../../types/dto/account.ts";

const pathname = "/accounts/";
const pattern = new URLPattern({ pathname });

export const routes: Route[] = [
  {
    pattern,
    method: METHOD.Get,
    handler: () =>
      page({
        body: /* html */ `
        <h1>Accounts</h1>
        <form method="POST" action=".">
          <label for="username">Username</label>
          <input id="username" name="username" type="text">
          <label for="password">Password</label>
          <input id="password" name="password" type="password">
          <button>Create Account</button>
        </form>
        `,
        head: /* html */ ``,
        title: "Draftr | Create Account",
      }),
  },
  {
    pattern,
    method: METHOD.Post,
    handler: async (request) => {
      const parsed = createAccountRequestSchema.parse(await request.formData());
      console.log({ parsed });
      return new Response("hi");
    },
  },
];
