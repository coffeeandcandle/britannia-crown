"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "../../lib/portal/db";
import { requireStaff } from "../../lib/portal/dal";

// Everyone on the team sets their own weekly hours; admins can set anyone's.
async function who(fd: FormData) {
  const { staff } = await requireStaff();
  const requested = Number(fd.get("staff_id"));
  const target = staff.role === "admin" && Number.isInteger(requested) && requested > 0 ? requested : staff.id;
  return { target, path: `/portal/admin/availability${target === staff.id ? "" : `?staff=${target}`}` };
}
const back = (path: string, msg: { ok?: string; error?: string }): never =>
  redirect(`${path}${path.includes("?") ? "&" : "?"}${new URLSearchParams(msg as Record<string, string>)}`);
const toMin = (v: FormDataEntryValue | null) => {
  const m = /^(\d{2}):(\d{2})$/.exec(String(v ?? ""));
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
};

export async function addAvailability(fd: FormData) {
  const { target, path } = await who(fd);
  const weekday = Number(fd.get("weekday"));
  const start = toMin(fd.get("start"));
  const end = toMin(fd.get("end"));
  if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) back(path, { error: "Choose a day." });
  if (start === null || end === null || end <= start) back(path, { error: "The end time must be after the start time." });
  await query("INSERT INTO availability (staff_id, weekday, start_min, end_min) VALUES ($1, $2, $3, $4)", [target, weekday, start, end]);
  revalidatePath("/portal", "layout");
  back(path, { ok: "Hours added." });
}

export async function removeAvailability(fd: FormData) {
  const { target, path } = await who(fd);
  await query("DELETE FROM availability WHERE id = $1 AND staff_id = $2", [Number(fd.get("id")), target]);
  revalidatePath("/portal", "layout");
  back(path, { ok: "Hours removed." });
}
