import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../lib/seo";
import PageHero from "../components/PageHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { EMAIL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Refunds and Cancellations Policy | Britannia Crown",
  description:
    "How to cancel a Britannia Crown membership, lesson or package, your 14-day right to cancel, rescheduling lessons, and how refunds are paid.",
  path: "/refunds-and-cancellations",
});

const summary = [
  "Changed your mind? You have 14 days from buying online to cancel.",
  "Memberships are monthly with no contract. Cancel any time and it stops at the end of the month you've paid for.",
  "Need to move a lesson? Give us 24 hours' notice and we'll rearrange it at no charge.",
  "Refunds go back to the card you paid with, within 14 days.",
];

export default function RefundsPage() {
  return (
    <>
      <PageHero
        title="Refunds and cancellations"
        subtitle="Clear, fair rules for cancelling, rescheduling and refunds. Your legal rights as a consumer are not affected."
      >
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Refunds and cancellations", path: "/refunds-and-cancellations" }]} />
      </PageHero>

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="legal-content">
            <p className="legal-updated">Last updated: 20 October 2026</p>

            <div className="legal-summary">
              <h2>In short</h2>
              <ul>
                {summary.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>

            <p>
              This policy applies to services bought from Britannia Crown Education Consultants (&ldquo;we&rdquo;, &ldquo;us&rdquo;),
              whether you pay online through our website or we invoice you. It should be read with our{" "}
              <Link href="/terms-and-conditions">terms and conditions</Link>. All prices are in pounds sterling (GBP).
            </p>

            <h2>1. Your 14-day right to cancel</h2>
            <p>
              If you buy a service from us online, by phone or by email, you have the right to cancel within <strong>14 days</strong>{" "}
              of the day you buy, without giving a reason. This is your right under the Consumer Contracts (Information,
              Cancellation and Additional Charges) Regulations 2013.
            </p>
            <p>
              If you cancel within those 14 days and no sessions or work have taken place, we will refund everything you have paid.
            </p>

            <h2>2. If you ask us to start within the 14 days</h2>
            <p>
              Many families want lessons or placement work to begin straight away. If you ask us to start before the 14 days are up
              and then cancel within that period, we will refund what you paid <strong>minus the value of the sessions or work
              already provided</strong> up to the point you told us you were cancelling. We work this out in proportion to the full
              service you bought.
            </p>
            <p>
              Once a service has been fully provided within the 14 days at your request, the right to cancel no longer applies to it.
            </p>

            <h2>3. Academic Partner Membership and Education Concierge</h2>
            <ul>
              <li><strong>No long-term contract.</strong> Memberships and the Education Concierge are billed monthly and you can cancel at any time.</li>
              <li><strong>When it stops.</strong> If you cancel after the first 14 days, your plan stays active until the end of the month you have already paid for, then stops. You won&apos;t be charged again.</li>
              <li><strong>Partial months.</strong> After the first 14 days, we don&apos;t refund part-used months.</li>
              <li><strong>Tutoring hours.</strong> Each month&apos;s hours are for that month and don&apos;t carry over, except hours for lessons we cancel, which we always rearrange or credit.</li>
              <li><strong>Changing plan.</strong> You can move up or down a tier at any time. The new price applies from your next monthly payment.</li>
              <li><strong>How to cancel.</strong> Use <strong>Billing → Manage payment and plan</strong> in your <Link href="/portal">client portal</Link>, or email us.</li>
            </ul>

            <h2>4. Lessons: rescheduling and missed sessions</h2>
            <ul>
              <li><strong>24 hours&apos; notice.</strong> If you tell us at least 24 hours before a lesson, we will move it to another time at no charge.</li>
              <li><strong>Less than 24 hours&apos; notice.</strong> The lesson counts as taken, because your tutor has reserved that time. We will always try to help in genuine emergencies such as illness.</li>
              <li><strong>Missed lessons.</strong> If your child hasn&apos;t joined within 15 minutes of the start time and we haven&apos;t heard from you, the lesson counts as taken.</li>
              <li><strong>If we cancel.</strong> If a tutor has to cancel, we will offer another time or a replacement tutor. If neither suits you, we will refund or credit that lesson in full.</li>
            </ul>

            <h2>5. Fixed-price packages</h2>
            <p>
              This covers Nursery Search &amp; Placement, School Search &amp; Placement, GCSE &amp; A-Level Preparation (per term) and
              British Homeschool Support (per term).
            </p>
            <ul>
              <li><strong>Within 14 days:</strong> see sections 1 and 2.</li>
              <li><strong>After 14 days, before work is complete:</strong> you can cancel by telling us. We will refund the part of the fee for work not yet done, worked out fairly in proportion to the whole package. For term-based packages, this means a refund for the sessions not yet delivered.</li>
              <li><strong>Once the work is complete:</strong> for example, once we have delivered your school or nursery shortlist and application support, or the term&apos;s sessions have taken place, the fee is not refundable.</li>
              <li><strong>Outcomes.</strong> Placement fees pay for our research, advice and support, not for a guaranteed place at a particular school or nursery, which is decided by the school. Exam preparation fees likewise don&apos;t guarantee a particular grade.</li>
            </ul>

            <h2>6. Consultations</h2>
            <ul>
              <li>The <strong>free 30-minute consultation</strong> is free and can be cancelled or rearranged at any time.</li>
              <li><strong>Paid sessions</strong> such as a strategy session or trial lesson can be cancelled or rearranged for free with at least 24 hours&apos; notice, for a full refund. With less notice, the session is not refundable, but we will try to rearrange it if we can.</li>
            </ul>

            <h2>7. If something isn&apos;t right</h2>
            <p>
              We provide every service with reasonable care and skill, as the Consumer Rights Act 2015 requires. If you&apos;re
              unhappy with a lesson or any part of our work, please tell us as soon as you can. We will put it right, for example by
              arranging a replacement session. If we can&apos;t put it right, we will give you an appropriate refund. This doesn&apos;t
              affect your legal rights.
            </p>

            <h2>8. How refunds are paid</h2>
            <ul>
              <li>We refund using the same method you paid with, such as your card, unless we agree otherwise.</li>
              <li>We aim to process refunds within 5 working days and will always do so within <strong>14 days</strong> of agreeing the refund or receiving your cancellation.</li>
              <li>We don&apos;t charge any fee for refunds. Your card provider may take a few days to show the money in your account.</li>
            </ul>

            <h2>9. Missed payments</h2>
            <p>
              If a monthly payment fails, our payment provider will try again over the following days and we will let you know. If
              payment still can&apos;t be taken, we may pause lessons until it is resolved. We will always contact you before
              ending a plan.
            </p>

            <h2>10. Price changes</h2>
            <p>
              We will give you at least <strong>30 days&apos;</strong> notice by email before changing the price of a membership or
              other ongoing service. If you don&apos;t want to continue at the new price, you can cancel before it takes effect.
            </p>

            <h2>11. How to cancel or ask for a refund</h2>
            <p>
              Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with your name, the email address you used to buy, and the service
              you&apos;d like to cancel. You can also use our <Link href="/contact">contact form</Link>. For memberships, you can
              cancel yourself from the Billing page of your <Link href="/portal">client portal</Link>.
            </p>
            <p>If you prefer, you can use this wording:</p>
            <blockquote className="legal-quote">
              To Britannia Crown Education Consultants, {EMAIL}: I hereby give notice that I cancel my contract for the following
              service: [service], bought on [date]. Name: [your name]. Email: [email used to buy]. Date: [today&apos;s date].
            </blockquote>
            <p>We will confirm your cancellation by email.</p>

            <h2>12. Complaints</h2>
            <p>
              If you&apos;re not happy with how we&apos;ve handled a cancellation or refund, email us and a senior consultant will
              review it and reply within 5 working days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
