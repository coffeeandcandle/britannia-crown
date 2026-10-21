import Link from "next/link";
import { getSessionType, priceLabel } from "../lib/sessions";

// A paid session (strategy session or trial lesson), shown across the site. Open layout, no card.
// It leads to the booking flow, which collects the family's details and then opens Calendly to pick a time.
const copy = {
  strategy: {
    heading: "Book a strategy session",
    lead: "A full hour with an education consultant to work through a school choice, an exam plan, tutoring or home education, with a written summary afterwards.",
    cta: "Book a strategy session",
  },
  "trial-lesson": {
    heading: "Try a tutoring lesson first",
    lead: "A first one-to-one lesson with a matched tutor, online, so your child can try it before committing.",
    cta: "Book a trial lesson",
  },
} as const;

export default function ConsultationBand({
  session = "strategy",
  tone = "white",
  path = "/pricing",
}: {
  session?: keyof typeof copy;
  tone?: "white" | "cream";
  path?: string;
}) {
  const type = getSessionType(session);
  if (!type) return null;
  const c = copy[session];
  return (
    <section className={`uk-section ${tone}`} id={session === "strategy" ? "consultation" : "trial-lesson"}>
      <div className="uk-wrap uk-split">
        <div>
          <h2 className="uk-h2">{c.heading}</h2>
          <p className="uk-lead">{c.lead}</p>
        </div>
        <div className="cb-side">
          <p className="cb-price">
            <strong>{priceLabel(type)}</strong> <span>{type.minutes} minutes</span>
          </p>
          <ul className="cb-list">
            {type.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <div className="uk-hero-actions">
            {type.productId ? (
              // A plain link, not next/link, so nothing prefetches a payment.
              <a href={`/api/checkout?product=${type.productId}&return_path=${encodeURIComponent(path)}`} className="btn-primary">{c.cta} ({priceLabel(type)})</a>
            ) : (
              <Link href={`/book-consultation?session=${type.id}`} className="btn-primary">{c.cta}</Link>
            )}
            <Link href="/book-consultation?session=consultation" className="btn-secondary">Free 30-minute call first</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
