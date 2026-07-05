import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
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
  return buildMetadata({ title: page.metaTitle, description: page.metaDescription, path: pagePath(page) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPage(FAMILY, slug);
  if (!page) notFound();
  return <LandingPageTemplate page={page} />;
}
