"use server";

import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { devAuth } from "../../../lib/portal/config";

// Local development only (PORTAL_DEV_AUTH=1 with `next dev`); unreachable in production.
export async function devSignIn(formData: FormData) {
  if (!devAuth) notFound();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  (await cookies()).set("portal_dev_email", email, { httpOnly: true, sameSite: "lax", path: "/" });
  redirect("/portal");
}
