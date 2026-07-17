import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { caseStudies, getCaseStudy } from "@/data/case-studies";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { LandingCTA } from "@/components/landing/LandingCTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const path = `/case-studies/${slug}`;

  if (!study) {
    return buildMetadataWithCms(path, {
      title: "RetailPOS Case Study",
      description: "RetailPOS.biz case study scenario for retail POS, ERP, inventory and store operations.",
      path,
      noIndex: true,
    });
  }

  return buildMetadataWithCms(path, {
    title: `${study.title} Case Study | RetailPOS.biz`,
    description: `${study.summary} Learn how RetailPOS.biz supports ${study.businessType.toLowerCase()} with POS, inventory, reporting and retail ERP workflows.`,
    path,
  });
}

function caseStudyJsonLd(study: NonNullable<ReturnType<typeof getCaseStudy>>) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.title} Case Study`,
    headline: `${study.title} Case Study`,
    genre: "Case study",
    description: study.summary,
    url: `${siteConfig.url}/case-studies/${study.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: study.modules.map((module) => ({ "@type": "Thing", name: module })),
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const path = `/case-studies/${study.slug}`;
  const related = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={caseStudyJsonLd(study)} />
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Case Studies", path: "/case-studies" },
              { name: study.title, path },
            ]}
          />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{study.businessType}</Badge>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Anonymous scenario</span>
          </div>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr,0.72fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-display-md font-bold text-ink sm:text-display-lg">
                {study.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">{study.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/book-demo" size="lg">Book a Free Demo</ButtonLink>
                <ButtonLink href="/case-studies" variant="ghost" size="lg">All Case Studies</ButtonLink>
              </div>
            </div>
            <aside className="rounded-lg border border-line bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-brand-50 text-brand-600">
                  <Icon name={study.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Scenario type</p>
                  <p className="text-sm text-ink-muted">{study.businessType}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Client names, logos and quantified results are intentionally omitted unless approved for publication.
              </p>
            </aside>
          </div>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            { eyebrow: "Challenge", title: "Operational issue", text: study.challenge },
            { eyebrow: "RetailPOS solution", title: "Connected workflow", text: study.solution },
            { eyebrow: "Result summary", title: "Qualitative outcome", text: study.result },
          ].map((item) => (
            <article key={item.eyebrow} className="rounded-lg border border-line bg-white p-6 shadow-card">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">{item.eyebrow}</p>
              <h2 className="mt-3 font-display text-xl font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr,1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="RetailPOS setup"
            title="Modules usually reviewed in this scenario"
            description="The exact rollout depends on store size, current tools, integrations and training needs."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {study.modules.map((module) => (
              <div key={module} className="rounded-lg border border-line bg-white p-5 shadow-card">
                <Icon name="PackageCheck" className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink">{module}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="white" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr,1fr] lg:items-start">
          <SectionHeading
            eyebrow="Rollout focus"
            title="What a demo should validate"
            description="These are the practical checks a team can walk through before deciding whether RetailPOS fits the operation."
          />
          <ul className="space-y-3">
            {study.rolloutFocus.map((item) => (
              <li key={item} className="flex gap-3 rounded-lg border border-line bg-paper px-4 py-3">
                <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
                <span className="text-sm leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <SectionHeading
          eyebrow="Related scenarios"
          title="Explore more retail use cases"
          description="Compare this workflow with other business types before booking a walkthrough."
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/case-studies/${item.slug}`}
                className="group block h-full rounded-lg border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised"
              >
                <Icon name={item.icon} className="h-5 w-5 text-brand-600" />
                <h3 className="mt-3 text-sm font-semibold text-ink group-hover:text-brand-700">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CmsSeoEnhancements path={path} />
      <LandingCTA heading={`See the ${study.businessType.toLowerCase()} workflow in a demo`} />
    </>
  );
}
