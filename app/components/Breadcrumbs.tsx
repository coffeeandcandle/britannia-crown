import Link from "next/link";
import JsonLd from "./JsonLd";
import { breadcrumbSchema, type Crumb } from "../lib/schema";

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <nav className="uk-crumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((c, i) => (
            <li key={c.path}>
              {i < crumbs.length - 1 ? <Link href={c.path}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
