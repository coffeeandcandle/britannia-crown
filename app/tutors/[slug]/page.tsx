import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Reveal from "../../components/Reveal";
import Breadcrumbs from "../../components/Breadcrumbs";
import FaqSection from "../../components/FaqSection";
import EnquirySection from "../../components/EnquirySection";
import JsonLd from "../../components/JsonLd";
import GuideCards from "../../components/GuideCards";
import { subjects, getSubject } from "../../lib/subjects";
import { getService } from "../../lib/services";
import { guidesFor } from "../../lib/guides";
import { pageMetadata } from "../../lib/seo";
import { serviceSchema } from "../../lib/schema";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return subjects.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};
  return pageMetadata({ title: subject.seoTitle, description: subject.seoDescription, path: `/tutors/${subject.slug}`, ownImage: true });
}

export default async function SubjectPage({ params }: Props) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const path = `/tutors/${subject.slug}`;
  const steps = getService("tutoring")?.steps ?? [];
  const related = subject.related.map(getSubject).filter((s) => s !== undefined);
  const reading = guidesFor("subjects", subject.slug).slice(0, 3);

  return (
    <>
      <Nav />

      <section className="uk-sub-hero">
        <div className="uk-wrap uk-hero-load">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Find a Tutor", path: "/tutors" },
              { name: `${subject.name} Tutors`, path },
            ]}
          />
          <span className="uk-eyebrow">{subject.level} Tutoring</span>
          <h1>
            {subject.name} Tutors <em className="uk-h1-line">{subject.tagline}</em>
          </h1>
          <p>{subject.lead}</p>
          <div className="uk-hero-actions uk-sub-actions">
            <Link href="#enquire" className="btn-primary">Request a Call Back</Link>
            <Link href="/book-consultation" className="btn-secondary">Book Free Consultation</Link>
          </div>
          <span className="uk-chip">UK-trained tutors · Online or face to face</span>
        </div>
      </section>

      <section className="uk-section white">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">At a glance</span>
            <h2 className="uk-h2">{subject.name}, <em>explained.</em></h2>
          </Reveal>
          <Reveal>
            <dl className="uk-glance">
              {subject.glance.map((g) => (
                <div className="uk-glance-item" key={g.label}>
                  <dt>{g.label}</dt>
                  <dd>{g.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How we help</span>
            <h2 className="uk-h2">Where students get stuck — <em>and how we help.</em></h2>
          </Reveal>
          <Reveal>
            <div className="uk-points">
              {subject.help.map((p) => (
                <div className="uk-point" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="uk-section dark">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">How it works</span>
            <h2 className="uk-h2">From first call to <em>first lesson.</em></h2>
          </Reveal>
          <Reveal>
            <div className="uk-steps">
              {steps.map((st, i) => (
                <div className="uk-step" key={st.title}>
                  <div className="uk-step-num">0{i + 1}</div>
                  <h3>{st.title}</h3>
                  <p>{st.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={subject.faqs} tone="white" />

      <EnquirySection
        title={<>Find the right <em>{subject.name} tutor.</em></>}
        lead={`Tell us about your child and an education consultant will call you back to talk through ${subject.name} tutoring — usually within 24 hours.`}
        source="subject_page"
        defaultService="Tutoring"
        context={`${subject.name} tutoring`}
      />

      <section className="uk-section cream">
        <div className="uk-wrap">
          <Reveal className="uk-head">
            <span className="uk-kicker">Related</span>
            <h2 className="uk-h2">You might also <em>be looking for.</em></h2>
          </Reveal>
          <Reveal>
            <div className="uk-others">
              {related.map((r) => (
                <Link href={`/tutors/${r.slug}`} className="uk-other" key={r.slug}>
                  <span>{r.level}</span>
                  <strong>{r.name} tutors</strong>
                </Link>
              ))}
              <Link href="/services/qualifications" className="uk-other">
                <span>Exams</span>
                <strong>Qualifications &amp; exam success</strong>
              </Link>
            </div>
          </Reveal>
          {reading.length > 0 && (
            <Reveal className="gd-reading-after">
              <GuideCards items={reading} />
            </Reveal>
          )}
        </div>
      </section>

      <JsonLd
        data={serviceSchema({
          name: `${subject.name} Tutoring`,
          description: subject.seoDescription,
          path,
          serviceType: "Private tutoring",
        })}
      />

      <Footer />
    </>
  );
}
