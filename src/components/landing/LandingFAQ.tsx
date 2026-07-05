import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";
import type { Faq } from "@/types/content";

/** Visible FAQ and FAQPage schema share the identical `items` array. */
export function LandingFAQ({ items, name }: { items: Faq[]; name: string }) {
  return (
    <Section tone="paper" aria-labelledby="ls-faq" className="py-12 sm:py-16">
      <JsonLd data={faqJsonLd(items)} />
      <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr]">
        <SectionHeading id="ls-faq" eyebrow="FAQ" title={`${name} questions, answered directly`} />
        <Accordion items={items} />
      </div>
    </Section>
  );
}
