import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { featuredResources } from "@/data/resources";

const typeLabels = { blog: "Blog", guide: "Guide", "case-study": "Case study" } as const;

export function ResourcesPreview() {
  return (
    <Section tone="white" aria-labelledby="resources-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="resources-heading"
          eyebrow="Resources"
          title="Learn before you buy"
          description="Plain-language guides on ERP, POS and multi-store retail — written for owners, not IT teams."
        />
        <Link href="/resources" className="shrink-0 text-sm font-medium text-brand-600 hover:underline">
          Browse all resources →
        </Link>
      </div>
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {featuredResources.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/${r.type === "case-study" ? "case-studies" : r.type === "guide" ? "guides" : "blog"}/${r.slug}`}
              className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-raised"
            >
              <Badge tone="brand">{typeLabels[r.type]}</Badge>
              <h3 className="mt-4 font-display text-base font-semibold text-ink group-hover:text-brand-700">
                {r.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{r.excerpt}</p>
              <p className="mt-4 font-mono text-xs tabular-nums text-ink-muted">{r.readMinutes} min read</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
