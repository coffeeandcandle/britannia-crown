import {
  ADVOCACY_CONCERNS,
  SCHOOL_LOCATIONS,
  SCHOOL_CONTACTS,
  SUPPORT_PLANS,
  MEETING_FORMATS,
  ACTIVE_ISSUES,
  URGENCY,
  COMPLAINT_STATUS,
  type AdvocacyTier,
} from "../lib/onboarding";

// The Advocacy Plan part of the checkout form. Every tier asks about the school and the concern;
// Standard adds what meetings need (plans, format, deadlines); Priority adds the active issue,
// urgency and any complaint so far. Validated again on the server in parseAdvocacy.

function Checks({ name, label, options, hint }: { name: string; label: string; options: string[]; hint?: string }) {
  return (
    <fieldset className="form-group ob-checks" data-required-group={name}>
      <legend>{label} <span className="required">*</span></legend>
      {hint && <span className="ui-hint">{hint}</span>}
      <div>
        {options.map((o) => (
          <label key={o} className="onboarding-check">
            <input type="checkbox" name={name} value={o} />
            <span>{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Select({ id, name, label, options, required = true }: { id: string; name: string; label: string; options: string[]; required?: boolean }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label} {required && <span className="required">*</span>}</label>
      <select id={id} name={name} defaultValue="" required={required}>
        <option value="">Choose one…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function AdvocacyIntake({ tier }: { tier: AdvocacyTier }) {
  return (
    <>
      <h2 className="onboarding-h">Your child&apos;s school</h2>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ob-school">School name <span className="required">*</span></label>
          <input id="ob-school" name="school" required placeholder="e.g. Dubai British School" />
        </div>
        <Select id="ob-school-loc" name="school_location" label="Where is the school?" options={SCHOOL_LOCATIONS} />
      </div>

      {tier === "priority" && (
        <>
          <h2 className="onboarding-h">The issue you need help with now</h2>
          <p className="ui-hint ob-intro">Priority is for active, urgent issues. This helps us act quickly from day one.</p>
          <Select id="ob-issue" name="active_issue" label="What is the main issue?" options={ACTIVE_ISSUES} />
          <div className="form-row">
            <Select id="ob-urgency" name="urgency" label="How urgent is it?" options={URGENCY} />
            <Select id="ob-complaint" name="complaint" label="Has a complaint been made?" options={COMPLAINT_STATUS} />
          </div>
        </>
      )}

      <h2 className="onboarding-h">What you need help with</h2>
      <Checks name="concerns" label="Areas of concern" options={ADVOCACY_CONCERNS} hint="Tick all that apply." />
      <div className="form-group">
        <label htmlFor="ob-focus">
          {tier === "priority" ? "What has happened so far?" : "What is happening, and what would you like to change?"} <span className="required">*</span>
        </label>
        <textarea
          id="ob-focus"
          name="focus"
          required
          maxLength={480}
          placeholder={
            tier === "priority"
              ? "Key dates, what the school has said or done, and what outcome you need."
              : "For example: our son's reading support stopped this term and his reports don't reflect it. We'd like a plan agreed with the SENCO."
          }
        ></textarea>
      </div>
      <Checks name="contacted" label="Who have you already spoken to at the school?" options={SCHOOL_CONTACTS} />

      {tier !== "essential" && (
        <>
          <h2 className="onboarding-h">School meetings</h2>
          <p className="ui-hint ob-intro">Your plan includes a school meeting each month, and we review reports, IEPs and learning plans.</p>
          <div className="form-row">
            <Select id="ob-plan" name="support_plan" label="Does your child have an IEP, learning plan or diagnosis?" options={SUPPORT_PLANS} />
            <Select id="ob-format" name="meeting_format" label="How should meetings happen?" options={MEETING_FORMATS} />
          </div>
          <div className="form-group">
            <label htmlFor="ob-deadlines">Upcoming meetings or deadlines (optional)</label>
            <input id="ob-deadlines" name="deadlines" maxLength={300} placeholder="e.g. parents' evening 12 March, exam access deadline end of term" />
          </div>
        </>
      )}

      <div className="form-group">
        <label htmlFor="ob-times">Best times to call you (optional)</label>
        <input id="ob-times" name="times" placeholder="e.g. weekday mornings, or WhatsApp is best" />
      </div>

      <div className="form-group onboarding-consent">
        <label className="onboarding-check" htmlFor="ob-authority">
          <input id="ob-authority" name="authority" type="checkbox" required />
          <span>I&apos;m happy to sign a parent authority letter so Britannia Crown can speak to the school on my behalf. We&apos;ll send it to you after payment.</span>
        </label>
      </div>
    </>
  );
}
