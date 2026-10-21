"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../lib/portal/db";
import { requireStaff } from "../../lib/portal/dal";
import { sendEmail } from "../../lib/email";
import { SITE_URL } from "../../lib/site";

// Admins and consultants upload documents for a family; only that family (and the team) can open them.
const MAX_BYTES = 4 * 1024 * 1024; // Vercel limits a request to about 4.5 MB.
const TYPES: Record<string, string> = {
  pdf: "application/pdf",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  txt: "text/plain",
};

function back(familyId: number, msg: { ok?: string; error?: string }): never {
  redirect(`/portal/admin/families/${familyId}?${new URLSearchParams(msg as Record<string, string>).toString()}#documents`);
}

// A quick check that the bytes match the extension for the common types.
function looksRight(ext: string, b: Buffer) {
  if (ext === "pdf") return b.subarray(0, 4).toString() === "%PDF";
  if (ext === "png") return b.subarray(1, 4).toString() === "PNG";
  if (ext === "jpg" || ext === "jpeg") return b[0] === 0xff && b[1] === 0xd8;
  return true;
}

export async function uploadDocument(fd: FormData) {
  const { staff } = await requireStaff(["admin", "consultant"]);
  const familyId = Number(fd.get("family_id"));
  if (!Number.isInteger(familyId) || familyId < 1) redirect("/portal/admin/families");
  const family = await queryOne<{ name: string; email: string }>("SELECT name, email FROM families WHERE id = $1", [familyId]);
  if (!family) redirect("/portal/admin/families");

  const file = fd.get("file");
  if (!(file instanceof File) || file.size === 0) back(familyId, { error: "Please choose a file." });
  const f = file as File;
  const ext = (f.name.split(".").pop() ?? "").toLowerCase();
  const mime = TYPES[ext];
  if (!mime) back(familyId, { error: "Only PDF, PNG, JPG and text files can be shown in the portal. Please save Word, Excel or PowerPoint files as a PDF first." });
  if (f.size > MAX_BYTES) back(familyId, { error: "That file is over 4 MB. Please compress it or split it." });
  const bytes = Buffer.from(await f.arrayBuffer());
  if (!looksRight(ext, bytes)) back(familyId, { error: "That file doesn't look like a valid " + ext.toUpperCase() + "." });

  const title = String(fd.get("title") ?? "").trim().slice(0, 150) || f.name.replace(/\.[^.]+$/, "").slice(0, 150);
  const note = String(fd.get("note") ?? "").trim().slice(0, 500) || null;
  const filename = f.name.replace(/[^\w.\- ]+/g, "_").slice(0, 120);

  await query(
    "INSERT INTO documents (family_id, title, note, filename, mime, size, data, uploaded_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [familyId, title, note, filename, mime, f.size, bytes, staff.id],
  );
  if (fd.get("notify") === "on") {
    try {
      await sendEmail({
        to: [family.email],
        subject: "A new document is ready | Britannia Crown",
        text: `Hello ${family.name.split(" ")[0]},\n\nWe have added a new document for you: ${title}.\n\nYou can open it under Documents in your client portal:\n${SITE_URL}/portal/documents\n\nBritannia Crown`,
      });
    } catch (error) {
      console.error("Document email not sent (the document is saved)", error);
    }
  }
  revalidatePath("/portal", "layout");
  back(familyId, { ok: `${title} uploaded.` });
}

export async function deleteDocument(fd: FormData) {
  await requireStaff(["admin", "consultant"]);
  const id = Number(fd.get("id"));
  const row = Number.isInteger(id) ? await queryOne<{ family_id: number }>("DELETE FROM documents WHERE id = $1 RETURNING family_id", [id]) : null;
  revalidatePath("/portal", "layout");
  if (!row) redirect("/portal/admin/families");
  back(row.family_id, { ok: "Document deleted." });
}
