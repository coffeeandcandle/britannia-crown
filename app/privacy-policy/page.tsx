import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import PageHero from "../components/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | Britannia Crown",
  description:
    "How Britannia Crown collects, uses, and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>

      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="legal-content">
            <p className="legal-updated">Last updated: 8 July 2026</p>

            <h2>1. Introduction</h2>
            <p>Britannia Crown Education Consultants (&quot;Britannia Crown&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is committed to protecting the personal information you share with us. This policy explains what information we collect, how we use it, and the choices you have.</p>
            <p><em>This is a general template and has not been reviewed by a lawyer. Please have it reviewed to ensure it meets your obligations under applicable law (including UAE data protection regulations and, where relevant, UK GDPR) before relying on it.</em></p>

            <h2>2. Information We Collect</h2>
            <ul>
              <li>Contact details you provide via our forms — name, email address, phone number, and any details about your child&apos;s age or the service you&apos;re enquiring about.</li>
              <li>Messages you send us via WhatsApp, email, or our contact and guide-request forms.</li>
              <li>Basic usage data collected automatically via Google Analytics and Google Tag Manager (pages visited, general location, device type).</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To respond to enquiries and provide the services you&apos;ve requested (nursery search, school placement, tutoring, homeschool support, or education concierge services).</li>
              <li>To send the free guides you&apos;ve requested, by email.</li>
              <li>To administer the Ambassador Programme, including tracking referrals and arranging payment.</li>
              <li>To improve our website and services.</li>
            </ul>

            <h2>4. Sharing Your Information</h2>
            <p>We do not sell your personal information. We may share it with trusted third parties who help us operate our business — for example, our tutors and school-placement partners (only as needed to deliver the service you&apos;ve requested), our form-processing provider (Formspree), and our analytics providers (Google).</p>

            <h2>5. Data Retention</h2>
            <p>We retain your information for as long as necessary to provide our services and comply with our legal obligations. You can ask us to delete your information at any time by contacting us.</p>

            <h2>6. Your Rights</h2>
            <p>You may ask us to access, correct, or delete the personal information we hold about you at any time by emailing <a href="mailto:hello@britanniacrown.com">hello@britanniacrown.com</a>.</p>

            <h2>7. Contact Us</h2>
            <p>If you have questions about this policy, contact us at <a href="mailto:hello@britanniacrown.com">hello@britanniacrown.com</a> or via WhatsApp at <a href="https://wa.me/971502635427">+971 50 263 5427</a>.</p>
          </div>
        </div>
      </section>

    </>
  );
}
