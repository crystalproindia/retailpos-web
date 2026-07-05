import type { Cta } from "@/types/content";

/** Primary CTAs — one file controls conversion targets site-wide. */
export const primaryCtas: Record<string, Cta> = {
  bookDemo: { label: "Book a Free Demo", href: "/book-demo", variant: "primary" },
  requestPricing: { label: "Request Pricing", href: "/pricing", variant: "secondary" },
  talkToSales: { label: "Talk to Sales", href: "/contact", variant: "ghost" },
  startTrial: { label: "Start Free Trial", href: "/book-demo", variant: "primary" },
};
