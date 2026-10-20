"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query, queryOne } from "../../../lib/portal/db";
import { requireFamily } from "../../../lib/portal/dal";
import { alertTeam } from "../../../lib/email";

// A family asks for a lesson. Nothing is scheduled until an admin approves it and assigns a tutor or consultant.
const PATH = "/portal/request";
const str = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").trim().slice(0, max);

function back(msg: { ok?: string; error?: string }): never {
  redirect(`${PATH}?${new URLSearchParams(msg as Record<string, string>).toString()}`);
}

export async function requestLesson(fd: FormData) {
  const { family } = await requireFamily();
  const subject = str(fd, "subject", 120);
  const details = str(fd, "details", 800) || null;
  const preferred = str(fd, "preferred", 300) || null;
  const childId = Number(fd.get("child_id"));
  if (subject.length < 2) back({ error: "Please tell us the subject or what the lesson is for." });

  // The child must belong to this family.
  const child = Number.isInteger(childId) && childId > 0
    ? await queryOne<{ id: number; name: string }>("SELECT id, name FROM children WHERE id = $1 AND family_id = $2", [childId, family.id])
    : null;

  await query(
    "INSERT INTO lesson_requests (family_id, child_id, subject, details, preferred) VALUES ($1, $2, $3, $4, $5)",
    [family.id, child?.id ?? null, subject, details, preferred],
  );
  await alertTeam(
    "New lesson request to approve",
    { Family: family.name, Email: family.email, Child: child?.name, Subject: subject, Details: details, "Preferred times": preferred, Approve: "Sign in to the admin area, open Lesson requests" },
    family.email,
  );
  revalidatePath("/portal", "layout");
  back({ ok: "Request sent. We will confirm your lesson once it is approved and a tutor is assigned." });
}
