import Link from "next/link";
import { requireStaff, listFamilies, listStaff } from "../../../lib/portal/dal";
import { TIMEZONES, sessionWhen } from "../../../lib/portal/time";
import { siteOrigin } from "../../../lib/portal/origin";
import { SIGN_IN_PATH } from "../../../lib/portal/config";
import { Flash } from "../../components";
import { PageHeader, Card, EmptyState, Avatar, Pill, Field, HelpBox } from "../../ui";
import { SubmitButton, CopyButton } from "../../client-ui";
import { saveFamily } from "../actions";

export default async function FamiliesPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string; q?: string }> }) {
  await requireStaff(["admin", "consultant"]);
  const { q, ...msg } = await searchParams;
  const [families, team, origin] = await Promise.all([listFamilies(), listStaff(), siteOrigin()]);
  const term = (q ?? "").trim().toLowerCase();
  const shown = term ? families.filter((f) => `${f.name} ${f.email}`.toLowerCase().includes(term)) : families;
  const consultants = team.filter((s) => s.active && s.role !== "tutor");
  const signInLink = `${origin}${SIGN_IN_PATH}`;

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        title="Families"
        description="Every family you work with. Open a family to add children, schedule lessons and see their notes."
        actions={<a href="#add-family" className="btn-primary">+ Add a family</a>}
      />

      <div className="pt-grid">
        <div className="pt-main">
          <Card>
            {families.length > 0 && (
              <form className="ui-search" role="search">
                <label htmlFor="family-q" className="sr-only">Search families</label>
                <input id="family-q" name="q" type="search" defaultValue={q} placeholder="Search by family name or email…" />
                <button type="submit" className="btn-secondary">Search</button>
                {term && <Link href="/portal/admin/families" className="ui-link">Clear</Link>}
              </form>
            )}
            {shown.length === 0 ? (
              <EmptyState
                title={term ? "No families match that search" : "No families yet"}
                action={!term ? <a href="#add-family" className="btn-primary">Add your first family</a> : undefined}
              >
                {term ? "Try part of the name or email address." : "Add a family with the parent's email address. They'll use it to sign in."}
              </EmptyState>
            ) : (
              <ul className="ui-rows">
                {shown.map((f) => (
                  <li key={f.id}>
                    <Link href={`/portal/admin/families/${f.id}`} className="ui-row-link">
                      <Avatar name={f.name} />
                      <span className="ui-row-main">
                        <strong>{f.name}</strong>
                        <span>{f.email}</span>
                      </span>
                      <span className="ui-row-cell">
                        <span className="ui-row-label">Next lesson</span>
                        {f.next_session ? sessionWhen(new Date(f.next_session), 60, "Europe/London").label : "None booked"}
                      </span>
                      <span className="ui-row-cell ui-hide-sm">
                        <span className="ui-row-label">Consultant</span>
                        {f.consultant_name ?? "Not assigned"}
                      </span>
                      <span className="ui-row-cell ui-hide-sm">
                        <span className="ui-row-label">Children</span>
                        {f.child_count}
                      </span>
                      {f.clerk_user_id ? <Pill tone="good">Using portal</Pill> : <Pill tone="warn">Not signed in yet</Pill>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <aside className="pt-side">
          <Card id="add-family" title="Add a family" description="Takes a minute. You can add children and lessons next.">
            <form action={saveFamily} className="pt-form">
              <Field label="Family name" htmlFor="nf-name" hint="How you'd like to see them listed, e.g. The Patel family.">
                <input id="nf-name" name="name" required placeholder="The Patel family" />
              </Field>
              <Field label="Parent's email" htmlFor="nf-email" hint="They sign in with this address, so check it carefully.">
                <input id="nf-email" name="email" type="email" required placeholder="parent@example.com" />
              </Field>
              <Field label="Phone (optional)" htmlFor="nf-phone">
                <input id="nf-phone" name="phone" type="tel" />
              </Field>
              <Field label="Where they live" htmlFor="nf-tz" hint="Lesson times are shown to them in this time zone.">
                <select id="nf-tz" name="timezone" defaultValue="Europe/London">
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </Field>
              <Field label="Their consultant" htmlFor="nf-consultant">
                <select id="nf-consultant" name="consultant_id" defaultValue="">
                  <option value="">Choose later</option>
                  {consultants.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <SubmitButton pendingText="Adding…">Add family</SubmitButton>
            </form>
          </Card>

          <HelpBox title="How families get access">
            <ol>
              <li>Add the family here with the parent&apos;s email.</li>
              <li>Send them the sign-in link below. They choose <strong>Sign up</strong> with that same email.</li>
              <li>Their account links automatically and they see only their own family.</li>
            </ol>
            <div className="ui-copy-row">
              <code>{signInLink}</code>
              <CopyButton value={signInLink} />
            </div>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
