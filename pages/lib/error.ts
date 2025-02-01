import { getErrorMessage } from "../../lib/error.ts";

export const errorMessageTemplate = (error?: Error) =>
  error
    ? /*html*/ `<p class="error-message">${getErrorMessage(error)}</p>`
    : "";
