import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Sitemap architecture. Phase 1 registers the live homepage; each later
 * phase appends its route groups here (products, modules, industries,
 * solutions, integrations, resources) as those pages ship, sourcing
 * lastModified from the admin panel when available.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
