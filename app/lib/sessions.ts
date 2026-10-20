import { CALENDLY_URL } from "./site";

// Bookable session types. Each is a Calendly event type; paid ones take payment in Calendly
// (Calendly → Integrations → Stripe, then set a price on the event type).
// A session with calendlyUrl: null isn't bookable yet: it shows "Request this session" and
// hides its price, so nothing unconfirmed appears on the live site. To switch one on, create
// the event type in Calendly, paste its link here and confirm the price.
export type SessionType = {
  id: string;
  name: string;
  minutes: number;
  // Price in pounds; null means free.
  price: number | null;
  summary: string;
  includes: string[];
  calendlyUrl: string | null;
  // Enquiry form option used when the session isn't bookable online yet.
  service: string;
};

export const sessionTypes: SessionType[] = [
  {
    id: "consultation",
    name: "Free consultation",
    minutes: 30,
    price: null,
    summary: "A first conversation about your child with an education consultant. No obligation.",
    includes: ["Talk through your child's needs and goals", "A clear recommendation for next steps", "Prices for any support we suggest"],
    calendlyUrl: CALENDLY_URL,
    service: "General Enquiry",
  },
  {
    id: "strategy",
    name: "Strategy session",
    minutes: 60,
    price: 150,
    summary: "An in-depth session on a school choice, an exam plan or home education, with a written summary afterwards.",
    includes: ["A detailed review of your child's situation", "A school shortlist, exam plan or home education plan", "A written summary within two working days"],
    calendlyUrl: null,
    service: "General Enquiry",
  },
  {
    id: "trial-lesson",
    name: "Trial tutoring lesson",
    minutes: 45,
    price: 50,
    summary: "A first one-to-one lesson with a matched tutor, online, so your child can try it before committing.",
    includes: ["A tutor matched to the subject and level", "A short assessment of where your child is", "Feedback and a suggested plan after the lesson"],
    calendlyUrl: null,
    service: "Tutoring",
  },
];

export const getSessionType = (id: string | null | undefined) => sessionTypes.find((s) => s.id === id);

export const isBookable = (s: SessionType) => s.calendlyUrl !== null;

export const priceLabel = (s: SessionType) => (s.price === null ? "Free" : `£${s.price}`);
