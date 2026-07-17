import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getCmsSettings, getSeoPageByPath, type CmsSeoPage, type CmsSettings } from "@/lib/cms";

interface PageSeoInput {
  title: string;
  description: string;
  path: string; // e.g. "/products/pos-software"
  noIndex?: boolean;
  ogImage?: string;
  lastModified?: string; // ISO date, surfaced from the admin panel later
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function booleanValue(value: unknown): boolean | undefined {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  return undefined;
}

function absoluteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return new URL(value, siteConfig.url).toString();
  } catch {
    return undefined;
  }
}

/**
 * Central metadata factory. Every indexable page builds its Metadata
 * through this function so titles, canonicals, OG/Twitter cards and robots
 * directives stay consistent. The future admin panel replaces the static
 * inputs with API-driven values without touching page components.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage,
  lastModified,
}: PageSeoInput): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const image = ogImage ?? `${siteConfig.url}/og-default.png`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(lastModified ? { modifiedTime: lastModified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      title,
      description,
      images: [image],
    },
  };
}

export function buildMetadataFromCms(
  cmsSeoPage: CmsSeoPage | null,
  fallback: PageSeoInput,
  settings?: CmsSettings | null,
): Metadata {
  const title = text(cmsSeoPage?.meta_title) ?? fallback.title;
  const description =
    text(cmsSeoPage?.meta_description) ?? fallback.description ?? text(settings?.default_meta_description) ?? siteConfig.defaultDescription;
  const canonical =
    absoluteUrl(text(cmsSeoPage?.canonical_url)) ??
    (fallback.path === "/" ? absoluteUrl(text(settings?.default_canonical_url)) : undefined) ??
    `${siteConfig.url}${fallback.path === "/" ? "" : fallback.path}`;
  const image =
    absoluteUrl(text(cmsSeoPage?.og_image_url) ?? text(cmsSeoPage?.og_image) ?? fallback.ogImage) ??
    absoluteUrl(text(settings?.default_og_image_url)) ??
    `${siteConfig.url}/og-default.png`;
  const twitterImage =
    absoluteUrl(text(cmsSeoPage?.twitter_image_url) ?? text(cmsSeoPage?.twitter_image)) ??
    absoluteUrl(text(settings?.default_twitter_image_url)) ??
    image;

  const robotsIndex = booleanValue(cmsSeoPage?.robots_index);
  const robotsFollow = booleanValue(cmsSeoPage?.robots_follow);
  const noIndex = fallback.noIndex || robotsIndex === false;

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: robotsFollow ?? false }
      : { index: true, follow: robotsFollow ?? true, "max-image-preview": "large" },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: text(settings?.default_site_title) ?? siteConfig.name,
      title: text(cmsSeoPage?.og_title) ?? title,
      description: text(cmsSeoPage?.og_description) ?? description,
      locale: siteConfig.locale,
      images: [{ url: image, width: 1200, height: 630, alt: text(cmsSeoPage?.og_title) ?? title }],
      ...(fallback.lastModified ? { modifiedTime: fallback.lastModified } : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      title: text(cmsSeoPage?.twitter_title) ?? text(cmsSeoPage?.og_title) ?? title,
      description: text(cmsSeoPage?.twitter_description) ?? text(cmsSeoPage?.og_description) ?? description,
      images: [twitterImage],
    },
  };
}

export async function buildMetadataWithCms(path: string, fallback: PageSeoInput): Promise<Metadata> {
  const [cmsSeoPage, settings] = await Promise.all([getSeoPageByPath(path), getCmsSettings()]);
  return buildMetadataFromCms(cmsSeoPage, fallback, settings);
}
