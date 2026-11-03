"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EnquiryForm from "./EnquiryForm";
import { sessionTypes, getSessionType, isBookable, priceLabel, type SessionType } from "../lib/sessions";
import { EMAIL } from "../lib/site";
import { track } from "../lib/track";
import { appendAttribution } from "../lib/attribution";

// Dates from tomorrow for the next 30 days (UK time) and half-hour starts from 9am to 5:30pm, so calls end by 6pm.
function nextDays(count: number) {
  const [y, m, d] = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(new Date()).split("-").map(Number);
  return Array.from({ length: count }, (_, i) => {
    const day = new Date(Date.UTC(y, m - 1, d + 1 + i));
    return {
      value: day.toISOString().slice(0, 10),
      label: new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(day),
    };
  });
}
const timeSlots = Array.from({ length: 18 }, (_, i) => {
  const mins = 9 * 60 + i * 30;
  const h = Math.floor(mins / 60);
  return { value: `${String(h).padStart(2, "0")}:${mins % 60 === 0 ? "00" : "30"}`, label: `${h > 12 ? h - 12 : h}:${mins % 60 === 0 ? "00" : "30"}${h >= 12 ? "pm" : "am"}` };
});

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

export default function BookingFlow() {
  const params = useSearchParams();
  const initial = getSessionType(params.get("session"));
  const [session, setSession] = useState<SessionType>(initial ?? sessionTypes[0]);
  const [step, setStep] = useState<Step>(initial ? 2 : 1);
  const [slot, setSlot] = useState({ date: "", time: "" });
  // Times still free, from the server. null while loading or if it couldn't be loaded (then the full list is shown
  // and the server still refuses a time that's taken).
  const [open, setOpen] = useState<Record<string, string[]> | null>(null);
  const [slotError, setSlotError] = useState("");
  const [sending, setSending] = useState(false);
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
  // finish is still followed up), and again when they choose a time.
  function saveBooking(status: "started" | "booked", preferredTime?: string) {
    const data = new FormData();
    data.set("form", "booking");
    data.set("status", status);
    data.set("session", session.name);
    data.set("name", details.name);
    data.set("email", details.email);
    data.set("year_group", details.yearGroup);
    data.set("notes", details.notes);
    if (preferredTime) data.set("preferred_time", preferredTime);
    fetch("/api/enquiry", { method: "POST", body: appendAttribution(data), keepalive: true }).catch(() => {});
  }

  function onDetailsSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (isBookable(session)) saveBooking("started");
    setStep(3);
    track("booking_details_entered", { session_type: session.id });
  }

  function loadSlots() {
    fetch("/api/consultation-slots", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { slots?: Record<string, string[]> } | null) => setOpen(j?.slots ?? null))
      .catch(() => setOpen(null));
  }

  useEffect(() => {
    if (step === 3) loadSlots();
  }, [step]);

  async function onSlotSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity() || sending) return;
    setSlotError("");
    setSending(true);
    try {
      const res = await fetch("/api/consultation-slots/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: details.name, email: details.email, date: slot.date, time: slot.time }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        setSlotError(j?.error ?? "Sorry, something went wrong. Please try again, or email us.");
        if (res.status === 409) {
          setSlot({ ...slot, time: "" });
          loadSlots();
        }
        return;
      }
    } catch {
      setSlotError("Sorry, something went wrong. Please try again, or email us.");
      return;
    } finally {
      setSending(false);
    }
    const date = days.find((d) => d.value === slot.date)?.label ?? slot.date;
    const time = timeSlots.find((t) => t.value === slot.time)?.label ?? slot.time;
    saveBooking("booked", `${date}, ${time} UK time`);
    setStep(4);
    track("consultation_booked", {
      method: "slot_picker",
      session_type: session.id,
      value: session.price ?? 0,
      currency: "GBP",
      page_path: window.location.pathname,
    });
  }

  const [days] = useState(() => nextDays(30));
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
                <span className="session-card-cta">{s.productId ? "Book and pay →" : isBookable(s) ? "Choose a time →" : "Request this session →"}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section aria-labelledby="booking-step-title" className="booking-panel">
          <div className="booking-summary">
            <p className="booking-summary-name">{session.name}</p>
            <p>{session.minutes} minutes · {priceLabel(session)}</p>
            <ul className="uk-ticks">
              {session.includes.map((x) => <li key={x}>{x}</li>)}
            </ul>
            <button type="button" className="finder-reset" onClick={() => setStep(1)}>Change session</button>
          </div>

          {session.productId ? (
            <div className="enq-card">
              <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">Book your {session.name.toLowerCase()}</h2>
              <p className="booking-hint">
                Pay {priceLabel(session)} securely by card. You pay first through Stripe, then tell us about your child.{" "}
                Straight after paying you add a few details and choose a time in your client portal, at least 48 hours ahead so we can prepare.
              </p>
              <a
                className="form-submit"
                href={`/api/checkout?product=${session.productId}&return_path=/book-consultation`}
                onClick={() => track("begin_checkout", { items: [{ item_id: session.productId, item_name: session.name }] })}
              >
                Pay {priceLabel(session)} and book
              </a>
            </div>
          ) : bookable ? (
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
          {session.price !== null && <p className="booking-hint">You&apos;ll pay {priceLabel(session)} securely by card once we confirm the time.</p>}
          <form className="booking-form" onSubmit={onSlotSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bk-date">Date</label>
                <select id="bk-date" required value={slot.date} onChange={(e) => setSlot({ date: e.target.value, time: "" })}>
                  <option value="" disabled>Choose a date</option>
                  {days.filter((d) => !open || open[d.value]).map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bk-time">Time (UK time)</label>
                <select id="bk-time" required value={slot.time} onChange={(e) => setSlot({ ...slot, time: e.target.value })}>
                  <option value="" disabled>Choose a time</option>
                  {timeSlots.filter((t) => !open || !slot.date || open[slot.date]?.includes(t.value)).map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            <p className="booking-hint">Each call is {session.minutes} minutes. We&apos;ll confirm your time by email, usually within 24 hours.</p>
            {slotError && <p className="lr-error" role="alert">{slotError}</p>}
            <button type="submit" className="form-submit" disabled={sending}>{sending ? "Sending…" : "Request this time"}</button>
          </form>
        </section>
      )}

      {step === 4 && (
        <section aria-labelledby="booking-step-title" className="booking-done">
          <h2 id="booking-step-title" ref={headingRef} tabIndex={-1} className="booking-title">Thank you{details.name ? `, ${details.name.split(" ")[0]}` : ""}. We have your request</h2>
          <p>We&apos;ve emailed {details.email || "you"} and will confirm the time, usually within 24 hours. Your consultant will read your notes beforehand.</p>
          <ul className="uk-ticks">
            <li>Need a different time? Just reply to our confirmation email</li>
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
