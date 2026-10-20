"use client";

import { useState } from "react";
import { track } from "../lib/track";
import { appendAttribution } from "../lib/attribution";
import { FORMSPREE_AMBASSADOR } from "../lib/site";

// Ambassador application. Submits in place, shows a confirmation and records a lead.
export default function AmbassadorForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_AMBASSADOR, {
        method: "POST",
        body: appendAttribution(new FormData(form)),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      track("generate_lead", { lead_source: "ambassador_application", context: "Ambassador Programme" });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="enq-done" role="status">
        <p className="enq-done-title">Thank you — your application is with us.</p>
        <p>We&apos;ll review it and be in touch within 48 hours with your personal ambassador code.</p>
      </div>
    );
  }

  return (
    <form action={FORMSPREE_AMBASSADOR} method="POST" onSubmit={onSubmit} className="enq-form">
      <input type="hidden" name="_subject" value="New Ambassador Programme Application - Britannia Crown" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="enq-hp" aria-hidden="true" />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amb-name">Full Name <span className="required">*</span></label>
          <input type="text" id="amb-name" name="name" autoComplete="name" placeholder="Your full name" required />
        </div>
        <div className="form-group">
          <label htmlFor="amb-phone">WhatsApp Number <span className="required">*</span></label>
          <input type="tel" id="amb-phone" name="phone" autoComplete="tel" placeholder="+44 7700 900123" required />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="amb-email">Email Address <span className="required">*</span></label>
        <input type="email" id="amb-email" name="email" autoComplete="email" placeholder="you@example.com" required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="amb-role">Your Role <span className="required">*</span></label>
          <select id="amb-role" name="role" required defaultValue="">
            <option value="">Select your role...</option>
            <option value="Nanny / Au Pair">Nanny / Au Pair</option>
            <option value="Teacher / Educator">Teacher / Educator</option>
            <option value="Parent">Parent</option>
            <option value="Community Member">Community Member</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amb-location">Where are you based? <span className="required">*</span></label>
          <select id="amb-location" name="location" required defaultValue="">
            <option value="">Select...</option>
            <option value="UAE">UAE</option>
            <option value="UK">UK</option>
            <option value="Elsewhere">Elsewhere</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="amb-code">Preferred Ambassador Code (Optional)</label>
        <input type="text" id="amb-code" name="code-preference" placeholder="e.g. BC-SARA4 or BC-SMITH22 (we'll confirm availability)" />
        <small className="amb-hint">A mix of letters and numbers, e.g. BC-SARA4 or BC-SMITH22.</small>
      </div>

      <div className="form-group">
        <label htmlFor="amb-network">Tell us about your network</label>
        <textarea id="amb-network" name="network" placeholder="How do you plan to share your code? Who are you connected to? (e.g. nanny network, school staff, parent groups)"></textarea>
      </div>

      {status === "error" && (
        <p className="enq-error" role="alert">Sorry — your application didn&apos;t send. Please try again, or email us at hello@britanniacrown.com.</p>
      )}

      <button type="submit" className="form-submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Apply to Become an Ambassador →"}
      </button>
      <p className="enq-note">We&apos;ll review your application and be in touch within 48 hours.</p>
    </form>
  );
}
