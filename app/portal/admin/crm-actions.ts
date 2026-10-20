"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff, type Role } from "../../lib/portal/dal";
import { STAGES, stageLabel, type Stage } from "../../lib/crm";

// CRM actions are for admins only: contacts hold sales and payment history that tutors and
// consultants don't need. As with the other staff actions, each one checks the caller itself,
// because a server action can be called directly.

const MANAGERS: Role[] = ["admin"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const KINDS = ["family", "ambassador", "other"];
const LOG_TYPES = { note: "Note", call: "Call", email: "Email" } as const;

function back(path: string, msg: { ok?: string; error?: string }): never {
  const qs = new URLSearchParams(msg as Record<string, string>).toString();
  redirect(`${path}${path.includes("?") ? "&" : "?"}${qs}`);
}
const str = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const int = (fd: FormData, key: string) => {
  const n = Number(fd.get(key));
  return Number.isInteger(n) && n > 0 ? n : null;
};
const isStage = (s: string): s is Stage => STAGES.some((x) => x.id === s);

export async function addContact(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 200).toLowerCase();
  const phone = str(fd, "phone", 40) || null;
  const kind = KINDS.includes(str(fd, "kind")) ? str(fd, "kind") : "family";
  const note = str(fd, "note", 4000);
  if (!name || !EMAIL_RE.test(email)) back("/portal/admin/contacts", { error: "Please enter a name and a valid email address." });

  const existing = await queryOne<{ id: number }>("SELECT id FROM contacts WHERE lower(email) = $1", [email]);
  if (existing) back(`/portal/admin/contacts/${existing.id}`, { ok: "That email is already in your contacts, so here's their record." });

  const row = await queryOne<{ id: number }>(
    `INSERT INTO contacts (name, email, phone, kind, owner_id, source, family_id)
     VALUES ($1, $2, $3, $4, $5, 'added by staff', (SELECT id FROM families WHERE lower(email) = $2)) RETURNING id`,
    [name, email, phone, kind, staff.id],
  );
  await query("INSERT INTO activities (contact_id, type, summary, staff_id) VALUES ($1, 'note', $2, $3)", [
    row!.id,
    note || "Added to contacts",
    staff.id,
  ]);
  revalidatePath("/portal/admin/contacts");
  back(`/portal/admin/contacts/${row!.id}`, { ok: `${name} added.` });
}

export async function updateContact(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const id = int(fd, "id");
  if (!id) back("/portal/admin/contacts", { error: "Contact not found." });
  const path = `/portal/admin/contacts/${id}`;
  const name = str(fd, "name", 120);
  const email = str(fd, "email", 200).toLowerCase();
  const phone = str(fd, "phone", 40) || null;
  const kind = str(fd, "kind");
  const stage = str(fd, "stage");
  const ownerId = int(fd, "owner_id");
  if (!name || !EMAIL_RE.test(email)) back(path, { error: "Please enter a name and a valid email address." });
  if (!KINDS.includes(kind) || !isStage(stage)) back(path, { error: "Please choose a type and a stage." });

  const before = await queryOne<{ stage: Stage }>("SELECT stage FROM contacts WHERE id = $1", [id]);
  if (!before) back("/portal/admin/contacts", { error: "Contact not found." });
  try {
    await query("UPDATE contacts SET name = $1, email = $2, phone = $3, kind = $4, stage = $5, owner_id = $6 WHERE id = $7", [
      name, email, phone, kind, stage, ownerId, id,
    ]);
  } catch {
    back(path, { error: "Another contact already uses that email address." });
  }
  if (before.stage !== stage) {
    await query("INSERT INTO activities (contact_id, type, summary, staff_id) VALUES ($1, 'stage', $2, $3)", [
      id, `Moved from ${stageLabel(before.stage)} to ${stageLabel(stage)}`, staff.id,
    ]);
    await query("UPDATE contacts SET last_activity_at = now() WHERE id = $1", [id]);
  }
  revalidatePath(path);
  back(path, { ok: "Saved." });
}

// Quick stage buttons on the contact page (e.g. "Mark as contacted").
export async function setStage(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const id = int(fd, "id");
  const stage = str(fd, "stage");
  if (!id || !isStage(stage)) back("/portal/admin/contacts", { error: "Something went wrong. Please try again." });
  const before = await queryOne<{ stage: Stage }>("SELECT stage FROM contacts WHERE id = $1", [id]);
  if (before && before.stage !== stage) {
    await query("UPDATE contacts SET stage = $1, last_activity_at = now(), owner_id = COALESCE(owner_id, $3) WHERE id = $2", [stage, id, staff.id]);
    await query("INSERT INTO activities (contact_id, type, summary, staff_id) VALUES ($1, 'stage', $2, $3)", [
      id, `Moved from ${stageLabel(before.stage)} to ${stageLabel(stage)}`, staff.id,
    ]);
  }
  revalidatePath(`/portal/admin/contacts/${id}`);
  back(`/portal/admin/contacts/${id}`, { ok: `Marked as ${stageLabel(stage).toLowerCase()}.` });
}

export async function logActivity(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const id = int(fd, "contact_id");
  const type = str(fd, "type") as keyof typeof LOG_TYPES;
  const text = str(fd, "text", 4000);
  if (!id) back("/portal/admin/contacts", { error: "Contact not found." });
  const path = `/portal/admin/contacts/${id}`;
  if (!(type in LOG_TYPES) || !text) back(`${path}#log`, { error: "Please write what happened." });

  await query("INSERT INTO activities (contact_id, type, summary, staff_id) VALUES ($1, $2, $3, $4)", [id, type, text, staff.id]);
  // Logging a call or email with a new contact means they've now been contacted.
  await query(
    `UPDATE contacts SET last_activity_at = now(), owner_id = COALESCE(owner_id, $3),
       stage = CASE WHEN stage = 'new' AND $2 IN ('call', 'email') THEN 'contacted' ELSE stage END
     WHERE id = $1`,
    [id, type, staff.id],
  );
  revalidatePath(path);
  back(path, { ok: `${LOG_TYPES[type]} added.` });
}

export async function deleteActivity(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const id = int(fd, "id");
  const contactId = int(fd, "contact_id");
  // Only staff-written notes can be removed; website and payment records stay as evidence.
  await query("DELETE FROM activities WHERE id = $1 AND contact_id = $2 AND type IN ('note', 'call', 'email') AND (staff_id = $3 OR $4)", [
    id, contactId, staff.id, staff.role === "admin",
  ]);
  revalidatePath(`/portal/admin/contacts/${contactId}`);
  back(`/portal/admin/contacts/${contactId}`, { ok: "Removed." });
}

// Turns a contact into a portal family, so lessons can be scheduled and they can sign in.
export async function createFamilyFromContact(fd: FormData) {
  const { staff } = await requireStaff(MANAGERS);
  const id = int(fd, "id");
  const contact = id
    ? await queryOne<{ name: string; email: string; phone: string | null; owner_id: number | null; family_id: number | null }>(
        "SELECT name, email, phone, owner_id, family_id FROM contacts WHERE id = $1",
        [id],
      )
    : null;
  if (!contact) back("/portal/admin/contacts", { error: "Contact not found." });
  if (contact.family_id) redirect(`/portal/admin/families/${contact.family_id}`);

  const timezone = str(fd, "timezone") === "Asia/Dubai" ? "Asia/Dubai" : "Europe/London";
  const familyName = str(fd, "family_name", 120) || contact.name;
  const family = await queryOne<{ id: number }>(
    `INSERT INTO families (name, email, phone, timezone, consultant_id) VALUES ($1, lower($2), $3, $4, $5)
     ON CONFLICT (email) DO UPDATE SET phone = COALESCE(families.phone, EXCLUDED.phone) RETURNING id`,
    [familyName, contact.email, contact.phone, timezone, contact.owner_id ?? (staff.role === "tutor" ? null : staff.id)],
  );
  await query("UPDATE contacts SET family_id = $1, stage = 'client', last_activity_at = now() WHERE id = $2", [family!.id, id]);
  await query("INSERT INTO activities (contact_id, type, summary, staff_id) VALUES ($1, 'stage', 'Portal account created; now a client', $2)", [id, staff.id]);
  revalidatePath("/portal/admin/families");
  back(`/portal/admin/families/${family!.id}`, { ok: `${familyName} added to Families. Next, add their child and schedule a lesson.` });
}

// Removes a contact and their timeline, e.g. when someone asks for their data to be deleted.
export async function deleteContact(fd: FormData) {
  await requireStaff(["admin"]);
  const id = int(fd, "id");
  if (id) await query("DELETE FROM contacts WHERE id = $1", [id]);
  revalidatePath("/portal/admin/contacts");
  back("/portal/admin/contacts", { ok: "Contact deleted." });
}
