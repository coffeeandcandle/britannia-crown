"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { subjects } from "../lib/subjects";
import { track } from "../lib/track";

type Need = "tutor" | "guidance" | "exams" | "school" | "home" | "uae";
type Recommendation = {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  service: string;
  extra?: { href: string; label: string };
};

const needs: { value: Need; label: string }[] = [
  { value: "tutor", label: "A tutor" },
  { value: "guidance", label: "Educational guidance" },
  { value: "exams", label: "GCSE or A-Level exams" },
  { value: "school", label: "Choosing a school" },
  { value: "home", label: "Home education" },
  { value: "uae", label: "Moving to the UAE" },
];

// "Educational guidance": advice rather than a service. Each topic points to the best guide and the right consultancy.
const guidanceTopics = [
  { value: "subjects", label: "Choosing GCSE or A-Level subjects" },
  { value: "school", label: "Which school route to take" },
  { value: "tutor", label: "Whether my child needs a tutor" },
  { value: "exams", label: "Exams, resits or results" },
  { value: "other", label: "Something else" },
];

const tutorStages = ["Primary", "GCSE", "A-Level"] as const;
const examStages = ["GCSE", "A-Level"] as const;
const schoolStages = ["Nursery or Reception", "Primary", "Secondary"] as const;

function recommend(need: Need, stage: string, subject: string): Recommendation | null {
  if (need === "guidance") {
    if (!stage) return null;
    const topics: Record<string, Recommendation> = {
      subjects: {
        title: "Subject and pathway guidance",
        body: "Honest advice on GCSE options, A-Level choices and routes towards university and careers, based on your child's strengths.",
        href: "/services/qualifications",
        linkLabel: "See qualifications guidance",
        service: "Qualifications",
        extra: { href: "/guides/how-to-choose-gcse-options", label: "Read: how to choose GCSE options" },
      },
      school: {
        title: "School route guidance",
        body: "Help weighing up state, selective and independent routes, and what the admissions rules mean for your family.",
        href: "/services/school-placement",
        linkLabel: "See school placement",
        service: "School Placement",
        extra: { href: "/guides/how-school-admissions-criteria-work", label: "Read: how admissions criteria work" },
      },
      tutor: {
        title: "Is a tutor the right step?",
        body: "A frank conversation about whether extra help would make a difference, what kind, and when a tutor is not the answer.",
        href: "/services/tutoring",
        linkLabel: "See private tutoring",
        service: "Tutoring",
        extra: { href: "/guides/signs-your-child-needs-a-tutor", label: "Read: signs your child needs a tutor" },
      },
      exams: {
        title: "Exam, resit and results guidance",
        body: "Plan resits, private-candidate entries and what to do after results, with clear next steps.",
        href: "/services/qualifications",
        linkLabel: "See exam support",
        service: "Qualifications",
        extra: { href: "/guides/results-day-gcse-a-level-what-to-do", label: "Read: what to do after results" },
      },
      other: {
        title: "A free consultation",
        body: "Tell us what is on your mind and an education consultant will give you honest, practical guidance. It is free and there is no obligation.",
        href: "/book-consultation",
        linkLabel: "Book a free call",
        service: "General Enquiry",
        extra: { href: "/guides", label: "Browse our guides for parents" },
      },
    };
    return topics[stage] ?? null;
  }
  if (need === "tutor") {
    if (!stage) return null;
    if (stage === "Primary") {
      return {
        title: "Primary school tutoring",
        body: "Reading, number fluency and writing, in short and encouraging sessions with a UK-trained tutor.",
        href: "/tutors/primary",
        linkLabel: "See primary tutoring",
        service: "Tutoring",
      };
    }
    const s = subjects.find((x) => x.slug === subject);
    if (!s) return null;
    return {
      title: `${s.name} tutoring`,
      body: `A ${s.name} specialist matched to your child's exam board and target grade, online or face to face.`,
      href: `/tutors/${s.slug}`,
      linkLabel: `See ${s.name} tutoring`,
      service: "Tutoring",
    };
  }
  if (need === "exams") {
    if (!stage) return null;
    return {
      title: `${stage} exam preparation`,
      body: "Revision planning, past papers and exam technique, with a consultant keeping an eye on the target grade.",
      href: "/services/qualifications",
      linkLabel: "See exam support",
      service: "Qualifications",
      extra: stage === "GCSE"
        ? { href: "/tools/gcse-grade-converter", label: "What do GCSE grades mean?" }
        : { href: "/guides/how-to-revise-gcse-a-level", label: "Read: how to revise" },
    };
  }
  if (need === "school") {
    if (!stage) return null;
    return {
      title: "School and nursery placement",
      body: "We research and shortlist schools that suit your child and guide you through visits and applications.",
      href: "/services/school-placement",
      linkLabel: "See school placement",
      service: "School Placement",
      extra: { href: "/tools/school-dates", label: "Check your application deadlines" },
    };
  }
  if (need === "home") {
    return {
      title: "Home education support",
      body: "A structured British-curriculum plan, specialist tutors and help with exams taken as a private candidate.",
      href: "/services/home-education",
      linkLabel: "See home education",
      service: "Home Education",
      extra: { href: "/guides/home-education-england", label: "Read: home education in England" },
    };
  }
  return {
    title: "Education advice for your move",
    body: "Nursery and school placement in Dubai, plus UK-qualified tutors so learning carries on through the move.",
    href: "/uae",
    linkLabel: "See UAE services",
    service: "Moving to the UAE",
  };
}

function Options({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="finder-options">
        {options.map((o) => (
          <div className="finder-option" key={o.value}>
            <input
              type="radio"
              id={`${id}-${o.value}`}
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            <label htmlFor={`${id}-${o.value}`}>{o.label}</label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

const asOptions = (xs: readonly string[]) => xs.map((x) => ({ value: x, label: x }));

export default function Finder() {
  const [need, setNeed] = useState<Need | "">("");
  const [stage, setStage] = useState("");
  const [subject, setSubject] = useState("");

  const stages = need === "guidance" ? null : need === "tutor" ? tutorStages : need === "exams" ? examStages : need === "school" ? schoolStages : null;
  const subjectOptions =
    need === "tutor" && (stage === "GCSE" || stage === "A-Level")
      ? subjects.filter((s) => s.level === stage).map((s) => ({ value: s.slug, label: s.name.replace(`${stage} `, "") }))
      : null;
  const result = need ? recommend(need, stage, subject) : null;

  function choose(update: () => void, next: { need: string; stage: string; subject: string }) {
    update();
    const r = next.need ? recommend(next.need as Need, next.stage, next.subject) : null;
    if (r) track("finder_complete", { need: next.need, stage: next.stage, subject: next.subject, recommended: r.href });
  }

  return (
    <div className="finder">
      <h2>Find the right help</h2>
      <p>Answer one or two questions and we&apos;ll point you to the right place.</p>

      <Options
        name="need"
        legend="What are you looking for?"
        options={needs}
        value={need}
        onChange={(v) =>
          choose(() => {
            setNeed(v as Need);
            setStage("");
            setSubject("");
          }, { need: v, stage: "", subject: "" })
        }
      />

      {need === "guidance" && (
        <Options
          name="topic"
          legend="What would you like guidance on?"
          options={guidanceTopics}
          value={stage}
          onChange={(v) =>
            choose(() => {
              setStage(v);
              setSubject("");
            }, { need, stage: v, subject: "" })
          }
        />
      )}

      {stages && (
        <Options
          name="stage"
          legend="What stage is your child at?"
          options={asOptions(stages)}
          value={stage}
          onChange={(v) =>
            choose(() => {
              setStage(v);
              setSubject("");
            }, { need, stage: v, subject: "" })
          }
        />
      )}

      {subjectOptions && (
        <Options
          name="subject"
          legend="Which subject?"
          options={subjectOptions}
          value={subject}
          onChange={(v) => choose(() => setSubject(v), { need, stage, subject: v })}
        />
      )}

      <div aria-live="polite">
        {result && (
          <div className="finder-result">
            <p><strong>We recommend: {result.title}</strong></p>
            <p>{result.body}</p>
            <div className="uk-hero-actions">
              <Link href={{ pathname: "/contact", query: { service: result.service } }} className="btn-primary">
                Request a call back
              </Link>
              <Link href={result.href} className="btn-secondary">{result.linkLabel}</Link>
            </div>
            {result.extra && (
              <p className="finder-extra"><Link href={result.extra.href}>{result.extra.label} →</Link></p>
            )}
          </div>
        )}
      </div>

      {need && (
        <button
          type="button"
          className="finder-reset"
          onClick={() => {
            setNeed("");
            setStage("");
            setSubject("");
          }}
        >
          Start again
        </button>
      )}
    </div>
  );
}
