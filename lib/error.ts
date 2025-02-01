import { ZodError } from "zod";

export class ClientError extends Error {}

export const getErrorMessage = (error: Error) =>
  isNonSensitiveError(error)
    ? error.message
    : "An error occurred on our end. Please try again or contact us.";

const isNonSensitiveError = (error: Error) =>
  error instanceof ClientError || error instanceof ZodError;
