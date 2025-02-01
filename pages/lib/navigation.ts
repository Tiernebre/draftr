import { Context } from "../../types/mod.ts";

export const navigation = ({ context }: { context: Context }) => {
  return /* html */ `<nav>
    <a class="home-link" href="/">Draftr</a>
    <div>
      ${
    context.session
      ? /* html*/ `<a href="/accounts/">Register</a>`
      : /* html */ `<button>Log Out</button>`
  }
    </div>
  </nav>`;
};
