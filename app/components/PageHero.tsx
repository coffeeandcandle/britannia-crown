type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

export default function PageHero({ eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="uk-sub-hero">
      <div className="uk-wrap">
        {children}
        <span className="uk-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
