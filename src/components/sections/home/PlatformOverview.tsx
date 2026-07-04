import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/data/products";

export function PlatformOverview() {
  const featured = products.filter((p) => p.featured);
  const supporting = products.filter((p) => !p.featured);

  return (
    <Section tone="paper" className="py-14 sm:py-16 lg:py-20" aria-labelledby="platform-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="platform-heading"
          eyebrow="The platform"
          title="One retail platform, nine connected products"
          description="Start with the POS. Switch on ERP, CRM, analytics and AI as you grow — everything shares the same items, customers and accounts."
        />
        <ButtonLink href="/products" variant="ghost" className="shrink-0">
          Explore all products
        </ButtonLink>
      </div>

      {/* Central platform spine */}
      <div className="mt-10 rounded-lg border border-brand-200 bg-white p-1.5 shadow-card">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 rounded bg-brand-800 px-4 py-3 text-center">
          <p className="font-display text-sm font-semibold text-white">RetailPOS Platform</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-200">
            Shared items · customers · stock · ledgers
          </p>
        </div>

        {/* Featured product panels */}
        <div className="grid gap-1.5 p-1.5 pt-3 md:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group rounded-lg border border-line bg-white p-5 transition-shadow hover:shadow-raised"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-brand-50 text-brand-600">
                <Icon name={p.icon} className="h-4 w-4" />
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink group-hover:text-brand-700">
                {p.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.description}</p>
              <span className="mt-3 inline-block text-sm font-medium text-brand-600 group-hover:underline">
                Learn more
              </span>
            </Link>
          ))}
        </div>

        {/* Supporting products: compact link row */}
        <ul className="grid gap-1.5 p-1.5 pt-0 sm:grid-cols-2 lg:grid-cols-3">
          {supporting.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="group flex items-center gap-3 rounded border border-line/70 bg-paper/60 px-4 py-3 transition-colors hover:border-brand-200 hover:bg-brand-50"
              >
                <Icon name={p.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-ink group-hover:text-brand-700">
                    {p.name}
                  </span>
                  <span className="block truncate text-xs text-ink-muted">{p.tagline}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
