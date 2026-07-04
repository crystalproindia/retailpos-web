import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { useCases } from "@/data/use-cases";

/** Operational use cases — workflows the product is built for, not customer claims. */
export function UseCases() {
  return (
    <Section tone="paper" className="py-14 sm:py-16 lg:py-20" aria-labelledby="usecases-heading">
      <SectionHeading
        id="usecases-heading"
        eyebrow="Built for real retail operations"
        title="How different retail businesses run on RetailPOS"
        description="Three common operating models and the workflows the platform provides for each."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {useCases.map((uc) => (
          <article key={uc.segment} className="flex flex-col rounded-lg border border-line bg-white p-6 shadow-card">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-brand-50 text-brand-600">
                <Icon name={uc.icon} className="h-4 w-4" />
              </span>
              <h3 className="font-display text-base font-semibold text-ink">{uc.segment}</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">Challenge · </span>
              {uc.challenge}
            </p>
            <div className="mt-4 border-t border-line pt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-brand-600">RetailPOS workflow</p>
              <ul className="mt-2 space-y-1.5">
                {uc.workflow.map((w) => (
                  <li key={w} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ledger-500" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
