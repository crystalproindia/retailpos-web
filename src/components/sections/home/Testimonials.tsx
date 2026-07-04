import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { testimonials } from "@/data/testimonials";

/**
 * Horizontal scroll-snap carousel — no slider library needed for three
 * cards. Placeholder quotes are visibly labelled until verified customer
 * stories are loaded from the admin panel.
 */
export function Testimonials() {
  return (
    <Section tone="paper" aria-labelledby="stories-heading">
      <SectionHeading
        id="stories-heading"
        eyebrow="Customer stories"
        title="What running on RetailPOS looks like"
        description="Illustrative scenarios drawn from the workflows the product is built for. Verified customer stories will replace these at launch."
      />
      <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
        {testimonials.map((t) => (
          <li
            key={t.quote}
            className="flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-lg border border-line bg-white p-6 shadow-card sm:w-auto"
          >
            <div>
              {t.placeholder ? <Badge tone="neutral">Illustrative example</Badge> : null}
              <blockquote className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</blockquote>
            </div>
            <p className="mt-5 border-t border-line pt-4 text-xs text-ink-muted">
              <span className="block font-medium text-ink">{t.name}</span>
              {t.role} · {t.company}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
