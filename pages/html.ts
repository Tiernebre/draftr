import { escape } from "@std/html";

export const html = (strings: TemplateStringsArray, ...values: string[]) =>
  strings.reduce((escaped, str, i) => `${escaped}${str}${escape(values[i])}`);
