"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "../lib/track";

type Item = { date: Date; label: string; detail: string; approx?: string; weekendNote?: boolean };

const fmt = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const d = (y: number, m: number, day: number) => new Date(Date.UTC(y, m - 1, day));
const isWeekend = (date: Date) => date.getUTCDay() === 0 || date.getUTCDay() === 6;

const yearGroupName = (n: number) => {
  if (n < -1) return "not yet at nursery age";
  if (n === -1) return "in the year before Reception (pre-school or nursery)";
  if (n === 0) return "in Reception";
  if (n <= 13) return `in Year ${n}`;
  return "past school age";
};

// England's school year runs 1 September to 31 August, so a child's "academic birth year"
// is the September that starts the school year they were born in.
function buildTimeline(dob: Date): { aby: number; items: Item[] } {
  const aby = dob.getUTCMonth() >= 8 ? dob.getUTCFullYear() : dob.getUTCFullYear() - 1;
  const items: Item[] = [
    { date: d(aby + 5, 1, 15), label: "Primary (Reception) application deadline", detail: `Apply to your home council for a Reception place starting September ${aby + 5}.`, weekendNote: true },
    { date: d(aby + 5, 4, 16), label: "Primary offer day", detail: "Councils send Reception offers on 16 April, or the next working day." },
    { date: d(aby + 5, 9, 1), label: "Starts Reception", detail: "Children must be in education from the term after their fifth birthday." },
    { date: d(aby + 7, 1, 15), label: "Junior school transfer deadline", detail: "Only if your child is at a separate infant school and moving to a junior school for Year 3.", weekendNote: true },
    { date: d(aby + 11, 6, 1), label: "11+ registration (grammar schools)", approx: `Usually summer term of Year 5, around May to July ${aby + 11}`, detail: "Each grammar school or consortium sets its own registration window. Check the schools you're considering." },
    { date: d(aby + 11, 9, 1), label: "11+ tests", approx: `Usually September ${aby + 11}, early in Year 6`, detail: "Results normally arrive in October, before the secondary application deadline." },
    { date: d(aby + 11, 10, 31), label: "Secondary application deadline", detail: `Apply to your home council for a Year 7 place starting September ${aby + 12}.`, weekendNote: true },
    { date: d(aby + 12, 3, 1), label: "Secondary offer day", detail: "Councils send Year 7 offers on 1 March, or the next working day." },
    { date: d(aby + 12, 9, 1), label: "Starts Year 7", detail: "The start of secondary school." },
    { date: d(aby + 17, 5, 10), label: "GCSE exams", approx: `May to June ${aby + 17}, in Year 11`, detail: "Results day is in late August." },
    { date: d(aby + 19, 5, 10), label: "A-Level exams", approx: `May to June ${aby + 19}, in Year 13`, detail: "Results day is in mid-August." },
  ];
  return { aby, items };
}

export default function SchoolDates() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ aby: number; items: Item[]; yearGroup: number } | null>(null);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!m) {
      setError("Please enter your child's date of birth.");
      setResult(null);
      return;
    }
    const dob = d(Number(m[1]), Number(m[2]), Number(m[3]));
    const now = new Date();
    if (dob > now) {
      setError("That date is in the future. Please check the date of birth.");
      setResult(null);
      return;
    }
    const { aby, items } = buildTimeline(dob);
    const currentStart = now.getUTCMonth() >= 8 ? now.getUTCFullYear() : now.getUTCFullYear() - 1;
    const yearGroup = currentStart - aby - 5;
    setError("");
    setResult({ aby, items, yearGroup });
    track("tool_used", { tool: "school_dates", year_group: yearGroup });
  }

  const today = new Date();
  const nextIndex = result ? result.items.findIndex((i) => i.date >= today) : -1;
  const nextItem = result && nextIndex >= 0 ? result.items[nextIndex] : null;

  return (
    <div className="tool">
      <form className="tool-form" onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="dob">Child&apos;s date of birth</label>
          <input id="dob" type="date" value={value} onChange={(e) => setValue(e.target.value)} max={new Date().toISOString().slice(0, 10)} required />
        </div>
        <button type="submit" className="btn-primary">Show key dates</button>
      </form>
      {error && <p className="enq-error" role="alert" style={{ marginTop: 16 }}>{error}</p>}

      <div className="tool-results" aria-live="polite">
        {result && (
          <>
            <div className="tool-summary">
              <p>
                Your child is <strong>{yearGroupName(result.yearGroup)}</strong> this school year.
                {result.yearGroup >= -2 && result.yearGroup <= 0 && <> They start Reception in <strong>September {result.aby + 5}</strong>.</>}
                {result.yearGroup >= 1 && result.yearGroup <= 6 && <> They start Year 7 in <strong>September {result.aby + 12}</strong>.</>}
              </p>
              {nextItem && <p style={{ marginTop: 6 }}>Next key date: <strong>{nextItem.label}</strong>, {nextItem.approx ?? fmt.format(nextItem.date)}.</p>}
            </div>
            <ol className="timeline">
              {result.items.map((item, i) => {
                const past = item.date < today;
                return (
                  <li key={item.label} className={past ? "past" : i === nextIndex ? "next" : undefined}>
                    <span className="timeline-date">
                      {item.approx ?? fmt.format(item.date)}
                      {i === nextIndex && <span className="timeline-tag">Next</span>}
                    </span>
                    <strong>{item.label}</strong>
                    <p>
                      {item.detail}
                      {!past && item.weekendNote && isWeekend(item.date) && " This falls at a weekend, so some councils move the deadline. Check your council's website."}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="tool-note">
              Dates are for state schools in England and follow the national rules. Your council may set slightly different local dates,
              and independent schools set their own timetables. Always confirm with your council or the school.
            </p>
            <div className="finder-result">
              <p><strong>Applying for a school place?</strong> We research and shortlist schools that suit your child, and guide you through every deadline.</p>
              <div className="uk-hero-actions">
                <Link href={{ pathname: "/contact", query: { service: "School Placement" } }} className="btn-primary">Request a call back</Link>
                <Link href="/guides/school-admissions-england" className="btn-secondary">Read the admissions guide</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
