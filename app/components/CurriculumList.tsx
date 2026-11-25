import Link from "next/link";
import { curriculum, curriculumCount } from "../lib/curriculum";

// The full list of subjects we tutor, one expandable panel per stage. Subjects with their own page
// link to it; the rest open the enquiry form labelled with the subject.
export default function CurriculumList() {
  return (
    <div className="cur">
      <p className="cur-count">{curriculumCount}+ subjects and courses. Tap a stage to see them all.</p>
      {curriculum.map((stage, i) => (
        <details className="cur-stage" key={stage.id} id={`subjects-${stage.id}`} open={i === 0}>
          <summary>
            <span className="cur-title">{stage.title}</span>
            <span className="cur-ages">{stage.ages}</span>
          </summary>
          <p className="cur-intro">{stage.intro}</p>
          {stage.groups.map((g) => (
            <div className="cur-group" key={g.title}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.slug ? `/tutors/${item.slug}` : { pathname: "/contact", query: { subject: `${item.name} (${stage.title})` }, hash: "enquiry-form" }}
                      className={item.slug ? "cur-chip has-page" : "cur-chip"}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </details>
      ))}
      <p className="cur-note">Can&apos;t see your child&apos;s subject or course? <Link href="/contact">Ask us</Link>. We match tutors across the whole UK curriculum and will tell you honestly if it&apos;s one we can&apos;t cover.</p>
    </div>
  );
}
