// One entry per product that can be bought online. Each becomes its own selling page:
//   /uae/<slug> for the Dubai packages, /membership/<slug> for the membership tiers.
// Prices come from products.ts (change them there). The copy here uses only facts already published
// on the site; anything that needs the client's confirmation is listed in REVIEW.md at the project root.
import type { Faq } from "./schema";

export type OfferSection = "uae" | "membership";

export type Offer = {
  slug: string;
  section: OfferSection;
  productId: string;
  name: string;
  // Short label for cards and breadcrumbs.
  shortName: string;
  headline: string;
  lead: string;
  seoTitle: string;
  seoDescription: string;
  // Small reassurance chips under the buy button.
  assurances: string[];
  audience: string[];
  outcomes: { title: string; body: string }[];
  included: string[];
  steps: { title: string; body: string }[];
  faqs: Faq[];
  // Guide slugs worth reading before buying.
  guides: string[];
};

const PAY_FAQ: Faq = {
  q: "How do I pay, and is it secure?",
  a: "You pay online by card through Stripe, one of the world's largest payment processors. We never see or store your card details. If you would rather talk first, book a free 30-minute call and we will answer your questions before you decide.",
};

const REFUND_FAQ: Faq = {
  q: "What is your refunds and cancellations policy?",
  a: "It is published in full on our refunds and cancellations page, so you can read exactly where you stand before you pay.",
};

export const offers: Offer[] = [
  {
    slug: "nursery-search",
    section: "uae",
    productId: "uae-nursery-search",
    name: "Nursery Search & Placement (Dubai)",
    shortName: "Nursery search",
    headline: "Find the right British nursery in Dubai, without the guesswork",
    lead: "We research, shortlist and coordinate visits, then guide you through every application, so your child starts at an EYFS nursery you can trust.",
    seoTitle: "Dubai Nursery Search & Placement | Britannia Crown",
    seoDescription:
      "Moving to Dubai with a young child? We research, shortlist, arrange visits and handle applications for British EYFS nurseries. Fixed price of £600.",
    assurances: ["Fixed price, no hidden fees", "Pay securely online", "Free call available first"],
    audience: [
      "UK families moving to Dubai with a child aged 0 to 4",
      "Parents who want a British EYFS setting that meets UK early years standards",
      "Families arranging the move from abroad, who cannot visit in person first",
    ],
    outcomes: [
      { title: "A shortlist you can trust", body: "We narrow Dubai's nurseries to the few that genuinely fit your child, your location and your budget, and tell you honestly why." },
      { title: "Visits arranged for you", body: "We coordinate the visits, so you see the right settings without spending days on emails and phone calls." },
      { title: "A smooth start to school", body: "We help you think ahead to the move into FS1 at a British-curriculum school, so the early years lead somewhere." },
    ],
    included: [
      "Research into Dubai nurseries, including KHDA ratings and staff qualifications",
      "A personal shortlist with our reasoning",
      "Coordination of nursery visits",
      "Application support from start to finish",
      "Guidance on the move into FS1 at a British-curriculum school",
    ],
    steps: [
      { title: "Tell us about your child and your move", body: "Your timeline, where you will live, your child's age and what matters most to you." },
      { title: "We research and shortlist", body: "KHDA ratings, staff qualifications, fees and the commute, narrowed to a shortlist with honest reasoning." },
      { title: "We arrange visits", body: "We coordinate visits so you can see the best-fitting nurseries." },
      { title: "We guide your applications", body: "We support each application so nothing is missed, even from abroad." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "Nursery Search & Placement is a fixed £600, paid once. That covers the research, shortlist, visit coordination and application support." },
      { q: "What age is it for?", a: "It is designed for children aged 0 to 4, looking for a British EYFS nursery in Dubai." },
      { q: "Can you guarantee a place?", a: "Nurseries make their own admissions decisions, so no one can promise a particular place. What we do is make sure you apply to the right settings, in the right way, with nothing missed." },
      { q: "Can I speak to someone before I buy?", a: "Yes. Book a free 30-minute call with an education consultant and we will talk through your situation first." },
      PAY_FAQ,
      REFUND_FAQ,
    ],
    guides: [],
  },
  {
    slug: "school-search",
    section: "uae",
    productId: "uae-school-search",
    name: "School Search & Placement (Dubai)",
    shortName: "School search",
    headline: "Get your child's British school in Dubai sorted before you land",
    lead: "Expert guidance through Dubai's British-curriculum schools, from FS1 to Sixth Form, with a shortlist, visits and application support handled for you.",
    seoTitle: "Dubai School Search & Placement | Britannia Crown",
    seoDescription:
      "Choosing a British-curriculum school in Dubai? We shortlist by KHDA rating, fees, waitlists and fit, arrange visits and guide applications. £1,600 fixed price.",
    assurances: ["Fixed price, no hidden fees", "Pay securely online", "Free call available first"],
    audience: [
      "UK families relocating to Dubai with a child aged 4 to 18",
      "Parents who want a British-curriculum school, from FS1 through to Sixth Form",
      "Families who need a plan that works from abroad and to a deadline",
    ],
    outcomes: [
      { title: "The right school, not just a school", body: "We weigh KHDA ratings, fees, waitlists, curriculum fit and the commute, and narrow them to a shortlist with honest reasoning." },
      { title: "Applications handled properly", body: "We coordinate visits and assessments and guide you through each application, so nothing is missed from abroad." },
      { title: "Learning that carries on", body: "UK-qualified tutors online, timed to Dubai, can keep your child progressing before, during and after the move." },
    ],
    included: [
      "Research into Dubai's British-curriculum schools",
      "A shortlist based on KHDA ratings, fees, waitlists, curriculum fit and the commute",
      "Coordination of school visits and assessments",
      "Guidance through each application",
      "Advice for every stage from FS1 to Sixth Form",
    ],
    steps: [
      { title: "Tell us about the move", body: "Your timeline, where you will live, your child's age and current school, and what matters most to you." },
      { title: "We research and shortlist", body: "KHDA ratings, fees, waitlists, curriculum fit and the commute, narrowed to a shortlist with honest reasoning." },
      { title: "Visits and assessments", body: "We coordinate visits and assessments so you see the schools that matter." },
      { title: "Applications, start to finish", body: "We guide you through each application, so nothing is missed from abroad." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "School Search & Placement is a fixed £1,600, paid once." },
      { q: "Which ages and schools does it cover?", a: "We advise on Dubai's British-curriculum schools, from FS1 through to Sixth Form." },
      { q: "Can you guarantee a place?", a: "Schools make their own admissions decisions, so no one can promise a particular place. We make sure you apply to the right schools, in the right way, and that nothing is missed." },
      { q: "We have not decided when to move. Is it too early?", a: "Not at all. Many families talk to us early, because waitlists and deadlines can shape the plan. A free 30-minute call is a good first step." },
      PAY_FAQ,
      REFUND_FAQ,
    ],
    guides: ["igcse-vs-gcse"],
  },
  {
    slug: "exam-preparation",
    section: "uae",
    productId: "uae-exam-prep-term",
    name: "GCSE & A-Level Preparation (monthly)",
    shortName: "GCSE & A-Level preparation",
    headline: "Exam preparation from people who know how the papers are marked",
    lead: "Structured GCSE and A-Level preparation for students in Dubai, built around exam technique, past papers and mock exams. Choose a one-off monthly payment or subscribe monthly.",
    seoTitle: "GCSE & A-Level Exam Preparation in Dubai | Britannia Crown",
    seoDescription:
      "Structured GCSE and A-Level preparation for students in Dubai: exam technique coaching, past papers, mark schemes, revision planning and mocks. £1,000 per month.",
    assurances: ["Pay once or subscribe monthly", "Pay securely online", "Free call available first"],
    audience: [
      "Students aged 14 to 18 sitting GCSEs or A-Levels",
      "Families in Dubai who want British-standard exam coaching",
      "Parents who want a clear revision plan rather than last-minute cramming",
    ],
    outcomes: [
      { title: "Technique, not just content", body: "We teach students how to show what they know under exam conditions, drawing on specialists, including actual GCSE examiners." },
      { title: "A plan they can follow", body: "Revision planning turns a mountain of material into a clear routine." },
      { title: "Practice that feels real", body: "Mock exams replicate the real thing, so the real thing holds fewer surprises." },
    ],
    included: [
      "Exam technique coaching from specialists",
      "Past paper practice and mark scheme analysis",
      "Revision planning for upcoming exams",
      "Mock exams that replicate the real thing",
    ],
    steps: [
      { title: "Tell us about the student", body: "Their subjects, exam boards, dates and where they feel least confident." },
      { title: "We build the plan", body: "A revision plan matched to the exams ahead." },
      { title: "Coaching and practice", body: "Exam technique coaching alongside past papers and mark scheme analysis." },
      { title: "Mocks and feedback", body: "Mock exams that replicate the real thing, with clear feedback on what to improve." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "GCSE & A-Level Preparation is £1,000 per month, either as a one-off payment for one month or a monthly subscription." },
      { q: "Who is it for?", a: "It is designed for students aged 14 to 18 preparing for GCSEs or A-Levels." },
      { q: "Will it fit around Dubai school hours?", a: "Sessions are online and timed for the UAE." },
      { q: "Can you guarantee results?", a: "No one can promise particular grades. What we can do is give your child strong exam technique, a clear plan and realistic practice." },
      PAY_FAQ,
      REFUND_FAQ,
    ],
    guides: ["gcse-grades-explained", "how-to-revise-gcse-a-level", "igcse-vs-gcse"],
  },
  {
    slug: "homeschool-support",
    section: "uae",
    productId: "uae-homeschool-term",
    name: "British Homeschool Support (one term)",
    shortName: "British homeschool support",
    headline: "British-curriculum homeschooling in Dubai, planned and supported",
    lead: "Curriculum design, UK tutor coordination, term planning and progress tracking, so homeschooling in Dubai and the GCC is structured, not stressful.",
    seoTitle: "British Homeschool Support in Dubai | Britannia Crown",
    seoDescription:
      "British-curriculum homeschool support for Dubai and GCC families: Cambridge and Edexcel curriculum design, UK tutors, planning and tracking. £1,400 a term.",
    assurances: ["Fixed price per term", "Pay securely online", "Free call available first"],
    audience: [
      "Dubai and GCC families who want a British-curriculum education at home",
      "Parents who want a clear structure and someone to coordinate it",
      "Families who want UK-qualified tutors alongside their own teaching",
    ],
    outcomes: [
      { title: "A curriculum designed for your child", body: "We design the learning around Cambridge and Edexcel curricula, so it follows a recognised British route." },
      { title: "Tutors, coordinated", body: "We coordinate UK tutors, so you do not have to find, vet or manage them yourself." },
      { title: "Clear progress", body: "Term planning and progress tracking show what has been covered and what comes next." },
    ],
    included: [
      "Cambridge and Edexcel curriculum design",
      "UK tutor coordination",
      "Term planning",
      "Progress tracking",
    ],
    steps: [
      { title: "Tell us about your child", body: "Their age, stage, goals and your family's routine." },
      { title: "We design the curriculum", body: "A Cambridge or Edexcel-based plan matched to your child." },
      { title: "We coordinate tutors", body: "UK tutors are arranged and coordinated for you." },
      { title: "We plan and track", body: "Term planning and progress tracking keep everyone clear on how it is going." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "British Homeschool Support is £1,400 per term." },
      { q: "Which curricula do you work with?", a: "We design curricula around Cambridge and Edexcel." },
      { q: "Where is it available?", a: "It is for Dubai and GCC families. Sessions with UK tutors are online." },
      { q: "Is homeschooling right for us?", a: "A free 30-minute call is a good way to talk it through with an education consultant before you commit." },
      PAY_FAQ,
      REFUND_FAQ,
    ],
    guides: ["home-education-england"],
  },
  {
    slug: "education-concierge",
    section: "uae",
    productId: "uae-concierge",
    name: "Education Concierge (monthly)",
    shortName: "Education concierge",
    headline: "A dedicated education manager for your family in Dubai",
    lead: "One person who knows your child, plans each month, answers your messages and deals with schools on your behalf.",
    seoTitle: "Education Concierge for Dubai Families | Britannia Crown",
    seoDescription:
      "A dedicated UK-curriculum education manager in Dubai: monthly strategy, unlimited message support, and liaison with schools. £500 a month.",
    assurances: ["Monthly, no long-term contract", "Pay securely online", "Free call available first"],
    audience: [
      "Dubai families who want one trusted person managing their child's education",
      "Busy parents who would rather not coordinate with schools themselves",
      "Families who want ongoing guidance rather than a one-off service",
    ],
    outcomes: [
      { title: "One person who knows your child", body: "Your education manager keeps the whole picture in view, so nothing falls between the gaps." },
      { title: "A plan, every month", body: "Monthly strategy keeps your child's education moving in a clear direction." },
      { title: "Questions answered", body: "Unlimited message support means you are never left wondering who to ask." },
    ],
    included: [
      "A dedicated UK-curriculum education manager",
      "Monthly strategy",
      "Unlimited message support",
      "Liaison with schools",
    ],
    steps: [
      { title: "Subscribe", body: "Start the monthly service whenever suits you." },
      { title: "We get to know your child", body: "Your education manager learns your child's needs, goals and context." },
      { title: "Monthly strategy", body: "Each month you agree the priorities and next steps." },
      { title: "We handle the liaison", body: "Your manager speaks to schools for you, and is on hand by message in between." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "Education Concierge is £500 a month." },
      { q: "What is the difference between this and school search?", a: "School Search & Placement is a one-off service to find and apply to a school. Education Concierge is an ongoing monthly relationship with a dedicated manager." },
      { q: "Can I cancel?", a: "Our refunds and cancellations page sets out exactly how cancellation works, so you can read it before you subscribe." },
      { q: "Can I speak to someone first?", a: "Yes. Book a free 30-minute call with an education consultant and we will talk it through." },
      PAY_FAQ,
    ],
    guides: [],
  },
  {
    slug: "foundation",
    section: "membership",
    productId: "membership-foundation",
    name: "Academic Partner Membership: Foundation",
    shortName: "Foundation",
    headline: "Foundation: steady, flexible tutoring support at a fixed monthly price",
    lead: "Four hours of online tutoring a month, flexible across subjects, with a monthly parent check-in and notes after every session. That is £50 an hour.",
    seoTitle: "Foundation Tutoring Membership | Britannia Crown",
    seoDescription:
      "Online tutoring membership with vetted UK-qualified tutors: 4 hours a month, a monthly parent check-in and session notes. £200 a month. Cancel or pause anytime.",
    assurances: ["Cancel or pause anytime", "No long-term contract", "Vetted UK-qualified tutors"],
    audience: [
      "Families who want regular, flexible tutoring without a big commitment",
      "Parents who want regular updates on progress",
      "Students who need help across more than one subject, a little at a time",
    ],
    outcomes: [
      { title: "Flexible hours", body: "Four hours a month to use on any subject, as your child's needs change." },
      { title: "Regular check-ins", body: "A monthly parent check-in keeps you in touch with how things are going." },
      { title: "Clear notes", body: "Subject strategy notes after each session show what was covered and what to do next." },
    ],
    included: [
      "4 hours a month of online tutoring credit, flexible across any subject",
      "A monthly 15-minute parent check-in call",
      "Message support for academic questions, with a 48-hour response",
      "Subject strategy notes after each session",
    ],
    steps: [
      { title: "Choose your tier", body: "Start with Foundation and change tier whenever your needs change." },
      { title: "We match your tutor", body: "Every tutor is UK-qualified and personally vetted by Britannia Crown." },
      { title: "Lessons begin, online", body: "Use your monthly hours flexibly, with notes after each session." },
      { title: "Monthly check-in", body: "A short call keeps you up to date and the plan on track." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "Foundation is £200 a month, which includes 4 hours of tutoring. That works out at £50 an hour, with the monthly check-in and session notes included." },
      { q: "What if my tutor becomes unavailable?", a: "We have a full bench of vetted British tutors. If your tutor is ever unavailable, a qualified replacement steps in so your child is never left without support." },
      { q: "Can I change subjects?", a: "Yes. Your monthly hours are flexible and can be allocated across subjects as your child's needs change. Just tell your consultant." },
      { q: "Can I cancel anytime?", a: "Yes. There is no long-term contract. You can cancel, pause or change tiers at any time." },
      { q: "Does it work outside the UK?", a: "Yes. Membership is delivered online, so it works wherever your family lives. Prices are in pounds sterling." },
      PAY_FAQ,
    ],
    guides: ["choosing-a-private-tutor"],
  },
  {
    slug: "partner",
    section: "membership",
    productId: "membership-partner",
    name: "Academic Partner Membership: Partner",
    shortName: "Partner",
    headline: "Partner: your own tutor, every week, with a consultant overseeing it all",
    lead: "Eight hours of online tutoring a month with a dedicated weekly tutor and a monthly consultant call. £45 an hour, with the consultant included.",
    seoTitle: "Partner Tutoring Membership | Britannia Crown",
    seoDescription:
      "Eight hours of online tutoring a month with the same dedicated tutor each week and a monthly call with your education consultant. £360 a month. Cancel anytime.",
    assurances: ["The same tutor every week", "Cancel or pause anytime", "Vetted UK-qualified tutors"],
    audience: [
      "Families who want a consistent weekly tutor for their child",
      "Students working towards exams who benefit from a regular rhythm",
      "Parents who want a monthly conversation with an education consultant",
    ],
    outcomes: [
      { title: "Continuity", body: "A fixed weekly slot with the same dedicated tutor, so your child builds a real working relationship." },
      { title: "A consultant on your side", body: "A monthly 30-minute call with your education consultant keeps the whole plan on track." },
      { title: "Exam focus", body: "One subject-specific exam strategy session each term." },
    ],
    included: [
      "8 hours a month of online tutoring credit",
      "A fixed weekly slot with a dedicated tutor, the same tutor every week",
      "A monthly 30-minute call with your education consultant",
      "Message support with a same-day response",
      "One subject-specific exam strategy session per term",
    ],
    steps: [
      { title: "Choose Partner", body: "Pick the tier that suits your child, and change it whenever you need to." },
      { title: "We match a dedicated tutor", body: "UK-qualified, personally vetted, and the same person every week." },
      { title: "Weekly lessons, online", body: "A fixed slot that fits your routine." },
      { title: "Monthly consultant call", body: "Thirty minutes to review progress and look ahead." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "Partner is £360 a month for 8 hours of tutoring. That works out at £45 an hour, with the consultant call, message support and exam strategy session included." },
      { q: "How does the price compare with booking tutors individually?", a: "UK-curriculum tutors booked individually in Dubai are listed at £60 to £70 an hour. Membership works out at £45 an hour on Partner, and includes your consultant and a full bench for continuity." },
      { q: "What if my tutor becomes unavailable?", a: "We have a full bench of vetted British tutors, so a qualified replacement steps in and your child's progress does not stall." },
      { q: "Can I cancel anytime?", a: "Yes. There is no long-term contract. You can cancel, pause or change tiers at any time." },
      { q: "Does it work outside the UK?", a: "Yes. Membership is delivered online, so it works wherever your family lives." },
      PAY_FAQ,
    ],
    guides: ["gcse-grades-explained", "how-to-revise-gcse-a-level"],
  },
  {
    slug: "full-partner",
    section: "membership",
    productId: "membership-full-partner",
    name: "Academic Partner Membership: Full Partner",
    shortName: "Full Partner",
    headline: "Full Partner: the most complete support, with a direct line to your consultant",
    lead: "Fourteen hours of online tutoring a month across up to two subjects, termly plan reviews and a direct line to your education consultant.",
    seoTitle: "Full Partner Tutoring Membership | Britannia Crown",
    seoDescription:
      "14 hours of online tutoring a month across up to two subjects, termly plan reviews and a direct line to your education consultant. £640 a month. Cancel anytime.",
    assurances: ["Up to two subjects", "Cancel or pause anytime", "Vetted UK-qualified tutors"],
    audience: [
      "Families who want substantial support across two subjects",
      "Students in an important exam year, or with a lot to catch up on",
      "Parents who want direct access to their education consultant",
    ],
    outcomes: [
      { title: "Depth across two subjects", body: "Fourteen hours a month, split across up to two subjects, so both get proper attention." },
      { title: "A plan, reviewed every term", body: "A termly academic plan review directly with your education consultant." },
      { title: "A direct line", body: "A direct line to your education consultant when you need advice between reviews." },
    ],
    included: [
      "14 hours a month of online tutoring credit, split across up to 2 subjects",
      "Everything in the Partner tier",
      "A termly academic plan review directly with your education consultant",
      "Priority access to school placement consultancy at a reduced rate if needed mid-term",
      "A direct line to your education consultant",
    ],
    steps: [
      { title: "Choose Full Partner", body: "The most complete tier, which you can change whenever you need to." },
      { title: "We match your tutors", body: "UK-qualified, personally vetted tutors for up to two subjects." },
      { title: "Lessons and support", body: "Weekly tutoring, with message support and your consultant on hand." },
      { title: "Termly plan review", body: "Each term you review the plan directly with your education consultant." },
    ],
    faqs: [
      { q: "How much does it cost?", a: "Full Partner is £640 a month for 14 hours of tutoring across up to two subjects, which works out at about £46 an hour. It includes everything in Partner, termly plan reviews and a direct line to your consultant." },
      { q: "What does the school placement benefit mean?", a: "If you need school placement help mid-term, Full Partner members get priority access to our school placement consultancy at a reduced rate." },
      { q: "What if a tutor becomes unavailable?", a: "We have a full bench of vetted British tutors, so a qualified replacement steps in and your child's progress does not stall." },
      { q: "Can I cancel anytime?", a: "Yes. There is no long-term contract. You can cancel, pause or change tiers at any time." },
      PAY_FAQ,
    ],
    guides: ["choosing-a-private-tutor"],
  },
];

export const getOffer = (section: OfferSection, slug: string) => offers.find((o) => o.section === section && o.slug === slug);
export const offerPath = (o: Pick<Offer, "section" | "slug">) => `/${o.section}/${o.slug}`;
export const offerForProduct = (productId: string) => offers.find((o) => o.productId === productId);
