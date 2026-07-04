import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { posFeatures } from "@/data/pos-features";

export function PosCapabilities() {
  return (
    <Section tone="white" aria-labelledby="pos-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr,1.4fr] lg:items-center">
        <div>
          <SectionHeading
            id="pos-heading"
            eyebrow="Point of sale"
            title="Billing that keeps up with your busiest hour"
            description="The counter is where retail is won or lost. RetailPOS is designed around cashier speed, hardware reliability and zero-downtime billing."
          />
          <ButtonLink href="/products/pos-software" variant="secondary" className="mt-8">
            See POS software
          </ButtonLink>
        </div>
        <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          {posFeatures.map((f) => (
            <li key={f.title} className="flex gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-600">
                <Icon name={f.icon} className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
