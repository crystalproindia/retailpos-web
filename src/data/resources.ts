import type { ResourceItem } from "@/types/content";

/** Editorial placeholders; replaced by the CMS-driven resources platform in Phase 4. */
export const featuredResources: ResourceItem[] = [
  {
    slug: "what-is-retail-erp",
    type: "guide",
    title: "What is a Retail ERP? A plain-language buyer's guide",
    excerpt: "How ERP differs from standalone POS software, and how to know when your store has outgrown billing-only tools.",
    readMinutes: 8,
  },
  {
    slug: "reduce-stockouts-with-reorder-rules",
    type: "blog",
    title: "How reorder rules and forecasting reduce stockouts",
    excerpt: "A practical look at minimum levels, lead times and AI demand signals for everyday replenishment.",
    readMinutes: 6,
  },
  {
    slug: "multi-store-rollout-checklist",
    type: "guide",
    title: "The multi-store rollout checklist",
    excerpt: "Master data, pricing policy, transfer rules and training — what to prepare before outlet number two.",
    readMinutes: 7,
  },
];
