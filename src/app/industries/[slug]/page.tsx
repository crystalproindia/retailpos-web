import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { getLandingPageBySlug } from "@/lib/cms";
import { applyCmsLandingPage } from "@/lib/landing-pages/cms-overrides";
import { getFamilyPages, getPage } from "@/lib/landing-pages/registry";
import { pagePath } from "@/lib/landing-pages/helpers";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";

const FAMILY = "industries" as const;

export function generateStaticParams() {
  return getFamilyPages(FAMILY).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(FAMILY, slug);
  if (!page) return {};
  const cmsPage = await getLandingPageBySlug(slug);
  const enhancedPage = applyCmsLandingPage(page, cmsPage);
  return buildMetadataWithCms(pagePath(page), {
    title: enhancedPage.metaTitle,
    description: enhancedPage.metaDescription,
    path: pagePath(page),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(FAMILY, slug);
  if (!page) notFound();
  const cmsPage = await getLandingPageBySlug(slug);
  return <LandingPageTemplate page={applyCmsLandingPage(page, cmsPage)} />;
}
