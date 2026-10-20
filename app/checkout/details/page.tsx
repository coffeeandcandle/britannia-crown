import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, formatPrice } from "../../lib/products";
import OnboardingForm from "../../components/OnboardingForm";

export const metadata: Metadata = {
  title: "Before you pay | Britannia Crown",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ product?: string; return_path?: string; error?: string }> };

// Step one of checkout: tell us who the lessons are for. Nobody reaches payment without this.
export default async function CheckoutDetailsPage({ searchParams }: Props) {
  const { product: id, return_path, error } = await searchParams;
  const product = getProduct(id ?? "");
  if (!product) notFound();
  const returnPath = return_path?.startsWith("/") && !return_path.startsWith("//") ? return_path : "/pricing";

  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <span className="uk-eyebrow">Step 1 of 2</span>
          <h1>A few details before you pay</h1>
          <p>
            You are buying <strong>{product.name}</strong> ({formatPrice(product)} {product.unit}). Tell us about your child so we can match the right tutor
            and get started straight away.
          </p>
        </div>
      </section>
      <section className="uk-section cream">
        <div className="uk-wrap onboarding-wrap">
          <div className="enq-card">
            <OnboardingForm
              productId={product.id}
              productName={product.name}
              priceLabel={formatPrice(product)}
              returnPath={returnPath}
              error={error}
            />
          </div>
          <p className="onboarding-back"><Link href={returnPath}>← Back</Link></p>
        </div>
      </section>
    </>
  );
}
