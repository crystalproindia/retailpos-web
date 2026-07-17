import type { CmsContentPage, CmsContentSection, CmsContentSectionType } from "@/lib/cms";
import { cmsParagraphs, cmsText, faqItems, isRecord, safeImageUrl, safeUrl } from "@/lib/cms-content";
import type { Faq } from "@/types/content";

export interface CmsButton {
  label: string;
  href: string;
}

export interface CmsHeroContent {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  primaryCta?: CmsButton;
  secondaryCta?: CmsButton;
}

export interface CmsCardItem {
  title: string;
  description: string;
  href?: string;
  icon: string;
}

export interface CmsStatItem {
  label: string;
  value: string;
  description?: string;
}

export interface CmsTestimonialItem {
  name: string;
  roleCompany?: string;
  quote: string;
  rating?: number;
}

export interface CmsComparisonRow {
  label: string;
  value: string;
  description?: string;
}

const supportedSectionTypes = new Set<CmsContentSectionType>([
  "hero",
  "feature_grid",
  "benefits",
  "product_highlights",
  "industry_use_cases",
  "module_details",
  "faq",
  "cta",
  "testimonials",
  "stats",
  "comparison",
  "footer_seo",
  "trust_metrics",
  "client_logos",
  "rich_text",
  "case_study_grid",
  "custom",
]);

export function isSupportedCmsSectionType(value: unknown): value is CmsContentSectionType {
  return typeof value === "string" && supportedSectionTypes.has(value as CmsContentSectionType);
}

export function cmsContentSections(page: CmsContentPage | null | undefined): CmsContentSection[] {
  if (!page || !Array.isArray(page.sections)) return [];
  return page.sections
    .filter((section): section is CmsContentSection => isRecord(section))
    .filter((section) => section.is_enabled !== false && section.is_enabled !== 0)
    .filter((section) => isSupportedCmsSectionType(section.section_type));
}

export function firstCmsSection(
  pageOrSections: CmsContentPage | CmsContentSection[] | null | undefined,
  type: CmsContentSectionType,
): CmsContentSection | null {
  const sections = Array.isArray(pageOrSections) ? pageOrSections : cmsContentSections(pageOrSections);
  return sections.find((section) => section.section_type === type) ?? null;
}

export function cmsSectionsExcept(
  pageOrSections: CmsContentPage | CmsContentSection[] | null | undefined,
  excludedTypes: CmsContentSectionType[],
): CmsContentSection[] {
  const sections = Array.isArray(pageOrSections) ? pageOrSections : cmsContentSections(pageOrSections);
  const excluded = new Set(excludedTypes);
  return sections.filter((section) => !excluded.has(section.section_type as CmsContentSectionType));
}

export function cmsButton(value: unknown): CmsButton | undefined {
  if (!isRecord(value)) return undefined;
  const label = cmsText(value.label, 120);
  const href = safeUrl(value.url);
  return label && href ? { label, href } : undefined;
}

export function cmsSectionButton(section: CmsContentSection | null | undefined, variant: "primary" | "secondary"): CmsButton | undefined {
  return cmsButton(variant === "primary" ? section?.primary_cta : section?.secondary_cta);
}

export function cmsHeroContent(section: CmsContentSection | null | undefined): CmsHeroContent | null {
  if (!section) return null;
  const title = cmsText(section.title, 180);
  const subtitle = cmsText(section.subtitle ?? section.body, 420);
  const body = cmsText(section.body, 900);
  const hero: CmsHeroContent = {
    eyebrow: cmsText(section.eyebrow, 120),
    title,
    subtitle,
    body,
    imageUrl: safeImageUrl(section.image_url),
    primaryCta: cmsSectionButton(section, "primary"),
    secondaryCta: cmsSectionButton(section, "secondary"),
  };
  return Object.values(hero).some(Boolean) ? hero : null;
}

export function cmsSectionParagraphs(section: CmsContentSection, maxParagraphs = 4): string[] {
  return cmsParagraphs(section.body, maxParagraphs);
}

function itemRecords(section: CmsContentSection, maxItems = 20): Record<string, unknown>[] {
  return Array.isArray(section.items) ? section.items.filter(isRecord).slice(0, maxItems) : [];
}

export function cmsCardItems(section: CmsContentSection, maxItems = 12): CmsCardItem[] {
  const cards: CmsCardItem[] = [];
  for (const item of itemRecords(section, maxItems)) {
    const title = cmsText(item.title ?? item.name ?? item.label, 160);
    const description = cmsText(item.description ?? item.answer ?? item.value, 420);
    if (!title || !description) continue;
    const href = safeUrl(item.url);
    cards.push({
      title,
      description,
      ...(href ? { href } : {}),
      icon: cmsText(item.icon_key, 80) ?? "CircleDot",
    });
  }
  return cards;
}

export function cmsBenefitItems(section: CmsContentSection, maxItems = 12): string[] {
  const benefits = itemRecords(section, maxItems)
    .map((item) => cmsText(item.title ?? item.description ?? item.label ?? item.value, 260))
    .filter((item): item is string => Boolean(item));
  if (benefits.length) return benefits;
  return cmsParagraphs(section.body, maxItems);
}

export function cmsFaqItems(section: CmsContentSection): Faq[] {
  return faqItems(section.items);
}

export function cmsStatItems(section: CmsContentSection, maxItems = 8): CmsStatItem[] {
  const stats: CmsStatItem[] = [];
  for (const item of itemRecords(section, maxItems)) {
    const label = cmsText(item.label ?? item.title, 120);
    const value = cmsText(item.value, 120);
    if (!label || !value) continue;
    const description = cmsText(item.description, 220);
    stats.push({ label, value, ...(description ? { description } : {}) });
  }
  return stats;
}

export function cmsTestimonialItems(section: CmsContentSection, maxItems = 6): CmsTestimonialItem[] {
  const testimonials: CmsTestimonialItem[] = [];
  for (const item of itemRecords(section, maxItems)) {
    const name = cmsText(item.name, 160);
    const quote = cmsText(item.quote ?? item.description, 800);
    if (!name || !quote) continue;
    const rating = Number(item.rating);
    const roleCompany = cmsText(item.role_company, 180);
    testimonials.push({
      name,
      quote,
      ...(roleCompany ? { roleCompany } : {}),
      ...(Number.isFinite(rating) && rating >= 1 && rating <= 5 ? { rating } : {}),
    });
  }
  return testimonials;
}

export function cmsComparisonRows(section: CmsContentSection, maxItems = 10): CmsComparisonRow[] {
  const rows: CmsComparisonRow[] = [];
  for (const item of itemRecords(section, maxItems)) {
    const label = cmsText(item.label ?? item.title, 180);
    const value = cmsText(item.value ?? item.description, 420);
    if (!label || !value) continue;
    const description = cmsText(item.description, 420);
    rows.push({ label, value, ...(description ? { description } : {}) });
  }
  return rows;
}

export function cmsFooterSeoText(section: CmsContentSection | null | undefined): string | undefined {
  if (!section) return undefined;
  return cmsText(section.body ?? section.subtitle, 5000);
}
