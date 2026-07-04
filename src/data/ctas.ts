import type { Cta } from "@/types/content";

/**
 * Primary CTAs. Until the dedicated /book-demo, /request-pricing and
 * /contact pages ship in Phase 3, all conversion CTAs anchor to the
 * homepage demo form (#book-demo) so no CTA ever dead-ends in a 404.
 * When Phase 3 lands, update the hrefs here — one file, site-wide.
 */
export const primaryCtas: Record<string, Cta> = {
  bookDemo: { label: "Book a Free Demo", href: "/#book-demo", variant: "primary" },
  requestPricing: { label: "Request Pricing", href: "/#book-demo", variant: "secondary" },
  talkToSales: { label: "Talk to Sales", href: "/#book-demo", variant: "ghost" },
  startTrial: { label: "Start Free Trial", href: "/#book-demo", variant: "primary" },
};
