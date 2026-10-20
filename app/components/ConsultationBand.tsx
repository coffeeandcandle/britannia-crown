import Link from "next/link";
import BuyButton from "./BuyButton";
import { getProduct, formatPrice } from "../lib/products";
import { paymentsEnabled } from "../lib/stripe";

// The 60-minute paid consultation, shown across the site. Open layout, no card.
export default function ConsultationBand({ tone = "white", heading = "Book a 60-minute consultation" }: { tone?: "white" | "cream"; heading?: string }) {
  const product = getProduct("consultation-60");
  if (!product) return null;
  return (
    <section className={`uk-section ${tone}`} id="consultation">
      <div className="uk-wrap uk-split">
        <div>
          <h2 className="uk-h2">{heading}</h2>
          <p className="uk-lead">
            A full hour with an education consultant to work through a school choice, an exam plan, tutoring or home education,
            with a written summary afterwards. Pay online and we will contact you within one working day to set a time.
          </p>
        </div>
        <div className="cb-side">
          <p className="cb-price">
            <strong>{formatPrice(product)}</strong> <span>one-time</span>
          </p>
          <ul className="cb-list">
            <li>A detailed review of your child&apos;s situation</li>
            <li>A school shortlist, exam plan or tutoring plan</li>
            <li>A written summary within two working days</li>
          </ul>
          <div className="uk-hero-actions">
            <BuyButton product={product} enabled={paymentsEnabled} label="Book the 60-minute consultation" />
            <Link href="/book-consultation" className="btn-secondary">Free 30-minute call first</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
