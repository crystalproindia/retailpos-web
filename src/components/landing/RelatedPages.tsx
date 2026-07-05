import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { resolveRelated } from "@/lib/landing-pages/helpers";
import type { LandingPage } from "@/lib/landing-pages/types";

export function RelatedPages({ page }: { page: LandingPage }) {
  const related = resolveRelated(page);
  if (related.length === 0) return null;
  return (
    <Section tone="white" aria-labelledby="ls-related" className="py-12 sm:py-16">
      <SectionHeading id="ls-related" eyebrow="Related" title="Explore connected capabilities" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {related.map((r) => (
          <li key={r.href}>
            <Link
              href={r.href}
              className="group block h-full rounded-lg border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-raised"
            >
              <span className="text-sm font-semibold text-ink group-hover:text-brand-700">{r.label}</span>
              <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-ink-muted">
                {r.description}
              </span>
              <span className="mt-3 inline-block text-sm font-medium text-brand-600 group-hover:underline">
                Learn more
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
