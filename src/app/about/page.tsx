import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { company } from "@/data/company";

export const metadata: Metadata = buildMetadata({
  title: "About RetailPOS.biz — Retail Software by CrystalPro Technologies",
  description: "RetailPOS.biz is a retail ERP, POS and AI platform by CrystalPro Technologies, a software company delivering solutions since 2012, headquartered in Coimbatore, India.",
  path: "/about",
});

const principles = [
  { icon: "Zap", title: "The counter comes first", text: "Billing speed and continuity are non-negotiable; everything else is built behind a counter that never stops." },
  { icon: "Boxes", title: "One source of truth", text: "Items, customers, stock and ledgers live once. Modules share data instead of syncing copies of it." },
  { icon: "ShieldCheck", title: "Truth over marketing", text: "We publish what the product does — no invented statistics, fake testimonials or claimed certifications." },
  { icon: "Sparkles", title: "AI that recommends, never rules", text: "AI drafts orders, flags anomalies and suggests prices; a human approves every action. Always." },
  { icon: "Route", title: "Grow without migrating", text: "The same platform serves a first store and a chain — growth is configuration, not re-implementation." },
  { icon: "Braces", title: "Open by design", text: "REST APIs and webhooks, because your retail system should connect to your world, not trap your data." },
];

export default function AboutPage() {
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            Retail software, built the way stores actually work
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            RetailPOS.biz is the retail platform of {company.parent}, a software company
            headquartered in {company.headquarters}, delivering software solutions since {company.foundedYear},
            with offices in India, Singapore, Malaysia and Bahrain.
          </p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="What we build"
          title="One platform from the billing counter up"
          description="RetailPOS combines POS billing with retail ERP — inventory, purchasing, CRM, loyalty, accounting and analytics — and adds AI that recommends actions for human approval. It serves single stores, multi-store chains, franchises and enterprise retail across India and Southeast Asia."
        />
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <SectionHeading eyebrow="How we work" title="Product principles we hold ourselves to" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <li key={p.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
              <Icon name={p.icon} className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="white" className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Data responsibility"
          title="Your sales data is your business"
          description="Access is role-based, consequential actions are logged with user and timestamp, and offline billing protects the counter from connectivity failures. We treat protecting business data as a product feature — and we describe our security architecture in those concrete terms rather than borrowed badges."
        />
      </Section>
      <LandingCTA heading="See what we've built — on your own products" />
    </>
  );
}
