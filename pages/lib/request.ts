import { type ZodSchema } from "zod";

export const formRequestToSchema = <T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  request: Request,
) => request.formData().then(formDataToJson).then(schema.parse);

const formRequestToJson = <T extends Record<string, unknown>>(
  request: Request,
): Promise<T | Record<string, unknown>> =>
  request.formData().then(formDataToJson);

const formDataToJson = <T extends Record<string, unknown>>(
  formData: FormData,
): T => Object.fromEntries(formData.entries()) as T;
