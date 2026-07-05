import { industries } from "./industries";
import type { Industry } from "@/types/content";

export interface IndustryGroup {
  title: string;
  summary: string;
  capability: string;
  slugs: string[];
}

export const industryGroups: IndustryGroup[] = [
  {
    title: "General retail",
    summary: "High-volume billing and stock-heavy operations.",
    capability: "Fast checkout lanes, credit control, reorder rules and route-ready distribution.",
    slugs: ["supermarkets", "grocery-kirana", "wholesale-distribution", "franchise-retail"],
  },
  {
    title: "Fashion & lifestyle",
    summary: "Variant-driven retail with seasons and markdowns.",
    capability: "Size-colour matrix, season planning, markdown workflows and loyalty.",
    slugs: ["fashion-apparel", "footwear", "jewellery", "beauty-cosmetics", "sports-fitness"],
  },
  {
    title: "Specialised retail",
    summary: "Regulated and serialised inventory.",
    capability: "Batch & expiry, serial/IMEI tracking, warranties and made-to-order sales.",
    slugs: ["electronics", "pharmacy", "furniture"],
  },
  {
    title: "Food service",
    summary: "Orders across table, takeaway and delivery.",
    capability: "Kitchen display, recipes and channel-wise order management.",
    slugs: ["restaurants"],
  },
];

export function groupedIndustries(): { group: IndustryGroup; items: Industry[] }[] {
  return industryGroups.map((group) => ({
    group,
    items: group.slugs
      .map((slug) => industries.find((i) => i.slug === slug))
      .filter((i): i is Industry => Boolean(i)),
  }));
}
