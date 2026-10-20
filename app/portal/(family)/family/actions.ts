"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "../../../lib/portal/db";
import { requireFamily } from "../../../lib/portal/dal";
import { TIMEZONES } from "../../../lib/portal/time";

// Families manage their own details here. Every action works out whose family it is from the signed-in
// person, never from the form, so one family can never change another's records.

const PATH = "/portal/family";
const str = (fd: FormData, key: string, max = 200) => String(fd.get(key) ?? "").trim().slice(0, max);

function back(msg: { ok?: string; error?: string }): never {
  redirect(`${PATH}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
}

export async function saveMyDetails(fd: FormData) {
  const { family } = await requireFamily();
  const name = str(fd, "name", 120);
  const phone = str(fd, "phone", 40) || null;
  const timezone = str(fd, "timezone");
  if (!name) back({ error: "Please enter your name." });
  if (!TIMEZONES.some((t) => t.id === timezone)) back({ error: "Please choose a time zone." });
  await query("UPDATE families SET name = $1, phone = $2, timezone = $3 WHERE id = $4", [name, phone, timezone, family.id]);
  revalidatePath("/portal", "layout");
  back({ ok: "Your details are saved." });
}

export async function addMyChild(fd: FormData) {
  const { family } = await requireFamily();
  const name = str(fd, "name", 80);
  const yearGroup = str(fd, "year_group", 60) || null;
  if (!name) back({ error: "Please enter your child's name." });
  await query(
    `INSERT INTO children (family_id, name, year_group)
     SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT 1 FROM children WHERE family_id = $1 AND lower(name) = lower($2))`,
    [family.id, name, yearGroup],
  );
  revalidatePath("/portal", "layout");
  back({ ok: `${name} added.` });
}

export async function removeMyChild(fd: FormData) {
  const { family } = await requireFamily();
  const id = Number(fd.get("id"));
  if (Number.isInteger(id) && id > 0) await query("DELETE FROM children WHERE id = $1 AND family_id = $2", [id, family.id]);
  revalidatePath("/portal", "layout");
  back({ ok: "Child removed." });
}
