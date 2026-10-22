import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import PageHero from "../components/PageHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { EMAIL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Refunds and Cancellations | Britannia Crown",
  description:
    "Terms of service for private tutoring and home-schooling: payment, cancellations, rescheduling, no-shows, online lesson connection issues and how refunds are paid.",
  path: "/refunds-and-cancellations",
});

const PHONE = "+44 7583 904474";
const PHONE_HREF = "tel:+447583904474";

// The client's own terms for private tutoring and home-schooling, kept word for word.
// The make-up lesson instruction is the same wherever it applies, so it is written once here.
const MAKE_UP = (
  <>
    If you would still like a rescheduled/make-up lesson, you must contact the company via{" "}
    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or WhatsApp/Tel: <a href={PHONE_HREF}>{PHONE}</a> to make the rescheduled booking. No rescheduled
    booking should be made between the tutor and the client without the company&rsquo;s approval first.
  </>
);

type Section = { title: string; body: React.ReactNode[] };

const sections: Section[] = [
  {
    title: "1. Payment Terms",
    body: [
      "You will need to make payment at the time you book any session/s. All payments are due in advance, before the session/s takes place. Payments are due 4 weeks in advance in order to book all hours you require within the 4 weeks. Payments will rotate every 4 weeks (28 days) from the first payment date. Upon the scheduled payment date, the payment must be paid by 8pm or it is considered a late payment (this only applies for transferred payment not set up as a standing order – standing orders must be paid on the correct payment dates which are always exactly 4 weeks in rotation or considered a late payment). Bulk bookings are accepted (1 month+) and payment for the requested bulk booking will need to be made in advance.",
    ],
  },
  {
    title: "1a. Late Payments",
    body: [
      "We do not have any late fees, however, late payments are not accepted in any case. If late payments are made 3 times while our agreement is standing, termination of services will be in effect immediately. In any case where extenuating circumstances apply the company will desist at their discretion. Any late payment will incur a late payment strike and will cause a disruption and missed service for the upcoming bookings that have yet to be paid for.",
    ],
  },
  {
    title: "2. Start Dates",
    body: [
      "Upon booking, any start dates mentioned are aimed to be kept to, however, please allow up to 14 days from the booking date should extra time be needed to make arrangements for the tutor. Updates regarding start dates will be sent accordingly.",
    ],
  },
  {
    title: "3. Conduct Policy",
    body: [
      "Any discrimination or abuse toward a contractor provided to a client will automatically result in a cancellation of all upcoming bookings, termination of service, and a permanent ban. No refunds will be given in this case.",
    ],
  },
  {
    title: "4. Cancellation: More than 48 Hours Notice",
    body: [
      "You can cancel any session giving more than 48 hours notice and will not be charged for it. You will receive your money back for that session, refunded in full at the end of the calendar month.",
      <>{MAKE_UP} No refund will be given for any sessions that are rescheduled and had within that calendar month, as the time will have been made up.</>,
    ],
  },
  {
    title: "4a. Cancellation: Less than 48 Hours Notice",
    body: [
      "If you cancel a session with less than 48 hours notice you will be charged 50% of the hourly rate/price of the session. You will be refunded the remaining 50% at the end of the month.",
      <>{MAKE_UP} Should a rescheduled lesson take place the 50% refund will not apply. Charges will not be implemented for extenuating circumstances at the company&rsquo;s discretion.</>,
    ],
  },
  {
    title: "4b. Cancellation: Less than 24 Hours Notice",
    body: [
      "If you cancel a session with less than 24 hours notice you will be charged the full amount of the session. No refund given.",
      <>{MAKE_UP} Charges will not be implemented for extenuating circumstances at the company&rsquo;s discretion.</>,
    ],
  },
  {
    title: "5. No-Show Policy (Face to Face Lessons)",
    body: [
      "If you have booked a session and the tutor has started their journey and/or arrived at the location of a session, and the student/client does not show up, you will be charged in full for the whole session. No refund given.",
      MAKE_UP,
    ],
  },
  {
    title: "5a. Late Arrival (Face to Face Lessons)",
    body: [
      "If a tutor arrives at the location and the client is late without any communication of whereabouts, the tutor is only obliged to wait 20 minutes before it becomes a ‘no show’ case and they have the right to leave. Payment for the session will not be refunded in that case.",
      MAKE_UP,
    ],
  },
  {
    title: "6. Session Time Slots",
    body: [
      "The sessions are always arranged for a specific time slot during the day. All bookings are set to that time. In any case where the student is late, the session will go on until the end of that time slot. Time or payment will not be compensated for lateness of students.",
    ],
  },
  {
    title: "7. Connection Difficulties: Client (Online Lessons)",
    body: [
      "If the client is having connection difficulties and does not inform the tutor within 15 minutes of the scheduled lesson time – exhausting all methods of communication (phone call, WhatsApp, email) – this will be considered a ‘no show’ case. Payment for the lesson will not be refunded in that case.",
      <>{MAKE_UP} Charges will not be implemented for extenuating circumstances at the company&rsquo;s discretion.</>,
    ],
  },
  {
    title: "8. Connection Difficulties: Tutor (Online Lessons)",
    body: [
      "If the tutor is having difficulties connecting and has communicated this to the client, the client may opt to take the full hours at the time (if the tutor can do so), or have part of the lesson with the remaining time made up within 1 month. If the client does not wish to have the time made up, a refund can be arranged for the remaining time. If the lesson is completely missed due to the tutor, the client may opt to have the time made up within 1 month or be refunded in full.",
      <>{MAKE_UP} Payment will not be refunded where the lesson has been made up.</>,
    ],
  },
  {
    title: "9. Communication Protocol (Online Lessons)",
    body: [
      "You must contact and inform the company immediately via phone, WhatsApp or email should any connection difficulties occur with you or the tutor, and with any resolutions and outcomes. Should you fail to reach us by phone you must use a written form of communication immediately (WhatsApp or email).",
    ],
  },
  {
    title: "9a. Schedule Changes (All Lessons)",
    body: [
      "We must be contacted immediately with regard to any missed, rearranged, or cancelled lessons, or any changes whatsoever to the schedule, via phone, WhatsApp or email. This applies to both face to face and online lessons. Should you fail to reach us by phone you must use a written form of communication (WhatsApp or email).",
    ],
  },
  {
    title: "10. Notice Period for Pausing or Cancelling Services",
    body: [
      "A minimum of 4 weeks notice should be given should you decide to pause or cancel our services. The 4 weeks notice will always begin from the end of the current booked 4 weeks. Failure to give a minimum of 4 weeks notice will result in payments already made being non-refundable. Withdrawing from our services with less than 4 weeks notice will result in a permanent ban from using our services again in the future. A ban will not be implemented for extenuating circumstances at the company’s discretion.",
    ],
  },
  {
    title: "11. Professional Conduct",
    body: [
      "No discussions of payments or payment arrangements, job negotiations, inappropriate or illegal requests, additional job requests or bookings without the company’s consent, changing of scheduled bookings without the company’s consent, and no introductions or facilitations of the candidate to/with other/outside parties without the company’s consent.",
    ],
  },
  {
    title: "12. Breach of Terms",
    body: [
      "Failure to comply with any of the terms in this document will result in immediate termination of services and will result in a permanent ban from using our services again in the future. No refunds will be given should there be any breach of the terms contained in this document.",
    ],
  },
  {
    title: "13. Tutor-Side Issues",
    body: [
      "If any situation regarding the lessons stated above is to happen on behalf of the tutor, time will either be given back at a suitable time agreed by you and the tutor with the company’s approval first. If unable to agree on a time, you will be refunded any pre-payments in full at the end of the calendar month.",
    ],
  },
  {
    title: "14. Refund Timeline",
    body: [
      "All refunds are given at the end of the calendar month. Any refunds that have been incurred after the 15th of any calendar month will be awarded at the end of the next calendar month.",
    ],
  },
];

export default function RefundsPage() {
  return (
    <>
      <PageHero
        title="Refunds and cancellations"
        subtitle="Terms of service for private tutoring and home-schooling."
      >
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Refunds and cancellations", path: "/refunds-and-cancellations" }]} />
      </PageHero>

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="legal-content">
            <p className="legal-updated">Last updated: 22 October 2026</p>
            <p>
              <strong>Private Client: Tutoring &amp; Home-schooling.</strong> Please note that upon receiving our services you automatically
              opt into and agree to the following terms.
            </p>
            <p>&lsquo;You&rsquo; herein referred to as &lsquo;the client&rsquo;. &lsquo;We&rsquo; herein referred to as &lsquo;the company&rsquo;.</p>

            {sections.map((s) => (
              <section key={s.title}>
                <h2>{s.title}</h2>
                {s.body.map((p, i) => <p key={i}>{p}</p>)}
              </section>
            ))}

            <p>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a> &bull; <a href={PHONE_HREF}>{PHONE}</a> &bull; www.britanniacrown.com
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
