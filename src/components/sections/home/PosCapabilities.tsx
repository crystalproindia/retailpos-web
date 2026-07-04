import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { posFeatures } from "@/data/pos-features";
import { PosBilling } from "@/components/product-ui/PosBilling";

export function PosCapabilities() {
  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="pos-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr,1.25fr] lg:items-center">
        <div>
          <SectionHeading
            id="pos-heading"
            eyebrow="Point of sale"
            title="Billing that keeps up with your busiest hour"
            description="The counter is where retail is won or lost. RetailPOS is built around cashier speed, hardware reliability and billing that continues offline."
          />
          <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {posFeatures.map((f) => (
              <li key={f.title} className="flex gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-600">
                  <Icon name={f.icon} className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-ink">{f.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <ButtonLink href="/products/pos-software" variant="secondary" className="mt-8">
            See POS software
          </ButtonLink>
        </div>
        <PosBilling />
      </div>
    </Section>
  );
}
