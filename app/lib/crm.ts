import "server-only";
import { queryOne, query } from "./portal/db";

// The CRM keeps one contact per email address. Everything a person does (enquiring, booking a
// call, buying online) is added to their timeline, so staff see the whole history in one place.

export type ContactKind = "family" | "ambassador" | "other";
export type Stage = "new" | "contacted" | "consultation" | "client" | "closed";
export type ActivityType = "enquiry" | "guide" | "ambassador" | "booking" | "order" | "note" | "call" | "email" | "stage";

export const STAGES: { id: Stage; label: string; hint: string }[] = [
  { id: "new", label: "New", hint: "Needs a reply" },
  { id: "contacted", label: "Contacted", hint: "We've been in touch" },
  { id: "consultation", label: "Consultation", hint: "Call booked or held" },
  { id: "client", label: "Client", hint: "Paying or active" },
  { id: "closed", label: "Closed", hint: "Not going ahead" },
];
export const stageLabel = (s: Stage) => STAGES.find((x) => x.id === s)?.label ?? s;

// How far along each stage is, so automatic events only ever move a contact forward.
const ORDER: Record<Stage, number> = { new: 0, contacted: 1, consultation: 2, client: 3, closed: -1 };

type Event = {
  name: string;
  email: string;
  phone?: string | null;
  kind?: ContactKind;
  type: ActivityType;
  summary: string;
  details?: Record<string, string | number | boolean | null | undefined>;
  source?: string;
  // The stage this event implies, e.g. a booking means "consultation"; an order means "client".
  stage?: Stage;
};

// Adds an event to a contact's timeline, creating the contact if this email is new.
// Returns the contact id and whether the contact was created just now.
export async function recordEvent(e: Event) {
  const email = e.email.trim().toLowerCase();
  const stage = e.stage ?? "new";
  const contact = await queryOne<{ id: number; created: boolean; stage: Stage }>(
    `INSERT INTO contacts (name, email, phone, kind, stage, source, family_id)
     VALUES ($1, $2, $3, $4, $5, $6, (SELECT id FROM families WHERE lower(email) = $2))
     ON CONFLICT (lower(email)) DO UPDATE SET
       name = CASE WHEN contacts.name = contacts.email THEN EXCLUDED.name ELSE contacts.name END,
       phone = COALESCE(contacts.phone, EXCLUDED.phone),
       family_id = COALESCE(contacts.family_id, EXCLUDED.family_id),
       last_activity_at = now()
     RETURNING id, (xmax = 0) AS created, stage`,
    [e.name.trim() || email, email, e.phone?.trim() || null, e.kind ?? "family", stage, e.source ?? null],
  );
  if (!contact) throw new Error("Could not save contact");

  const clean = Object.fromEntries(Object.entries(e.details ?? {}).filter(([, v]) => v !== undefined && v !== null && v !== ""));
  await query("INSERT INTO activities (contact_id, type, summary, details) VALUES ($1, $2, $3, $4)", [contact.id, e.type, e.summary, clean]);

  // Move existing contacts forward automatically (a closed contact who gets in touch again reopens).
  if (!contact.created) {
    const next = contact.stage === "closed" ? stage : ORDER[stage] > ORDER[contact.stage] ? stage : null;
    if (next && next !== contact.stage) {
      await query("UPDATE contacts SET stage = $1 WHERE id = $2", [next, contact.id]);
      await query("INSERT INTO activities (contact_id, type, summary) VALUES ($1, 'stage', $2)", [contact.id, `Moved to ${stageLabel(next)} automatically`]);
    }
  }
  return { id: contact.id, created: contact.created };
}
