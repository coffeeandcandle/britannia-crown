import Link from "next/link";
import BuyButton from "./BuyButton";
import Photo from "./Photo";
import { getProduct, formatPrice } from "../lib/products";
import { getOffer, offerPath } from "../lib/offers";
import { paymentsEnabled } from "../lib/stripe";

// The flagship: the Partner membership. One tutor every week, a consultant overseeing progress, one
// clear monthly price. This is the offer the site pushes hardest, with the fewest steps to buy.
export default function FlagshipBand() {
  const product = getProduct("membership-partner");
  const offer = getOffer("membership", "partner");
  if (!product || !offer) return null;
  const price = formatPrice(product);

  return (
    <section className="flagship" id="partner" aria-labelledby="flagship-title">
      <div className="uk-wrap flagship-inner">
        <div className="flagship-copy">
          <h2 id="flagship-title">Your own tutor, every week, with a consultant overseeing progress</h2>
          <p className="flagship-lead">
            The Partner plan gives your child the same vetted UK-qualified tutor at a fixed weekly time, and a monthly call with your
            education consultant to keep everything on track.
          </p>
          <ul className="flagship-points">
            <li>8 hours of online tutoring a month, about £45 an hour</li>
            <li>The same dedicated tutor, every week</li>
            <li>A monthly 30-minute call with your education consultant</li>
            <li>Same-day message support and a termly exam strategy session</li>
          </ul>
          <p className="flagship-price">
            {price} <small>a month · cancel or pause anytime</small>
          </p>
          <div className="flagship-actions">
            <BuyButton product={product} enabled={paymentsEnabled} label={paymentsEnabled ? `Start the Partner plan, ${price} a month` : "Enquire about the Partner plan"} />
            <Link href={offerPath(offer)} className="btn-secondary">See everything included</Link>
          </div>
          <p className="flagship-note">
            Not ready to pay? <Link href="/book-consultation">Book a free 30-minute consultation</Link> first.
          </p>
        </div>
        <div className="flagship-media">
          <Photo name="online" sizes="(min-width: 1000px) 40vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
