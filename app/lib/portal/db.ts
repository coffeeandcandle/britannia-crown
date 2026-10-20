import "server-only";
import { Pool, type QueryResultRow } from "pg";

// One pool per server instance. Neon's pooled connection string (with -pooler in the host)
// suits serverless functions; local Postgres works for development and tests.
const globalForPool = globalThis as unknown as { portalPool?: Pool };

function pool() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const local = /localhost|127\.0\.0\.1|\/var\/run/.test(url);
  globalForPool.portalPool ??= new Pool({
    connectionString: url,
    ssl: local ? false : { rejectUnauthorized: true },
    max: 5,
    idleTimeoutMillis: 10_000,
  });
  return globalForPool.portalPool;
}

// Always parameterised: pass values in `params`, never interpolate them into `text`.
export async function query<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  const res = await pool().query<T>(text, params);
  return res.rows;
}

export async function queryOne<T extends QueryResultRow>(text: string, params: unknown[] = []) {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
}
