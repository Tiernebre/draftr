import { Optional, orElseThrow } from "./optional.ts";

export const getFirstElement = <T>(array: T[]): Optional<T> => array[0];
export const getFirstElementOrThrow = (error: Error) => <T>(array: T[]) =>
  orElseThrow(error)(getFirstElement(array));
