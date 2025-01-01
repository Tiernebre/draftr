import { Optional } from "./optional.ts";

export const getFirstElement = <T>(array: T[]): Optional<T> => array[0];
