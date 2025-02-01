import { Context } from "../../types/mod.ts";

export const navigation = ({ context }: { context: Context }) =>
  /* html */ `<nav>
    <a class="home-link" href="/">Draftr</a>
    <div class="other-links">
      ${
    context.session
      ? /* html */ `<form method="POST" action="/sessions/delete/"><button>Log Out</button></form>`
      : /* html*/ `<a href="/sessions/">Login</a><a href="/accounts/">Register</a>`
  }
    </div>
  </nav>`;
