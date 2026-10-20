type PageHeroProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
};

export default function PageHero({ title, subtitle, children }: PageHeroProps) {
  return (
    <section className="uk-sub-hero">
      <div className="uk-wrap">
        {children}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
