import type { Faq } from "@/types/content";

export type LandingFamily = "products" | "modules" | "industries" | "solutions";
export type LandingVariant = "product" | "module" | "industry" | "solution";

export interface LandingFeature {
  icon: string; // must exist in the static icon registry
  title: string;
  description: string;
}

export interface LandingStep {
  title: string;
  description: string;
}

export interface LandingProblem {
  problem: string;
  solution: string;
}

export interface LandingUseCase {
  title: string;
  description: string;
}

/**
 * One SEO landing page. Every field is plain data so the future admin
 * panel can serve the same shape over the API without frontend changes.
 */
export interface LandingPage {
  slug: string;
  family: LandingFamily;
  /** Optional override when a page needs a presentation style outside its family default. */
  variant?: LandingVariant;
  name: string; // short name used in related-links and hubs
  eyebrow: string;
  title: string; // the single visible H1
  metaTitle: string;
  metaDescription: string;
  intro: string;
  heroBullets?: string[];
  problems?: LandingProblem[];
  features?: LandingFeature[];
  workflow?: LandingStep[];
  benefits?: string[];
  useCases?: LandingUseCase[];
  faqs: Faq[];
  /** Related pages as family/slug refs, resolved by helpers. */
  related: { family: LandingFamily; slug: string }[];
  ctaHeading?: string;
}
