import { escape } from "@std/html";

export const html = (strings: TemplateStringsArray, ...values: string[]) =>
  strings.reduce(
    (escaped, str, i) => {
      console.log({ escaped, str, i });
      return `${escaped}${escape(values[i - 1])}${str}`;
    },
  );
