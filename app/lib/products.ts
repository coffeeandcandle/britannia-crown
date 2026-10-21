// Everything that can be bought online. Prices live here, not in the Stripe dashboard:
// checkout creates the matching Stripe product and price on first use (see stripe-catalog.ts),
// so changing a price is a one-line edit.
// Amounts are in pounds (£600 is 600). Converted from the original AED prices at about
// 1 AED = £0.20 and rounded; confirm with the client before going live.
export type Product = {
  id: string;
  name: string;
  description: string;
  amount: number;
  currency: "gbp";
  // "payment" is a one-off charge; "subscription" bills every month until cancelled.
  mode: "payment" | "subscription";
  // Shown after the price, e.g. "one-time", "per term", "per month".
  unit: string;
  // The enquiry form option to fall back to when online payment is switched off.
  service: string;
};

export const products: Product[] = [
  {
    id: "strategy-session",
    name: "Strategy session (60 minutes)",
    description: "An in-depth hour with an education consultant on a school choice, an exam plan, tutoring or home education, with a written summary afterwards.",
    amount: 150,
    currency: "gbp",
    mode: "payment",
    unit: "one-time",
    service: "General Enquiry",
  },
  {
    id: "trial-lesson",
    name: "Trial tutoring lesson",
    description: "A first one-to-one lesson with a matched tutor, online, so your child can try it before committing.",
    amount: 50,
    currency: "gbp",
    mode: "payment",
    unit: "one-time",
    service: "Tutoring",
  },
  {
    id: "uae-nursery-search",
    name: "Nursery Search & Placement (Dubai)",
    description: "Research, shortlisting, visit coordination and application support for an EYFS nursery place.",
    amount: 600,
    currency: "gbp",
    mode: "payment",
    unit: "one-time",
    service: "Nursery Search & Placement",
  },
  {
    id: "uae-school-search",
    name: "School Search & Placement (Dubai)",
    description: "Guidance through Dubai's British-curriculum schools, from FS1 to Sixth Form, with application support.",
    amount: 1600,
    currency: "gbp",
    mode: "payment",
    unit: "one-time",
    service: "School Search & Placement",
  },
  {
    id: "uae-exam-prep-term",
    name: "GCSE & A-Level Preparation (one term)",
    description: "Exam technique coaching, past papers, mark schemes, revision planning and mock exams for one term.",
    amount: 1000,
    currency: "gbp",
    mode: "payment",
    unit: "per term",
    service: "GCSE & A-Level Preparation",
  },
  {
    id: "uae-homeschool-term",
    name: "British Homeschool Support (one term)",
    description: "Curriculum design, UK tutor coordination, term planning and progress tracking for one term.",
    amount: 1400,
    currency: "gbp",
    mode: "payment",
    unit: "per term",
    service: "Homeschool Support",
  },
  {
    id: "uae-concierge",
    name: "Education Concierge (monthly)",
    description: "A dedicated education manager: monthly strategy, unlimited message support, and tutor and school liaison.",
    amount: 500,
    currency: "gbp",
    mode: "subscription",
    unit: "per month",
    service: "Education Concierge",
  },
  {
    id: "membership-foundation",
    name: "Academic Partner Membership: Foundation",
    description: "4 hours a month of online tutoring credit, a monthly parent check-in and message support.",
    amount: 200,
    currency: "gbp",
    mode: "subscription",
    unit: "per month",
    service: "Academic Partner Membership - Foundation",
  },
  {
    id: "membership-partner",
    name: "Academic Partner Membership: Partner",
    description: "8 hours a month of online tutoring with a dedicated weekly tutor and a monthly consultant call.",
    amount: 360,
    currency: "gbp",
    mode: "subscription",
    unit: "per month",
    service: "Academic Partner Membership - Partner",
  },
  {
    id: "membership-full-partner",
    name: "Academic Partner Membership: Full Partner",
    description: "14 hours a month across up to two subjects, termly plan reviews and a direct line to your consultant.",
    amount: 640,
    currency: "gbp",
    mode: "subscription",
    unit: "per month",
    service: "Academic Partner Membership - Full Partner",
  },
];

// Sold pay first: they go straight to Stripe, and the family fills in the details right afterwards in the portal.
export const PAY_FIRST = new Set(["strategy-session", "trial-lesson"]);

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (p: Pick<Product, "amount" | "currency">) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: p.currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(p.amount);
