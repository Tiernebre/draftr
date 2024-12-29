import postgres from "postgresjs";

const databaseUrl = Deno.env.get("DATABASE_URL");

if (!databaseUrl) {
  console.error("Database URL is required to run Draftr.");
  Deno.exit(1);
}

export const sql = postgres(databaseUrl);
