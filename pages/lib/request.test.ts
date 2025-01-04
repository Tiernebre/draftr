import { assertEquals } from "@std/assert";
import { METHOD } from "@std/http/unstable-method";
import { formRequestToJson } from "./request.ts";

Deno.test("converts a form request data to json", async () => {
  const formData = new FormData();
  formData.append("key", "value");
  const request = new Request("http://0.0.0.0", {
    method: METHOD.Post,
    body: new URLSearchParams(formData as unknown as Record<string, string>),
  });
  assertEquals(await formRequestToJson(request), { key: "value" });
});