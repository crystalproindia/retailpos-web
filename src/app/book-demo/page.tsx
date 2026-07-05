import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { LeadForm } from "@/components/forms/LeadForm";
import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/types/content";

export const metadata: Metadata = buildMetadata({
  title: "Book a Free Demo — See RetailPOS on Your Own Products",
  description: "Book a free 30-minute RetailPOS demo: your items, your industry's workflows and straight answers on scope and pricing. No obligation.",
  path: "/book-demo",
});

const expectations = [
  { icon: "CalendarCheck", title: "30 focused minutes", text: "A working session with a retail consultant, not a slideshow." },
  { icon: "Boxes", title: "Your products on screen", text: "We load a sample of your items so billing and stock feel real." },
  { icon: "Route", title: "Your workflows", text: "Batch, matrix, serials or tables — we demo your vertical's flow." },
  { icon: "Tag", title: "Straight pricing talk", text: "Scope and commercials discussed openly before you leave the call." },
];

const demoFaqs: Faq[] = [
  { question: "Is the demo really free and without obligation?", answer: "Yes. It's a working session to see whether RetailPOS fits your operation. There's no charge and no commitment attached." },
  { question: "What should I prepare?", answer: "Nothing is required. If you can share a sample item list or describe your store count and current tools, we'll tailor the session — otherwise we start from your industry's defaults." },
  { question: "Who should join from my side?", answer: "Whoever runs the operation day to day — typically the owner, plus a store or accounts person if billing and books are handled separately." },
];

export default function BookDemoPage() {
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Book a Demo", path: "/book-demo" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            Book a free RetailPOS demo
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Thirty minutes, your items on screen, your questions answered. We&apos;ll walk your daily
            workflows and give you clear next steps — whether or not RetailPOS is the right fit.
          </p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.3fr] lg:items-start">
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink">What to expect</h2>
            <ul className="mt-6 space-y-5">
              {expectations.map((e) => (
                <li key={e.title} className="flex gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-600">
                    <Icon name={e.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{e.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{e.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-paper p-6 sm:p-8">
            <LeadForm />
          </div>
        </div>
      </Section>
      <Section tone="paper" aria-labelledby="demo-faq" className="py-12 sm:py-16">
        <JsonLd data={faqJsonLd(demoFaqs)} />
        <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr]">
          <h2 id="demo-faq" className="font-display text-display-sm font-semibold text-ink">
            Before you book
          </h2>
          <Accordion items={demoFaqs} />
        </div>
      </Section>
    </>
  );
}
