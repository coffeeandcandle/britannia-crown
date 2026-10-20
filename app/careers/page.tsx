import type { Metadata } from "next";
import { pageMetadata } from "../lib/seo";
import PageHero from "../components/PageHero";
import Breadcrumbs from "../components/Breadcrumbs";
import { EMAIL, WHATSAPP_URL } from "../lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Careers | Britannia Crown",
  description:
    "Join Britannia Crown's network of UK-qualified tutors and education consultants.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Work with Britannia Crown"
        subtitle="We're always keen to hear from UK-qualified tutors and experienced education professionals who want to work with families in the UK, Dubai and the GCC."
      >
        <Breadcrumbs crumbs={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]} />
      </PageHero>

      <section className="uk-section white">
        <div className="uk-wrap">
          <div className="legal-content">
            <h2>Who we&apos;re looking for</h2>
            <ul>
              <li>UK-qualified tutors across all subjects, IGCSE, GCSE and A-Level, currently or recently teaching in the UK or Dubai.</li>
              <li>Experienced EYFS practitioners and nursery consultants.</li>
              <li>Education consultants who know British-curriculum schools in the UK or Dubai.</li>
            </ul>

            <h2>Current openings</h2>
            <p>We don&apos;t have specific roles listed right now, but we review every application we receive. If you think you&apos;d be a good fit, we&apos;d love to hear from you.</p>

            <h2>How to apply</h2>
            <p>Send your CV and a short note about your experience to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>, or message us on <a href={WHATSAPP_URL}>WhatsApp</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
