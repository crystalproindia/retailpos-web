import { siteConfig } from "@/config/site";
import { company, socialLinks } from "@/data/company";
import type { Faq } from "@/types/content";

/**
 * JSON-LD builders. Each returns a plain object rendered via <JsonLd/>.
 * Only attach schema types that genuinely describe the page.
 * Article / HowTo / Product builders will be added with their pages in
 * Phases 2-4 so no unused schema ships now.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    foundingDate: String(company.foundedYear),
    parentOrganization: { "@type": "Organization", name: company.parent },
    address: {
      "@type": "PostalAddress",
      addressLocality: company.address.addressLocality,
      addressRegion: company.address.addressRegion,
      addressCountry: company.address.addressCountry,
    },
    sameAs: socialLinks.map((s) => s.href),
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function softwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Retail ERP and Point of Sale",
    operatingSystem: "Web, Windows, Android",
    description: siteConfig.defaultDescription,
    url: siteConfig.url,
    publisher: { "@type": "Organization", name: company.parent },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
