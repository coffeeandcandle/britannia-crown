"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Product } from "../lib/products";

// Starts checkout at the onboarding step (we collect parent and child details before payment). When online
// payment is off, it becomes a link to the enquiry form for the same service.
export default function BuyButton({
  product,
  enabled,
  label,
  className = "btn-primary",
  email,
}: {
  product: Pick<Product, "id" | "name" | "amount" | "currency" | "service">;
  enabled: boolean;
  label: string;
  className?: string;
  // Set when a signed-in customer buys from the portal: they go to the pre-filled in-portal onboarding step.
  email?: string;
}) {
  const pathname = usePathname();

  if (!enabled) {
    return (
      <Link href={{ pathname: "/contact", query: { service: product.service } }} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <form action={email ? "/portal/checkout" : "/checkout/details"} method="GET" className="buy-form">
      <input type="hidden" name="product" value={product.id} />
      <input type="hidden" name="return_path" value={pathname} />
      <button type="submit" className={className}>{label}</button>
    </form>
  );
}
