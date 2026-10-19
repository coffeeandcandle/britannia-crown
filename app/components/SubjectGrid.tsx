import Link from "next/link";
import { levels, subjects } from "../lib/subjects";

export default function SubjectGrid() {
  return (
    <div className="uk-subjects">
      {levels.map((level) => (
        <div className="uk-subjects-col" key={level}>
          <h3 className="uk-subjects-level">{level}</h3>
          <ul>
            {subjects
              .filter((s) => s.level === level)
              .map((s) => (
                <li key={s.slug}>
                  <Link href={`/tutors/${s.slug}`} className="uk-subject-link">
                    <span>{s.name} tutors</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
