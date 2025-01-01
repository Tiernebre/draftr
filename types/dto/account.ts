import { z } from "zod";
import type { PersonId } from "../db/public/Person.ts";

export const createAccountRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const insertAccountRequestSchema = z.object({
  personId: z.custom<PersonId>(),
}).merge(createAccountRequestSchema);

export type CreateAccountRequest = z.infer<typeof createAccountRequestSchema>;
export type InsertAccountRequest = z.infer<typeof insertAccountRequestSchema>;
