"use client";

import { useSearchParams } from "next/navigation";
import { WHATSAPP_URL } from "../lib/site";

// Shown when a visitor comes back from Stripe without paying, or if checkout couldn't start.
export default function CheckoutNotice() {
  const status = useSearchParams().get("checkout");
  if (status !== "cancelled" && status !== "error") return null;

  return (
    <div className={`checkout-notice${status === "error" ? " is-error" : ""}`} role="status">
      <div className="uk-wrap">
        {status === "cancelled" ? (
          <p>Your payment wasn&apos;t completed and you haven&apos;t been charged. Questions before you buy? <a href={WHATSAPP_URL}>Message us on WhatsApp</a>.</p>
        ) : (
          <p>Sorry, we couldn&apos;t start the secure checkout. Please try again, or <a href={WHATSAPP_URL}>message us on WhatsApp</a> and we&apos;ll help.</p>
        )}
      </div>
    </div>
  );
}
