import type { Metadata } from "next";
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
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsContentSections } from "@/components/cms/CmsContentSections";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { LeadForm } from "@/components/forms/LeadForm";
import { Icon } from "@/components/ui/Icon";
import { TrustMetrics } from "@/components/trust/TrustMetrics";
import { ClientLogoWall } from "@/components/trust/ClientLogoWall";
import type { Faq } from "@/types/content";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/book-demo", {
    title: "Book a Free Demo — See RetailPOS on Your Own Products",
    description:
      "Book a free 30-minute RetailPOS demo: your items, your industry's workflows and straight answers on scope and pricing. No obligation.",
    path: "/book-demo",
  });
}

const expectations = [
  { icon: "CalendarCheck", title: "30-minute walkthrough", text: "A focused working session with a retail consultant, not a generic slideshow." },
  { icon: "MonitorSmartphone", title: "Live software", text: "See billing, stock, purchase, reporting and approvals in the product interface." },
  { icon: "CircleHelp", title: "Questions answered", text: "Ask about workflows, implementation, integrations, support, training and pricing scope." },
  { icon: "ShieldCheck", title: "No obligation", text: "Leave with clear next steps only if the fit is right for your operation." },
];

const demoSteps = [
  { title: "Share context", text: "Stores, counters, current tools and the workflows you want to improve." },
  { title: "Walk through the product", text: "Run the relevant POS, inventory, purchase, warehouse, CRM and reporting screens." },
  { title: "Discuss scope", text: "Clarify modules, deployment, migration, training, support and commercial assumptions." },
  { title: "Decide next step", text: "Continue to a proposal, schedule a deeper session or pause with no commitment." },
];

const demoFaqs: Faq[] = [
  { question: "Is the demo really free and without obligation?", answer: "Yes. It's a working session to see whether RetailPOS fits your operation. There's no charge and no commitment attached." },
  { question: "Will I see live software or only slides?", answer: "The session is built around the RetailPOS software interface. We may use a short explanation for context, but the purpose is to show how workflows behave in the product." },
  { question: "What should I prepare?", answer: "Nothing is required. If you can share a sample item list or describe your store count and current tools, we'll tailor the session — otherwise we start from your industry's defaults." },
  { question: "Who should join from my side?", answer: "Whoever runs the operation day to day — typically the owner, plus a store or accounts person if billing and books are handled separately." },
  { question: "Can we discuss pricing during the demo?", answer: "Yes. Pricing depends on stores, modules, rollout scope, implementation, training and support. The demo helps make that scope clear before a proposal." },
];

export default async function BookDemoPage() {
  const contentPage = await getCmsContentPageForRoute("/book-demo", "book-demo");
  const cmsSections = cmsContentSections(contentPage);
  const hero = cmsHeroContent(firstCmsSection(cmsSections, "hero"));
  const faqSection = firstCmsSection(cmsSections, "faq");
  const bodySections = cmsSectionsExcept(cmsSections, ["hero", "faq"]);

  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Book a Demo", path: "/book-demo" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            {hero?.title ?? "Book a free RetailPOS demo"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {hero?.subtitle ??
              "Thirty minutes, your items on screen, your questions answered. We'll walk your daily workflows and give you clear next steps — whether or not RetailPOS is the right fit."}
          </p>
        </Container>
      </div>
      <TrustMetrics
        compact
        eyebrow="Demo confidence"
        title="A walkthrough backed by real implementation experience"
        description="The session focuses on the flows your team will actually run: billing, stock, purchase, accounting, reporting and support expectations."
      />
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.3fr] lg:items-start">
          <div>
            <h2 className="font-display text-display-sm font-semibold text-ink">What happens during the demo</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              The goal is to test fit quickly: see the live product, ask practical questions and leave with a clear sense of scope.
            </p>
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
            <ol className="mt-8 grid gap-2">
              {demoSteps.map((step, index) => (
                <li key={step.title} className="rounded-lg border border-line bg-paper px-4 py-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 font-mono text-xs text-brand-600">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-line bg-paper p-6 sm:p-8">
            <LeadForm
              source="book_demo"
              submitLabel="Book a Free Demo"
              successMessage="Our retail consultants will reach out shortly to schedule your demo."
            />
          </div>
        </div>
      </Section>
      <ClientLogoWall
        compact
        tone="paper"
        eyebrow="Social proof"
        title="Seen by teams with real operating needs"
        description="Use the demo to test whether RetailPOS.biz fits your business before discussing scope or commercials."
      />
      {faqSection ? (
        <CmsContentSections sections={[faqSection]} />
      ) : (
        <Section tone="paper" aria-labelledby="demo-faq" className="py-12 sm:py-16">
          <JsonLd data={faqJsonLd(demoFaqs)} />
          <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr]">
            <h2 id="demo-faq" className="font-display text-display-sm font-semibold text-ink">
              Before you book
            </h2>
            <Accordion items={demoFaqs} />
          </div>
        </Section>
      )}
      <CmsContentSections sections={bodySections} />
      <CmsSeoEnhancements path="/book-demo" />
    </>
  );
}
