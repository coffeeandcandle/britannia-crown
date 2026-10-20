import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import Breadcrumbs from "../../components/Breadcrumbs";
import GradeConverter from "../../components/GradeConverter";
import FaqSection from "../../components/FaqSection";
import EnquirySection from "../../components/EnquirySection";

export const metadata: Metadata = pageMetadata({
  title: "GCSE Grade Converter: 9-1 vs A*-G | Britannia Crown",
  description:
    "See what each GCSE grade from 9 to 1 means and how it compares with the old A* to G letter grades, including what counts as a standard and strong pass.",
  path: "/tools/gcse-grade-converter",
});

const faqs = [
  {
    q: "Is a grade 4 a pass?",
    a: "Yes. The Department for Education treats grade 4 as a standard pass and grade 5 as a strong pass. Grade 4 is aligned with the bottom of the old grade C.",
  },
  {
    q: "Is a grade 7 an A?",
    a: "Grade 7 is aligned with the bottom of the old grade A. Grades 8 and 9 cover the old A* and the top of the old A.",
  },
  {
    q: "What happens if my child doesn't get a 4 in English or maths?",
    a: "In England, students who don't get at least a grade 4 in English or maths must keep studying the subject after 16. Students with a grade 3 usually resit the GCSE.",
  },
];

export default function GradeConverterPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Guides & tools", path: "/guides" },
              { name: "GCSE grade converter", path: "/tools/gcse-grade-converter" },
            ]}
          />
          <span className="uk-eyebrow">Free tool</span>
          <h1>GCSE grade converter</h1>
          <p>Choose a grade to see what it means and how it compares with the old A* to G letter grades.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap tool-wrap">
          <GradeConverter />
          <p className="tool-after">
            For more detail, read <Link href="/guides/gcse-grades-explained">GCSE grades explained</Link>.
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} tone="white" />

      <EnquirySection
        title="Aiming for a higher grade?"
        lead="Tell us about your child's subjects and target grades, and we'll match them with a GCSE specialist."
        source="tool_grade_converter"
        defaultService="Qualifications"
        context="GCSE grade converter"
      />
    </>
  );
}
