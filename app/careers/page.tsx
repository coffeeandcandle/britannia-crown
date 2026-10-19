import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Careers | Britannia Crown",
  description:
    "Join Britannia Crown's network of UK-qualified tutors and education consultants.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="Join Us"
        title="Careers at Britannia Crown"
        subtitle="We're always keen to hear from UK-qualified tutors and experienced education professionals who want to work with British expat families in Dubai and the GCC."
      />

      <section className="services">
        <div className="section-inner">
          <div className="legal-content">
            <h2>Who We&apos;re Looking For</h2>
            <ul>
              <li>UK-qualified tutors across all subjects, IGCSE, GCSE, and A-Level, currently teaching or recently teaching in the UK or Dubai.</li>
              <li>Experienced EYFS practitioners and nursery consultants.</li>
              <li>Education consultants with knowledge of Dubai&apos;s British curriculum school landscape.</li>
            </ul>

            <h2>Current Openings</h2>
            <p>We don&apos;t have specific open roles listed right now, but we review every application we receive. If you think you&apos;d be a good fit, we&apos;d love to hear from you.</p>

            <h2>How to Apply</h2>
            <p>Send your CV and a short note about your experience to <a href="mailto:hello@britanniacrown.com">hello@britanniacrown.com</a>, or message us on <a href="https://wa.me/971502635427">WhatsApp</a>.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
