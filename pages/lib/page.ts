export const page = ({ head, body, title }: {
  body: string;
  head?: string;
  title: string;
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
  <nav>
    <a class="home-link" href="/">Draftr</a>
    <a href="/drafts/">Drafts</a>
  </nav>
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
