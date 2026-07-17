import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { getLandingPageBySlug } from "@/lib/cms";
import { getCmsContentPageForRoute } from "@/lib/cms-content-loader";
import { applyCmsContentPageToLandingPage, applyCmsLandingPage } from "@/lib/landing-pages/cms-overrides";
import { getFamilyPages, getPage } from "@/lib/landing-pages/registry";
import { pagePath } from "@/lib/landing-pages/helpers";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";

const FAMILY = "modules" as const;

export function generateStaticParams() {
  return getFamilyPages(FAMILY).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(FAMILY, slug);
  if (!page) return {};
  const path = pagePath(page);
  const [cmsPage, contentPage] = await Promise.all([getLandingPageBySlug(slug), getCmsContentPageForRoute(path, slug)]);
  const enhancedPage = applyCmsContentPageToLandingPage(applyCmsLandingPage(page, cmsPage), contentPage);
  return buildMetadataWithCms(path, {
    title: enhancedPage.metaTitle,
    description: enhancedPage.metaDescription,
    path,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(FAMILY, slug);
  if (!page) notFound();
  const path = pagePath(page);
  const [cmsPage, contentPage] = await Promise.all([getLandingPageBySlug(slug), getCmsContentPageForRoute(path, slug)]);
  return <LandingPageTemplate page={applyCmsContentPageToLandingPage(applyCmsLandingPage(page, cmsPage), contentPage)} />;
}
