import { siteConfig } from "@/config/site";
import { contactConfig, getOfficesForDisplay } from "@/config/contact";
import { company, socialLinks } from "@/data/company";
import type { CmsSettings } from "@/lib/cms";
import { cmsText, safeUrl, stringArray } from "@/lib/cms-content";
import type { Faq } from "@/types/content";

/**
 * JSON-LD builders. Each returns a plain object rendered via <JsonLd/>.
 * Only attach schema types that genuinely describe the page.
 * Article / HowTo / Product builders will be added with their pages in
 * Phases 2-4 so no unused schema ships now.
 */

export function organizationJsonLd(settings?: CmsSettings | null) {
  const cmsSameAs = stringArray(settings?.same_as_social_links, 12)
    .map((link) => safeUrl(link, { allowRelative: false }))
    .filter((link): link is string => Boolean(link));
  const sameAs = cmsSameAs.length ? cmsSameAs : socialLinks.map((s) => s.href);
  const primaryOffice = getOfficesForDisplay().find((office) => office.isPrimary) ?? getOfficesForDisplay()[0];
  const contactEmail = cmsText(settings?.contact_email, 120) ?? contactConfig.infoEmail;
  const contactPhone =
    cmsText(settings?.contact_phone_india, 80) ??
    cmsText(settings?.contact_phone_singapore, 80) ??
    cmsText(settings?.contact_phone_malaysia, 80) ??
    primaryOffice?.phoneDisplay;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: cmsText(settings?.company_name, 120) ?? siteConfig.name,
    url: siteConfig.url,
    logo: safeUrl(settings?.company_logo_url) ?? `${siteConfig.url}/logo.svg`,
    email: contactEmail,
    ...(contactPhone ? { telephone: contactPhone } : {}),
    foundingDate: String(company.foundedYear),
    parentOrganization: { "@type": "Organization", name: company.parent },
    address: {
      "@type": "PostalAddress",
      ...(cmsText(settings?.address, 260) ? { streetAddress: cmsText(settings?.address, 260) } : {}),
      addressLocality: company.address.addressLocality,
      addressRegion: company.address.addressRegion,
      addressCountry: company.address.addressCountry,
    },
    sameAs,
  };
}

export function webSiteJsonLd(settings?: CmsSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: cmsText(settings?.default_site_title, 120) ?? siteConfig.name,
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
