export const page = ({ head, body, title }: {
  body: string;
  head: string;
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
  ${head}
</head>

<body>
${body}
</body>
</html>
    `,
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
