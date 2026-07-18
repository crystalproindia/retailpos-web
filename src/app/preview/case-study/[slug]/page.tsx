import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { PreviewBanner, PreviewUnavailable } from "@/components/cms/PreviewChrome";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudyFromCms } from "@/lib/cms-case-studies";
import { fetchPreviewCaseStudy } from "@/lib/cms";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "CMS Case Study Preview | RetailPOS.biz",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true },
  },
};

type PreviewCaseStudyProps = {
  params: Promise<{ slug: string }>;
};

async function previewToken(): Promise<string> {
  return (await cookies()).get("retailpos_preview_token")?.value.trim() ?? "";
}

export default async function CaseStudyPreview({ params }: PreviewCaseStudyProps) {
  const [{ slug }, token] = await Promise.all([params, previewToken()]);
  if (!token) return <PreviewUnavailable title="Case study preview unavailable" />;

  const previewStudy = await fetchPreviewCaseStudy(slug, token);
  const study = previewStudy ? caseStudyFromCms(previewStudy) : null;
  if (!study) return <PreviewUnavailable title="Case study preview unavailable" />;

  return (
    <>
      <PreviewBanner label={study.title} />
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-8 sm:pb-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="brand">{study.businessType}</Badge>
            <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              {study.clientName ? study.clientName : "Draft case study"}
            </span>
          </div>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr,0.72fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-display-md font-bold text-ink sm:text-display-lg">
                {study.title}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">{study.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/book-demo" size="lg">Book a Free Demo</ButtonLink>
                <ButtonLink href="/case-studies" variant="ghost" size="lg">Public Case Studies</ButtonLink>
              </div>
            </div>
            <aside className="rounded-lg border border-line bg-white p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded bg-brand-50 text-brand-600">
                  <Icon name={study.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">Draft scenario type</p>
                  <p className="text-sm text-ink-muted">{study.businessType}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Preview content is private. Client names, metrics and claims still require approval before publication.
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
      <Container className="pb-12">
        <Link href="/case-studies" className="text-sm font-medium text-brand-600 hover:underline">
          Return to public case studies
        </Link>
      </Container>
    </>
  );
}
