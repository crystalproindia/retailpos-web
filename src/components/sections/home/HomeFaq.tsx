import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";
import { homepageFaqs } from "@/data/faqs";

export function HomeFaq() {
  return (
    <Section tone="paper" aria-labelledby="faq-heading">
      <JsonLd data={faqJsonLd(homepageFaqs)} />
      <div className="grid gap-10 lg:grid-cols-[1fr,1.6fr]">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Common questions, direct answers"
          description="More detail lives in our product pages and the full FAQ."
        />
        <Accordion items={homepageFaqs} />
      </div>
    </Section>
  );
}
