import { escape } from "@std/html";

export const html = (strings: TemplateStringsArray, ...values: string[]) => {
  return strings.reduce((escaped, str, i) => {
    return `${escaped}${str}${escape(values[i] || "")}`;
  });
};
