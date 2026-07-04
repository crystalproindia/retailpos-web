/** Global site configuration. Canonical source for company + product facts. */

export const siteConfig = {
  name: "RetailPOS.biz",
  legalName: "RetailPOS.biz — a CrystalPro Technologies product",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://retailpos.biz",
  titleTemplate: "%s | RetailPOS.biz",
  defaultTitle: "RetailPOS.biz — Retail ERP, POS & AI Retail Management Platform",
  defaultDescription:
    "RetailPOS.biz is a complete retail ERP and POS platform: billing, inventory, CRM, accounting, analytics, omnichannel and AI-powered retail management for single stores, chains and enterprises.",
  locale: "en_IN",
  twitterHandle: "@retailposbiz",
} as const;

export const analyticsConfig = {
  /**
   * Central switchboard for future tracking integrations.
   * IDs are injected via environment variables by the admin panel/backend.
   * No fake IDs are shipped; providers stay inactive until an ID exists.
   */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  linkedInPartnerId: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID,
  searchConsoleVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
} as const;
