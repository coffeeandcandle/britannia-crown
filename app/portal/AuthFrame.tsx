import Link from "next/link";

// Full-screen frame for the portal's sign-in and access pages: a branded panel beside the form.
export default function AuthFrame({
  area,
  title,
  lead,
  points,
  switchLink,
  children,
}: {
  area: string;
  title: string;
  lead: React.ReactNode;
  points?: string[];
  switchLink?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="pt-app pt-auth">
      <section className="pt-auth-panel">
        <Link href="/" className="ptn-brand" aria-label="Britannia Crown website">
          <svg viewBox="0 0 200 160" aria-hidden="true" className="ptn-crown">
            <path d="M20,120 L35,50 L70,90 L100,30 L130,90 L165,50 L180,120 Z" fill="#E8C89C" />
            <rect x="15" y="120" width="170" height="26" rx="3" fill="#E8C89C" />
          </svg>
          <span>
            <span className="ptn-brand-name">Britannia Crown</span>
            <span className="ptn-brand-sub">{area}</span>
          </span>
        </Link>
        <div className="pt-auth-copy">
          <h1>{title}</h1>
          <p>{lead}</p>
          {points && (
            <ul>
              {points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
        </div>
        <Link href="/" className="pt-auth-back">← Back to the website</Link>
      </section>
      <section className="pt-auth-form">
        <div className="pt-auth-form-inner">
          {children}
          {switchLink && (
            <p className="pt-auth-switch">
              <Link href={switchLink.href}>{switchLink.label}</Link>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
