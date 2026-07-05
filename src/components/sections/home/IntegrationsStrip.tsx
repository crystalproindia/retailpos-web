import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { integrations } from "@/data/integrations";

export function IntegrationsStrip() {
  const left = integrations.slice(0, 3);
  const right = integrations.slice(3);

  /* Integration detail pages ship in a later phase; cards are informational until then. */
  const IntegrationCard = ({ name, description, icon }: (typeof integrations)[number]) => (
    <div className="flex items-start gap-3 rounded-lg border border-line bg-white p-4">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded bg-brand-50 text-brand-600">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{name}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-ink-muted">{description}</span>
      </span>
    </div>
  );

  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="integrations-heading">
      <SectionHeading
        id="integrations-heading"
        eyebrow="Integrations"
        title="Connected to the tools around your store"
        description="RetailPOS sits at the centre — payments, channels and accounting connect to the same items, orders and ledgers. Open REST APIs and webhooks handle everything custom."
        align="center"
      />
      <div className="mt-10 grid items-center gap-3 lg:grid-cols-[1fr,auto,1fr]">
        <div className="grid gap-3">
          {left.map((i) => <IntegrationCard key={i.slug} {...i} />)}
        </div>
        <div className="relative hidden h-full items-center lg:flex" aria-hidden="true">
          <span className="absolute left-0 top-1/2 h-px w-full bg-line" />
        </div>
        <div className="order-first rounded-lg border border-brand-200 bg-brand-800 px-6 py-5 text-center lg:order-none lg:col-start-2 lg:row-start-1 lg:self-center">
          <p className="font-display text-sm font-semibold text-white">RetailPOS Core</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-brand-200">
            Items · orders · stock · ledgers
          </p>
          <p className="mt-2 text-[11px] text-brand-100">REST API + webhooks</p>
        </div>
        <div className="grid gap-3 lg:col-start-3 lg:row-start-1">
          {right.map((i) => <IntegrationCard key={i.slug} {...i} />)}
        </div>
      </div>
    </Section>
  );
}
