import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/Card";
import { integrations } from "@/data/integrations";

export function IntegrationsStrip() {
  return (
    <Section tone="white" aria-labelledby="integrations-heading">
      <SectionHeading
        id="integrations-heading"
        eyebrow="Integrations"
        title="Connected to the tools around your store"
        description="Payments, e-commerce, marketplaces, WhatsApp and accounting — plus an open API when you need something custom."
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <li key={i.slug}>
            <FeatureCard
              icon={i.icon}
              title={i.name}
              description={i.description}
              href={`/integrations/${i.slug}`}
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
