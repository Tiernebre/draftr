import { describe, it } from "@std/testing/bdd";
import { errorMessageTemplate } from "./error.ts";
import { assertEquals } from "@std/assert";
import { ClientError } from "../../lib/error.ts";

describe("error", () => {
  describe("errorMessageTemplate", () => {
    it("returns nothing if no error is provided", () => {
      assertEquals(errorMessageTemplate(), "");
    });

    it("returns a catch-all message for server errors", () => {
      const error = new Error("This is an error message");
      assertEquals(
        errorMessageTemplate(error),
        /* html */ `<p class="error-message">An error occurred on our end. Please try again or contact us.</p>`,
      );
    });

    it("returns a catch-all message for server errors", () => {
      const error = new ClientError("Client error");
      assertEquals(
        errorMessageTemplate(error),
        /* html */ `<p class="error-message">${error.message}</p>`,
      );
    });
  });
});
