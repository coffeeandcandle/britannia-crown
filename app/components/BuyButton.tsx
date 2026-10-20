"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "../lib/track";
import type { Product } from "../lib/products";

const ATTRIBUTION_KEY = "bc_attribution";

// Posts to /api/checkout, which redirects to Stripe Checkout. When online payment is off,
// it becomes a link to the enquiry form for the same service.
export default function BuyButton({
  product,
  enabled,
  label,
  className = "btn-primary",
}: {
  product: Pick<Product, "id" | "name" | "amount" | "currency" | "service">;
  enabled: boolean;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();

  if (!enabled) {
    return (
      <Link href={{ pathname: "/contact", query: { service: product.service } }} className={className}>
        {label}
      </Link>
    );
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    try {
      const stored = JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}") as Record<string, string>;
      for (const [name, value] of Object.entries(stored)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      }
    } catch {
      // Storage unavailable: checkout still works without attribution.
    }
    track("begin_checkout", {
      currency: product.currency.toUpperCase(),
      value: product.amount,
      items: [{ item_id: product.id, item_name: product.name, price: product.amount }],
    });
    form.querySelector("button")?.setAttribute("aria-busy", "true");
  }

  return (
    <form action="/api/checkout" method="POST" onSubmit={onSubmit} className="buy-form">
      <input type="hidden" name="product" value={product.id} />
      <input type="hidden" name="return_path" value={pathname} />
      <button type="submit" className={className}>{label}</button>
    </form>
  );
}
