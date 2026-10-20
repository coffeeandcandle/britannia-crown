import "server-only";
import { queryOne } from "./portal/db";

// Reads a value from the app_settings table (filled in automatically by scripts/stripe-setup.mjs).
// Returns null when there is no database or no such setting.
export async function getSetting(key: string) {
  if (!process.env.DATABASE_URL) return null;
  try {
    const row = await queryOne<{ value: string }>("SELECT value FROM app_settings WHERE key = $1", [key]);
    return row?.value ?? null;
  } catch (error) {
    console.error(`Reading setting ${key} failed`, error);
    return null;
  }
}
