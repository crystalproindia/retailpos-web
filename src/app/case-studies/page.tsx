import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import type { CaseStudy } from "@/data/case-studies";
import { getCaseStudiesWithFallback } from "@/lib/cms-case-studies";
import { siteConfig } from "@/config/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { LandingCTA } from "@/components/landing/LandingCTA";

const pageTitle = "Retail POS Case Studies | RetailPOS.biz";
const pageDescription =
  "Explore how RetailPOS.biz helps retail businesses improve billing, inventory, reporting, customer management, and multi-store operations with AI-powered retail ERP and POS software.";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/case-studies", {
    title: pageTitle,
    description: pageDescription,
    path: "/case-studies",
  });
}

function caseStudiesJsonLd(studies: CaseStudy[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
    url: `${siteConfig.url}/case-studies`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: studies.map((study, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: study.title,
        url: `${siteConfig.url}/case-studies/${study.slug}`,
      })),
    },
  };
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudiesWithFallback();

  return (
    <>
      <JsonLd data={caseStudiesJsonLd(studies)} />
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }]} />
          <div className="grid gap-8 lg:grid-cols-[1fr,0.72fr] lg:items-end">
            <div>
              <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                Case studies
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
                Retail operations improved with clearer POS and ERP workflows
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Explore anonymous retail scenarios that show how RetailPOS.biz supports billing, inventory,
                reporting, customer management and multi-store control. We do not publish client names or measured
                results unless they are approved.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/book-demo" size="lg">Book a Free Demo</ButtonLink>
                <ButtonLink href="/contact" variant="ghost" size="lg">Talk to Sales</ButtonLink>
              </div>
            </div>
            <aside className="rounded-lg border border-line bg-white p-5 shadow-card">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                Evidence standard
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                These pages describe common retail operating patterns. Client-specific names, logos and numerical
                outcomes are only published with approval.
              </p>
            </aside>
          </div>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Retail scenarios"
          title="Case study examples by business type"
          description="Each example keeps the discussion practical: the business type, the operational challenge, the RetailPOS setup and the type of improvement a team can evaluate in a demo."
        />
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {studies.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded bg-brand-50 text-brand-600">
                    <Icon name={study.icon} className="h-5 w-5" />
                  </span>
                  <Badge tone="neutral">{study.clientName ?? study.businessType}</Badge>
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold leading-snug text-ink group-hover:text-brand-700">
                  {study.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{study.summary}</p>
                {study.location ? <p className="mt-2 text-xs font-medium text-ink-muted">{study.location}</p> : null}
                <dl className="mt-5 grid gap-4 text-sm">
                  <div>
                    <dt className="font-semibold text-ink">Challenge</dt>
                    <dd className="mt-1 leading-relaxed text-ink-muted">{study.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">RetailPOS solution</dt>
                    <dd className="mt-1 leading-relaxed text-ink-muted">{study.solution}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-ink">Result summary</dt>
                    <dd className="mt-1 leading-relaxed text-ink-muted">{study.result}</dd>
                  </div>
                </dl>
                <span className="mt-6 inline-flex text-sm font-medium text-brand-600 group-hover:underline">
                  View scenario
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.82fr,1.18fr] lg:items-start">
          <SectionHeading
            eyebrow="Demo preparation"
            title="Turn a case study into your own walkthrough"
            description="A demo is most useful when it follows your store format, item structure and reporting questions."
          />
          <ul className="grid gap-3 sm:grid-cols-3">
            {["Business type", "Current challenge", "Modules to review"].map((item) => (
              <li key={item} className="rounded-lg border border-line bg-white p-5 shadow-card">
                <Icon name="ShieldCheck" className="h-5 w-5 text-ledger-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink">{item}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  Share this before the call so the walkthrough stays close to your real operation.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <CmsSeoEnhancements path="/case-studies" />
      <LandingCTA heading="See the workflow for your retail business" />
    </>
  );
}
