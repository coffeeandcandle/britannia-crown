import Link from "next/link";
import { requireStaff, listContacts, contactStageCounts } from "../../../lib/portal/dal";
import { STAGES } from "../../../lib/crm";
import { formatDate } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Avatar, Pill, Field, HelpBox } from "../../ui";
import { SubmitButton } from "../../client-ui";
import { addContact } from "../crm-actions";
import { stageTone, kindLabel } from "./shared";


export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string; stage?: string; q?: string; mine?: string }>;
}) {
  const { staff } = await requireStaff(["admin"]);
  const { stage, q, mine, ...msg } = await searchParams;
  const activeStage = STAGES.some((s) => s.id === stage) ? stage : undefined;
  const term = (q ?? "").trim();
  const [contacts, counts] = await Promise.all([
    listContacts({ stage: activeStage, q: term || undefined, mine: mine ? staff.id : undefined }),
    contactStageCounts(),
  ]);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const link = (params: Record<string, string | undefined>) => {
    const qs = new URLSearchParams(Object.entries({ stage: activeStage, q: term || undefined, mine, ...params }).filter(([, v]) => v) as [string, string][]);
    return `/portal/admin/contacts${qs.size ? `?${qs}` : ""}`;
  };

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        title="Contacts"
        description="Everyone who has enquired, booked a call or bought online, with their full history. New website enquiries appear here automatically."
        actions={<a href="#add-contact" className="btn-primary">+ Add a contact</a>}
      />

      <nav className="ui-tabs ui-tabs-wrap" aria-label="Stages">
        <Link href={link({ stage: undefined })} aria-current={!activeStage ? "page" : undefined}>All <span className="ui-count">{total}</span></Link>
        {STAGES.map((s) => (
          <Link key={s.id} href={link({ stage: s.id })} aria-current={activeStage === s.id ? "page" : undefined} title={s.hint}>
            {s.label} <span className={`ui-count${s.id === "new" && counts.new ? " is-alert" : ""}`}>{counts[s.id] ?? 0}</span>
          </Link>
        ))}
      </nav>

      <div className="pt-grid">
        <div className="pt-main">
          <Card>
            <form className="ui-search" role="search">
              {activeStage && <input type="hidden" name="stage" value={activeStage} />}
              <label htmlFor="contact-q" className="sr-only">Search contacts</label>
              <input id="contact-q" name="q" type="search" defaultValue={term} placeholder="Search by name, email or phone…" />
              <label className="ui-check">
                <input type="checkbox" name="mine" value="1" defaultChecked={Boolean(mine)} /> Only mine
              </label>
              <button type="submit" className="btn-secondary">Search</button>
              {(term || mine) && <Link href={link({ q: undefined, mine: undefined })} className="ui-link">Clear</Link>}
            </form>

            {contacts.length === 0 ? (
              <EmptyState title={term || activeStage || mine ? "No contacts match" : "No contacts yet"}>
                {term || activeStage || mine
                  ? "Try another stage or search."
                  : "When someone fills in a form on the website, books a call or buys online, they appear here."}
              </EmptyState>
            ) : (
              <ul className="ui-rows">
                {contacts.map((c) => (
                  <li key={c.id}>
                    <Link href={`/portal/admin/contacts/${c.id}`} className="ui-row-link">
                      <Avatar name={c.name} />
                      <span className="ui-row-main">
                        <strong>
                          {c.name} {kindLabel[c.kind] && <Pill tone="muted">{kindLabel[c.kind]}</Pill>}
                        </strong>
                        <span>{c.last_summary ?? c.email}</span>
                      </span>
                      <span className="ui-row-cell ui-hide-sm">
                        <span className="ui-row-label">Owner</span>
                        {c.owner_name ?? "Unassigned"}
                      </span>
                      <span className="ui-row-cell">
                        <span className="ui-row-label">Last activity</span>
                        {formatDate(new Date(c.last_activity_at), "Europe/London")}
                      </span>
                      <Pill tone={stageTone[c.stage]}>{STAGES.find((s) => s.id === c.stage)?.label}</Pill>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <aside className="pt-side">
          <Card id="add-contact" title="Add a contact" description="For enquiries by phone, email or in person.">
            <form action={addContact} className="pt-form">
              <Field label="Name" htmlFor="nc-name">
                <input id="nc-name" name="name" required placeholder="Parent's full name" />
              </Field>
              <Field label="Email" htmlFor="nc-email">
                <input id="nc-email" name="email" type="email" required placeholder="parent@example.com" />
              </Field>
              <Field label="Phone (optional)" htmlFor="nc-phone">
                <input id="nc-phone" name="phone" type="tel" />
              </Field>
              <Field label="Type" htmlFor="nc-kind">
                <select id="nc-kind" name="kind" defaultValue="family">
                  <option value="family">Family</option>
                  <option value="ambassador">Ambassador</option>
                  <option value="other">Other (school, partner…)</option>
                </select>
              </Field>
              <Field label="What did they ask about? (optional)" htmlFor="nc-note">
                <textarea id="nc-note" name="note" rows={3} placeholder="e.g. Called about GCSE Maths for Year 10 son" />
              </Field>
              <SubmitButton pendingText="Adding…">Add contact</SubmitButton>
            </form>
          </Card>

          <HelpBox title="How contacts work">
            <ul>
              <li><strong>New</strong> contacts need a reply. Aim to reply within one working day.</li>
              <li>Open a contact to see everything they&apos;ve done, and log calls, emails and notes.</li>
              <li>Stages move forward automatically when they book a call or pay online.</li>
              <li>When they&apos;re ready for lessons, use <strong>Create portal account</strong> on their record.</li>
            </ul>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
