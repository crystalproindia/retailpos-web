import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { featuredResources } from "@/data/resources";

const typeLabels = { blog: "Blog", guide: "Guide", "case-study": "Case study" } as const;

/**
 * Resource previews render as non-clickable cards until the resources
 * platform ships in Phase 4 — no links to unimplemented routes, no 404
 * journeys. The data shape stays CMS-ready; switching back to linked
 * cards is a one-line change once the routes exist.
 */
export function ResourcesPreview() {
  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="resources-heading">
      <SectionHeading
        id="resources-heading"
        eyebrow="Resources"
        title="Learn before you buy"
        description="Plain-language guides on ERP, POS and multi-store retail — written for owners, not IT teams. The resource library publishes with our content platform."
      />
      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {featuredResources.map((r) => (
          <li key={r.slug} className="flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <Badge tone="brand">{typeLabels[r.type]}</Badge>
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Publishing soon</span>
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink">{r.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{r.excerpt}</p>
            <p className="mt-4 font-mono text-xs tabular-nums text-ink-muted">{r.readMinutes} min read</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
