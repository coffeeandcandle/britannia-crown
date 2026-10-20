import Link from "next/link";

// Shared building blocks so every portal page explains itself the same way.

export function PageHeader({
  title,
  description,
  back,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  back?: { href: string; label: string };
  actions?: React.ReactNode;
}) {
  return (
    <header className="pg-head">
      {back && <Link href={back.href} className="pg-back">← {back.label}</Link>}
      <div className="pg-head-row">
        <div>
          <h1 className="pg-title">{title}</h1>
          {description && <p className="pg-desc">{description}</p>}
        </div>
        {actions && <div className="pg-actions">{actions}</div>}
      </div>
    </header>
  );
}

export function Card({
  title,
  description,
  action,
  tone,
  id,
  children,
}: {
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  tone?: "brand" | "soft";
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`ui-card${tone ? ` is-${tone}` : ""}`} id={id}>
      {(title || action) && (
        <div className="ui-card-head">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p className="ui-card-desc">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="ui-empty">
      <p className="ui-empty-title">{title}</p>
      {children && <p className="ui-empty-body">{children}</p>}
      {action && <div className="ui-empty-action">{action}</div>}
    </div>
  );
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="ui-stats">{children}</div>;
}

export function Stat({ label, value, hint, href, tone }: { label: string; value: number | string; hint?: string; href?: string; tone?: "alert" | "good" }) {
  const body = (
    <>
      <span className="ui-stat-value">{value}</span>
      <span className="ui-stat-label">{label}</span>
      {hint && <span className="ui-stat-hint">{hint}</span>}
    </>
  );
  const cls = `ui-stat${tone ? ` is-${tone}` : ""}`;
  return href ? <Link href={href} className={cls}>{body}</Link> : <div className={cls}>{body}</div>;
}

export type Step = { done: boolean; title: string; body: string; href?: string; cta?: string };

// A short to-do list with progress, used to guide first-time setup.
export function Checklist({ title, description, steps }: { title: string; description?: string; steps: Step[] }) {
  const done = steps.filter((s) => s.done).length;
  const next = steps.find((s) => !s.done);
  return (
    <section className="ui-card ui-checklist">
      <div className="ui-card-head">
        <div>
          <h2>{title}</h2>
          {description && <p className="ui-card-desc">{description}</p>}
        </div>
        <span className="ui-progress-text">{done} of {steps.length} done</span>
      </div>
      <div className="ui-progress" aria-hidden="true"><span style={{ width: `${(done / steps.length) * 100}%` }} /></div>
      <ol className="ui-steps">
        {steps.map((s, i) => (
          <li key={s.title} className={s.done ? "is-done" : s === next ? "is-next" : undefined}>
            <span className="ui-step-mark" aria-hidden="true">{s.done ? "✓" : i + 1}</span>
            <div className="ui-step-text">
              <strong>{s.title}</strong>
              <span>{s.body}</span>
            </div>
            {!s.done && s.href && (
              <Link href={s.href} className={s === next ? "btn-primary ui-btn-sm" : "ui-link"}>{s.cta ?? "Start"}</Link>
            )}
            <span className="sr-only">{s.done ? "Done" : "Not done yet"}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

// "How this works" explainer that can be opened and closed.
export function HelpBox({ title = "How this works", open = false, children }: { title?: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details className="ui-help" open={open}>
      <summary>
        <span className="ui-help-icon" aria-hidden="true">?</span>
        {title}
      </summary>
      <div className="ui-help-body">{children}</div>
    </details>
  );
}

export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .replace(/^the\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
  return <span className={`ui-avatar is-${size}`} aria-hidden="true">{initials || "?"}</span>;
}

export function Pill({ tone = "neutral", children }: { tone?: "neutral" | "brand" | "good" | "warn" | "muted"; children: React.ReactNode }) {
  return <span className={`ui-pill is-${tone}`}>{children}</span>;
}

export function Field({ label, hint, htmlFor, children, span }: { label: string; hint?: string; htmlFor: string; children: React.ReactNode; span?: boolean }) {
  return (
    <div className={`form-group${span ? " pt-span-2" : ""}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {hint && <span className="ui-hint">{hint}</span>}
    </div>
  );
}
