import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Children, isValidElement, type ReactNode } from "react";
import { slugify } from "./app/lib/slug";

// Plain text of a heading's children, so ids match the contents list built from the source.
function textOf(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) return textOf(child.props.children);
      return "";
    })
    .join("");
}

// A highlighted box for key facts, dates or tips.
function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="gd-callout">
      {title && <p className="gd-callout-title">{title}</p>}
      {children}
    </aside>
  );
}

// An in-article prompt to talk to a consultant; links to the enquiry form at the foot of the page.
function Cta({ title = "Would a conversation help?", children }: { title?: string; children?: ReactNode }) {
  return (
    <aside className="gd-cta">
      <p className="gd-cta-title">{title}</p>
      {children ?? <p>Our education consultants offer a free, no-obligation 30-minute consultation.</p>}
      <div className="gd-cta-actions">
        <Link href="#enquire" className="btn-primary">Request a Call Back</Link>
        <Link href="/book-consultation" className="gd-cta-link">or book a consultation →</Link>
      </div>
    </aside>
  );
}

const components: MDXComponents = {
  h2: ({ children }) => <h2 id={slugify(textOf(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(textOf(children))}>{children}</h3>,
  a: ({ href = "", children }) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    ),
  table: ({ children }) => (
    <div className="gd-table">
      <table>{children}</table>
    </div>
  ),
  Callout,
  Cta,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
