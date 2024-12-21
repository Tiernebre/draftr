type HtmlParameters = {
  content: string;
  head?: string;
};

export const html = ({ head = "", content }: HtmlParameters) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title></title>
  ${head}
</head>

<body>
${content}
</body>
</html>`;

export const page = (parameters: HtmlParameters) =>
  new Response(html(parameters), {
    headers: {
      "Content-Type": "text/html",
    },
  });
