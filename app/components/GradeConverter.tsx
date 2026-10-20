"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "../lib/track";

// Equivalents follow the Ofqual anchor points: 7 aligns with the bottom of the old A,
// 4 with the bottom of the old C, and 1 with the bottom of the old G.
const grades = [
  { g: "9", old: "A high A*", note: "The highest grade, awarded to fewer students than the old A*." },
  { g: "8", old: "A low A* or a high A", note: "An excellent result, and the target for many students applying to competitive sixth forms." },
  { g: "7", old: "A", note: "Grade 7 is aligned with the bottom of the old grade A. Many sixth forms ask for a 7 to study a subject at A-Level." },
  { g: "6", old: "A high B", note: "A good result. Some sixth forms ask for a 6 in subjects you plan to take at A-Level, especially maths and the sciences." },
  { g: "5", old: "A low B or a high C", note: "A 'strong pass'. School performance tables report the share of pupils getting grade 5 or above in English and maths." },
  { g: "4", old: "C", note: "A 'standard pass', aligned with the bottom of the old grade C. Most employers and colleges treat a 4 as a pass." },
  { g: "3", old: "D or a high E", note: "Below a standard pass. In England, students without a 4 in English or maths must keep studying it after 16, and those with a 3 usually resit the GCSE." },
  { g: "2", old: "A low E or an F", note: "In England, students without a 4 in English or maths must keep studying it after 16, often through a GCSE resit or Functional Skills." },
  { g: "1", old: "F or G", note: "Grade 1 is aligned with the bottom of the old grade G." },
  { g: "U", old: "Ungraded", note: "The work did not reach the standard for a grade 1." },
];

export default function GradeConverter() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = grades.find((x) => x.g === selected);

  return (
    <div className="tool">
      <p className="tool-label" id="grade-picker-label">Choose a grade</p>
      <div className="grade-picker" role="group" aria-labelledby="grade-picker-label">
        {grades.map((x) => (
          <button
            key={x.g}
            type="button"
            aria-pressed={selected === x.g}
            onClick={() => {
              setSelected(x.g);
              track("tool_used", { tool: "gcse_grade_converter", grade: x.g });
            }}
          >
            {x.g}
          </button>
        ))}
      </div>

      <div className="tool-results" aria-live="polite">
        {current && (
          <>
            <div className="tool-summary">
              <p>
                {current.g === "U" ? "A U" : <>A grade <strong>{current.g}</strong></>} is broadly equivalent to <strong>{current.old}</strong> under the old system.
              </p>
              <p style={{ marginTop: 6 }}>{current.note}</p>
            </div>
            <div className="finder-result">
              <p><strong>Want to move up a grade?</strong> Our GCSE specialists work on exam technique as well as content, with a consultant tracking progress.</p>
              <div className="uk-hero-actions">
                <Link href={{ pathname: "/contact", query: { service: "Qualifications" } }} className="btn-primary">Request a call back</Link>
                <Link href="/guides/gcse-grades-explained" className="btn-secondary">Read the full guide</Link>
              </div>
            </div>
          </>
        )}
      </div>
      <p className="tool-note">
        The new and old grades don&apos;t map exactly, apart from three anchor points: 7 matches the bottom of A, 4 the bottom of C and 1 the bottom of G.
        These equivalents apply to GCSEs in England.
      </p>
    </div>
  );
}
