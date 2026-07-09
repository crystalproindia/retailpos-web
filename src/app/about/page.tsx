import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LandingCTA } from "@/components/landing/LandingCTA";
import { ClientLogoWall } from "@/components/trust/ClientLogoWall";
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

const timeline = [
  {
    marker: String(company.foundedYear),
    title: `${company.parent} begins delivering software solutions`,
    text: `RetailPOS.biz comes from a software company headquartered in ${company.headquarters}, with product work grounded in real operational systems.`,
  },
  {
    marker: "RetailPOS",
    title: "Retail workflows become the product focus",
    text: "POS billing, inventory, purchasing, CRM, loyalty, accounting and analytics are shaped into one retail-native platform.",
  },
  {
    marker: "AI + APIs",
    title: "The platform direction becomes more connected",
    text: "AI recommendations, REST APIs and webhooks extend the product while keeping human approval and data ownership clear.",
  },
  {
    marker: "Presence",
    title: "Regional offices support growing retail markets",
    text: `CrystalPro lists offices in ${company.offices.join(", ")}.`,
  },
];

const roadmapThemes = [
  { icon: "Sparkles", title: "Decision support", text: "Deeper forecasting, anomaly detection and recommendation workflows that still require human approval." },
  { icon: "Braces", title: "Connected retail stack", text: "More API and webhook-led integrations for e-commerce, payments, finance and analytics systems." },
  { icon: "Workflow", title: "Operational automation", text: "Less repeated admin around reordering, posting, scheduled reports and controlled approvals." },
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
      <ClientLogoWall compact />
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.82fr,1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="RetailPOS journey"
            title="From software delivery to a retail operating platform"
            description="RetailPOS combines POS billing with retail ERP — inventory, purchasing, CRM, loyalty, accounting and analytics — and adds AI that recommends actions for human approval."
          />
          <ol className="relative space-y-4 before:absolute before:bottom-3 before:left-4 before:top-3 before:w-px before:bg-line">
            {timeline.map((item) => (
              <li key={item.title} className="relative grid grid-cols-[2rem,1fr] gap-4">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded bg-brand-600 text-white">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <div className="rounded-lg border border-line bg-white p-5 shadow-card">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-brand-600">{item.marker}</p>
                  <h3 className="mt-2 text-sm font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
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
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-start">
          <SectionHeading
            eyebrow="Mission and vision"
            title="Build retail software that makes daily work clearer"
            description="The product direction is simple: keep the counter fast, keep business data connected, and give owners better control without making store teams fight the system."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-lg border border-line bg-paper p-5">
              <h3 className="text-sm font-semibold text-ink">Mission</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Make retail operations easier to run by connecting billing, stock, purchasing, customers, accounting and analytics in one product.
              </p>
            </div>
            <div className="rounded-lg border border-line bg-paper p-5">
              <h3 className="text-sm font-semibold text-ink">Vision</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                Give retailers a modern SaaS platform that grows from a first counter to a controlled multi-store network.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Future roadmap themes"
          title="What we keep improving"
          description="These are product themes, not invented timelines: more useful intelligence, cleaner integrations and fewer manual handoffs."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {roadmapThemes.map((theme) => (
            <li key={theme.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
              <Icon name={theme.icon} className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{theme.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{theme.text}</p>
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
