import { recordEvent, type ActivityType, type ContactKind, type Stage } from "../../lib/crm";
import { alertTeam } from "../../lib/email";

// Every website form posts here: enquiries, guide requests, ambassador applications and
// bookings. Each submission is saved to the CRM (staff portal → Contacts) and the team is
// emailed. Saving is what matters, so the visitor sees success as soon as it's stored.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ATTRIBUTION = ["page", "landing_page", "referrer", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

type FormConfig = {
  type: ActivityType;
  kind: ContactKind;
  stage?: Stage;
  // The heading on the timeline and in the email subject.
  summary: (f: Fields) => string;
  // Form fields to keep, with the label staff see.
  fields: Record<string, string>;
  // Bookings in progress are recorded quietly; only confirmed ones email the team.
  alert?: (f: Fields) => boolean;
};
type Fields = Record<string, string>;

const FORMS: Record<string, FormConfig> = {
  enquiry: {
    type: "enquiry",
    kind: "family",
    summary: (f) => `Enquiry${f.enquiry_about ? `: ${f.enquiry_about}` : f.service ? `: ${f.service}` : ""}`,
    fields: { service: "Service", "child-age": "Child's age or year", message: "Message", "referral-code": "Referral code", enquiry_about: "About", source: "Form" },
  },
  guide: {
    type: "guide",
    kind: "family",
    summary: (f) => `Requested the guide "${f.guide}"`,
    fields: { guide: "Guide" },
  },
  ambassador: {
    type: "ambassador",
    kind: "ambassador",
    summary: () => "Applied to the Ambassador Programme",
    fields: { role: "Role", location: "Location", "code-preference": "Preferred code", network: "How they'll share it" },
  },
  booking: {
    type: "booking",
    kind: "family",
    stage: undefined,
    summary: (f) => (f.status === "booked" ? `Booked a ${f.session}` : `Started booking a ${f.session} (time not chosen yet)`),
    fields: { session: "Session", year_group: "Year group", notes: "Notes", status: "Status", calendly_event: "Calendly event" },
    alert: (f) => f.status === "booked",
  },
};

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid form" }, { status: 400 });
  }
  const get = (k: string, max = 2000) => String(form.get(k) ?? "").trim().slice(0, max);

  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (get("_gotcha")) return Response.json({ ok: true });

  const config = FORMS[get("form")];
  const name = get("name", 120);
  const email = get("email", 200).toLowerCase();
  if (!config || !name || !EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: "Please give your name and a valid email address." }, { status: 400 });
  }
  if (!process.env.DATABASE_URL) return Response.json({ ok: false, error: "Not configured" }, { status: 503 });

  const fields: Fields = {};
  for (const k of [...Object.keys(config.fields), ...ATTRIBUTION]) {
    const v = get(k);
    if (v) fields[k] = v;
  }
  const phone = get("phone", 40) || null;
  const summary = config.summary(fields);
  const stage: Stage | undefined = config.type === "booking" && fields.status === "booked" ? "consultation" : config.stage;

  try {
    await recordEvent({
      name,
      email,
      phone,
      kind: config.kind,
      type: config.type,
      summary,
      details: fields,
      source: fields.utm_source ?? fields.landing_page ?? fields.page ?? config.type,
      stage,
    });
  } catch (error) {
    console.error("Saving website form failed", error);
    return Response.json({ ok: false, error: "Could not save" }, { status: 500 });
  }

  if (!config.alert || config.alert(fields)) {
    const labelled = Object.fromEntries(
      Object.entries(config.fields)
        .filter(([k]) => fields[k])
        .map(([k, label]) => [label, fields[k]]),
    );
    await alertTeam(summary, { Name: name, Email: email, Phone: phone, ...labelled, Page: fields.page, "Came from": fields.utm_source ?? fields.referrer ?? fields.landing_page }, email);
  }
  return Response.json({ ok: true });
}
