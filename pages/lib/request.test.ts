import { assertEquals } from "@std/assert";
import { METHOD } from "@std/http/unstable-method";
import { formRequestToSchema } from "./request.ts";
import { createSessionRequestSchema } from "../../types/dto/session.ts";

Deno.test("converts a form request data to a zod schema", async () => {
  const formData = new FormData();
  formData.append("username", "username");
  formData.append("password", "password");
  const request = new Request("http://0.0.0.0", {
    method: METHOD.Post,
    body: new URLSearchParams(formData as unknown as Record<string, string>),
  });
  assertEquals(await formRequestToSchema(createSessionRequestSchema, request), {
    username: "username",
    password: "password",
  });
});
