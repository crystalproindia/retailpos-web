import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { getCmsContentPageForRoute } from "@/lib/cms-content-loader";
import {
  cmsContentSections,
  cmsHeroContent,
  cmsSectionsExcept,
  firstCmsSection,
} from "@/lib/cms-content-editor";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsContentSections } from "@/components/cms/CmsContentSections";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { ButtonLink } from "@/components/ui/Button";
import { TalkToSalesButton } from "@/components/forms/TalkToSalesModal";
import { Icon } from "@/components/ui/Icon";
import { TrustMetrics } from "@/components/trust/TrustMetrics";
import { ClientLogoWall } from "@/components/trust/ClientLogoWall";
import { LeadForm } from "@/components/forms/LeadForm";
import type { Faq } from "@/types/content";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/pricing", {
    title: "RetailPOS Pricing — Built Around Your Stores, Modules & Scope",
    description:
      "RetailPOS pricing depends on store count, modules, integrations and implementation scope. See what shapes your quote and request pricing for your setup.",
    path: "/pricing",
  });
}

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

const pricingPrinciples = [
  { icon: "Scale", title: "Scope before number", text: "We price the stores, counters, modules and rollout you actually need instead of pushing a generic bundle." },
  { icon: "Route", title: "Services made visible", text: "Deployment, implementation, migration, training and support are discussed as separate parts of the proposal." },
  { icon: "ChartColumnIncreasing", title: "ROI stays practical", text: "The conversation connects cost to stock accuracy, reporting time, downtime risk and rollout control." },
];

const quotePath = [
  { icon: "MessageCircle", title: "Understand the operation", text: "Stores, counters, current tools, billing flow and the modules you actually need." },
  { icon: "Workflow", title: "Map the rollout", text: "Implementation scope, data migration, hardware, integrations and training responsibilities." },
  { icon: "ScrollText", title: "Prepare the proposal", text: "Software, services, support and deployment terms itemised before commitment." },
  { icon: "Rocket", title: "Plan the start", text: "A practical onboarding path for the first store, first module or full network rollout." },
];

const roiQuestions = [
  "Where does stock accuracy currently cost time or margin?",
  "Which reports are rebuilt manually from spreadsheets?",
  "How much counter downtime is acceptable during connectivity issues?",
  "Which workflows should be controlled before adding more stores?",
];

const comparisonRows = [
  { topic: "Pricing model", generic: "Public tiers that assume one buying pattern", retailpos: "Scoped quote based on stores, counters, modules and rollout depth" },
  { topic: "Deployment", generic: "Standard setup with limited operational context", retailpos: "Deployment requirements reviewed before proposal" },
  { topic: "Implementation", generic: "Onboarding treated as a separate afterthought", retailpos: "Migration, hardware, configuration and responsibilities included in planning" },
  { topic: "Training", generic: "Self-serve documentation as the main path", retailpos: "Store, back-office and management users considered during rollout scope" },
  { topic: "Support", generic: "Support level discovered after purchase", retailpos: "Support expectation discussed before commitment" },
  { topic: "ROI review", generic: "Feature comparison first", retailpos: "Operational value, reporting effort and stock control discussed alongside price" },
];

const pricingFaqs: Faq[] = [
  { question: "Why isn't there a public price list?", answer: "Because honest retail pricing depends on scope. A single-counter kirana and a 30-store chain with warehouse and integrations are different projects, and a flat tier would overcharge one or underserve the other. We quote your configuration specifically." },
  { question: "Is there a free trial?", answer: "Demos are free and hands-on with your own item sample. Trial arrangements are discussed during the pricing conversation based on your scenario." },
  { question: "Are there hidden costs later?", answer: "The quotation itemises software, implementation, training and support so you can see each component. Changes in scope — new stores or modules — are priced the same transparent way." },
];

export default async function PricingPage() {
  const contentPage = await getCmsContentPageForRoute("/pricing", "pricing");
  const cmsSections = cmsContentSections(contentPage);
  const hero = cmsHeroContent(firstCmsSection(cmsSections, "hero"));
  const faqSection = firstCmsSection(cmsSections, "faq");
  const bodySections = cmsSectionsExcept(cmsSections, ["hero", "faq"]);

  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }]} />
          <div className="grid gap-8 lg:grid-cols-[1fr,0.72fr] lg:items-end">
            <div>
              <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                Commercial experience
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
                {hero?.title ?? "Pricing built around your operation"}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                {hero?.subtitle ??
                  "RetailPOS is priced on what you actually run — stores, modules, integrations and implementation scope — not a one-size tier. Here's what shapes a quote, and how to get yours."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/book-demo" size="lg">Request Pricing in a Demo</ButtonLink>
                <TalkToSalesButton trigger="pricing_page" variant="ghost" size="lg">Talk to Sales</TalkToSalesButton>
              </div>
            </div>
            <aside className="rounded-lg border border-line bg-white p-5 shadow-card">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                Quote brief
              </p>
              <dl className="mt-4 space-y-3">
                {["Stores and counters", "Modules and workflows", "Integrations and data", "Implementation and support"].map((item) => (
                  <div key={item} className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-b-0 last:pb-0">
                    <dt className="text-sm text-ink-muted">{item}</dt>
                    <dd className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand-700">
                      Scoped
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Container>
      </div>
      <TrustMetrics
        compact
        eyebrow="Commercial confidence"
        title="A pricing conversation backed by implementation experience"
        description="The quote is shaped around store reality: modules, rollout scope, training, support and the operational return expected from the platform."
      />
      <Section tone="paper" className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Pricing philosophy"
          title="A scoped proposal you can defend internally"
          description="RetailPOS.biz pricing is built around deployment reality: what should run now, what can wait, what support the team needs and what operational return makes the rollout worthwhile."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {pricingPrinciples.map((principle) => (
            <li key={principle.title} className="rounded-lg border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised">
              <Icon name={principle.icon} className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{principle.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{principle.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="white" className="py-12 sm:py-16">
        <SectionHeading eyebrow="What shapes your quote" title="Six factors that set the number" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((f) => (
            <li key={f.title} className="rounded-lg border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised">
              <Icon name={f.icon} className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.86fr,1.14fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="How quotes are assembled" title="A commercial path with scope before price" />
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              Prefer email? Reach sales via the <Link href="/contact" className="font-medium text-brand-600 hover:underline">contact page</Link>.
            </p>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {quotePath.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised">
                <div className="flex items-center justify-between gap-3">
                  <Icon name={step.icon} className="h-5 w-5 text-brand-600" />
                  <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 text-sm font-semibold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
      <Section tone="white" className="py-12 sm:py-16" aria-labelledby="pricing-comparison">
        <SectionHeading
          id="pricing-comparison"
          eyebrow="Comparison"
          title="What changes when pricing is scoped"
          description="The goal is not to hide the number. It is to make sure the number matches the deployment, support and training responsibility behind it."
        />
        <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white shadow-card">
          <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
            <thead className="bg-paper text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="w-1/5 px-4 py-3 font-semibold">Decision area</th>
                <th scope="col" className="w-2/5 px-4 py-3 font-semibold">Generic tiered software</th>
                <th scope="col" className="w-2/5 px-4 py-3 font-semibold">RetailPOS scoped proposal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {comparisonRows.map((row) => (
                <tr key={row.topic} className="align-top">
                  <th scope="row" className="px-4 py-4 font-semibold text-ink">{row.topic}</th>
                  <td className="px-4 py-4 leading-relaxed text-ink-muted">{row.generic}</td>
                  <td className="px-4 py-4 leading-relaxed text-ink">{row.retailpos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:items-start">
          <div>
            <SectionHeading eyebrow="What you receive" title="A proposal you can evaluate internally" />
            <ul className="mt-8 grid gap-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3 shadow-card">
                  <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
                  <span className="text-sm leading-relaxed text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-line bg-paper p-5">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
              ROI questions
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Pricing should be judged against operational change, not only license cost. These are the questions we use to keep the conversation practical.
            </p>
            <ul className="mt-5 space-y-3">
              {roiQuestions.map((question) => (
                <li key={question} className="flex gap-3 text-sm text-ink">
                  <Icon name="CircleHelp" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <ClientLogoWall
        compact
        tone="paper"
        eyebrow="Buyer confidence"
        title="Proof points before a scoped proposal"
        description="RetailPOS.biz is evaluated by teams who need software that feels clear at the counter and controlled at head office."
      />
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.82fr,1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="Request pricing"
            title="Get a scoped pricing conversation"
            description="Share your store count, business type and rollout needs. We route pricing enquiries to the Command Center CRM so the team can respond with context."
          />
          <div className="rounded-lg border border-line bg-paper p-6 shadow-card sm:p-8">
            <LeadForm
              source="pricing_enquiry"
              submitLabel="Request Pricing"
              successTitle="Pricing enquiry received"
              successMessage="Our sales team will review your scope and follow up with the right pricing conversation."
            />
          </div>
        </div>
      </Section>
      {faqSection ? (
        <CmsContentSections sections={[faqSection]} />
      ) : (
        <Section tone="white" aria-labelledby="pricing-faq" className="py-12 sm:py-16">
          <JsonLd data={faqJsonLd(pricingFaqs)} />
          <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr]">
            <h2 id="pricing-faq" className="font-display text-display-sm font-semibold text-ink">
              Pricing questions
            </h2>
            <Accordion items={pricingFaqs} />
          </div>
        </Section>
      )}
      <CmsContentSections sections={bodySections} />
      <CmsSeoEnhancements path="/pricing" />
    </>
  );
}
