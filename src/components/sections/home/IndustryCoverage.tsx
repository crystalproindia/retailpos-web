import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/data/industries";

export function IndustryCoverage() {
  return (
    <Section tone="white" aria-labelledby="industries-heading">
      <SectionHeading
        id="industries-heading"
        eyebrow="Industries"
        title="Your vertical's workflows are already built in"
        description="Batch and expiry for pharmacy, size-colour matrix for fashion, IMEI for electronics, karat billing for jewellery — not add-ons, defaults."
        align="center"
      />
      <ul className="mt-12 flex flex-wrap justify-center gap-3">
        {industries.map((i) => (
          <li key={i.slug}>
            <Link
              href={`/industries/${i.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
            >
              <Icon name={i.icon} className="h-4 w-4 text-brand-600" />
              {i.name}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
