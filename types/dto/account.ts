import { z } from "zod";

export const createAccountRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateAccountRequest = z.infer<typeof createAccountRequestSchema>;
