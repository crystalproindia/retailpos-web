import { JsonLd } from "@/components/seo/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Card, FeatureCard } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CmsContentSection, CmsContentSectionType } from "@/lib/cms";
import {
  cmsBenefitItems,
  cmsCardItems,
  cmsComparisonRows,
  cmsFaqItems,
  cmsFooterSeoText,
  cmsSectionButton,
  cmsSectionParagraphs,
  cmsStatItems,
  cmsTestimonialItems,
} from "@/lib/cms-content-editor";
import { cmsParagraphs, cmsText } from "@/lib/cms-content";
import { faqJsonLd } from "@/lib/seo/jsonld";

interface CmsContentSectionsProps {
  sections: CmsContentSection[];
  excludeTypes?: CmsContentSectionType[];
}

function sectionTitle(section: CmsContentSection, fallback: string): string {
  return cmsText(section.title, 160) ?? fallback;
}

function sectionDescription(section: CmsContentSection): string | undefined {
  return cmsText(section.subtitle ?? section.body, 360);
}

export function CmsFaqSection({ section }: { section: CmsContentSection }) {
  const items = cmsFaqItems(section);
  if (!items.length) return null;

  return (
    <Section tone="paper" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "faq"}`}>
      <JsonLd data={faqJsonLd(items)} />
      <div className="grid gap-8 lg:grid-cols-[1fr,1.6fr]">
        <SectionHeading
          id={`cms-${section.section_key ?? "faq"}`}
          eyebrow={cmsText(section.eyebrow, 120) ?? "FAQ"}
          title={sectionTitle(section, "Common questions")}
          description={sectionDescription(section)}
        />
        <Accordion items={items} />
      </div>
    </Section>
  );
}

export function CmsTestimonialsSection({ section }: { section: CmsContentSection }) {
  const items = cmsTestimonialItems(section);
  if (!items.length) return null;

  return (
    <Section tone="white" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "testimonials"}`}>
      <SectionHeading
        id={`cms-${section.section_key ?? "testimonials"}`}
        eyebrow={cmsText(section.eyebrow, 120) ?? "Customer voice"}
        title={sectionTitle(section, "What retail teams say")}
        description={sectionDescription(section)}
      />
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={`${item.name}-${item.quote}`}>
            <Card className="flex h-full flex-col">
              {item.rating ? (
                <p className="font-mono text-xs text-accent-600" aria-label={`${item.rating} out of 5 rating`}>
                  {item.rating}/5 rating
                </p>
              ) : null}
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-ink">{item.name}</p>
              {item.roleCompany ? <p className="mt-1 text-xs text-ink-muted">{item.roleCompany}</p> : null}
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function CmsStatsSection({ section }: { section: CmsContentSection }) {
  const items = cmsStatItems(section);
  if (!items.length) return null;

  return (
    <Section tone="white" className="border-b border-line/70 py-8 sm:py-10" aria-labelledby={`cms-${section.section_key ?? "stats"}`}>
      <div className="grid gap-7 lg:grid-cols-[0.78fr,1.22fr] lg:items-center">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
            {cmsText(section.eyebrow, 120) ?? "Proof points"}
          </p>
          <h2 id={`cms-${section.section_key ?? "stats"}`} className="mt-3 max-w-xl font-display text-display-sm font-semibold text-ink">
            {sectionTitle(section, "RetailPOS in numbers")}
          </h2>
          {sectionDescription(section) ? <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{sectionDescription(section)}</p> : null}
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={`${item.value}-${item.label}`} className="rounded-lg border border-line bg-white p-4 shadow-card">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{item.label}</dt>
              <dd className="mt-2 font-display text-display-md font-bold text-ink">{item.value}</dd>
              {item.description ? <p className="mt-2 text-xs leading-relaxed text-ink-muted">{item.description}</p> : null}
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

export function CmsCtaSection({ section }: { section: CmsContentSection }) {
  const primary = cmsSectionButton(section, "primary");
  const secondary = cmsSectionButton(section, "secondary");
  const title = cmsText(section.title, 180);
  if (!title && !primary && !secondary) return null;

  return (
    <Section tone="brand" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "cta"}`}>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          {cmsText(section.eyebrow, 120) ? (
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-200">
              {cmsText(section.eyebrow, 120)}
            </p>
          ) : null}
          {title ? (
            <h2 id={`cms-${section.section_key ?? "cta"}`} className="mt-3 font-display text-display-sm font-semibold text-white sm:text-display-md">
              {title}
            </h2>
          ) : null}
          {sectionDescription(section) ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-100">{sectionDescription(section)}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          {primary ? <ButtonLink href={primary.href}>{primary.label}</ButtonLink> : null}
          {secondary ? <ButtonLink href={secondary.href} variant="inverted">{secondary.label}</ButtonLink> : null}
        </div>
      </div>
    </Section>
  );
}

export function CmsFooterSeoSection({ section }: { section: CmsContentSection }) {
  const paragraphs = cmsParagraphs(section.body ?? cmsFooterSeoText(section), 5);
  if (!paragraphs.length) return null;

  return (
    <Section tone="paper" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "footer-seo"}`}>
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
          {cmsText(section.eyebrow, 120) ?? "RetailPOS guide"}
        </p>
        <h2 id={`cms-${section.section_key ?? "footer-seo"}`} className="mt-3 font-display text-display-sm font-semibold text-ink">
          {sectionTitle(section, "More about this RetailPOS page")}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CmsCardGridSection({ section }: { section: CmsContentSection }) {
  const items = cmsCardItems(section);
  const paragraphs = cmsSectionParagraphs(section, 2);
  if (!items.length && !paragraphs.length) return null;

  return (
    <Section tone="white" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "cards"}`}>
      <SectionHeading
        id={`cms-${section.section_key ?? "cards"}`}
        eyebrow={cmsText(section.eyebrow, 120)}
        title={sectionTitle(section, "RetailPOS capabilities")}
        description={sectionDescription(section)}
      />
      {items.length ? (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={`${item.title}-${item.href ?? "static"}`}>
              <FeatureCard icon={item.icon} title={item.title} description={item.description} href={item.href} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 max-w-3xl space-y-4 text-sm leading-relaxed text-ink-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </Section>
  );
}

function CmsBenefitsSection({ section }: { section: CmsContentSection }) {
  const items = cmsBenefitItems(section);
  if (!items.length) return null;

  return (
    <Section tone="paper" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "benefits"}`}>
      <SectionHeading
        id={`cms-${section.section_key ?? "benefits"}`}
        eyebrow={cmsText(section.eyebrow, 120) ?? "Benefits"}
        title={sectionTitle(section, "What changes for the business")}
        description={sectionDescription(section)}
      />
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-lg border border-line bg-white px-4 py-3">
            <Icon name="ShieldCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
            <span className="text-sm leading-relaxed text-ink">{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function CmsComparisonSection({ section }: { section: CmsContentSection }) {
  const rows = cmsComparisonRows(section);
  if (!rows.length) return null;

  return (
    <Section tone="white" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "comparison"}`}>
      <SectionHeading
        id={`cms-${section.section_key ?? "comparison"}`}
        eyebrow={cmsText(section.eyebrow, 120) ?? "Comparison"}
        title={sectionTitle(section, "Compare the operating choices")}
        description={sectionDescription(section)}
      />
      <div className="mt-8 overflow-x-auto rounded-lg border border-line bg-white shadow-card">
        <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
          <tbody className="divide-y divide-line">
            {rows.map((row) => (
              <tr key={`${row.label}-${row.value}`} className="align-top">
                <th scope="row" className="w-1/3 px-4 py-4 font-semibold text-ink">{row.label}</th>
                <td className="px-4 py-4 leading-relaxed text-ink-muted">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function CmsCustomSection({ section }: { section: CmsContentSection }) {
  const paragraphs = cmsSectionParagraphs(section, 4);
  if (!paragraphs.length && !cmsText(section.title, 160)) return null;

  return (
    <Section tone="white" className="py-12 sm:py-16" aria-labelledby={`cms-${section.section_key ?? "custom"}`}>
      <div className="max-w-3xl">
        {cmsText(section.eyebrow, 120) ? (
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
            {cmsText(section.eyebrow, 120)}
          </p>
        ) : null}
        {cmsText(section.title, 160) ? (
          <h2 id={`cms-${section.section_key ?? "custom"}`} className="mt-3 font-display text-display-sm font-semibold text-ink">
            {cmsText(section.title, 160)}
          </h2>
        ) : null}
        <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}

function renderCmsSection(section: CmsContentSection) {
  switch (section.section_type) {
    case "faq":
      return <CmsFaqSection key={section.section_key ?? section.title ?? "faq"} section={section} />;
    case "testimonials":
      return <CmsTestimonialsSection key={section.section_key ?? section.title ?? "testimonials"} section={section} />;
    case "stats":
    case "trust_metrics":
      return <CmsStatsSection key={section.section_key ?? section.title ?? "stats"} section={section} />;
    case "cta":
      return <CmsCtaSection key={section.section_key ?? section.title ?? "cta"} section={section} />;
    case "footer_seo":
      return <CmsFooterSeoSection key={section.section_key ?? section.title ?? "footer-seo"} section={section} />;
    case "benefits":
      return <CmsBenefitsSection key={section.section_key ?? section.title ?? "benefits"} section={section} />;
    case "comparison":
      return <CmsComparisonSection key={section.section_key ?? section.title ?? "comparison"} section={section} />;
    case "feature_grid":
    case "case_study_grid":
    case "product_highlights":
    case "industry_use_cases":
    case "module_details":
      return <CmsCardGridSection key={section.section_key ?? section.title ?? "cards"} section={section} />;
    case "rich_text":
    case "client_logos":
    case "custom":
      return <CmsCustomSection key={section.section_key ?? section.title ?? "custom"} section={section} />;
    default:
      return null;
  }
}

export function CmsContentSections({ sections, excludeTypes = [] }: CmsContentSectionsProps) {
  const excluded = new Set(excludeTypes);
  const rendered = sections.filter((section) => !excluded.has(section.section_type as CmsContentSectionType)).map(renderCmsSection);
  return <>{rendered}</>;
}
