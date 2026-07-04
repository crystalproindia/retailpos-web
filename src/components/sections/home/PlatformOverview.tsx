import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/Card";
import { products } from "@/data/products";
import { ButtonLink } from "@/components/ui/Button";

export function PlatformOverview() {
  return (
    <Section tone="paper" aria-labelledby="platform-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="platform-heading"
          eyebrow="The platform"
          title="One retail platform, nine connected products"
          description="Start with the POS. Switch on ERP, CRM, analytics and AI as your business grows — everything shares the same items, customers and accounts."
        />
        <ButtonLink href="/products" variant="ghost" className="shrink-0">
          Explore all products
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.slug}>
            <FeatureCard
              icon={p.icon}
              title={p.name}
              description={p.description}
              href={`/products/${p.slug}`}
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
