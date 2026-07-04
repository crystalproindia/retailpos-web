import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { groupedIndustries } from "@/data/industry-groups";

export function IndustryCoverage() {
  const groups = groupedIndustries();

  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="industries-heading">
      <SectionHeading
        id="industries-heading"
        eyebrow="Industries"
        title="Your vertical's workflows are already built in"
        description="Batch and expiry for pharmacy, size-colour matrix for fashion, IMEI for electronics, karat billing for jewellery — not add-ons, defaults."
        align="center"
      />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {groups.map(({ group, items }) => (
          <div key={group.title} className="flex flex-col rounded-lg border border-line p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-base font-semibold text-ink">{group.title}</h3>
              <p className="text-xs text-ink-muted">{group.summary}</p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/industries/${i.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Icon name={i.icon} className="h-3.5 w-3.5 text-brand-600" />
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-3 text-xs leading-relaxed text-ink-muted">
              <span className="font-mono text-[10px] uppercase tracking-wider text-brand-600">Built in · </span>
              {group.capability}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
