import Link from "next/link";
import { notFound } from "next/navigation";
import { requireFamily, familyChildren } from "../../../lib/portal/dal";
import { getProduct, formatPrice } from "../../../lib/products";
import OnboardingForm from "../../../components/OnboardingForm";
import { PageHeader, Card } from "../../ui";

type Props = { searchParams: Promise<{ product?: string; error?: string }> };

// The same onboarding step for someone who is signed in, with their details already filled in.
export default async function PortalCheckoutPage({ searchParams }: Props) {
  const { family } = await requireFamily();
  const { product: id, error } = await searchParams;
  const product = getProduct(id ?? "");
  if (!product) notFound();
  const children = await familyChildren(family.id);
  const first = children[0];

  return (
    <>
      <PageHeader
        title="Before you pay"
        description={<>You are buying <strong>{product.name}</strong> ({formatPrice(product)} {product.unit}). Check your details, tell us who it is for and continue to secure payment.</>}
      />
      <Card>
        <OnboardingForm
          productId={product.id}
          productName={product.name}
          priceLabel={formatPrice(product)}
          returnPath="/portal/shop"
          lockEmail
          defaults={{ name: family.name, email: family.email, phone: family.phone ?? "", childName: first?.name, yearGroup: first?.year_group ?? undefined }}
          childOptions={children.map((c) => c.name)}
          error={error}
        />
      </Card>
      <p className="onboarding-back"><Link href="/portal/shop">← Back to plans and services</Link></p>
    </>
  );
}
