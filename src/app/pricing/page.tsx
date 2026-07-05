import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/types/content";

export const metadata: Metadata = buildMetadata({
  title: "RetailPOS Pricing — Built Around Your Stores, Modules & Scope",
  description: "RetailPOS pricing depends on store count, modules, integrations and implementation scope. See what shapes your quote and request pricing for your setup.",
  path: "/pricing",
});

const factors = [
  { icon: "Store", title: "Stores & counters", text: "How many outlets and billing counters run the system." },
  { icon: "Boxes", title: "Modules enabled", text: "POS-only differs from a full ERP with warehouse and HR." },
  { icon: "Braces", title: "Integrations", text: "E-commerce, marketplaces, payments and custom API work." },
  { icon: "Route", title: "Implementation scope", text: "Data migration, hardware setup and training coverage." },
  { icon: "LifeBuoy", title: "Support level", text: "Standard support versus priority or on-site arrangements." },
  { icon: "Building2", title: "Deployment needs", text: "Standard cloud versus enterprise-specific requirements." },
];

const included = [
  "A scoped, itemised quotation for your exact setup",
  "Module recommendations matched to your operation — not the maximum bundle",
  "Implementation and training plan with responsibilities on both sides",
  "Clear commercial terms before any commitment",
];

const pricingFaqs: Faq[] = [
  { question: "Why isn't there a public price list?", answer: "Because honest retail pricing depends on scope. A single-counter kirana and a 30-store chain with warehouse and integrations are different projects, and a flat tier would overcharge one or underserve the other. We quote your configuration specifically." },
  { question: "Is there a free trial?", answer: "Demos are free and hands-on with your own item sample. Trial arrangements are discussed during the pricing conversation based on your scenario." },
  { question: "Are there hidden costs later?", answer: "The quotation itemises software, implementation, training and support so you can see each component. Changes in scope — new stores or modules — are priced the same transparent way." },
];

export default function PricingPage() {
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            Pricing built around your operation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            RetailPOS is priced on what you actually run — stores, modules, integrations and
            implementation scope — not a one-size tier. Here's what shapes a quote, and how to get yours.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink href="/book-demo" size="lg">Request Pricing in a Demo</ButtonLink>
            <ButtonLink href="/contact" variant="ghost" size="lg">Talk to Sales</ButtonLink>
          </div>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <SectionHeading eyebrow="What shapes your quote" title="Six factors that set the number" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((f) => (
            <li key={f.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
              <Icon name={f.icon} className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <SectionHeading eyebrow="The pricing conversation" title="What you'll walk away with" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3">
              <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-muted">
          Prefer email? Reach sales via the <Link href="/contact" className="font-medium text-brand-600 hover:underline">contact page</Link>.
        </p>
      </Section>
      <Section tone="white" aria-labelledby="pricing-faq" className="py-12 sm:py-16">
        <JsonLd data={faqJsonLd(pricingFaqs)} />
        <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr]">
          <h2 id="pricing-faq" className="font-display text-display-sm font-semibold text-ink">
            Pricing questions
          </h2>
          <Accordion items={pricingFaqs} />
        </div>
      </Section>
    </>
  );
}
