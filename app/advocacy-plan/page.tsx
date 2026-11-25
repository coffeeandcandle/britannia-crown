import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection from "../components/FaqSection";
import EnquirySection from "../components/EnquirySection";
import JsonLd from "../components/JsonLd";
import { pageMetadata } from "../lib/seo";
import { ORG_ID } from "../lib/schema";
import { SITE_URL } from "../lib/site";
import BuyButton from "../components/BuyButton";
import { getProduct } from "../lib/products";
import { paymentsEnabled } from "../lib/stripe";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "School Advocacy Dubai | Advocacy Plan | Britannia Crown",
    description:
      "An education advocate who speaks to your child's British school in Dubai for you: teachers, SENCO and senior leaders. SEN advocacy, exam access and bullying support. From £240 a month.",
    path: "/advocacy-plan",
  }),
  keywords: [
    "school advocacy Dubai",
    "education advocate Dubai",
    "parent school liaison Dubai",
    "SEN advocacy Dubai",
    "British school support Dubai",
  ],
};

const BOOK = "/book-consultation?session=consultation";

const steps = [
  { title: "Free consultation", body: "A 30-minute call to understand what is happening at school, what you have tried and what a good outcome looks like." },
  { title: "Signed parent authority", body: "You sign a short letter authorising us to speak to the school for you, so staff can share information with us." },
  { title: "We contact the school", body: "Your consultant writes to and meets teachers, the head of year, the SENCO or senior leaders, and follows up until there is an answer." },
  { title: "Monthly updates & action plans", body: "You get a clear written summary every month and an action plan after every meeting, so you always know where things stand." },
];

const tiers = [
  {
    name: "Essential",
    productId: "advocacy-essential",
    value: 240,
    hours: "2 advocacy hours a month",
    features: [
      "Emails drafted and sent to school on your behalf",
      "One call with the school each month",
      "Monthly written summary",
      "WhatsApp replies within 48 hours",
    ],
  },
  {
    name: "Standard",
    productId: "advocacy-standard",
    value: 440,
    hours: "4 advocacy hours a month",
    featured: true,
    features: [
      "Everything in Essential",
      "Attendance at one online school meeting a month",
      "Review of reports, IEPs and learning plans",
      "Written action plan after every meeting",
      "Same-day WhatsApp replies",
    ],
  },
  {
    name: "Priority",
    productId: "advocacy-priority",
    value: 780,
    hours: "8 advocacy hours a month",
    features: [
      "Everything in Standard",
      "For active issues: bullying, SEN disputes, exam access, risk of exclusion",
      "One in-person school visit a month within Greater London (outside Greater London, an additional travel expenses fee applies)",
      "Priority booking for urgent school meetings",
      "Formal written escalation through the school's complaints process",
      "Support with KHDA complaints where needed",
      "Weekly updates while the issue is active",
      "WhatsApp replies within 4 working hours",
    ],
  },
];

const helpWith = [
  { title: "Academic concerns", body: "Falling behind, the wrong set, unclear reports or targets that don't match what you see at home." },
  { title: "Learning and SEN support", body: "Getting needs identified, assessed and properly supported, with IEPs and learning plans that are actually followed." },
  { title: "Exam access arrangements", body: "Extra time, a reader, rest breaks or a separate room, applied for in good time with the right evidence." },
  { title: "Wellbeing and bullying", body: "Making sure concerns are recorded, investigated and followed up, with a clear plan to keep your child safe." },
  { title: "Behaviour and sanctions", body: "Understanding what happened, making sure the policy is applied fairly and your child's side is heard." },
  { title: "Transitions and option choices", body: "Moving year, phase or school, and GCSE or A-Level choices that fit your child's strengths and plans." },
];

const terms = [
  "Extra hours: £120 per hour, always agreed in advance",
  "Academic Partner members get 15% off any Advocacy tier, applied automatically at checkout",
  "Unused hours roll over for one month",
  "Billed monthly; one-term minimum, then rolling monthly",
  "We advocate and liaise; we don't give legal advice",
];

const faqs = [
  {
    q: "Will the school talk to you?",
    a: "Yes, once you have signed our parent authority letter. It confirms we are acting on your behalf, so staff can discuss your child with us. Most schools welcome a calm, well-prepared go-between.",
  },
  {
    q: "Do I still get copied in?",
    a: "Always. You see every email before it is sent and are copied in on all correspondence. Nothing is agreed on your behalf without your say-so.",
  },
  {
    q: "What if the school ignores us?",
    a: "We follow up in writing with clear deadlines and escalate step by step: to the head of year, then senior leaders, then the school's formal complaints process. On the Priority plan we can also support a complaint to the KHDA where needed.",
  },
  {
    q: "Is this only for SEN?",
    a: "No. SEN support is a big part of what we do, but families also use the Advocacy Plan for academic worries, bullying, behaviour, exam access arrangements, option choices and moves between schools.",
  },
  {
    q: "Can I upgrade or pause?",
    a: "You can move up or down a tier from your next monthly payment. After the one-term minimum the plan is rolling monthly, so you can pause or stop it once things are settled.",
  },
  {
    q: "Do you give legal advice?",
    a: "No. We advocate and liaise with schools; we are not lawyers. If a situation needs legal advice we will tell you, and can help you prepare the paperwork a solicitor will need.",
  },
];

export default function AdvocacyPlanPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "Advocacy Plan", path: "/advocacy-plan" },
            ]}
          />
          <h1>We speak to the school, so you don&apos;t have to.</h1>
          <p>
            The Advocacy Plan gives you a dedicated Britannia Crown consultant who liaises with your child&apos;s teachers, head of
            year, SENCO and senior leaders on your behalf, making sure concerns are heard, followed up and acted on.
          </p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href={BOOK} className="btn-primary">Book a free consultation</Link>
            <Link href="#tiers" className="btn-secondary">See plans and prices</Link>
          </div>
          <span className="uk-chip">Monthly · British schools in Dubai and the UK · From £240 a month</span>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <h2 className="uk-h2">How it works</h2>
            <p className="uk-lead">Four simple steps, and you stay in control throughout.</p>
          </Reveal>
          <Reveal>
            <div className="uk-steps mb-four">
              {steps.map((s, i) => (
                <div className="uk-step mb-light" key={s.title}>
                  <div className="uk-step-num">{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section cream" id="tiers">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <h2 className="uk-h2">Advocacy plans and prices</h2>
            <p className="uk-lead">Every plan includes a dedicated consultant, signed parent authority and copies of all correspondence with the school.</p>
          </Reveal>
          <Reveal>
            <div className="mb-tiers">
              {tiers.map((t) => (
                <div className={`mb-tier${t.featured ? " featured" : ""}`} key={t.name}>
                  {t.featured && <span className="mb-badge">Most popular</span>}
                  <p className="mb-tier-name">{t.name}</p>
                  <p className="mb-price"><span>£{t.value}</span> / month</p>
                  <p className="adv-hours">{t.hours}</p>
                  <ul>
                    {t.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <BuyButton
                    product={getProduct(t.productId)!}
                    enabled={paymentsEnabled}
                    label={paymentsEnabled ? `Start ${t.name}` : `Enquire about ${t.name}`}
                    className={t.featured ? "btn-primary" : "btn-secondary mb-btn-dark"}
                  />
                  <Link href={BOOK} className="adv-or">or book a free consultation first</Link>
                </div>
              ))}
            </div>
          </Reveal>
          <ul className="adv-terms">
            {terms.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <h2 className="uk-h2">What we can help with</h2>
            <p className="uk-lead">If it is affecting your child at school, we can raise it, follow it up and keep it moving.</p>
          </Reveal>
          <Reveal>
            <div className="uk-points">
              {helpWith.map((h) => (
                <div className="uk-point" key={h.title}>
                  <h3>{h.title}</h3>
                  <p>{h.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqs} tone="cream" />

      <section className="uk-section dark">
        <div className="uk-wrap adv-cta">
          <h2 className="uk-h2">Let us take the school conversations off your plate</h2>
          <p className="uk-lead">Start with a free 30-minute consultation. We will listen, tell you honestly whether we can help and recommend the right plan.</p>
          <Link href={BOOK} className="btn-primary">Book a free consultation</Link>
        </div>
      </section>

      <EnquirySection
        title={<>Prefer to send us a message?</>}
        lead="Tell us a little about what is happening at school and a consultant will call you back, usually within 24 hours."
        source="advocacy_page"
        defaultService="Advocacy Plan"
        context="Advocacy Plan"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Advocacy Plan",
          serviceType: "School advocacy and parent–school liaison",
          description:
            "A monthly service where a dedicated education consultant liaises with your child's teachers, head of year, SENCO and senior leaders on your behalf.",
          url: `${SITE_URL}/advocacy-plan`,
          provider: { "@id": ORG_ID },
          areaServed: [{ "@type": "City", name: "Dubai" }, { "@type": "Country", name: "United Kingdom" }],
          offers: tiers.map((t) => ({
            "@type": "Offer",
            name: `${t.name} advocacy plan`,
            description: t.hours,
            price: t.value,
            priceCurrency: "GBP",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: t.value,
              priceCurrency: "GBP",
              billingDuration: 1,
              unitCode: "MON",
            },
          })),
        }}
      />
    </>
  );
}
