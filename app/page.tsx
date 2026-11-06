import type { Metadata } from "next";
import Link from "next/link";
import HomePlans from "./components/HomePlans";
import SignupLink from "./components/SignupLink";
import Finder from "./components/Finder";
import EnquirySection from "./components/EnquirySection";
import { services } from "./lib/services";
import { levels, subjects } from "./lib/subjects";
import { getGuide } from "./lib/guides";
import { getNews } from "./lib/news";
import { pageMetadata } from "./lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Private Tutors & Education Consultants | Britannia Crown",
  description:
    "Private tutoring, home education, school placement and GCSE & A-Level support from UK-trained educators, overseen by a dedicated education consultant.",
  path: "/",
});

const steps = [
  { title: "Tell us about your child", body: "Book a free 30-minute call or send a message. We ask about your child, your goals and what is worrying you." },
  { title: "Get a clear recommendation", body: "The right tutor, school route or plan, with honest reasons and clear prices." },
  { title: "We stay involved", body: "Your consultant checks progress and adjusts the plan as your child's needs change." },
];

const reasons = [
  { title: "UK-trained educators.", body: "A network of 50+ tutors, vetted by us, including teachers working in British schools today. Personally matched to your child, never picked from a list." },
  { title: "One consultant for the whole journey.", body: "The same person oversees tutoring, school choices and exams, so nothing falls between the gaps as your child grows." },
  { title: "Six years running a UK tutoring company.", body: "We know the curriculum, the exam boards and the admissions process in detail, and we explain our advice so you can question it." },
];

const readingSlugs = [
  "school-admissions-england",
  "gcse-grades-explained",
  "choosing-a-private-tutor",
  "how-much-does-a-private-tutor-cost-uk",
  "home-education-england",
  "11-plus-and-grammar-schools-explained",
];
const reading = readingSlugs.map(getGuide).filter((g) => g !== undefined);
const newsItems = ["primary-school-applications-close-15-january-2027", "secondary-offer-day-1-march-2027"].map(getNews).filter((n) => n !== undefined);

export default function Home() {
  return (
    <>
      <section className="hm2-hero">
        <div className="uk-wrap hm2-hero-grid">
          <div className="hm2-hero-copy">
            <h1>Tutoring, school places and exam support, overseen by one education consultant</h1>
            <p className="hm2-lead">
              UK-trained tutors, school and nursery placement, home education and GCSE and A-Level support, with one person who
              knows your child from first nursery to final exam.
            </p>
            <div className="hm2-actions">
              <Link href="/book-consultation" className="btn-primary">Book a free call</Link>
              <a href="/api/checkout?product=strategy-session&return_path=%2F" className="hm2-textlink">or book a £150 strategy session</a>
            </div>
            <p className="hm2-fine">First consultation free. We reply within 24 hours.</p>
          </div>

          <figure className="hm2-note" aria-label="Example of a written summary after a strategy session">
            <figcaption>
              <span>After a strategy session</span>
              <strong>Written summary, Year 9 maths</strong>
            </figcaption>
            <dl>
              <div>
                <dt>What we found</dt>
                <dd>Number and algebra are secure. Fractions and ratio from Year 7 never settled, and that is now slowing everything else. Confidence is a bigger issue than ability.</dd>
              </div>
              <div>
                <dt>What we recommend</dt>
                <dd>A weekly tutor at a fixed time for one term. Start with ratio and fractions, not the current topic. Review at half term.</dd>
              </div>
              <div>
                <dt>Next steps</dt>
                <dd>Tutor introduction this week. First lesson Thursday. Check-in call with your consultant in four weeks.</dd>
              </div>
            </dl>
            <p className="hm2-note-tag">An example of the summary you receive within two working days. Details changed.</p>
          </figure>
        </div>
      </section>

      <section className="hm2-sec" id="how-it-works">
        <div className="uk-wrap hm2-how">
          <div className="hm2-how-head">
            <h2 className="hm2-h2">How it works</h2>
            <p>Three conversations, no forms to fill in first.</p>
          </div>
          <ol className="hm2-how-list">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="hm2-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="hm2-sec" id="services">
        <div className="uk-wrap">
          <h2 className="hm2-h2">What we help with</h2>
          <ul className="hm2-index">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>
                  <span className="hm2-index-num" aria-hidden="true">{s.numeral}</span>
                  <span className="hm2-index-name">{s.name}</span>
                  <span className="hm2-index-desc">{s.short}</span>
                  <span className="hm2-index-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="hm2-subjects">
            <h3>Tutoring by subject</h3>
            <dl>
              {levels.map((level) => (
                <div key={level}>
                  <dt>{level}</dt>
                  <dd>
                    {subjects.filter((s) => s.level === level).map((s, i, all) => (
                      <span key={s.slug}>
                        <Link href={`/tutors/${s.slug}`}>{s.name}</Link>
                        {i < all.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hm2-unsure hm-pathfinder">
            <div>
              <h3>Not sure where to start?</h3>
              <p>Tell us what you are working through and we will point you to the right person or information.</p>
            </div>
            <Finder />
          </div>
        </div>
      </section>

      <section className="hm2-sec" id="portal-lessons">
        <div className="uk-wrap hm2-portal">
          <div>
            <h2 className="hm2-h2">Online lessons happen inside your portal</h2>
            <p className="hm2-lead">
              No video links to chase and nothing to install. Log in, press Join, and your tutor is there. It works on a phone, a
              tablet or a laptop.
            </p>
            <ul className="hm2-plain">
              <li>The Join button appears 15 minutes before each lesson.</li>
              <li>Only your family, your tutor and our team can enter the room.</li>
              <li>Notes and homework appear in the same account straight after.</li>
            </ul>
            <div className="hm2-actions">
              <SignupLink location="home_portal_lessons" className="btn-primary">Create your free account</SignupLink>
              <Link href="/portal/login" className="hm2-textlink">or log in</Link>
            </div>
          </div>

          <div className="hm2-screen" role="img" aria-label="Example of the lesson screen in the family portal">
            <div className="hm2-screen-bar" aria-hidden="true"><i /><i /><i /></div>
            <div className="hm2-screen-body" aria-hidden="true">
              <p className="hm2-screen-label">Next lesson</p>
              <p className="hm2-screen-title">GCSE Maths, Thursday 4:30 pm</p>
              <span className="hm2-screen-join">Join lesson</span>
              <hr />
              <p className="hm2-screen-label">Notes from last week</p>
              <p className="hm2-screen-note">Covered ratio problems with a bar model. Practise worksheet 3, questions 1 to 6, before Thursday.</p>
            </div>
            <p className="hm2-note-tag">Example screen</p>
          </div>
        </div>
      </section>

      <HomePlans />

      <section className="hm2-statement">
        <div className="uk-wrap">
          <h2>We are education consultants, not a tutoring marketplace.</h2>
          <div className="hm2-reasons">
            {reasons.map((r) => (
              <p key={r.title}>
                <strong>{r.title}</strong> {r.body}
              </p>
            ))}
          </div>
          <Link href="/about" className="hm2-textlink hm2-textlink--light">About Britannia Crown →</Link>
        </div>
      </section>

      <section className="hm2-sec" id="guides">
        <div className="uk-wrap hm2-reading">
          <div className="hm2-reading-head">
            <h2 className="hm2-h2">Answers for parents</h2>
            <p>Plain-English guides to school applications, exams, tutors and home education, written by our consultants.</p>
            <p className="hm2-links">
              <Link href="/guides">All guides →</Link>
              <Link href="/tools/school-dates">School dates calculator</Link>
              <Link href="/tools/gcse-grade-converter">GCSE grade converter</Link>
            </p>
          </div>
          <div>
            <ul className="hm2-list">
              {reading.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`}>
                    <span>{g.category}</span>
                    <strong>{g.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="hm2-list-title">Coming up</h3>
            <ul className="hm2-list">
              {newsItems.map((n) => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`}>
                    <span>News</span>
                    <strong>{n.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="hm2-links"><Link href="/news">All news →</Link></p>
          </div>
        </div>
      </section>

      <section className="hm2-uae">
        <div className="uk-wrap">
          <p>
            <strong>Moving to the UAE?</strong> We help UK families find the right nursery or school in Dubai and keep British-curriculum tutoring going without a break.
          </p>
          <Link href="/uae" className="hm2-textlink">Education advice for the UAE →</Link>
        </div>
      </section>

      <EnquirySection
        title="Talk to an education consultant"
        lead="Tell us a little about your child and we'll call you back, usually within 24 hours."
        source="home_page"
        defaultService=""
        context="Home page"
      />
    </>
  );
}
