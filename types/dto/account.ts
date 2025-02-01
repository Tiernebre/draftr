import { z } from "zod";
import type { PersonId } from "../db/public/Person.ts";

export const MINIMUM_PASSWORD_LENGTH = 8;
export const MAXIMUM_PASSWORD_LENGTH = 128;

export const createAccountRequestSchema = z.object({
  username: z.string(),
  password: z.string().min(MINIMUM_PASSWORD_LENGTH),
});

export const insertAccountRequestSchema = z.object({
  personId: z.custom<PersonId>(),
}).merge(createAccountRequestSchema);

export type CreateAccountRequest = z.infer<typeof createAccountRequestSchema>;
export type GetAccountRequest = z.infer<typeof createAccountRequestSchema>;
export type InsertAccountRequest = z.infer<typeof insertAccountRequestSchema>;
