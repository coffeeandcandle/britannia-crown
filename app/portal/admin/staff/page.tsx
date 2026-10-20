import { requireStaff, listStaff } from "../../../lib/portal/dal";
import { siteOrigin } from "../../../lib/portal/origin";
import { STAFF_SIGN_IN_PATH } from "../../../lib/portal/config";
import { Flash } from "../../components";
import { PageHeader, Card, Avatar, Pill, Field, HelpBox } from "../../ui";
import { SubmitButton, CopyButton } from "../../client-ui";
import { saveStaff } from "../actions";

const roles = [
  { id: "tutor", name: "Tutor", can: "Sees only their own lessons, joins them and writes notes." },
  { id: "consultant", name: "Consultant", can: "Manages families, schedules lessons for anyone and reads all notes." },
  { id: "admin", name: "Admin", can: "Everything a consultant can do, plus contacts (enquiries), online orders and adding or removing team members." },
] as const;

export default async function TeamPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { staff: me } = await requireStaff(["admin"]);
  const [team, msg, origin] = await Promise.all([listStaff(), searchParams, siteOrigin()]);
  const staffLink = `${origin}${STAFF_SIGN_IN_PATH}`;

  return (
    <>
      <Flash {...msg} />
      <PageHeader
        title="Team and access"
        description="Who can sign in to the staff area, and what each person can do."
        actions={<a href="#add-staff" className="btn-primary">+ Add a team member</a>}
      />

      <div className="pt-grid">
        <div className="pt-main">
          <Card title={`Team (${team.filter((s) => s.active).length} active)`} description="Change a role or turn off access, then save that row.">
            <ul className="ui-rows">
              {team.map((s) => (
                <li key={s.id} className={s.active ? undefined : "is-inactive"}>
                  <form action={saveStaff} className="ui-row-form">
                    <input type="hidden" name="id" value={s.id} />
                    <Avatar name={s.name} />
                    <span className="ui-row-main">
                      <strong>{s.name}{s.id === me.id && " (you)"}</strong>
                      <span>{s.email}</span>
                    </span>
                    <label className="sr-only" htmlFor={`role-${s.id}`}>Role for {s.name}</label>
                    <select id={`role-${s.id}`} name="role" defaultValue={s.role}>
                      {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                    <label className="ui-switch">
                      <input type="checkbox" name="active" defaultChecked={s.active} />
                      <span>{s.active ? "Has access" : "No access"}</span>
                    </label>
                    {!s.active && <Pill tone="muted">Access off</Pill>}
                    <SubmitButton className="btn-secondary ui-btn-sm">Save</SubmitButton>
                  </form>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <aside className="pt-side">
          <Card id="add-staff" title="Add a team member" description="They'll sign in with this email at the staff login.">
            <form action={saveStaff} className="pt-form">
              <Field label="Name" htmlFor="st-name"><input id="st-name" name="name" required /></Field>
              <Field label="Work email" htmlFor="st-email"><input id="st-email" name="email" type="email" required /></Field>
              <fieldset className="ui-choice">
                <legend>Role</legend>
                {roles.map((r) => (
                  <label key={r.id}>
                    <input type="radio" name="role" value={r.id} defaultChecked={r.id === "tutor"} />
                    <span><strong>{r.name}</strong> {r.can}</span>
                  </label>
                ))}
              </fieldset>
              <SubmitButton pendingText="Adding…">Add to team</SubmitButton>
            </form>
          </Card>
          <HelpBox title="How team members sign in">
            <ol>
              <li>Add them here with their work email.</li>
              <li>Send them the staff login link. The first time, they choose <strong>Sign up</strong> with that email.</li>
              <li>They&apos;ll see only what their role allows.</li>
            </ol>
            <div className="ui-copy-row">
              <code>{staffLink}</code>
              <CopyButton value={staffLink} />
            </div>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
