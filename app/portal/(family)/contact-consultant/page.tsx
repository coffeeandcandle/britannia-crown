import { requireFamily, familyConsultant } from "../../../lib/portal/dal";
import { EMAIL } from "../../../lib/site";
import { Flash } from "../../components";
import { PageHeader, Card, Field, Avatar, HelpBox } from "../../ui";
import { SubmitButton, CopyButton } from "../../client-ui";
import { messageConsultant } from "./actions";

// Contacting the consultant always works here, whether or not the device has an email app set up.
export default async function ContactConsultantPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const { family } = await requireFamily();
  const [consultant, msg] = await Promise.all([familyConsultant(family), searchParams]);
  const name = consultant?.name ?? "the Britannia Crown team";
  const email = consultant?.email ?? EMAIL;
  const subject = encodeURIComponent(`Message from ${family.name}`);

  return (
    <>
      <PageHeader title="Contact my consultant" description={consultant ? `${consultant.name} looks after your family. Send a message here and they will reply by email.` : "You don't have a named consultant yet, so your message goes to the Britannia Crown team."} />
      <Flash ok={msg.ok} error={msg.error} />
      <div className="pt-grid">
        <div className="pt-main">
          <Card title={`Send a message to ${name}`} description="The quickest way. It works on any device, and the reply comes to your email.">
            <form action={messageConsultant} className="pt-form">
              <Field label="Your message" htmlFor="cc-body">
                <textarea id="cc-body" name="body" rows={6} required maxLength={3000} />
              </Field>
              <SubmitButton pendingText="Sending…">Send message</SubmitButton>
            </form>
          </Card>
        </div>
        <aside className="pt-side">
          <Card title="Or email directly">
            <div className="ui-people">
              <Avatar name={name} size="sm" />
              <span><strong>{consultant?.name ?? "Britannia Crown"}</strong> <span>{email}</span></span>
            </div>
            <div className="cc-actions">
              <a className="btn-secondary" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${subject}`} target="_blank" rel="noopener noreferrer">Open in Gmail</a>
              <a className="btn-secondary" href={`https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(email)}&subject=${subject}`} target="_blank" rel="noopener noreferrer">Open in Outlook</a>
              <a className="btn-secondary" href={`mailto:${email}?subject=${subject}`}>Open my email app</a>
              <CopyButton value={email} label="Copy email address" />
            </div>
          </Card>
          <HelpBox title="Something urgent?">
            <p>For anything urgent about your child&apos;s safety or wellbeing, please also call the school and your consultant.</p>
          </HelpBox>
        </aside>
      </div>
    </>
  );
}
