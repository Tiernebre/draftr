import z from "zod";

export const createSessionRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type CreateSessionRequest = z.infer<typeof createSessionRequestSchema>;
