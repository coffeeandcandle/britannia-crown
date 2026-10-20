import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import Breadcrumbs from "../components/Breadcrumbs";
import FaqSection from "../components/FaqSection";
import AmbassadorForm from "../components/AmbassadorForm";
import { pageMetadata } from "../lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Ambassador Programme | Earn £30 per Referral | Britannia Crown",
  description:
    "Refer a family to Britannia Crown and earn £30 for every successful booking, with no limit on referrals. Open to nannies, teachers, parents and community members.",
  path: "/ambassador",
});

const steps = [
  { title: "Sign up", body: "Fill in the form below. We'll review your application and send you your unique personal ambassador code within 48 hours." },
  { title: "Share your code", body: "Share it at the park, at school, in parent group chats, wherever you naturally talk to families. No selling, just a trusted recommendation." },
  { title: "A family books", body: "When a family uses your code and books a paid session with Britannia Crown, the referral is confirmed as successful." },
  { title: "You get paid", body: "£30 is transferred directly to you, every time. No caps, no limits: the more families you refer, the more you earn." },
];

const who = [
  { title: "Nannies & au pairs", body: "You're at the parks, the nurseries and the school gates, right where the conversations happen. Families trust your judgement on everything to do with the children in your care.", tag: "Perfect fit" },
  { title: "Teachers & educators", body: "You know which students need extra support, and parents trust your academic expertise. A recommendation from a teacher carries unmatched credibility.", tag: "Perfect fit" },
  { title: "Parents & community", body: "If your child has benefited from Britannia Crown, share the experience and earn for every family you bring on board.", tag: "Welcome" },
];

const earnings = [
  { n: "1 referral", v: "£30" },
  { n: "5 referrals", v: "£150" },
  { n: "10 referrals", v: "£300" },
  { n: "25 referrals", v: "£750" },
];

const faqs = [
  {
    q: "What counts as a successful referral?",
    a: "A referral is successful when a family uses your personal code and completes a paid booking with Britannia Crown. Free consultations do not count — only confirmed paid sessions.",
  },
  {
    q: "How and when do I get paid?",
    a: "Once a referral is confirmed as successful we will contact you to arrange payment, directly to your bank account by bank transfer. Payments are processed within 7 days of confirmation.",
  },
  {
    q: "Is there a limit on how many people I can refer?",
    a: "No. There is no cap on referrals. Refer as many families as you like — every successful booking earns you £30.",
  },
  {
    q: "Do I need to be based in the UAE?",
    a: "Our ambassador community is currently strongest in the British expat community in the UAE, and rewards are paid in pounds by bank transfer. Wherever you're based, apply and tell us where you are.",
  },
  {
    q: "Can I be an ambassador if I already work with Britannia Crown as a tutor?",
    a: "Yes. Tutors on our platform are welcome to join the Ambassador Programme. Any family you refer who is not already your client and books a new service qualifies.",
  },
  {
    q: "How will I know when my code has been used?",
    a: "We will email you whenever your code is used and when a referral is confirmed as successful, so you always know exactly where you stand.",
  },
];

export default function AmbassadorPage() {
  return (
    <>

      <section className="uk-sub-hero" id="ambassador">
        <div className="uk-wrap">
          <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Ambassador Programme", path: "/ambassador" }]} />
          <span className="uk-eyebrow">Britannia Crown · Ambassador Programme</span>
          <h1>Earn £30 for every family you refer</h1>
          <p>You&apos;re already trusted by the families we want to reach. Refer a family to Britannia Crown and earn <strong style={{ color: "var(--champagne)", fontWeight: 500 }}>£30</strong> for every successful booking. No limit on referrals.</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#signup" className="btn-primary">Apply to be an ambassador</Link>
            <Link href="#how" className="btn-secondary">How it works</Link>
          </div>
        </div>
      </section>

      <section className="uk-section white" style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div className="uk-wrap">
          <Reveal>
            <div className="ab-stats">
              <div className="ab-stat"><span className="ab-stat-num">£30</span><span className="ab-stat-label">Per successful referral</span></div>
              <div className="ab-stat"><span className="ab-stat-num">Unlimited</span><span className="ab-stat-label">Referrals you can make</span></div>
              <div className="ab-stat"><span className="ab-stat-num">Your code</span><span className="ab-stat-label">Personal and unique to you</span></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section cream" id="how">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">How the programme works</h2>
            <p className="uk-lead">Four simple steps between signing up and getting paid.</p>
          </Reveal>
          <Reveal>
            <div className="uk-steps mb-four mb-light-steps">
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

      <section className="uk-section white" id="who">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Open to everyone</span>
            <h2 className="uk-h2">Who can become an ambassador?</h2>
            <p className="uk-lead">If families trust your recommendation, you&apos;re exactly who we&apos;re looking for.</p>
          </Reveal>
          <Reveal>
            <div className="uk-points mb-three-points">
              {who.map((w) => (
                <div className="uk-point" key={w.title}>
                  <span className="amb-tag">{w.tag}</span>
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark" id="earnings">
        <div className="uk-wrap uk-split">
          <Reveal>
            <span className="uk-kicker">Your earnings</span>
            <h2 className="uk-h2">What you could earn</h2>
            <p className="uk-lead">There are no limits on how many referrals you can make. Every successful booking earns you £30, whether it&apos;s your first referral or your fiftieth.</p>
            <p className="uk-lead" style={{ marginTop: 18 }}>Think about the nanny networks, the school parent groups and the parents you speak to every day at pick-up. One message. One code. One booking.</p>
          </Reveal>
          <Reveal>
            <table className="amb-earn">
              <thead>
                <tr><th scope="col">Referrals made</th><th scope="col">Your earnings</th></tr>
              </thead>
              <tbody>
                {earnings.map((e) => (
                  <tr key={e.n}><th scope="row">{e.n}</th><td>{e.v}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="amb-earn-note">* Earnings paid upon successful confirmed booking. No upper limit on referrals.</p>
          </Reveal>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="amb-code-wrap">
            <span className="uk-kicker">Your personal code</span>
            <h2 className="uk-h2" style={{ marginLeft: "auto", marginRight: "auto" }}>Every ambassador gets their own code</h2>
            <p className="uk-lead" style={{ margin: "0 auto" }}>Your code is personal to you. Whoever uses it when booking is associated with your account, so every successful referral is tracked back to you.</p>
            <div className="amb-code">
              <span className="amb-code-label">Your ambassador code</span>
              <span className="amb-code-value">BC-SARA</span>
              <span className="amb-code-note">This is an example — your code is created when you sign up</span>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={faqs} tone="white" />

      <section className="uk-enquire" id="signup">
        <div className="uk-wrap uk-enquire-grid">
          <div>
            <span className="uk-kicker">Join the programme</span>
            <h2 className="uk-h2">Apply to become an ambassador</h2>
            <p className="uk-lead">Fill in the form and we&apos;ll be in touch within 48 hours with your personal ambassador code and everything you need to get started.</p>
            <ul className="uk-ticks">
              <li>£30 for every successful referral</li>
              <li>No limit on how many families you refer</li>
              <li>A personal code, tracked back to you</li>
            </ul>
          </div>
          <div className="enq-card">
            <AmbassadorForm />
          </div>
        </div>
      </section>

    </>
  );
}
