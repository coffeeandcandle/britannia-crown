"use client";

import { useState } from "react";
import Link from "next/link";
import { levels, subjects } from "../lib/subjects";

// Searchable list of tutoring subjects with level filters.
export default function SubjectFilter() {
  const [level, setLevel] = useState<string>("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = subjects.filter(
    (s) => (level === "All" || s.level === level) && (!q || `${s.name} ${s.level}`.toLowerCase().includes(q)),
  );

  return (
    <div>
      <div className="subject-filter">
        <label htmlFor="subject-search" className="sr-only">Search subjects</label>
        <input
          id="subject-search"
          type="search"
          placeholder="Search subjects, e.g. maths"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="grade-picker level-picker" role="group" aria-label="Filter by stage">
          {["All", ...levels].map((l) => (
            <button key={l} type="button" aria-pressed={level === l} onClick={() => setLevel(l)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">{shown.length} subjects shown</p>

      {shown.length > 0 ? (
        <ul className="uk-others subject-cards">
          {shown.map((s) => (
            <li key={s.slug}>
              <Link href={`/tutors/${s.slug}`} className="uk-other">
                <span>{s.level}</span>
                <strong>{s.name} tutors</strong>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="subject-filter-empty">
          We don&apos;t have a page for that subject yet, but we tutor across the whole curriculum.{" "}
          <Link href={{ pathname: "/contact", query: { service: "Tutoring" } }}>Tell us what you need</Link> and we&apos;ll find a tutor.
        </p>
      )}
    </div>
  );
}
