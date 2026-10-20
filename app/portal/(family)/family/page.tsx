import { requireFamily, familyChildren } from "../../../lib/portal/dal";
import { TIMEZONES } from "../../../lib/portal/time";
import { Flash } from "../../components";
import { PageHeader, Card, Avatar, Field } from "../../ui";
import { SubmitButton, ConfirmSubmit } from "../../client-ui";
import { saveMyDetails, addMyChild, removeMyChild } from "./actions";

const yearGroups = ["Nursery", "Reception", ...Array.from({ length: 13 }, (_, i) => `Year ${i + 1}`)];

// Families look after their own details and children here, so nobody at Britannia Crown has to set them up.
export default async function YourFamilyPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { family } = await requireFamily();
  const [children, msg] = await Promise.all([familyChildren(family.id), searchParams]);

  return (
    <>
      <PageHeader title="Your family" description="Keep your details up to date and tell us about your children, so lessons and notes can be linked to them." />
      <Flash ok={msg.ok} error={msg.error} />

      <div className="pt-grid">
        <div className="pt-main">
          <Card title="Your details" description={`You sign in with ${family.email}.`}>
            <form action={saveMyDetails} className="pt-form">
              <Field label="Your name" htmlFor="fd-name">
                <input id="fd-name" name="name" defaultValue={family.name} required autoComplete="name" />
              </Field>
              <Field label="Phone (optional)" htmlFor="fd-phone" hint="So your consultant can reach you.">
                <input id="fd-phone" name="phone" type="tel" defaultValue={family.phone ?? ""} autoComplete="tel" />
              </Field>
              <Field label="Time zone" htmlFor="fd-tz" hint="Lesson times are shown in this time zone.">
                <select id="fd-tz" name="timezone" defaultValue={family.timezone}>
                  {TIMEZONES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
              </Field>
              <SubmitButton pendingText="Saving…">Save details</SubmitButton>
            </form>
          </Card>
        </div>

        <aside className="pt-side">
          <Card id="children" title={children.length === 1 ? "Your child" : "Your children"} description="Add each child so lessons and notes are linked to them.">
            {children.length > 0 && (
              <ul className="ui-people">
                {children.map((c) => (
                  <li key={c.id}>
                    <Avatar name={c.name} size="sm" />
                    <span><strong>{c.name}</strong>{c.year_group && <span>{c.year_group}</span>}</span>
                    <form action={removeMyChild}>
                      <input type="hidden" name="id" value={c.id} />
                      <ConfirmSubmit message={`Remove ${c.name}? Past lessons stay, but are no longer linked to them.`}>Remove</ConfirmSubmit>
                    </form>
                  </li>
                ))}
              </ul>
            )}
            <form action={addMyChild} className="pt-form ui-inline-form">
              <Field label="Child's first name" htmlFor="mc-name">
                <input id="mc-name" name="name" required />
              </Field>
              <Field label="Year group" htmlFor="mc-year">
                <input id="mc-year" name="year_group" placeholder="e.g. Year 10" list="mc-year-groups" />
              </Field>
              <datalist id="mc-year-groups">
                {yearGroups.map((y) => <option key={y} value={y} />)}
              </datalist>
              <SubmitButton className="btn-secondary" pendingText="Adding…">Add child</SubmitButton>
            </form>
          </Card>
        </aside>
      </div>
    </>
  );
}
