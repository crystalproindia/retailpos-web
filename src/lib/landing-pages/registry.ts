import type { LandingFamily, LandingPage } from "./types";
import { productPages } from "@/data/landing-pages/products";
import { modulePages } from "@/data/landing-pages/modules";
import { industryPages } from "@/data/landing-pages/industries";
import { solutionPages } from "@/data/landing-pages/solutions";

/** Central registry: single source for routing, sitemap and related links. */
const families: Record<LandingFamily, LandingPage[]> = {
  products: productPages,
  modules: modulePages,
  industries: industryPages,
  solutions: solutionPages,
};

export function getFamilyPages(family: LandingFamily): LandingPage[] {
  return families[family];
}

export function getPage(family: LandingFamily, slug: string): LandingPage | undefined {
  return families[family].find((p) => p.slug === slug);
}

export function allLandingPages(): LandingPage[] {
  return Object.values(families).flat();
}

export function isImplemented(family: LandingFamily, slug: string): boolean {
  return Boolean(getPage(family, slug));
}
