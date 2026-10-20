import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import Breadcrumbs from "../components/Breadcrumbs";
import BookingFlow from "../components/BookingFlow";
import { WHATSAPP_URL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Free Consultation | Britannia Crown",
  description:
    "Book a free 30-minute consultation with a Britannia Crown education consultant, or a strategy session or trial tutoring lesson, online in a few minutes.",
  path: "/book-consultation",
});

export default function BookConsultationPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Book online", path: "/book-consultation" }]} />
          <span className="uk-eyebrow">Book online</span>
          <h1>Book a consultation</h1>
          <p>Start with a free 30-minute call, or book a strategy session or trial lesson. It takes about two minutes.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Suspense fallback={<p className="booking-hint">Loading booking options…</p>}>
            <BookingFlow />
          </Suspense>
          <p className="book-alt">
            Can&apos;t find a time that works? <a href={WHATSAPP_URL}>Message us on WhatsApp</a> or <Link href="/contact">request a call back</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
