import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "../../lib/stripe";
import { getProduct, formatPrice } from "../../lib/products";
import { WHATSAPP_URL } from "../../lib/site";
import PurchaseTracker from "../../components/PurchaseTracker";

export const metadata: Metadata = {
  title: "Thank you | Britannia Crown",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string | string[] }> };

async function loadOrder(sessionId: string | undefined) {
  const stripe = getStripe();
  if (!stripe || !sessionId || !sessionId.startsWith("cs_")) return null;
  try {
    const s = await stripe.checkout.sessions.retrieve(sessionId);
    if (s.status !== "complete") return null;
    return {
      id: s.id,
      name: s.customer_details?.name?.split(" ")[0] ?? "",
      email: s.customer_details?.email ?? "",
      product: getProduct(s.metadata?.product_id ?? ""),
      amount: (s.amount_total ?? 0) / 100,
      currency: (s.currency ?? "aed").toUpperCase(),
    };
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const order = await loadOrder(Array.isArray(session_id) ? session_id[0] : session_id);

  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <span className="uk-eyebrow">Payment received</span>
          <h1>{order?.name ? `Thank you, ${order.name}` : "Thank you"}</h1>
          <p>
            {order?.product
              ? `Your order for ${order.product.name} (${formatPrice(order.product)} ${order.product.unit}) is confirmed.`
              : "Your payment is confirmed."}{" "}
            {order?.email ? `A receipt is on its way to ${order.email}.` : "A receipt is on its way to your inbox."}
          </p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap uk-split">
          <div>
            <span className="uk-kicker">What happens next</span>
            <h2 className="uk-h2">We&apos;ll be in touch within one working day</h2>
          </div>
          <div className="uk-prose">
            <ol className="book-steps">
              <li><strong>An education consultant calls you.</strong> We&apos;ll confirm your child&apos;s details, goals and any deadlines.</li>
              <li><strong>We get to work.</strong> Your consultant sets out the plan and the first steps, and matches a tutor where needed.</li>
              <li><strong>You hear from us regularly.</strong> Progress updates come by WhatsApp or email, whichever you prefer.</li>
            </ol>
            <p>Want to speak sooner? <a href={WHATSAPP_URL}>Message us on WhatsApp</a>, or <Link href="/book-consultation">book a call</Link> at a time that suits you.</p>
          </div>
        </div>
      </section>

      {order && (
        <PurchaseTracker
          transactionId={order.id}
          value={order.amount}
          currency={order.currency}
          itemId={order.product?.id ?? ""}
          itemName={order.product?.name ?? ""}
        />
      )}
    </>
  );
}
