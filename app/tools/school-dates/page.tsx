import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "../../lib/seo";
import Breadcrumbs from "../../components/Breadcrumbs";
import SchoolDates from "../../components/SchoolDates";
import FaqSection from "../../components/FaqSection";
import EnquirySection from "../../components/EnquirySection";

export const metadata: Metadata = pageMetadata({
  title: "School Start Date & Application Deadline Calculator (England) | Britannia Crown",
  description:
    "Enter your child's date of birth to see their year group, when they start school, and every primary, secondary and 11+ application deadline in England.",
  path: "/tools/school-dates",
});

const faqs = [
  {
    q: "How is my child's school year worked out?",
    a: "In England the school year runs from 1 September to 31 August. Children born in the same school year start Reception together in the September after they turn four, so a child born on 31 August is the youngest in their year and a child born on 1 September is the oldest.",
  },
  {
    q: "When do I apply for a primary school place?",
    a: "You apply to your home council in the autumn before your child starts Reception. The national closing date is 15 January, and offers are sent on 16 April, or the next working day.",
  },
  {
    q: "When do I apply for a secondary school place?",
    a: "You apply in the autumn term of Year 6. The national closing date is 31 October, and offers are sent on 1 March, or the next working day.",
  },
  {
    q: "Can a summer-born child start school a year later?",
    a: "Children born between 1 April and 31 August can start Reception a year later than usual if the admission authority agrees. You need to apply in the normal round and request the delay, so speak to your council early.",
  },
];

export default function SchoolDatesPage() {
  return (
    <>
      <section className="uk-sub-hero">
        <div className="uk-wrap">
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Guides & tools", path: "/guides" },
              { name: "School dates calculator", path: "/tools/school-dates" },
            ]}
          />
          <span className="uk-eyebrow">Free tool</span>
          <h1>School dates calculator</h1>
          <p>Enter your child&apos;s date of birth to see their year group, when they start school, and every application deadline from Reception to Year 7, for state schools in England.</p>
        </div>
      </section>

      <section className="uk-section cream">
        <div className="uk-wrap tool-wrap">
          <SchoolDates />
          <p className="tool-after">
            Want the full picture? Read our guide to <Link href="/guides/school-admissions-england">school admissions in England</Link>.
          </p>
        </div>
      </section>

      <FaqSection faqs={faqs} tone="white" />

      <EnquirySection
        title="Need help choosing a school?"
        lead="We research and shortlist schools that suit your child and guide you through visits, applications and appeals."
        source="tool_school_dates"
        defaultService="School Placement"
        context="School dates calculator"
      />
    </>
  );
}
