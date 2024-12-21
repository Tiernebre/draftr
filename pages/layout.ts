type LayoutParameters = {
  body: string;
  head: string;
  title: string;
};

export const layout = ({ head, body, title }: LayoutParameters) => `
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
`;

export const page = (parameters: LayoutParameters) =>
  new Response(layout(parameters), {
    headers: {
      "Content-Type": "text/html",
    },
  });
