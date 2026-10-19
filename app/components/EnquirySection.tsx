import Link from "next/link";
import EnquiryForm from "./EnquiryForm";
import { WHATSAPP_URL } from "../lib/site";

type Props = {
  title: React.ReactNode;
  lead: string;
  source: string;
  defaultService: string;
  context?: string;
};

export default function EnquirySection({ title, lead, source, defaultService, context }: Props) {
  return (
    <section className="uk-enquire" id="enquire">
      <div className="uk-wrap uk-enquire-grid">
        <div>
          <span className="uk-kicker">Free consultation</span>
          <h2 className="uk-h2">{title}</h2>
          <p className="uk-lead">{lead}</p>
          <ul className="uk-ticks">
            <li>A reply from an education consultant within 24 hours</li>
            <li>A free, no-obligation 30-minute consultation</li>
            <li>UK-trained educators, personally matched to your child</li>
          </ul>
          <p className="uk-enquire-alt">
            Prefer to talk now? <Link href="/book-consultation">Book a call</Link> or <a href={WHATSAPP_URL}>message us on WhatsApp</a>.
          </p>
        </div>
        <div className="enq-card">
          <EnquiryForm source={source} defaultService={defaultService} context={context} compact />
        </div>
      </div>
    </section>
  );
}
