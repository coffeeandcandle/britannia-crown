// Everything that can be bought online. Prices live here, not in the Stripe dashboard:
// checkout sends them as inline price data, so changing a price is a one-line edit.
// Amounts are in the currency's major unit (AED 3,000 is 3000).
export type Product = {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: "aed" | "gbp";
  // "payment" is a one-off charge; "subscription" bills every month until cancelled.
  mode: "payment" | "subscription";
  // Shown after the price, e.g. "one-time", "per term", "per month".
  unit: string;
  // The enquiry form option to fall back to when online payment is switched off.
  service: string;
};

export const products: Product[] = [
  {
    id: "uae-nursery-search",
    name: "Nursery Search & Placement (Dubai)",
    description: "Research, shortlisting, visit coordination and application support for an EYFS nursery place.",
    amount: 3000,
    currency: "aed",
    mode: "payment",
    unit: "one-time",
    service: "Nursery Search & Placement",
  },
  {
    id: "uae-school-search",
    name: "School Search & Placement (Dubai)",
    description: "Guidance through Dubai's British-curriculum schools, from FS1 to Sixth Form, with application support.",
    amount: 8000,
    currency: "aed",
    mode: "payment",
    unit: "one-time",
    service: "School Search & Placement",
  },
  {
    id: "uae-exam-prep-term",
    name: "GCSE & A-Level Preparation (one term)",
    description: "Exam technique coaching, past papers, mark schemes, revision planning and mock exams for one term.",
    amount: 5000,
    currency: "aed",
    mode: "payment",
    unit: "per term",
    service: "GCSE & A-Level Preparation",
  },
  {
    id: "uae-homeschool-term",
    name: "British Homeschool Support (one term)",
    description: "Curriculum design, UK tutor coordination, term planning and progress tracking for one term.",
    amount: 7000,
    currency: "aed",
    mode: "payment",
    unit: "per term",
    service: "Homeschool Support",
  },
  {
    id: "uae-concierge",
    name: "Education Concierge (monthly)",
    description: "A dedicated education manager: monthly strategy, unlimited WhatsApp support, and tutor and school liaison.",
    amount: 2500,
    currency: "aed",
    mode: "subscription",
    unit: "per month",
    service: "Education Concierge",
  },
  {
    id: "membership-foundation",
    name: "Academic Partner Membership: Foundation",
    description: "4 hours a month of online tutoring credit, a monthly parent check-in and WhatsApp support.",
    amount: 1000,
    currency: "aed",
    mode: "subscription",
    unit: "per month",
    service: "Academic Partner Membership - Foundation",
  },
  {
    id: "membership-partner",
    name: "Academic Partner Membership: Partner",
    description: "8 hours a month of online tutoring with a dedicated weekly tutor and a monthly consultant call.",
    amount: 1800,
    currency: "aed",
    mode: "subscription",
    unit: "per month",
    service: "Academic Partner Membership - Partner",
  },
  {
    id: "membership-full-partner",
    name: "Academic Partner Membership: Full Partner",
    description: "14 hours a month across up to two subjects, termly plan reviews and a direct line to your consultant.",
    amount: 3200,
    currency: "aed",
    mode: "subscription",
    unit: "per month",
    service: "Academic Partner Membership - Full Partner",
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (p: Pick<Product, "amount" | "currency">) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: p.currency.toUpperCase(),
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(p.amount);
