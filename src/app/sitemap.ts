import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allLandingPages } from "@/lib/landing-pages/registry";
import { pagePath } from "@/lib/landing-pages/helpers";

/**
 * Sitemap generated from the same registry that drives routing, so a page
 * cannot exist without a sitemap entry or vice versa. lastModified is
 * omitted until the admin panel supplies real modification dates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/modules",
    "/industries",
    "/solutions",
    "/about",
    "/contact",
    "/pricing",
    "/book-demo",
  ];

  return [
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
}
