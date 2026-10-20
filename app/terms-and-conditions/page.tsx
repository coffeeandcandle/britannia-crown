import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import PageHero from "../components/PageHero";
import { EMAIL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms and Conditions | Britannia Crown",
  description:
    "Terms and conditions for Britannia Crown's education consultancy, tutoring, membership and placement services.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" />

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="legal-content">
            <p className="legal-updated">Last updated: 20 October 2026</p>

            <p>
              These terms apply when you use the services of Britannia Crown Education Consultants (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;). Please read them with our <Link href="/refunds-and-cancellations">refunds and cancellations policy</Link>{" "}
              and <Link href="/privacy-policy">privacy policy</Link>. Questions? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>

            <h2>1. Our services</h2>
            <p>
              We provide British education consultancy to families in the UK, the UAE and elsewhere, including private tutoring,
              Academic Partner Membership, home education support, school and nursery placement, exam preparation and education
              concierge services. The scope of each service is described on our website or agreed with you before it starts.
            </p>

            <h2>2. Consultations and bookings</h2>
            <p>
              Initial consultations booked through our website are free and carry no obligation. A paid service begins once you have
              bought it online or confirmed with us that you&apos;d like to go ahead and the fee has been agreed.
            </p>

            <h2>3. Prices and payment</h2>
            <ul>
              <li>All prices are in pounds sterling (GBP) and include any fees. If you pay in another currency, your card provider converts the amount.</li>
              <li>Online payments are processed securely by Stripe. We never see or store your full card details.</li>
              <li>One-off services are paid in full when you buy. Memberships and the Education Concierge are paid monthly in advance until you cancel.</li>
              <li>Services we quote for individually are invoiced as agreed with you in writing.</li>
            </ul>

            <h2>4. Cancellations, rescheduling and refunds</h2>
            <p>
              You have a 14-day right to cancel services bought online, memberships can be cancelled at any time, and lessons can be
              rearranged free of charge with 24 hours&apos; notice. Full details are in our{" "}
              <Link href="/refunds-and-cancellations">refunds and cancellations policy</Link>, which forms part of these terms.
            </p>

            <h2>5. Lessons and the family portal</h2>
            <ul>
              <li>Online lessons take place by video call using the link in your family portal. Please make sure your child is ready on time, in a suitable space.</li>
              <li>A parent or guardian is responsible for a child&apos;s use of online lessons and of the family portal.</li>
              <li>Keep your portal sign-in details private. Tell us straight away if you think someone else has accessed your account.</li>
            </ul>

            <h2>6. Ambassador Programme</h2>
            <p>
              Approved ambassadors receive £30 for each successful referral: a family who uses the ambassador&apos;s personal code
              and completes a paid booking with us. Free consultations don&apos;t count as successful referrals. We may check
              referrals and decline payment for fraudulent or duplicate submissions.
            </p>

            <h2>7. No guarantee of outcome</h2>
            <p>
              We bring real expertise to placement, tutoring and exam preparation, but we can&apos;t guarantee particular outcomes,
              such as a place at a specific school or a specific exam grade, because these depend on factors outside our control.
            </p>

            <h2>8. Our responsibility to you</h2>
            <p>
              We provide our services with reasonable care and skill. If we fail to do so, we will put it right or give you an
              appropriate refund, as set out in our refunds and cancellations policy. Except where the law doesn&apos;t allow us to
              limit it, our total liability for any claim about a service is limited to the price you paid for that service. We
              don&apos;t limit our liability for death or personal injury caused by our negligence, for fraud, or for anything else
              that can&apos;t legally be limited.
            </p>

            <h2>9. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. The version on this page when you buy a service applies to that purchase.
              We will email you before any change that affects an ongoing membership.
            </p>

            <h2>10. Your legal rights and the law that applies</h2>
            <p>
              Nothing in these terms affects your legal rights as a consumer. These terms are governed by the law of England and
              Wales. If you live in Scotland or Northern Ireland, you can also bring claims in your local courts.
            </p>

            <h2>11. Contact</h2>
            <p>Questions about these terms can be sent to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
