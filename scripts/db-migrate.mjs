// Applies db/schema.sql to the database in DATABASE_URL, and adds the first admin.
// Usage: DATABASE_URL=... ADMIN_EMAILS=you@example.com npm run db:migrate
import { readFile } from "node:fs/promises";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const local = /localhost|127\.0\.0\.1|\/var\/run/.test(url);
const client = new pg.Client({ connectionString: url, ssl: local ? false : { rejectUnauthorized: true } });
await client.connect();
try {
  const sql = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
  await client.query(sql);
  console.log("Schema applied.");

  for (const email of (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase()).filter(Boolean)) {
    await client.query(
      "INSERT INTO staff (email, name, role) VALUES ($1, $2, 'admin') ON CONFLICT (email) DO UPDATE SET role = 'admin', active = true",
      [email, email.split("@")[0]],
    );
    console.log(`Admin ready: ${email}`);
  }
} finally {
  await client.end();
}
