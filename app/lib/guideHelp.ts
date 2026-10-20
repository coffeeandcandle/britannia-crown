import type { GuideCategory } from "./guides";

// What a guide offers the reader at the end, by topic: real products they can buy now, the service page
// to read more, and an honest tailored route for the services we quote individually.
export type GuideHelp = {
  title: string;
  lead: string;
  // Products (from products.ts) shown with a buy button.
  productIds: string[];
  // Shown after the products: a tailored-quote card for the matching UK service.
  quote: { title: string; body: string } | null;
};

const membership = ["membership-foundation", "membership-partner", "membership-full-partner"];

const byCategory: Record<GuideCategory, GuideHelp> = {
  Tutoring: {
    title: "Start online tutoring with a UK-trained tutor, from £200 a month",
    lead: "Join online and we match a vetted tutor to your child, with a consultant overseeing progress. Cancel or pause anytime.",
    productIds: membership,
    quote: { title: "Tailored or face-to-face tutoring", body: "Tell us what your child needs and we will quote after a short conversation, so you know the price before you commit." },
  },
  "Exams & Qualifications": {
    title: "Prepare with a UK-trained tutor, from £200 a month",
    lead: "Regular online tutoring with exam technique and practice, matched to your child's subjects and exam boards.",
    productIds: membership,
    quote: { title: "A tailored qualifications plan", body: "For private-candidate support, resits or a bespoke plan, we quote after a short conversation." },
  },
  "Choosing a School": {
    title: "Get expert help choosing and applying to the right school",
    lead: "We research, shortlist, guide visits and support your applications, from nursery to Sixth Form.",
    productIds: [],
    quote: { title: "School & Nursery Placement", body: "Every search is different, so we quote after a short conversation about your child and your priorities." },
  },
  "Early Years & Primary": {
    title: "Get expert help with nurseries, primary places and early learning",
    lead: "From choosing a nursery to applying for a primary school place and supporting learning at home.",
    productIds: [],
    quote: { title: "School & Nursery Placement", body: "We guide you through nurseries and primary applications, and quote after a short conversation." },
  },
  "Home Education": {
    title: "Home education with the structure of a great school",
    lead: "A British-curriculum plan, specialist tutors and a consultant beside you.",
    productIds: [],
    quote: { title: "Home Education support", body: "We agree the plan and the price together after a short conversation, so there are no surprises." },
  },
  "Moving & International Families": {
    title: "Moving schools, countries or systems? We can handle the planning",
    lead: "Fixed-price packages for families moving to Dubai, and tailored advice for families coming back to the UK.",
    productIds: ["uae-school-search", "uae-nursery-search"],
    quote: { title: "Returning to or moving within the UK", body: "We quote after a short conversation about your timeline and your child's needs." },
  },
};

export const helpFor = (category: GuideCategory) => byCategory[category];
