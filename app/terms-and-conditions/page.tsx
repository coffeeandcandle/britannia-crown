import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export const metadata: Metadata = {
  title: "Terms and Conditions | Britannia Crown",
  description: "Terms and conditions for using Britannia Crown's education consultancy services and the Ambassador referral programme.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />

      <PageHero eyebrow="Legal" title="Terms and Conditions" />

      <section className="services">
        <div className="section-inner">
          <div className="legal-content">
            <p className="legal-updated">Last updated: 8 July 2026</p>

            <p><em>This is a general template and has not been reviewed by a lawyer. Please have it reviewed before relying on it, particularly the payment, cancellation, and liability sections.</em></p>

            <h2>1. Our Services</h2>
            <p>Britannia Crown provides British education consultancy services in Dubai and the wider GCC, including nursery search and placement, school search and placement, subject tutoring, GCSE and A-Level preparation, homeschool support, and education concierge services. Specific scope, pricing, and timelines for each engagement are agreed with you directly before work begins.</p>

            <h2>2. Bookings and Consultations</h2>
            <p>Initial consultations booked via our website or Calendly are free and carry no obligation. Paid services begin only once you&apos;ve confirmed you&apos;d like to proceed and any applicable fee has been agreed.</p>

            <h2>3. Payment</h2>
            <p>Fees for services are as quoted at the time of booking, in AED, unless otherwise agreed in writing. Payment terms will be confirmed with you before any paid engagement begins.</p>

            <h2>4. Cancellations</h2>
            <p>You may reschedule or cancel a free consultation at any time with reasonable notice. Cancellation terms for paid services (tutoring sessions, placement engagements, concierge retainers) will be set out in your specific service agreement.</p>

            <h2>5. Ambassador Programme</h2>
            <p>The Ambassador Programme rewards approved ambassadors 150 AED for each successful referral, defined as a family who uses the ambassador&apos;s personal code and completes a paid booking with Britannia Crown. Free consultations do not qualify as successful referrals. We reserve the right to verify referrals and to decline payment for fraudulent or duplicate submissions.</p>

            <h2>6. No Guarantee of Outcome</h2>
            <p>While we bring genuine expertise to nursery and school placement, tutoring, and exam preparation, we cannot guarantee specific outcomes (such as offer of a place at a particular school, or a specific exam grade), as these depend on factors outside our control.</p>

            <h2>7. Limitation of Liability</h2>
            <p>To the extent permitted by law, Britannia Crown&apos;s liability for any claim arising from our services is limited to the fees paid for the specific service in question.</p>

            <h2>8. Contact</h2>
            <p>Questions about these terms can be sent to <a href="mailto:hello@britanniacrown.com">hello@britanniacrown.com</a>.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
