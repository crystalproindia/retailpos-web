import type { CmsLandingPage } from "@/lib/cms";
import { cmsText, faqItems, isRecord, safeUrl, stringArray } from "@/lib/cms-content";
import type { LandingFeature, LandingPage, LandingProblem, LandingStep, LandingUseCase } from "./types";

function firstText(...values: unknown[]): string | undefined {
  for (const value of values) {
    const text = cmsText(value, 420);
    if (text) return text;
  }
  return undefined;
}

function longText(...values: unknown[]): string | undefined {
  for (const value of values) {
    const text = cmsText(value, 5000);
    if (text) return text;
  }
  return undefined;
}

function sectionItems(sections: unknown, keys: string[]): unknown[] | null {
  if (Array.isArray(sections)) {
    for (const section of sections) {
      if (!isRecord(section)) continue;
      const key = cmsText(section.key ?? section.type ?? section.name, 80)?.toLowerCase();
      if (key && keys.includes(key)) {
        const items = section.items ?? section.cards ?? section.entries;
        if (Array.isArray(items)) return items;
      }
    }
  }

  if (isRecord(sections)) {
    for (const key of keys) {
      const value = sections[key];
      if (Array.isArray(value)) return value;
    }
  }

  return null;
}

function featureItems(sections: unknown): LandingFeature[] | undefined {
  const items = sectionItems(sections, ["features", "capabilities", "cards"]);
  if (!items) return undefined;
  const features = items
    .map((item) => {
      if (!isRecord(item)) return null;
      const title = firstText(item.title, item.name, item.heading);
      const description = firstText(item.description, item.text, item.body);
      if (!title || !description) return null;
      return { icon: cmsText(item.icon, 80) ?? "CircleDot", title, description };
    })
    .filter((item): item is LandingFeature => Boolean(item));
  return features.length ? features : undefined;
}

function workflowItems(sections: unknown): LandingStep[] | undefined {
  const items = sectionItems(sections, ["workflow", "steps", "process"]);
  if (!items) return undefined;
  const steps = items
    .map((item) => {
      if (!isRecord(item)) return null;
      const title = firstText(item.title, item.name, item.heading);
      const description = firstText(item.description, item.text, item.body);
      return title && description ? { title, description } : null;
    })
    .filter((item): item is LandingStep => Boolean(item));
  return steps.length ? steps : undefined;
}

function problemItems(sections: unknown): LandingProblem[] | undefined {
  const items = sectionItems(sections, ["problems", "problem_solution", "problem-solutions"]);
  if (!items) return undefined;
  const problems = items
    .map((item) => {
      if (!isRecord(item)) return null;
      const problem = firstText(item.problem, item.title, item.pain);
      const solution = firstText(item.solution, item.answer, item.description);
      return problem && solution ? { problem, solution } : null;
    })
    .filter((item): item is LandingProblem => Boolean(item));
  return problems.length ? problems : undefined;
}

function landingUseCaseItems(sections: unknown): LandingUseCase[] | undefined {
  const items = sectionItems(sections, ["usecases", "use_cases", "use-cases"]);
  if (!items) return undefined;
  const useCases = items
    .map((item) => {
      if (!isRecord(item)) return null;
      const title = firstText(item.title, item.name, item.heading);
      const description = firstText(item.description, item.text, item.body);
      return title && description ? { title, description } : null;
    })
    .filter((item): item is LandingUseCase => Boolean(item));
  return useCases.length ? useCases : undefined;
}

function benefitItems(sections: unknown): string[] | undefined {
  const items = sectionItems(sections, ["benefits", "outcomes"]);
  const benefits = stringArray(items, 10);
  return benefits.length ? benefits : undefined;
}

export function applyCmsLandingPage(page: LandingPage, cmsPage: CmsLandingPage | null): LandingPage {
  if (!cmsPage) return page;

  const faqs = faqItems(cmsPage.faq_items ?? cmsPage.faqs);
  const primaryHref = safeUrl(cmsPage.primary_cta_url ?? cmsPage.hero_cta_url ?? cmsPage.cta_url);
  const secondaryHref = safeUrl(cmsPage.secondary_cta_url);

  return {
    ...page,
    title: firstText(cmsPage.hero_title, cmsPage.title) ?? page.title,
    intro: firstText(cmsPage.hero_subtitle, cmsPage.intro, cmsPage.intro_content) ?? page.intro,
    metaTitle: firstText(cmsPage.meta_title) ?? page.metaTitle,
    metaDescription: firstText(cmsPage.meta_description) ?? page.metaDescription,
    primaryCtaLabel: firstText(cmsPage.primary_cta_label, cmsPage.hero_cta_label, cmsPage.cta_label) ?? page.primaryCtaLabel,
    primaryCtaHref: primaryHref ?? page.primaryCtaHref,
    secondaryCtaLabel: firstText(cmsPage.secondary_cta_label) ?? page.secondaryCtaLabel,
    secondaryCtaHref: secondaryHref ?? page.secondaryCtaHref,
    problems: problemItems(cmsPage.sections) ?? page.problems,
    features: featureItems(cmsPage.sections) ?? page.features,
    workflow: workflowItems(cmsPage.sections) ?? page.workflow,
    benefits: benefitItems(cmsPage.sections) ?? page.benefits,
    useCases: landingUseCaseItems(cmsPage.sections) ?? page.useCases,
    faqs: faqs.length ? faqs : page.faqs,
    ctaHeading: firstText(cmsPage.cta_heading) ?? page.ctaHeading,
    seoIntroContent: longText(cmsPage.intro_content, page.seoIntroContent),
    seoFooterContent: longText(cmsPage.footer_seo_content, page.seoFooterContent),
    schemaJson: cmsPage.schema_json ?? page.schemaJson,
  };
}
