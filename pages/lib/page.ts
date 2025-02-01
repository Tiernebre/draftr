import { Context } from "../../types/mod.ts";
import { navigation } from "./navigation.ts";

export const page = ({ head, body, title, context }: {
  body: string;
  head?: string;
  title: string;
  context: Context;
}) =>
  new Response(
    /* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${title}</title>
  <link rel="stylesheet" href="common.css">
  ${head || ""}
</head>

<body>
<header>
${navigation({ context })}
</header>
<main>
${body}
</main>
</body>
</html>
    `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
