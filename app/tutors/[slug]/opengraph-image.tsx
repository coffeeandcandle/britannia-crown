import { renderOg } from "../../lib/og";
import { getSubject, subjects } from "../../lib/subjects";

export const alt = "Britannia Crown | UK-trained private tutors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return subjects.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return renderOg({ kicker: "Find a Tutor", title: "Private tutors,", italic: "personally matched." });
  return renderOg({ kicker: `${subject.level} Tutoring`, title: `${subject.name} Tutors`, italic: subject.tagline });
}
