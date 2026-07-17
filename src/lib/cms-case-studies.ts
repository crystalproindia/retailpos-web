import "server-only";

import { caseStudies as fallbackCaseStudies, type CaseStudy } from "@/data/case-studies";
import { getCmsCaseStudies, getCmsCaseStudy, type CmsPublicCaseStudy } from "@/lib/cms";
import { cmsParagraphs, cmsText, isRecord } from "@/lib/cms-content";

function stringItems(value: unknown, maxItems = 8): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return cmsText(item, 180);
      if (!isRecord(item)) return undefined;
      return cmsText(item.label ?? item.title ?? item.value ?? item.content, 180);
    })
    .filter((item): item is string => Boolean(item))
    .slice(0, maxItems);
}

function sectionItems(study: CmsPublicCaseStudy, type: string): string[] {
  if (!Array.isArray(study.sections)) return [];
  return study.sections
    .filter(isRecord)
    .filter((section) => cmsText(section.section_type, 80) === type)
    .flatMap((section) => [cmsText(section.title, 180), cmsText(section.content, 260)])
    .filter((item): item is string => Boolean(item));
}

export function caseStudyFromCms(study: CmsPublicCaseStudy): CaseStudy | null {
  const slug = cmsText(study.slug, 160);
  const title = cmsText(study.title, 220);
  const summary = cmsText(study.summary, 1200);
  if (!slug || !title || !summary) return null;

  const challenge = cmsText(study.challenge, 1600) ?? cmsParagraphs(study.summary, 1)[0] ?? summary;
  const solution = cmsText(study.solution, 1600) ?? "RetailPOS.biz was used to connect retail POS, ERP, inventory and operating workflows.";
  const result = cmsText(study.results ?? study.result, 1800) ?? summary;
  const metrics = stringItems(study.outcome_metrics, 8);
  const modules = sectionItems(study, "modules");
  const rolloutFocus = metrics.length ? metrics : sectionItems(study, "results");

  return {
    slug,
    title,
    clientName: cmsText(study.client_name, 220),
    location: cmsText(study.location, 180),
    publishedAt: cmsText(study.published_at, 80),
    businessType: cmsText(study.business_type ?? study.industry, 220) ?? "Retail business",
    icon: "FileBarChart",
    summary,
    challenge,
    solution,
    result,
    modules,
    rolloutFocus,
    seoTitle: isRecord(study.seo) ? cmsText(study.seo.title, 220) : undefined,
    seoDescription: isRecord(study.seo) ? cmsText(study.seo.description, 320) : undefined,
    seoImageUrl: isRecord(study.seo) ? cmsText(study.seo.image_url, 1000) : undefined,
  };
}

export async function getCaseStudiesWithFallback(): Promise<CaseStudy[]> {
  const cmsStudies = (await getCmsCaseStudies()).map(caseStudyFromCms).filter((study): study is CaseStudy => Boolean(study));
  return cmsStudies.length ? cmsStudies : fallbackCaseStudies;
}

export async function getCaseStudyWithFallback(slug: string): Promise<CaseStudy | null> {
  const cmsStudy = caseStudyFromCms((await getCmsCaseStudy(slug)) ?? {});
  if (cmsStudy) return cmsStudy;
  return fallbackCaseStudies.find((study) => study.slug === slug) ?? null;
}

export async function getCaseStudyStaticParams(): Promise<{ slug: string }[]> {
  const studies = await getCaseStudiesWithFallback();
  return studies.map((study) => ({ slug: study.slug }));
}
