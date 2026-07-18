import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { products } from "../src/data/products.ts";
import { erpModules } from "../src/data/modules.ts";
import { industries } from "../src/data/industries.ts";
import { solutions } from "../src/data/solutions.ts";
import { caseStudies } from "../src/data/case-studies.ts";
import { company, socialLinks } from "../src/data/company.ts";
import { contactConfig } from "../src/config/contact.ts";
import { primaryCtas } from "../src/data/ctas.ts";
import { homepageFaqs } from "../src/data/faqs.ts";
import { trustMetrics, clientLogos } from "../src/data/trust.ts";
import { productPages } from "../src/data/landing-pages/products.ts";
import { modulePages } from "../src/data/landing-pages/modules.ts";
import { industryPages } from "../src/data/landing-pages/industries.ts";
import { solutionPages } from "../src/data/landing-pages/solutions.ts";

const OUTPUT_DIR = "cms-export";
const MANIFEST_PATH = `${OUTPUT_DIR}/retailpos-content.json`;
const REPORT_PATH = `${OUTPUT_DIR}/retailpos-content-report.md`;

const sectionTypes = new Set([
  "hero",
  "feature_grid",
  "trust_metrics",
  "client_logos",
  "case_study_grid",
  "product_grid",
  "module_grid",
  "industry_grid",
  "solution_grid",
  "faq",
  "testimonial",
  "pricing",
  "cta",
  "rich_text",
  "stats",
  "image_text",
  "custom_json",
]);

const warnings = [
  "Platform import documentation only guarantees pages, case_studies and settings. Navigation, footer, contact, WhatsApp, trust metrics and logo metadata are exported inside public settings for review/import mapping.",
  "SEO metadata is retained on page records and in settings.seo_metadata, but platform import service may require follow-up mapping to CMS SEO fields.",
  "Newrie London is exported as draft framework content only. Optional claims require approval before publication.",
];
const skipped = [];

function section(sectionKey, sectionType, title, options = {}) {
  return {
    section_key: sectionKey,
    section_type: sectionType,
    title,
    subtitle: options.subtitle ?? null,
    content: options.content ?? null,
    settings: options.settings ?? {},
    sort_order: options.sort_order,
    is_active: options.is_active ?? true,
  };
}

function page(entry) {
  return {
    slug: entry.slug,
    route_path: entry.route_path,
    title: entry.title,
    h1: entry.h1 ?? entry.title,
    page_type: entry.page_type ?? "standard",
    subtitle: entry.subtitle ?? null,
    hero_content: entry.hero_content ?? entry.subtitle ?? null,
    intro_content: entry.intro_content ?? null,
    body_content: entry.body_content ?? null,
    footer_seo_content: entry.footer_seo_content ?? null,
    meta_title: entry.meta_title ?? entry.title,
    meta_description: entry.meta_description ?? entry.subtitle ?? entry.hero_content ?? null,
    status: "draft",
    sort_order: entry.sort_order,
    sections: entry.sections.map((item, index) => ({ ...item, sort_order: item.sort_order ?? index + 1 })),
  };
}

function cardItems(items, hrefPrefix = "") {
  return items.map((item) => ({
    title: item.name,
    description: item.description ?? item.tagline,
    url: hrefPrefix ? `${hrefPrefix}/${item.slug}` : undefined,
    icon_key: item.icon,
    slug: item.slug,
  }));
}

function landingPageToCms(entry, sortOrder) {
  const gridSections = [];
  if (entry.features?.length) {
    gridSections.push(section(`${entry.family}.${entry.slug}.features`, "feature_grid", "Features", { settings: { items: entry.features } }));
  }
  if (entry.problems?.length) {
    gridSections.push(section(`${entry.family}.${entry.slug}.problems`, "custom_json", "Problems and RetailPOS responses", { settings: { items: entry.problems } }));
  }
  if (entry.workflow?.length) {
    gridSections.push(section(`${entry.family}.${entry.slug}.workflow`, "feature_grid", "Workflow", { settings: { items: entry.workflow.map((step) => ({ title: step.title, description: step.description })) } }));
  }
  if (entry.benefits?.length) {
    gridSections.push(section(`${entry.family}.${entry.slug}.benefits`, "feature_grid", "Benefits", { settings: { items: entry.benefits.map((benefit) => ({ title: benefit, description: benefit })) } }));
  }
  if (entry.useCases?.length) {
    gridSections.push(section(`${entry.family}.${entry.slug}.use_cases`, "feature_grid", "Use cases", { settings: { items: entry.useCases } }));
  }

  return page({
    slug: `${entry.family}-${entry.slug}`,
    route_path: `/${entry.family}/${entry.slug}`,
    title: entry.name,
    h1: entry.title,
    page_type: entry.family.replace(/s$/, ""),
    subtitle: entry.intro,
    hero_content: entry.intro,
    intro_content: entry.intro,
    footer_seo_content: entry.seoFooterContent ?? null,
    meta_title: entry.metaTitle,
    meta_description: entry.metaDescription,
    sort_order: sortOrder,
    sections: [
      section(`${entry.family}.${entry.slug}.hero`, "hero", entry.title, {
        subtitle: entry.intro,
        settings: {
          eyebrow: entry.eyebrow,
          bullets: entry.heroBullets ?? [],
          primary_cta: { label: entry.primaryCtaLabel ?? primaryCtas.bookDemo.label, url: entry.primaryCtaHref ?? primaryCtas.bookDemo.href },
          secondary_cta: entry.secondaryCtaLabel ? { label: entry.secondaryCtaLabel, url: entry.secondaryCtaHref ?? "/contact" } : null,
        },
      }),
      ...gridSections,
      section(`${entry.family}.${entry.slug}.faq`, "faq", `${entry.name} questions`, { settings: { items: entry.faqs } }),
      section(`${entry.family}.${entry.slug}.cta`, "cta", entry.ctaHeading ?? `See ${entry.name} in a RetailPOS demo`, {
        settings: {
          primary_cta: { label: primaryCtas.bookDemo.label, url: primaryCtas.bookDemo.href },
          secondary_cta: { label: primaryCtas.talkToSales.label, url: primaryCtas.talkToSales.href },
        },
      }),
    ],
  });
}

function navigationItems() {
  return [
    ...["Products", "Modules", "Industries", "Solutions"].map((label) => ({ label, url: `/${label.toLowerCase()}`, location: "header" })),
    { label: "Pricing", url: "/pricing", location: "header" },
    { label: "Book Demo", url: "/book-demo", location: "mobile" },
    { label: "Talk to Sales", url: "/contact", location: "mobile" },
    { label: "Case Studies", url: "/case-studies", location: "header", parent_label: "Company" },
  ];
}

function footerLinks() {
  return [
    { title: "Products", links: cardItems(products, "/products").map(({ title, url }) => ({ label: title, url })) },
    { title: "Modules", links: cardItems(erpModules, "/modules").map(({ title, url }) => ({ label: title, url })) },
    { title: "Industries", links: cardItems(industries, "/industries").map(({ title, url }) => ({ label: title, url })) },
    { title: "Solutions", links: cardItems(solutions, "/solutions").map(({ title, url }) => ({ label: title, url })) },
    { title: "Company", links: [
      { label: "About", url: "/about" },
      { label: "Case Studies", url: "/case-studies" },
      { label: "Contact", url: "/contact" },
      { label: "Pricing", url: "/pricing" },
      { label: "Book a Demo", url: "/book-demo" },
    ] },
  ];
}

const landingPages = [...productPages, ...modulePages, ...industryPages, ...solutionPages];

const pages = [
  page({
    slug: "home",
    route_path: "/",
    title: "RetailPOS.biz",
    h1: "Retail ERP, POS and AI for modern retail operations",
    page_type: "home",
    subtitle: "Run billing, inventory, purchasing, CRM, loyalty, accounting and analytics on one retail platform.",
    meta_title: "RetailPOS.biz — Retail ERP, POS & AI Retail Management Platform",
    meta_description: "Run billing, inventory, purchasing, CRM, loyalty, accounting and analytics on one retail platform. GST-ready POS with offline mode, multi-store control and AI demand forecasting.",
    sort_order: 1,
    sections: [
      section("home.hero", "hero", "Retail ERP, POS and AI for modern retail operations", { subtitle: "Run billing, inventory, purchasing, CRM, loyalty, accounting and analytics on one retail platform." }),
      section("home.trust_metrics", "trust_metrics", "RetailPOS proof points", { settings: { items: trustMetrics.map(({ value, label, detail }) => ({ value, label, description: detail })) } }),
      section("home.client_logos", "client_logos", "Client logo metadata", { settings: { items: clientLogos } }),
      section("home.products", "product_grid", "RetailPOS products", { settings: { items: cardItems(products, "/products") } }),
      section("home.modules", "module_grid", "ERP modules", { settings: { items: cardItems(erpModules, "/modules") } }),
      section("home.industries", "industry_grid", "Industry coverage", { settings: { items: cardItems(industries, "/industries") } }),
      section("home.solutions", "solution_grid", "Retail solutions", { settings: { items: cardItems(solutions, "/solutions") } }),
      section("home.case_studies", "case_study_grid", "Case studies", { settings: { items: caseStudies.map((study) => ({ title: study.title, description: study.summary, url: `/case-studies/${study.slug}`, icon_key: study.icon, slug: study.slug })) } }),
      section("home.faq", "faq", "RetailPOS questions", { settings: { items: homepageFaqs } }),
      section("home.final_cta", "cta", "See RetailPOS running on your own products", { settings: { primary_cta: { label: primaryCtas.bookDemo.label, url: primaryCtas.bookDemo.href }, secondary_cta: { label: primaryCtas.talkToSales.label, url: primaryCtas.talkToSales.href } } }),
    ],
  }),
  page({
    slug: "products",
    route_path: "/products",
    title: "RetailPOS Products",
    page_type: "product",
    subtitle: "Explore the RetailPOS product suite for POS, ERP, inventory, accounting, CRM, analytics and AI retail workflows.",
    sections: [
      section("products.hero", "hero", "RetailPOS product suite", { subtitle: "One retail platform with focused product surfaces for each operating need." }),
      section("products.grid", "product_grid", "Products", { settings: { items: cardItems(products, "/products") } }),
    ],
    sort_order: 2,
  }),
  page({
    slug: "modules",
    route_path: "/modules",
    title: "RetailPOS ERP Modules",
    page_type: "module",
    subtitle: "ERP modules that switch on as retail operations grow.",
    sections: [
      section("modules.hero", "hero", "ERP modules that switch on as you grow", { subtitle: "Procurement, inventory, sales, finance, CRM, loyalty, warehouse and reporting modules for retail teams." }),
      section("modules.grid", "module_grid", "Modules", { settings: { items: cardItems(erpModules, "/modules") } }),
    ],
    sort_order: 3,
  }),
  page({
    slug: "industries",
    route_path: "/industries",
    title: "RetailPOS Industries",
    page_type: "industry",
    subtitle: "Retail workflows for supermarkets, grocery, fashion, footwear, electronics, pharmacy and more.",
    sections: [
      section("industries.hero", "hero", "Built-in workflows for retail verticals", { subtitle: "Industry pages describe the operational defaults RetailPOS supports for each business type." }),
      section("industries.grid", "industry_grid", "Industries", { settings: { items: cardItems(industries, "/industries") } }),
    ],
    sort_order: 4,
  }),
  page({
    slug: "solutions",
    route_path: "/solutions",
    title: "RetailPOS Solutions",
    page_type: "solution",
    subtitle: "Solutions matched to store size, operating model and rollout stage.",
    sections: [
      section("solutions.hero", "hero", "Retail solutions matched to your stage and scale", { subtitle: "Start with small business POS, scale to multi-store control, franchise operations, omnichannel and AI-powered retail." }),
      section("solutions.grid", "solution_grid", "Solutions", { settings: { items: cardItems(solutions, "/solutions") } }),
    ],
    sort_order: 5,
  }),
  page({
    slug: "pricing",
    route_path: "/pricing",
    title: "RetailPOS Pricing",
    page_type: "pricing",
    subtitle: "RetailPOS pricing depends on store count, modules, integrations and implementation scope.",
    meta_title: "RetailPOS Pricing — Built Around Your Stores, Modules & Scope",
    meta_description: "RetailPOS pricing depends on store count, modules, integrations and implementation scope. See what shapes your quote and request pricing for your setup.",
    sections: [
      section("pricing.hero", "hero", "Pricing built around your operation", { subtitle: "RetailPOS is priced on what you actually run: stores, modules, integrations and implementation scope." }),
      section("pricing.factors", "pricing", "What shapes your quote", { settings: { items: [
        { title: "Stores & counters", description: "How many outlets and billing counters run the system." },
        { title: "Modules enabled", description: "POS-only differs from a full ERP with warehouse and HR." },
        { title: "Integrations", description: "E-commerce, marketplaces, payments and custom API work." },
        { title: "Implementation scope", description: "Data migration, hardware setup and training coverage." },
      ] } }),
    ],
    sort_order: 6,
  }),
  page({
    slug: "contact",
    route_path: "/contact",
    title: "Contact RetailPOS",
    page_type: "contact",
    subtitle: "Talk to the RetailPOS team for sales, support, demos and regional enquiries.",
    meta_title: "Contact RetailPOS.biz — Sales, Demo & Support",
    meta_description: "Contact RetailPOS.biz for product demos, pricing, implementation questions and regional sales support in India, Malaysia and Singapore.",
    sections: [
      section("contact.hero", "hero", "Talk to the RetailPOS team", { subtitle: "Write to us or send the form and the right person will reply." }),
      section("contact.regional_contacts", "custom_json", "Regional contact details", { settings: { offices: contactConfig.offices, emails: { info: contactConfig.infoEmail, global: contactConfig.globalEmail } } }),
    ],
    sort_order: 7,
  }),
  page({
    slug: "book-demo",
    route_path: "/book-demo",
    title: "Book a Free Demo",
    page_type: "standard",
    subtitle: "Thirty minutes, your items on screen, your questions answered.",
    meta_title: "Book a Free Demo — See RetailPOS on Your Own Products",
    meta_description: "Book a free 30-minute RetailPOS demo: your items, your industry's workflows and straight answers on scope and pricing. No obligation.",
    sections: [
      section("book-demo.hero", "hero", "Book a free RetailPOS demo", { subtitle: "Thirty minutes, your items on screen, your questions answered." }),
      section("book-demo.expectations", "feature_grid", "What happens during the demo", { settings: { items: [
        { title: "30-minute walkthrough", description: "A focused working session with a retail consultant, not a generic slideshow." },
        { title: "Live software", description: "See billing, stock, purchase, reporting and approvals in the product interface." },
        { title: "Questions answered", description: "Ask about workflows, implementation, integrations, support, training and pricing scope." },
      ] } }),
    ],
    sort_order: 8,
  }),
  page({
    slug: "case-studies",
    route_path: "/case-studies",
    title: "Retail POS Case Studies",
    page_type: "case_studies",
    subtitle: "Explore generic and approved RetailPOS case-study scenarios.",
    meta_title: "Retail POS Case Studies | RetailPOS.biz",
    meta_description: "Explore how RetailPOS.biz helps retail businesses improve billing, inventory, reporting, customer management, and multi-store operations with AI-powered retail ERP and POS software.",
    sections: [
      section("case-studies.hero", "hero", "Retail POS Case Studies", { subtitle: "Anonymous retail scenarios by business type, with approved claims only." }),
      section("case-studies.grid", "case_study_grid", "Case studies", { settings: { items: caseStudies.map((study) => ({ title: study.title, description: study.summary, url: `/case-studies/${study.slug}`, icon_key: study.icon, slug: study.slug })) } }),
    ],
    sort_order: 9,
  }),
  ...landingPages.map((entry, index) => landingPageToCms(entry, 100 + index)),
];

const case_studies = [
  ...caseStudies.map((study, index) => ({
    slug: study.slug,
    title: study.title,
    client_name: "",
    industry: study.businessType,
    location: null,
    project_type: study.businessType,
    short_summary: study.summary,
    challenge: study.challenge,
    solution: study.solution,
    results: study.result,
    metrics: { approval_note: "No quantified metrics are claimed in this approved static scenario." },
    status: "draft",
    sort_order: index + 1,
  })),
  {
    slug: "newrie-london",
    title: "Newrie London",
    client_name: "",
    industry: null,
    location: null,
    project_type: "Draft case study framework",
    short_summary: "Draft case study framework. Optional claims must be approved before publication.",
    challenge: "Draft framework only. Confirm approved challenge wording before publication.",
    solution: "Draft framework only. Confirm approved RetailPOS solution wording before publication.",
    results: "Draft framework only. Optional claims require approval before publication.",
    metrics: { approval_required: "Optional claims require approval before publication." },
    status: "draft",
    sort_order: 50,
  },
];

const settings = {
  company_name: contactConfig.companyName,
  info_email: contactConfig.infoEmail,
  global_email: contactConfig.globalEmail,
  default_whatsapp_message: contactConfig.defaultWhatsAppMessage,
  regional_contacts: contactConfig.offices,
  whatsapp_settings: contactConfig.offices.map((office) => ({
    country: office.country,
    country_code: office.countryCode,
    number: office.whatsappE164,
    display: office.whatsappDisplay,
    is_enabled: office.verified,
  })),
  navigation: navigationItems(),
  mobile_navigation: navigationItems().filter((item) => item.location === "mobile"),
  footer_links: footerLinks(),
  social_links: socialLinks,
  trust_metrics: trustMetrics,
  client_logos: clientLogos,
  seo_metadata: Object.fromEntries(pages.map((entry) => [entry.slug, { title: entry.meta_title, description: entry.meta_description, route_path: entry.route_path }])),
  import_notes: [
    "Import as draft first. Do not mass publish without approval.",
    "Static website fallback remains the public source of truth until individual CMS pages are reviewed and published.",
  ],
};

const manifest = {
  manifest_version: "retailpos.website-content.v1",
  source: "retailpos-web static approved content",
  import_mode: "draft_review",
  pages,
  case_studies,
  settings,
};

function collectSlugs(items, label, errors) {
  const seen = new Set();
  for (const item of items) {
    if (!item.slug) errors.push(`${label} missing slug: ${item.title ?? "untitled"}`);
    if (seen.has(item.slug)) errors.push(`Duplicate ${label} slug: ${item.slug}`);
    seen.add(item.slug);
  }
}

function isValidUrl(value) {
  if (typeof value !== "string" || !value) return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function walk(value, visitor, path = []) {
  visitor(value, path);
  if (Array.isArray(value)) value.forEach((item, index) => walk(item, visitor, [...path, String(index)]));
  else if (value && typeof value === "object") Object.entries(value).forEach(([key, nested]) => walk(nested, visitor, [...path, key]));
}

function validate(value) {
  const errors = [];
  collectSlugs(value.pages, "page", errors);
  collectSlugs(value.case_studies, "case-study", errors);

  for (const entry of value.pages) {
    if (!entry.title) errors.push(`Page ${entry.slug} missing title`);
    if (!["draft", "review", "published", "archived"].includes(entry.status)) errors.push(`Page ${entry.slug} has invalid status ${entry.status}`);
    for (const item of entry.sections ?? []) {
      if (!item.section_key) errors.push(`Page ${entry.slug} has section without section_key`);
      if (!sectionTypes.has(item.section_type)) errors.push(`Page ${entry.slug} has unsupported section type ${item.section_type}`);
      try {
        JSON.stringify(item.settings ?? {});
      } catch {
        errors.push(`Page ${entry.slug} section ${item.section_key} has invalid JSON settings`);
      }
      if (!item.title && !item.content && !Object.keys(item.settings ?? {}).length) errors.push(`Page ${entry.slug} section ${item.section_key} is empty`);
    }
  }

  for (const entry of value.case_studies) {
    if (!entry.title) errors.push(`Case study ${entry.slug} missing title`);
    if (entry.slug === "newrie-london" && entry.status !== "draft") errors.push("Newrie London must remain draft");
    if (entry.status === "published") errors.push(`Case study ${entry.slug} is marked published; export must import drafts only`);
  }

  walk(value, (node, path) => {
    const key = path.at(-1) ?? "";
    if (/(token|secret|password|api[_-]?key|private[_-]?key)/i.test(key)) errors.push(`Secret-like key found at ${path.join(".")}`);
    if (typeof node !== "string") return;
    if (/<script|javascript:|onerror=|onload=/i.test(node)) errors.push(`Executable content found at ${path.join(".")}`);
    if (/(token|secret|password|api[_-]?key)\s*[:=]/i.test(node)) errors.push(`Secret-like value found at ${path.join(".")}`);
    if (/[A-Za-z0-9_-]{40,}/.test(node) && !node.startsWith("https://www.google.com/s2/favicons")) errors.push(`High-entropy value found at ${path.join(".")}`);
    if (/(url|href|website|link)$/i.test(key) && !isValidUrl(node)) errors.push(`Invalid URL at ${path.join(".")}: ${node}`);
  });

  return errors;
}

function buildReport(errors) {
  const sectionCount = pages.reduce((total, entry) => total + entry.sections.length, 0);
  const navigationCount = settings.navigation.length;
  return [
    "# RetailPOS CMS Content Export Report",
    "",
    "## Summary",
    "",
    `- Pages exported: ${pages.length}`,
    `- Sections exported: ${sectionCount}`,
    `- Case studies exported: ${case_studies.length}`,
    `- Navigation items exported: ${navigationCount}`,
    `- Settings groups exported: ${Object.keys(settings).length}`,
    `- Warnings: ${warnings.length}`,
    `- Skipped items: ${skipped.length}`,
    `- Validation errors: ${errors.length}`,
    "",
    "## Warnings",
    "",
    ...warnings.map((warning) => `- ${warning}`),
    "",
    "## Skipped Items",
    "",
    ...(skipped.length ? skipped.map((item) => `- ${item}`) : ["- None"]),
    "",
    "## Validation",
    "",
    ...(errors.length ? errors.map((error) => `- ERROR: ${error}`) : ["- Passed"]),
    "",
  ].join("\n");
}

const errors = validate(manifest);
const json = `${JSON.stringify(manifest, null, 2)}\n`;
const hash = createHash("sha256").update(json).digest("hex");
const report = `${buildReport(errors)}\n## Determinism\n\n- Manifest SHA-256: ${hash}\n`;

await mkdir(OUTPUT_DIR, { recursive: true });
await writeFile(MANIFEST_PATH, json, "utf8");
await writeFile(REPORT_PATH, report, "utf8");

const reread = await readFile(MANIFEST_PATH, "utf8");
if (reread !== json) {
  throw new Error("Export determinism check failed after writing manifest.");
}

if (errors.length) {
  console.error(`CMS export validation failed. See ${REPORT_PATH}`);
  process.exit(1);
}

console.log(`CMS content manifest written to ${MANIFEST_PATH}`);
console.log(`CMS content report written to ${REPORT_PATH}`);
console.log(`Manifest SHA-256: ${hash}`);
