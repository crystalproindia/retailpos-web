import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { LandingFeature, LandingProblem, LandingStep, LandingUseCase } from "@/lib/landing-pages/types";
import type { LandingSectionCopy } from "@/lib/landing-pages/variants";

/** Server-rendered landing sections. Each renders only when data exists. */

export function LandingProblemSolution({
  items,
  name,
  heading,
}: {
  items: LandingProblem[];
  name: string;
  heading?: LandingSectionCopy;
}) {
  return (
    <Section tone="white" aria-labelledby="ls-problems" className="py-12 sm:py-16">
      <SectionHeading
        id="ls-problems"
        eyebrow={heading?.eyebrow ?? "Problems solved"}
        title={heading?.title ?? `What ${name} fixes day to day`}
        description={heading?.description}
      />
      <ul className="mt-8 space-y-4">
        {items.map((p) => (
          <li key={p.problem} className="grid gap-3 rounded-lg border border-line bg-white p-5 shadow-card sm:grid-cols-2 sm:gap-6">
            <div className="flex gap-3">
              <Icon name="PackageX" className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
              <p className="text-sm font-medium text-ink">{p.problem}</p>
            </div>
            <div className="flex gap-3 border-t border-dashed border-line pt-3 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
              <Icon name="PackageCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
              <p className="text-sm leading-relaxed text-ink-muted">{p.solution}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LandingFeatureGrid({
  items,
  name,
  heading,
}: {
  items: LandingFeature[];
  name: string;
  heading?: LandingSectionCopy;
}) {
  return (
    <Section tone="paper" aria-labelledby="ls-features" className="py-12 sm:py-16">
      <SectionHeading
        id="ls-features"
        eyebrow={heading?.eyebrow ?? "Capabilities"}
        title={heading?.title ?? `What ${name} includes`}
        description={heading?.description}
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((f) => (
          <li key={f.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
            <Icon name={f.icon} className="h-5 w-5 text-brand-600" />
            <h3 className="mt-3 text-sm font-semibold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{f.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LandingWorkflow({
  items,
  heading,
  presentation = "steps",
}: {
  items: LandingStep[];
  heading?: LandingSectionCopy;
  presentation?: "steps" | "cards";
}) {
  return (
    <Section tone="white" aria-labelledby="ls-workflow" className="py-12 sm:py-16">
      <SectionHeading
        id="ls-workflow"
        eyebrow={heading?.eyebrow ?? "How it works"}
        title={heading?.title ?? "The workflow, end to end"}
        description={heading?.description}
      />
      <ol className={presentation === "cards" ? "mt-8 grid gap-4 sm:grid-cols-3" : "mt-8 grid gap-6 sm:grid-cols-3"}>
        {items.map((step, i) => (
          <li
            key={step.title}
            className={presentation === "cards" ? "rounded-lg border border-line bg-white p-5 shadow-card" : undefined}
          >
            <span className="font-mono text-sm font-medium tabular-nums text-brand-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div aria-hidden="true" className="mt-2 h-px w-full bg-line" />
            <h3 className="mt-3 text-sm font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function LandingBenefits({ items, heading }: { items: string[]; heading?: LandingSectionCopy }) {
  return (
    <Section tone="paper" aria-labelledby="ls-benefits" className="py-12 sm:py-16">
      <SectionHeading
        id="ls-benefits"
        eyebrow={heading?.eyebrow ?? "Outcomes"}
        title={heading?.title ?? "What changes for the business"}
        description={heading?.description}
      />
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((b) => (
          <li key={b} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3">
            <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
            <span className="text-sm leading-relaxed text-ink">{b}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function LandingUseCases({ items, heading }: { items: LandingUseCase[]; heading?: LandingSectionCopy }) {
  return (
    <Section tone="white" aria-labelledby="ls-usecases" className="py-12 sm:py-16">
      <SectionHeading
        id="ls-usecases"
        eyebrow={heading?.eyebrow ?? "In practice"}
        title={heading?.title ?? "Where it earns its keep"}
        description={heading?.description}
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {items.map((u) => (
          <li key={u.title} className="rounded-lg border border-line bg-paper p-5">
            <h3 className="text-sm font-semibold text-ink">{u.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{u.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
