import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ExecutiveControlMockup,
  ModuleWorkflowMockup,
  ProductWorkspaceMockup,
} from "@/components/product-ui/SaasMockups";
import { resolveRelated } from "@/lib/landing-pages/helpers";
import type { LandingFeature, LandingPage, LandingStep } from "@/lib/landing-pages/types";
import { landingProfileFor } from "@/lib/landing-pages/variants";

function featureHighlights(page: LandingPage): LandingFeature[] {
  if (page.features?.length) return page.features.slice(0, 3);
  if (page.workflow?.length) {
    return page.workflow.slice(0, 3).map((step) => ({
      icon: "Workflow",
      title: step.title,
      description: step.description,
    }));
  }
  return (page.benefits ?? []).slice(0, 3).map((benefit) => ({
    icon: "ShieldCheck",
    title: benefit,
    description: page.name,
  }));
}

function workflowItems(page: LandingPage): LandingStep[] {
  if (page.workflow?.length) return page.workflow.slice(0, 4);
  if (page.features?.length) {
    return page.features.slice(0, 4).map((feature) => ({
      title: feature.title,
      description: feature.description,
    }));
  }
  return (page.benefits ?? []).slice(0, 4).map((benefit) => ({
    title: benefit,
    description: page.intro,
  }));
}

function ProductStory({ page }: { page: LandingPage }) {
  const highlights = featureHighlights(page);

  return (
    <Section tone="paper" className="py-12 sm:py-16" aria-labelledby="family-product-story">
      <div className="grid gap-10 lg:grid-cols-[0.86fr,1.14fr] lg:items-center">
        <div>
          <SectionHeading
            id="family-product-story"
            eyebrow="Software view"
            title={`${page.name} as a working product surface`}
            description="This page leads with the actual operating surface: the screens, controls and connected data the team uses in daily retail work."
          />
          <ul className="mt-7 space-y-3">
            {highlights.map((item) => (
              <li key={item.title} className="group flex gap-3 rounded-lg border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-raised">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-600">
                  <Icon name={item.icon} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <ProductWorkspaceMockup slug={page.slug} />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            Illustrative RetailPOS interface
          </p>
        </div>
      </div>
    </Section>
  );
}

function ModuleStory({ page }: { page: LandingPage }) {
  const steps = workflowItems(page);

  return (
    <Section tone="white" className="py-12 sm:py-16" aria-labelledby="family-module-story">
      <div className="grid gap-8 lg:grid-cols-[0.82fr,1.18fr] lg:items-start">
        <div>
          <SectionHeading
            id="family-module-story"
            eyebrow="Workflow map"
            title={`${page.name} is a controlled operating flow`}
            description="Module pages focus on handoffs: who starts the work, what the system records, where approvals happen and which downstream modules update automatically."
          />
          <ol className="mt-7 space-y-3">
            {steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto,1fr] gap-3 rounded-lg border border-line bg-paper p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded bg-white font-mono text-xs font-semibold text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{step.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="min-w-0 lg:pt-2">
          <ModuleWorkflowMockup slug={page.slug} />
        </div>
      </div>
    </Section>
  );
}

function IndustryStory({ page }: { page: LandingPage }) {
  const problems = page.problems?.slice(0, 3) ?? [];
  const scenarios = page.useCases?.slice(0, 2) ?? [];
  const related = resolveRelated(page).slice(0, 3);
  const operatingRows = problems.length
    ? problems.map((item) => ({ from: item.problem, to: item.solution }))
    : featureHighlights(page).map((item) => ({ from: item.title, to: item.description }));

  return (
    <Section tone="paper" className="py-12 sm:py-16" aria-labelledby="family-industry-story">
      <div className="grid gap-10 lg:grid-cols-[1fr,1fr] lg:items-start">
        <div>
          <SectionHeading
            id="family-industry-story"
            eyebrow="Industry operating model"
            title={`RetailPOS shaped around ${page.name.toLowerCase()} work`}
            description="Industry pages start with the store reality: counter speed, stock behaviour, compliance needs and the specific workflows that make this vertical different."
          />
          {scenarios.length ? (
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {scenarios.map((scenario) => (
                <li key={scenario.title} className="rounded-lg border border-line bg-white p-4 shadow-card">
                  <h3 className="text-sm font-semibold text-ink">{scenario.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{scenario.description}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
            Challenge to operating control
          </p>
          <ul className="mt-4 space-y-4">
            {operatingRows.map((item) => (
              <li key={item.from} className="grid gap-3 rounded-lg border border-line bg-paper p-4 sm:grid-cols-[1fr,auto,1fr] sm:items-center">
                <p className="text-sm font-medium text-ink">{item.from}</p>
                <Icon name="ArrowLeftRight" className="hidden h-4 w-4 text-line sm:block" />
                <p className="text-sm leading-relaxed text-ledger-600">{item.to}</p>
              </li>
            ))}
          </ul>
          {related.length ? (
            <div className="mt-5 border-t border-line pt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Connected pages</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-700 transition hover:border-brand-400 hover:bg-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

function SolutionStory({ page }: { page: LandingPage }) {
  const problems = page.problems?.slice(0, 3) ?? [];
  const steps = workflowItems(page).slice(0, 3);
  const outcomes = (
    page.benefits ??
    page.problems?.map((problem) => problem.solution) ??
    page.features?.map((feature) => feature.description) ??
    steps.map((step) => step.description)
  ).slice(0, 4);

  return (
    <Section tone="white" className="py-12 sm:py-16" aria-labelledby="family-solution-story">
      <div className="grid gap-10 lg:grid-cols-[0.95fr,1.05fr] lg:items-center">
        <div className="min-w-0">
          <ExecutiveControlMockup slug={page.slug} />
        </div>
        <div>
          <SectionHeading
            id="family-solution-story"
            eyebrow="Transformation path"
            title={`${page.name}: from scattered work to one operating model`}
            description="Solution pages frame the platform as a rollout story: what is risky before adoption, how the work moves into RetailPOS and what becomes easier to govern."
          />
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-paper p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">Before</p>
              <ul className="mt-3 space-y-2">
                {(problems.length ? problems.map((problem) => problem.problem) : steps.map((step) => step.title)).map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <Icon name="PackageX" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-line bg-paper p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">After</p>
              <ul className="mt-3 space-y-2">
                {outcomes.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink">
                    <Icon name="PackageCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function LandingFamilyStory({ page }: { page: LandingPage }) {
  const profile = landingProfileFor(page);

  if (profile.variant === "product") return <ProductStory page={page} />;
  if (profile.variant === "module") return <ModuleStory page={page} />;
  if (profile.variant === "industry") return <IndustryStory page={page} />;
  return <SolutionStory page={page} />;
}
