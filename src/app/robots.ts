import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getCmsRobots } from "@/lib/cms";

function booleanValue(value: unknown): boolean | undefined {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  return undefined;
}

function directives(content: string | null | undefined, directive: "Allow" | "Disallow"): string[] {
  if (!content) return [];
  const pattern = new RegExp(`^${directive}:\\s*(.+)$`, "gim");
  return Array.from(content.matchAll(pattern))
    .map((match) => match[1]?.trim())
    .filter((value): value is string => Boolean(value));
}

function safeSitemap(value: string | null | undefined): string {
  if (!value) return `${siteConfig.url}/sitemap.xml`;

  try {
    const url = new URL(value, siteConfig.url);
    return url.origin === new URL(siteConfig.url).origin ? url.toString() : `${siteConfig.url}/sitemap.xml`;
  } catch {
    return `${siteConfig.url}/sitemap.xml`;
  }
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const cmsRobots = await getCmsRobots();
  const allows = directives(cmsRobots?.content, "Allow");
  const disallows = directives(cmsRobots?.content, "Disallow");
  const indexable = booleanValue(cmsRobots?.default_index);

  return {
    rules: [
      {
        userAgent: "*",
        ...(indexable === false ? { disallow: "/" } : { allow: allows.length ? allows : "/" }),
        ...(indexable !== false && disallows.length ? { disallow: disallows } : {}),
      },
    ],
    sitemap: safeSitemap(cmsRobots?.sitemap_url),
  };
}
