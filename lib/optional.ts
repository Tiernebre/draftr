export type Optional<T> = T | null | undefined;

export const orElseThrow = (error: Error) => <T>(optional: Optional<T>) => {
  if (optional != null) return optional;
  throw error;
};
