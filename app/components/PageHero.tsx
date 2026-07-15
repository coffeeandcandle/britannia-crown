type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="page-hero-inner">
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-line"></span>
          <span className="hero-eyebrow-text">{eyebrow}</span>
        </div>
        <h1>{title}</h1>
        {subtitle && <p className="page-hero-desc">{subtitle}</p>}
      </div>
    </section>
  );
}
