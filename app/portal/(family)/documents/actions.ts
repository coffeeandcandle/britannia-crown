"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { queryOne } from "../../../lib/portal/db";
import { requireFamily } from "../../../lib/portal/dal";
import { buildSignedPdf } from "../../../lib/portal/signing";
import { alertTeam, sendEmail } from "../../../lib/email";
import { SITE_URL } from "../../../lib/site";
import { logActivity } from "../../../lib/portal/audit";

// A family signs a document that the team marked as needing a signature. Who the family is comes from the
// signed-in person, never the form, so nobody can sign another family's document.
export async function signDocument(fd: FormData) {
  const { family, viewer } = await requireFamily();
  const id = Number(fd.get("id"));
  const back = (msg: { ok?: string; error?: string }): never =>
    redirect(`/portal/documents/${id}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
  if (!Number.isInteger(id) || id < 1) redirect("/portal/documents");

  const doc = await queryOne<{ id: number; title: string; filename: string; mime: string; data: Buffer; needs_signature: boolean; signed_at: Date | null }>(
    "SELECT id, title, filename, mime, data, needs_signature, signed_at FROM documents WHERE id = $1 AND family_id = $2",
    [id, family.id],
  );
  if (!doc) redirect("/portal/documents");
  if (!doc.needs_signature) back({ error: "This document does not need a signature." });
  if (doc.signed_at) back({ ok: "This document is already signed." });

  const name = String(fd.get("signer_name") ?? "").trim().slice(0, 120);
  const dataUrl = String(fd.get("signature") ?? "");
  if (name.length < 2) back({ error: "Please type your full name." });
  if (fd.get("consent") !== "on") back({ error: "Please tick the box to confirm you agree to sign." });
  const m = /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl);
  if (!m || m[1].length > 400_000) back({ error: "Please draw your signature in the box." });
  const png = Buffer.from(m![1], "base64");
  if (png.subarray(1, 4).toString() !== "PNG") back({ error: "Please draw your signature in the box." });

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "";
  const agent = (h.get("user-agent") ?? "").slice(0, 300);
  const hash = createHash("sha256").update(doc.data).digest("hex");
  const signedAt = new Date();

  const signed = await buildSignedPdf({
    original: doc.data,
    isPdf: doc.mime === "application/pdf",
    title: doc.title,
    filename: doc.filename,
    hash,
    signerName: name,
    familyName: family.name,
    signedAt,
    ip,
    signaturePng: png,
  });

  // Only the first signature counts: the update matches only an unsigned document.
  const done = await queryOne<{ id: number }>(
    `UPDATE documents SET signed_at = $1, signed_name = $2, signed_ip = $3, signed_agent = $4, signed_hash = $5, signed_data = $6
     WHERE id = $7 AND family_id = $8 AND signed_at IS NULL RETURNING id`,
    [signedAt, name, ip || null, agent || null, hash, signed, id, family.id],
  );
  if (!done) back({ ok: "This document is already signed." });

  await logActivity({ kind: "family", id: family.id, name: name }, "document.sign", { familyId: family.id, detail: doc.title });
  await alertTeam("Document signed", { Document: doc.title, "Signed by": name, Family: family.name, Email: family.email }, family.email);
  try {
    await sendEmail({
      to: [viewer.email],
      subject: "You signed a document | Britannia Crown",
      text: `Hello ${name.split(" ")[0]},\n\nThis confirms you signed "${doc.title}" on ${new Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "Europe/London" }).format(signedAt)}.\n\nYour signed copy is under Documents in your client portal:\n${SITE_URL}/portal/documents\n\nBritannia Crown`,
    });
  } catch (error) {
    console.error("Signing confirmation email not sent (the signature is saved)", error);
  }
  revalidatePath("/portal", "layout");
  back({ ok: "Thank you. Your signature has been saved and a signed copy added to this page." });
}
