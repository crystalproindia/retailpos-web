import type { LandingFamily, LandingPage } from "./types";
import { getPage } from "./registry";

export const familyMeta: Record<LandingFamily, { label: string; href: string; eyebrow: string }> = {
  products: { label: "Products", href: "/products", eyebrow: "Product" },
  modules: { label: "Modules", href: "/modules", eyebrow: "ERP Module" },
  industries: { label: "Industries", href: "/industries", eyebrow: "Industry" },
  solutions: { label: "Solutions", href: "/solutions", eyebrow: "Solution" },
};

export function pagePath(page: Pick<LandingPage, "family" | "slug">): string {
  return `/${page.family}/${page.slug}`;
}

export function resolveRelated(page: LandingPage): { label: string; href: string; description: string }[] {
  return page.related
    .map((ref) => getPage(ref.family, ref.slug))
    .filter((p): p is LandingPage => Boolean(p))
    .map((p) => ({ label: p.name, href: pagePath(p), description: p.metaDescription }));
}

export function breadcrumbsFor(page: LandingPage) {
  const fam = familyMeta[page.family];
  return [
    { name: "Home", path: "/" },
    { name: fam.label, path: fam.href },
    { name: page.name, path: pagePath(page) },
  ];
}
