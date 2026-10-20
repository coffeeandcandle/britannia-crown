import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found | Britannia Crown", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="uk-section">
      <div className="uk-wrap nf">
        <span className="uk-eyebrow">Page not found</span>
        <h1 className="uk-h2">We can&apos;t find that page</h1>
        <p>It may have moved, or you may not have access to it. Here are some places to go instead.</p>
        <div className="uk-hero-actions">
          <Link href="/" className="btn-primary">Home</Link>
          <Link href="/pricing" className="btn-secondary">Prices</Link>
          <Link href="/portal" className="btn-secondary">My portal</Link>
          <Link href="/contact" className="btn-secondary">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
