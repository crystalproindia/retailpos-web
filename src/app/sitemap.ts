import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getArticles, getCmsSitemap, type CmsSitemapEntry } from "@/lib/cms";
import { articleSlug } from "@/lib/cms-articles";
import { allLandingPages } from "@/lib/landing-pages/registry";
import { pagePath } from "@/lib/landing-pages/helpers";

type SitemapEntry = MetadataRoute.Sitemap[number];
type ChangeFrequency = NonNullable<SitemapEntry["changeFrequency"]>;

const allowedChangeFrequencies = new Set<ChangeFrequency>([
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]);

function normalizeUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) return null;
  try {
    const url = new URL(pathOrUrl, siteConfig.url);
    if (url.origin !== new URL(siteConfig.url).origin) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function changeFrequency(value: string | null | undefined, fallback: ChangeFrequency): ChangeFrequency {
  return allowedChangeFrequencies.has(value as ChangeFrequency) ? (value as ChangeFrequency) : fallback;
}

function priority(value: number | string | null | undefined, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(1, Math.max(0, parsed));
}

function lastModified(value: string | null | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function cmsEntryToSitemap(entry: CmsSitemapEntry): SitemapEntry | null {
  const url = normalizeUrl(entry.url ?? entry.path);
  if (!url) return null;
  const modified = lastModified(entry.lastModified ?? entry.lastmod);

  return {
    url,
    changeFrequency: changeFrequency(entry.changeFrequency ?? entry.changefreq, "weekly"),
    priority: priority(entry.priority, 0.5),
    ...(modified ? { lastModified: modified } : {}),
  };
}

function dedupe(entries: SitemapEntry[]): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}

/**
 * Sitemap starts from the local route registry, then safely merges public CMS
 * sitemap rows and articles when the Command Center API is available.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/products",
    "/modules",
    "/industries",
    "/solutions",
    "/blog",
    "/about",
    "/contact",
    "/pricing",
    "/book-demo",
    "/privacy-policy",
    "/terms",
    "/cookie-policy",
  ];

  const [cmsEntries, articles] = await Promise.all([getCmsSitemap(), getArticles()]);
  const localEntries: SitemapEntry[] = [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...allLandingPages().map((page) => ({
      url: `${siteConfig.url}${pagePath(page)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const articleEntries: SitemapEntry[] = articles
    .map((article) => articleSlug(article))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({
      url: `${siteConfig.url}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return dedupe([
    ...localEntries,
    ...articleEntries,
    ...cmsEntries.map(cmsEntryToSitemap).filter((entry): entry is SitemapEntry => Boolean(entry)),
  ]);
}
