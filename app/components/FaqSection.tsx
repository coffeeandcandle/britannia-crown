import JsonLd from "./JsonLd";
import Reveal from "./Reveal";
import { faqSchema, type Faq } from "../lib/schema";

export default function FaqSection({ faqs, tone = "cream" }: { faqs: Faq[]; tone?: "cream" | "white" }) {
  return (
    <section className={`uk-section ${tone}`} id="faqs">
      <div className="uk-wrap uk-split">
        <Reveal>
          <h2 className="uk-h2">Common questions</h2>
        </Reveal>
        <Reveal>
          <div className="uk-faqs">
            {faqs.map((f, i) => (
              <details className="uk-faq" key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
