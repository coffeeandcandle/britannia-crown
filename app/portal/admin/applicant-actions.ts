"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff } from "../../lib/portal/dal";

// Team applications: people who signed up on the tutor and consultant page. Admins only.

function back(msg: { ok?: string; error?: string }): never {
  redirect(`/portal/admin/applications?${new URLSearchParams(msg as Record<string, string>)}`);
}

export async function approveApplicant(fd: FormData) {
  await requireStaff(["admin"]);
  const id = Number(fd.get("id"));
  const role = String(fd.get("role"));
  if (!["tutor", "consultant"].includes(role)) back({ error: "Choose tutor or consultant." });
  const a = await queryOne<{ email: string; name: string }>("SELECT email, name FROM staff_applicants WHERE id = $1 AND status = 'pending'", [id]);
  if (!a) back({ error: "That application has already been handled." });

  await query(
    `INSERT INTO staff (email, name, role) VALUES (lower($1), $2, $3)
     ON CONFLICT (email) DO UPDATE SET role = EXCLUDED.role, active = true`,
    [a.email, a.name, role],
  );
  await query("UPDATE staff_applicants SET status = 'approved', decided_at = now() WHERE id = $1", [id]);
  // Remove any empty client account or sign-up-only contact made for them before they were recognised.
  await query(
    `DELETE FROM families f WHERE lower(f.email) = lower($1)
       AND NOT EXISTS (SELECT 1 FROM orders o WHERE o.family_id = f.id OR lower(o.customer_email) = lower(f.email))
       AND NOT EXISTS (SELECT 1 FROM children c WHERE c.family_id = f.id)
       AND NOT EXISTS (SELECT 1 FROM sessions s WHERE s.family_id = f.id)`,
    [a.email],
  );
  await query(
    `DELETE FROM contacts c WHERE lower(c.email) = lower($1)
       AND NOT EXISTS (SELECT 1 FROM orders o WHERE lower(o.customer_email) = lower(c.email))
       AND NOT EXISTS (SELECT 1 FROM activities x WHERE x.contact_id = c.id AND x.type NOT IN ('enquiry', 'stage', 'note'))`,
    [a.email],
  );
  revalidatePath("/portal/admin", "layout");
  back({ ok: `${a.name} approved as a ${role}. They'll see their ${role} area next time they open the portal.` });
}

export async function declineApplicant(fd: FormData) {
  await requireStaff(["admin"]);
  const id = Number(fd.get("id"));
  const a = await queryOne<{ name: string }>(
    "UPDATE staff_applicants SET status = 'declined', decided_at = now() WHERE id = $1 AND status = 'pending' RETURNING name",
    [id],
  );
  revalidatePath("/portal/admin", "layout");
  back(a ? { ok: `${a.name}'s application declined. They can't see the team area.` } : { error: "That application has already been handled." });
}
