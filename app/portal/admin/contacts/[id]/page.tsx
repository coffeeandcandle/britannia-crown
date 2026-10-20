import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff, getContact, contactActivities, contactOrders, listStaff, type ActivityRow } from "../../../../lib/portal/dal";
import { STAGES } from "../../../../lib/crm";
import { TIMEZONES } from "../../../../lib/portal/time";
import { Flash } from "../../../components";
import { PageHeader, Card, Pill, Field, HelpBox } from "../../../ui";
import { SubmitButton, ConfirmSubmit } from "../../../client-ui";
import { updateContact, setStage, logActivity, deleteActivity, createFamilyFromContact, deleteContact } from "../../crm-actions";
import { stageTone, kindLabel } from "../shared";

const typeInfo: Record<ActivityRow["type"], { icon: string; label: string }> = {
  enquiry: { icon: "✉️", label: "Website enquiry" },
  guide: { icon: "📘", label: "Guide request" },
  ambassador: { icon: "🤝", label: "Ambassador application" },
  booking: { icon: "📅", label: "Booking" },
  order: { icon: "💳", label: "Online order" },
  note: { icon: "📝", label: "Note" },
  call: { icon: "📞", label: "Call" },
  email: { icon: "📧", label: "Email" },
  stage: { icon: "➜", label: "Stage" },
};

// Labels for the details saved with website submissions.
const detailLabels: Record<string, string> = {
  service: "Service",
  "child-age": "Child's age or year",
  message: "Message",
  "referral-code": "Referral code",
  enquiry_about: "About",
  guide: "Guide",
  role: "Role",
  location: "Location",
  "code-preference": "Preferred code",
  network: "How they'll share it",
  session: "Session",
  year_group: "Year group",
  notes: "Notes",
  child: "Child",
  page: "Sent from page",
  landing_page: "First page visited",
  referrer: "Came from",
  utm_source: "Campaign source",
  utm_medium: "Campaign medium",
  utm_campaign: "Campaign",
};

const when = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "Europe/London" }).format(d);

// The obvious next step for each stage, shown as one-click buttons.
const nextSteps: Record<string, { stage: string; label: string }[]> = {
  new: [{ stage: "contacted", label: "Mark as contacted" }, { stage: "closed", label: "Close" }],
  contacted: [{ stage: "consultation", label: "Consultation booked" }, { stage: "closed", label: "Close" }],
  consultation: [{ stage: "client", label: "Now a client" }, { stage: "closed", label: "Close" }],
  client: [],
  closed: [{ stage: "new", label: "Reopen" }],
};

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const { staff } = await requireStaff(["admin"]);
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const contact = await getContact(id);
  if (!contact) notFound();
  const [activities, orders, team, msg] = await Promise.all([contactActivities(id), contactOrders(contact.email), listStaff(), searchParams]);
  const managers = team.filter((s) => s.active && s.role !== "tutor");
  const stage = STAGES.find((s) => s.id === contact.stage)!;
  const firstName = contact.name.split(" ")[0];

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        back={{ href: "/portal/admin/contacts", label: "All contacts" }}
        title={contact.name}
        description={
          <span className="ui-inline">
            <Pill tone={stageTone[contact.stage]}>{stage.label}</Pill>
            {kindLabel[contact.kind] && <Pill tone="muted">{kindLabel[contact.kind]}</Pill>}
            <span>{contact.owner_name ? `Owner: ${contact.owner_name}` : "No owner yet"}</span>
            <span>· In contacts since {when(new Date(contact.created_at)).split(",")[0]}</span>
          </span>
        }
        actions={
          <>
            <a href={`mailto:${contact.email}`} className="btn-primary">Email {firstName}</a>
            {contact.phone && <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="btn-secondary">Call</a>}
          </>
        }
      />

      {nextSteps[contact.stage].length > 0 && (
        <div className="ui-copy-row ui-copy-callout crm-next">
          <span>{stage.hint}. Next step:</span>
          {nextSteps[contact.stage].map((n) => (
            <form action={setStage} key={n.stage}>
              <input type="hidden" name="id" value={contact.id} />
              <input type="hidden" name="stage" value={n.stage} />
              <SubmitButton className={n.stage === "closed" ? "pt-link-button" : "btn-secondary ui-btn-sm"}>{n.label}</SubmitButton>
            </form>
          ))}
        </div>
      )}

      <div className="pt-grid">
        <div className="pt-main">
          <Card id="log" title="Add to their history" description="Log a call, an email you sent or a note for the team.">
            <form action={logActivity} className="pt-form">
              <input type="hidden" name="contact_id" value={contact.id} />
              <div className="ui-choice-row" role="radiogroup" aria-label="What happened">
                {(["call", "email", "note"] as const).map((t, i) => (
                  <label key={t} className="ui-choice-pill">
                    <input type="radio" name="type" value={t} defaultChecked={i === 0} />
                    <span>{typeInfo[t].icon} {typeInfo[t].label}</span>
                  </label>
                ))}
              </div>
              <Field label="What happened?" htmlFor="log-text" hint="Calls and emails also move a New contact to Contacted.">
                <textarea id="log-text" name="text" rows={3} required placeholder={`e.g. Spoke to ${firstName}. Interested in GCSE Maths, will book a consultation next week.`} />
              </Field>
              <SubmitButton pendingText="Saving…">Save</SubmitButton>
            </form>
          </Card>

          <Card title="History" description="Newest first. Website forms, bookings and payments are added automatically.">
            <ol className="crm-timeline">
              {activities.map((a) => {
                const info = typeInfo[a.type];
                const details = Object.entries(a.details ?? {}).filter(([k]) => detailLabels[k]);
                return (
                  <li key={a.id} className={`crm-item is-${a.type}`}>
                    <span className="crm-icon" aria-hidden="true">{info.icon}</span>
                    <div className="crm-body">
                      <p className="crm-meta">
                        <strong>{info.label}</strong> · {when(new Date(a.created_at))}
                        {a.staff_name && <> · {a.staff_name}</>}
                      </p>
                      <p className="crm-summary">{a.summary}</p>
                      {details.length > 0 && (
                        <dl className="crm-details">
                          {details.map(([k, v]) => (
                            <div key={k}>
                              <dt>{detailLabels[k]}</dt>
                              <dd>{String(v)}</dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {["note", "call", "email"].includes(a.type) && (
                        <form action={deleteActivity} className="crm-remove">
                          <input type="hidden" name="id" value={a.id} />
                          <input type="hidden" name="contact_id" value={contact.id} />
                          <ConfirmSubmit message="Remove this from their history?">Remove</ConfirmSubmit>
                        </form>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Card>
        </div>

        <aside className="pt-side">
          <Card title="Portal account">
            {contact.family_id ? (
              <>
                <p className="ui-muted">{firstName} has a family account. Lessons, notes and billing are there.</p>
                <Link href={`/portal/admin/families/${contact.family_id}`} className="btn-secondary">Open family →</Link>
              </>
            ) : (
              <form action={createFamilyFromContact} className="pt-form">
                <p className="ui-muted">Ready for lessons? This adds them to Families so you can schedule sessions, and they can sign in with {contact.email}.</p>
                <input type="hidden" name="id" value={contact.id} />
                <Field label="Family name" htmlFor="cf-name">
                  <input id="cf-name" name="family_name" defaultValue={`The ${contact.name.split(" ").slice(-1)[0]} family`} />
                </Field>
                <Field label="Where they live" htmlFor="cf-tz">
                  <select id="cf-tz" name="timezone" defaultValue="Europe/London">
                    {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </Field>
                <SubmitButton pendingText="Creating…">Create portal account</SubmitButton>
              </form>
            )}
          </Card>

          {orders.length > 0 && (
            <Card title="Online orders">
              <ul className="crm-orders">
                {orders.map((o) => (
                  <li key={o.id}>
                    <strong>{o.product_name}</strong>
                    <span>
                      {o.amount_pence != null && new Intl.NumberFormat("en-GB", { style: "currency", currency: o.currency.toUpperCase() }).format(o.amount_pence / 100)}
                      {o.recurring && " a month"} · {o.status === "paid" ? "Paid" : o.status === "cancelled" ? "Cancelled" : "Payment failed"}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/portal/admin/orders" className="ui-link">All orders →</Link>
            </Card>
          )}

          <Card title="Details">
            <form action={updateContact} className="pt-form">
              <input type="hidden" name="id" value={contact.id} />
              <Field label="Stage" htmlFor="ct-stage">
                <select id="ct-stage" name="stage" defaultValue={contact.stage}>
                  {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}: {s.hint}</option>)}
                </select>
              </Field>
              <Field label="Owner" htmlFor="ct-owner" hint="Who's looking after them.">
                <select id="ct-owner" name="owner_id" defaultValue={contact.owner_id ?? ""}>
                  <option value="">Unassigned</option>
                  {managers.map((s) => <option key={s.id} value={s.id}>{s.name}{s.id === staff.id ? " (you)" : ""}</option>)}
                </select>
              </Field>
              <Field label="Name" htmlFor="ct-name"><input id="ct-name" name="name" defaultValue={contact.name} required /></Field>
              <Field label="Email" htmlFor="ct-email"><input id="ct-email" name="email" type="email" defaultValue={contact.email} required /></Field>
              <Field label="Phone" htmlFor="ct-phone"><input id="ct-phone" name="phone" type="tel" defaultValue={contact.phone ?? ""} /></Field>
              <Field label="Type" htmlFor="ct-kind">
                <select id="ct-kind" name="kind" defaultValue={contact.kind}>
                  <option value="family">Family</option>
                  <option value="ambassador">Ambassador</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <SubmitButton className="btn-secondary">Save changes</SubmitButton>
            </form>
          </Card>

          {contact.source && (
            <HelpBox title="Where they came from">
              <p>{contact.source}</p>
            </HelpBox>
          )}

          {staff.role === "admin" && (
            <form action={deleteContact} className="crm-delete">
              <input type="hidden" name="id" value={contact.id} />
              <ConfirmSubmit message={`Delete ${contact.name} and their whole history? Use this if they ask for their data to be removed. This can't be undone.`}>
                Delete this contact
              </ConfirmSubmit>
            </form>
          )}
        </aside>
      </div>
    </>
  );
}
