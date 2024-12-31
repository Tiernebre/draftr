import kanel from "npm:kanel@^3.11.0";

await kanel.processDatabase({
  connection: Deno.env.get("DATABASE_URL"),
  outputPath: "./types/db",
  preDeleteOutputFolder: true,
  importsExtension: ".ts",
});
