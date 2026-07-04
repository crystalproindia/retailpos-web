import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageSeoInput {
  title: string;
  description: string;
  path: string; // e.g. "/products/pos-software"
  noIndex?: boolean;
  ogImage?: string;
  lastModified?: string; // ISO date, surfaced from the admin panel later
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
