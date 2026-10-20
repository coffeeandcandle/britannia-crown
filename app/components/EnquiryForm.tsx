"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { track } from "../lib/track";
import { appendAttribution } from "../lib/attribution";
import { useFormPolish } from "../lib/useFormPolish";
import { EMAIL } from "../lib/site";

// Values must match the ?service= links used across the site so preselection works.
const SERVICE_OPTIONS = {
  "In the UK": [
    ["Tutoring", "Private Tutoring (Primary to A-Level)"],
    ["Face-to-Face Tutoring", "Face-to-Face Tutoring"],
    ["Home Education", "Home Education"],
    ["School Placement", "School & Nursery Placement"],
    ["Qualifications", "Qualifications & Exam Success"],
  ],
  "Moving to the UAE": [
    ["Moving to the UAE", "Relocation Education Advice"],
    ["Nursery Search & Placement", "Nursery Search & Placement (Dubai)"],
    ["School Search & Placement", "School Search & Placement (Dubai)"],
    ["Subject Tutoring", "Subject Tutoring (Dubai)"],
    ["GCSE & A-Level Preparation", "GCSE & A-Level Preparation (Dubai)"],
    ["Homeschool Support", "Homeschool Support (Dubai)"],
    ["Education Concierge", "Education Concierge"],
  ],
  "Academic Partner Membership": [
    ["Academic Partner Membership", "Academic Partner Membership"],
    ["Academic Partner Membership - Foundation", "Membership — Foundation"],
    ["Academic Partner Membership - Partner", "Membership — Partner"],
    ["Academic Partner Membership - Full Partner", "Membership — Full Partner"],
  ],
} as const;

type Props = {
  // Analytics label for where the lead came from, e.g. "contact_page" or "subject_page".
  source: string;
  defaultService?: string;
  // Extra context such as the subject, sent with the enquiry and in the email subject.
  context?: string;
  // Compact forms hide the service picker and make the message optional.
  compact?: boolean;
  showReferral?: boolean;
  // Hide the reassurance line when the surrounding card already says it.
  showNote?: boolean;
};

export default function EnquiryForm({
  source,
  defaultService = "",
  context,
  compact = false,
  showReferral = false,
  showNote = true,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { formRef, liveRef, validate, clearDraft } = useFormPolish(source);
  const doneRef = useRef<HTMLDivElement>(null);

  // After sending, bring the confirmation into view and move focus to it for keyboard and screen-reader users.
  useEffect(() => {
    if (status !== "sent") return;
    doneRef.current?.focus({ preventScroll: true });
    doneRef.current?.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [status]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    const form = e.currentTarget;
    const data = appendAttribution(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: data });
      if (!res.ok) throw new Error(`Enquiry failed: ${res.status}`);
      track("generate_lead", {
        lead_source: source,
        service: String(data.get("service") ?? ""),
        context: context ?? "",
      });
      form.reset();
      clearDraft();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="enq-done" role="status" ref={doneRef} tabIndex={-1}>
        <svg className="enq-check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M15 27l8 8 14-16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className="enq-done-title">Thank you. Your enquiry is with us.</p>
        <p>An education consultant will be in touch within 24 hours. Want to talk sooner?</p>
        <div className="enq-done-actions">
          <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
          <a href={`mailto:${EMAIL}`} className="btn-secondary">Email us</a>
        </div>
      </div>
    );
  }

  return (
    <form action="/api/enquiry" method="POST" onSubmit={onSubmit} className="enq-form" ref={formRef} noValidate>
      <p className="form-live" role="status" aria-live="polite" ref={liveRef} />
      <input type="hidden" name="form" value="enquiry" />
      <input type="hidden" name="source" value={source} />
      {context && <input type="hidden" name="enquiry_about" value={context} />}
      {/* Honeypot: real visitors never see or fill this; the server ignores submissions that do. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="enq-hp" aria-hidden="true" />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor={`${source}-name`}>Full name <span className="required">*</span></label>
          <input type="text" id={`${source}-name`} name="name" autoComplete="name" placeholder="Your full name" required />
        </div>
        <div className="form-group">
          <label htmlFor={`${source}-phone`}>Phone number <span className="required">*</span></label>
          <input type="tel" id={`${source}-phone`} name="phone" autoComplete="tel" placeholder="07700 900123" required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor={`${source}-email`}>Email address <span className="required">*</span></label>
        <input type="email" id={`${source}-email`} name="email" autoComplete="email" placeholder="you@example.com" required />
      </div>

      {compact ? (
        <input type="hidden" name="service" value={defaultService} />
      ) : (
        <div className="form-group">
          <label htmlFor={`${source}-service`}>What do you need help with? <span className="required">*</span></label>
          <select key={defaultService} id={`${source}-service`} name="service" required defaultValue={defaultService}>
            <option value="">Choose one…</option>
            {Object.entries(SERVICE_OPTIONS).map(([group, options]) => (
              <optgroup key={group} label={group}>
                {options.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </optgroup>
            ))}
            <option value="General Enquiry">General Enquiry</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label htmlFor={`${source}-age`}>Child&apos;s age or year group</label>
        <input type="text" id={`${source}-age`} name="child-age" placeholder="e.g. Year 10, or 7 years old" />
      </div>

      <div className="form-group">
        <label htmlFor={`${source}-message`}>
          {compact ? "What would you like help with?" : "Your message"} {!compact && <span className="required">*</span>}
        </label>
        <textarea
          id={`${source}-message`}
          name="message"
          placeholder="Tell us a little about your child and what you're looking for..."
          required={!compact}
        ></textarea>
      </div>

      {showReferral && (
        <details className="referral-disclosure">
          <summary>Have an ambassador referral code?</summary>
          <div className="form-group" style={{ marginTop: "16px" }}>
            <label htmlFor={`${source}-referral`}>Ambassador referral code</label>
            <input type="text" id={`${source}-referral`} name="referral-code" placeholder="Enter ambassador code e.g. BC-SARA" />
          </div>
        </details>
      )}

      {status === "error" && (
        <p className="enq-error" role="alert">
          Sorry — your enquiry didn&apos;t send. Please try again, or email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}

      <button type="submit" className="form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : compact ? "Request a call back" : "Send message"}
      </button>
      {showNote && <p className="enq-note">Free, no-obligation consultation. We&apos;ll never share your details.</p>}
    </form>
  );
}
