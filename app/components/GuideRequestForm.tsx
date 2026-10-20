"use client";

import { useState } from "react";
import { track } from "../lib/track";
import { appendAttribution } from "../lib/attribution";

// Email capture for a downloadable PDF guide. Submits in place and records a lead.
export default function GuideRequestForm({ guide, id }: { guide: string; subject?: string; id: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: appendAttribution(new FormData(form)) });
      if (!res.ok) throw new Error(`Guide request failed: ${res.status}`);
      track("generate_lead", { lead_source: "guide_request", context: guide });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="gd-dl-done" role="status">Thank you — we&apos;ll email your guide to you shortly.</p>;
  }

  return (
    <form action="/api/enquiry" method="POST" onSubmit={onSubmit} className="gd-dl-form">
      <input type="hidden" name="form" value="guide" />
      <input type="hidden" name="guide" value={guide} />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="enq-hp" aria-hidden="true" />
      <label className="sr-only" htmlFor={`${id}-name`}>Your name</label>
      <input type="text" id={`${id}-name`} name="name" autoComplete="name" placeholder="Your name" required />
      <label className="sr-only" htmlFor={`${id}-email`}>Your email address</label>
      <input type="email" id={`${id}-email`} name="email" autoComplete="email" placeholder="Your email address" required />
      {status === "error" && (
        <p className="gd-dl-error" role="alert">Sorry — that didn&apos;t send. Please try again.</p>
      )}
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Me This Guide →"}
      </button>
    </form>
  );
}
