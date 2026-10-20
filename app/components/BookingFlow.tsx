"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CalendlyEmbed from "./CalendlyEmbed";
import EnquiryForm from "./EnquiryForm";
import { sessionTypes, getSessionType, isBookable, priceLabel, type SessionType } from "../lib/sessions";
import { EMAIL } from "../lib/site";
import { track } from "../lib/track";
import { appendAttribution } from "../lib/attribution";

type Details = { name: string; email: string; yearGroup: string; notes: string };
type Step = 1 | 2 | 3 | 4;

const yearGroups = [
  "Nursery or Reception",
  "Years 1 to 6 (primary)",
  "Years 7 to 9",
  "Years 10 to 11 (GCSE)",
  "Years 12 to 13 (A-Level)",
  "Home educated",
  "More than one child",
];

const stepNames = ["Choose a session", "Your details", "Pick a time"];

function readUtm() {
  try {
    const a = JSON.parse(sessionStorage.getItem("bc_attribution") ?? "{}") as Record<string, string>;
    return {
      utmSource: a.utm_source,
      utmMedium: a.utm_medium,
      utmCampaign: a.utm_campaign ?? (a.landing_page ? `landing:${a.landing_page}`.slice(0, 100) : undefined),
      utmContent: a.utm_content,
      utmTerm: a.utm_term,
    };
  } catch {
    return {};
  }
}

export default function BookingFlow() {
  const params = useSearchParams();
  const initial = getSessionType(params.get("session"));
  const [session, setSession] = useState<SessionType>(initial ?? sessionTypes[0]);
  const [step, setStep] = useState<Step>(initial ? 2 : 1);
  const [details, setDetails] = useState<Details>({ name: "", email: "", yearGroup: "", notes: "" });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Move focus to the new step's heading so keyboard and screen reader users follow along.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [step]);

  function chooseSession(s: SessionType) {
    setSession(s);
    setStep(2);
    track("booking_session_selected", { session_type: s.id });
  }

  // Saves the booking to the CRM: once when details are entered (so a family who doesn't
  // finish is still followed up), and again when Calendly confirms the time.
  function saveBooking(status: "started" | "booked", calendlyEvent?: string) {
    const data = new FormData();
    data.set("form", "booking");
    data.set("status", status);
    data.set("session", session.name);
    data.set("name", details.name);
    data.set("email", details.email);
    data.set("year_group", details.yearGroup);
    data.set("notes", details.notes);
    if (calendlyEvent) data.set("calendly_event", calendlyEvent);
    fetch("/api/enquiry", { method: "POST", body: appendAttribution(data), keepalive: true }).catch(() => {});
  }

  function onDetailsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (isBookable(session)) saveBooking("started");
    setStep(3);
    track("booking_details_entered", { session_type: session.id });
  }

  function onScheduled(payload?: { event?: { uri?: string } }) {
    saveBooking("booked", payload?.event?.uri);
    setStep(4);
    track("consultation_booked", {
      method: "calendly",
      session_type: session.id,
      value: session.price ?? 0,
      currency: "GBP",
      page_path: window.location.pathname,
    });
  }

  const bookable = isBookable(session);
  const shownStep = Math.min(step, 3);

  return (
    <div className="booking">
      {step < 4 && (
        <ol className="booking-steps" aria-label="Booking progress">
          {stepNames.map((name, i) => {
            const n = i + 1;
            const state = n < shownStep ? "done" : n === shownStep ? "current" : "todo";
            return (
              <li key={name} className={`is-${state}`} aria-current={state === "current" ? "step" : undefined}>
                <span className="booking-step-num" aria-hidden="true">{state === "done" ? "✓" : n}</span>
                <span>{name}</span>
              </li>
            );
          })}
        </ol>
      )}

      {step === 1 && (
        <section aria-labelledby="booking-step-title">
          <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">What would you like to book?</h2>
          <div className="session-cards">
            {sessionTypes.map((s) => (
              <button
                type="button"
                key={s.id}
                className={`session-card${s.id === session.id ? " is-selected" : ""}`}
                onClick={() => chooseSession(s)}
              >
                <span className="session-card-meta">
                  {s.minutes} minutes · {priceLabel(s)}
                </span>
                <strong>{s.name}</strong>
                <span>{s.summary}</span>
                <span className="session-card-cta">{isBookable(s) ? "Choose a time →" : "Request this session →"}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="booking-step-title" className="booking-panel">
          <div className="booking-summary">
            <p className="booking-summary-label">You&apos;re booking</p>
            <p className="booking-summary-name">{session.name}</p>
            <p>{session.minutes} minutes · {priceLabel(session)}</p>
            <ul className="uk-ticks">
              {session.includes.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <button type="button" className="finder-reset" onClick={() => setStep(1)}>Change session</button>
          </div>

          {bookable ? (
            <form className="enq-card booking-form" onSubmit={onDetailsSubmit} noValidate>
              <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">Tell us a little first</h2>
              <p className="booking-hint">This goes straight to your consultant, so the call can focus on your child.</p>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bk-name">Your name <span className="required">*</span></label>
                  <input id="bk-name" autoComplete="name" required value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="bk-email">Email address <span className="required">*</span></label>
                  <input id="bk-email" type="email" autoComplete="email" required value={details.email} onChange={(e) => setDetails({ ...details, email: e.target.value })} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bk-year">Child&apos;s year group</label>
                <select id="bk-year" value={details.yearGroup} onChange={(e) => setDetails({ ...details, yearGroup: e.target.value })}>
                  <option value="">Choose one…</option>
                  {yearGroups.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bk-notes">What would you like to talk about?</label>
                <textarea id="bk-notes" rows={3} value={details.notes} onChange={(e) => setDetails({ ...details, notes: e.target.value })} placeholder="For example: choosing a secondary school, or GCSE maths at grade 5 aiming for 7" />
              </div>
              <button type="submit" className="form-submit">Continue to choose a time</button>
            </form>
          ) : (
            <div className="enq-card">
              <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">Request a {session.name.toLowerCase()}</h2>
              <p className="booking-hint">Online booking for this session is opening soon. Leave your details and we&apos;ll arrange a time with you, usually within 24 hours.</p>
              <EnquiryForm source="booking_request" defaultService={session.service} context={`Session request: ${session.name}`} compact />
            </div>
          )}
        </section>
      )}

      {step === 3 && session.calendlyUrl && (
        <section aria-labelledby="booking-step-title">
          <div className="booking-bar">
            <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">Pick a time for your {session.name.toLowerCase()}</h2>
            <button type="button" className="finder-reset" onClick={() => setStep(2)}>Back to your details</button>
          </div>
          {session.price !== null && <p className="booking-hint">You&apos;ll pay {priceLabel(session)} securely by card when you confirm the time.</p>}
          <CalendlyEmbed
            url={session.calendlyUrl}
            prefill={{
              name: details.name,
              email: details.email,
              customAnswers: {
                a1: [details.yearGroup && `Year group: ${details.yearGroup}`, details.notes].filter(Boolean).join(". "),
              },
            }}
            utm={readUtm()}
            onScheduled={onScheduled}
          />
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="booking-step-title" className="booking-done">
          <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">You&apos;re booked in{details.name ? `, ${details.name.split(" ")[0]}` : ""}</h2>
          <p>A confirmation with the call details is on its way to {details.email || "your inbox"}. Your consultant will read your notes beforehand.</p>
          <ul className="uk-ticks">
            <li>Add the time to your calendar from the confirmation email</li>
            <li>Need to change it? Use the reschedule link in the email</li>
            <li>Questions before the call? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
          <div className="uk-hero-actions">
            <Link href="/guides" className="btn-secondary">Read our guides while you wait</Link>
          </div>
        </section>
      )}
    </div>
  );
}
