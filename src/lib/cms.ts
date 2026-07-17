import "server-only";

const CMS_API_PREFIX = "/api/public/cms";
const DEFAULT_TIMEOUT_MS = 5000;

export interface CmsSettings {
  default_site_title?: string | null;
  default_meta_description?: string | null;
  default_canonical_url?: string | null;
  default_og_image_url?: string | null;
  default_twitter_image_url?: string | null;
  company_name?: string | null;
  company_logo_url?: string | null;
  contact_phone_india?: string | null;
  contact_phone_singapore?: string | null;
  contact_phone_malaysia?: string | null;
  contact_email?: string | null;
  address?: string | null;
  same_as_social_links?: unknown;
  website_settings?: unknown;
}

export interface CmsPublicPage {
  slug?: string | null;
  route_path?: string | null;
  title?: string | null;
  h1?: string | null;
  subtitle?: string | null;
  hero_content?: string | null;
  intro_content?: string | null;
  body_content?: string | null;
  footer_seo_content?: string | null;
  primary_cta?: unknown;
  secondary_cta?: unknown;
  content_sections?: unknown;
  faq_items?: unknown;
  seo?: unknown;
  page_type?: string | null;
  sections?: unknown;
  is_published?: boolean | number | null;
  status?: string | null;
  published_at?: string | null;
}

export interface CmsSeoPage {
  path?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  og_image_url?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  twitter_image_url?: string | null;
  robots_index?: boolean | number | null;
  robots_follow?: boolean | number | null;
  schema_json?: unknown;
  intro_content?: string | null;
  footer_seo_content?: string | null;
  is_published?: boolean | number | null;
  status?: string | null;
  published_at?: string | null;
}

export interface CmsLandingPage {
  slug?: string | null;
  title?: string | null;
  hero_title?: string | null;
  hero_subtitle?: string | null;
  intro?: string | null;
  intro_content?: string | null;
  footer_seo_content?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  cta_heading?: string | null;
  cta_label?: string | null;
  cta_url?: string | null;
  hero_cta_label?: string | null;
  hero_cta_url?: string | null;
  primary_cta_label?: string | null;
  primary_cta_url?: string | null;
  secondary_cta_label?: string | null;
  secondary_cta_url?: string | null;
  faq_items?: unknown;
  faqs?: unknown;
  sections?: unknown;
  schema_json?: unknown;
  is_published?: boolean | number | null;
  status?: string | null;
  published_at?: string | null;
}

export interface CmsArticle {
  slug?: string | null;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  content_html?: string | null;
  body?: string | null;
  body_html?: string | null;
  category?: string | null;
  tags?: unknown;
  cover_image?: string | null;
  cover_image_url?: string | null;
  image_url?: string | null;
  cover_image_alt?: string | null;
  author_name?: string | null;
  read_minutes?: number | string | null;
  published_at?: string | null;
  updated_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  canonical_url?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: string | null;
  twitter_title?: string | null;
  twitter_description?: string | null;
  twitter_image?: string | null;
  schema_json?: unknown;
  is_published?: boolean | number | null;
  status?: string | null;
}

export interface CmsSitemapEntry {
  type?: string | null;
  path?: string | null;
  url?: string | null;
  priority?: number | string | null;
  changefreq?: string | null;
  changeFrequency?: string | null;
  lastmod?: string | null;
  lastModified?: string | null;
}

export interface CmsPublicCaseStudy {
  slug?: string | null;
  title?: string | null;
  client_name?: string | null;
  industry?: string | null;
  location?: string | null;
  business_type?: string | null;
  summary?: string | null;
  challenge?: string | null;
  solution?: string | null;
  results?: string | null;
  result?: string | null;
  outcome_metrics?: unknown;
  sections?: unknown;
  seo?: unknown;
  is_published?: boolean | number | null;
  status?: string | null;
  published_at?: string | null;
}

export interface CmsRobots {
  content?: string | null;
  default_index?: boolean | number | null;
  default_follow?: boolean | number | null;
  sitemap_url?: string | null;
}

export interface CmsRedirect {
  source?: string | null;
  from?: string | null;
  destination?: string | null;
  target?: string | null;
  to?: string | null;
  status_code?: number | string | null;
  status?: number | string | null;
  is_active?: boolean | number | null;
}

export interface CmsContentButton {
  label?: string | null;
  url?: string | null;
}

export type CmsContentSectionType =
  | "hero"
  | "feature_grid"
  | "benefits"
  | "product_highlights"
  | "industry_use_cases"
  | "module_details"
  | "faq"
  | "cta"
  | "testimonials"
  | "stats"
  | "comparison"
  | "footer_seo"
  | "trust_metrics"
  | "client_logos"
  | "rich_text"
  | "case_study_grid"
  | "custom";

export interface CmsContentSection {
  section_key?: string | null;
  section_type?: CmsContentSectionType | string | null;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  image_url?: string | null;
  primary_cta?: CmsContentButton | null;
  secondary_cta?: CmsContentButton | null;
  items?: unknown;
  is_enabled?: boolean | number | null;
  status?: string | null;
}

export interface CmsContentPage {
  page_key?: string | null;
  route_path?: string | null;
  page_type?: string | null;
  title?: string | null;
  sections?: unknown;
  status?: string | null;
  is_published?: boolean | number | null;
}

export interface CmsNavigationItem {
  label?: string | null;
  url?: string | null;
  location?: "header" | "footer" | "mobile" | string | null;
  parent_label?: string | null;
  opens_new_tab?: boolean | number | null;
  is_enabled?: boolean | number | null;
}

export interface CmsFooterBlock {
  block_key?: string | null;
  title?: string | null;
  content?: string | null;
  links?: unknown;
  is_enabled?: boolean | number | null;
}

function cmsBaseUrl(): string | null {
  const configured = process.env.RETAILPOS_CMS_API_BASE_URL?.trim();
  if (!configured) return null;
  return configured.replace(/\/+$/, "");
}

function cmsTimeoutMs(): number {
  const configured = Number(process.env.RETAILPOS_CMS_API_TIMEOUT_MS);
  return Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_TIMEOUT_MS;
}

function warn(message: string, error?: unknown) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[cms] ${message}`, error instanceof Error ? error.message : error ?? "");
  }
}

function endpointUrl(path: string): string | null {
  const base = cmsBaseUrl();
  if (!base) return null;
  let normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (base.endsWith(CMS_API_PREFIX) && normalizedPath.startsWith(`${CMS_API_PREFIX}/`)) {
    normalizedPath = normalizedPath.slice(CMS_API_PREFIX.length);
  }
  return `${base}${normalizedPath}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function unwrapData(value: unknown): unknown {
  if (isRecord(value) && "data" in value) return value.data;
  return value;
}

function arrayData<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (isRecord(value) && Array.isArray(value.data)) return value.data as T[];
  if (isRecord(value) && Array.isArray(value.items)) return value.items as T[];
  return [];
}

function isPublished(value: unknown): boolean {
  if (!isRecord(value)) return false;
  const status = typeof value.status === "string" ? value.status.toLowerCase() : "";
  if (status && !["published", "active"].includes(status)) return false;
  if ("is_published" in value) return value.is_published === true || value.is_published === 1;
  if ("published" in value) return value.published === true || value.published === 1;
  return true;
}

async function cmsFetch<T>(path: string, revalidate: number): Promise<T | null> {
  const url = endpointUrl(path);
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(cmsTimeoutMs()),
      next: { revalidate },
    });

    if (!response.ok) {
      if (response.status !== 404) warn(`request failed: ${path} (${response.status})`);
      return null;
    }

    const raw = (await response.json()) as unknown;
    const data = unwrapData(raw);
    if (data === null || data === undefined) return null;
    return data as T;
  } catch (error) {
    warn(`request errored: ${path}`, error);
    return null;
  }
}

export async function getCmsSettings(): Promise<CmsSettings | null> {
  const settings = await cmsFetch<CmsSettings>("/api/public/cms/settings", 300);
  return isRecord(settings) ? settings : null;
}

function text(value: unknown, maxLength = 1000): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength).trimEnd() : trimmed;
}

function pageSlugForPath(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (path === "/") return "home";
  return path.replace(/^\/+|\/+$/g, "").replace(/\//g, "-");
}

function seoFromPublicPage(page: CmsPublicPage): CmsSeoPage | null {
  if (!isRecord(page.seo)) return null;
  return {
    meta_title: text(page.seo.title) ?? text(page.seo.meta_title),
    meta_description: text(page.seo.description) ?? text(page.seo.meta_description),
    canonical_url: text(page.seo.canonical_url),
    robots_index: page.seo.robots_index as boolean | number | null | undefined,
    robots_follow: page.seo.robots_follow as boolean | number | null | undefined,
    schema_json: page.seo.schema_json,
    og_title: isRecord(page.seo.open_graph) ? text(page.seo.open_graph.title) : undefined,
    og_description: isRecord(page.seo.open_graph) ? text(page.seo.open_graph.description) : undefined,
    og_image_url: isRecord(page.seo.open_graph) ? text(page.seo.open_graph.image_url) : text(page.seo.image_url),
    twitter_title: isRecord(page.seo.twitter) ? text(page.seo.twitter.title) : undefined,
    twitter_description: isRecord(page.seo.twitter) ? text(page.seo.twitter.description) : undefined,
    twitter_image_url: isRecord(page.seo.twitter) ? text(page.seo.twitter.image_url) : undefined,
    is_published: page.is_published,
    status: page.status,
    published_at: page.published_at,
  };
}

function buttonFromPublic(value: unknown): CmsContentButton | null {
  if (!isRecord(value)) return null;
  return {
    label: text(value.label) ?? null,
    url: text(value.url) ?? null,
  };
}

function normalizePublicSections(page: CmsPublicPage): CmsContentSection[] {
  const sections: CmsContentSection[] = [];
  const primaryCta = buttonFromPublic(page.primary_cta);
  const secondaryCta = buttonFromPublic(page.secondary_cta);

  if (text(page.h1) || text(page.title) || text(page.subtitle) || text(page.hero_content)) {
    sections.push({
      section_key: "hero",
      section_type: "hero",
      title: text(page.h1) ?? text(page.title) ?? null,
      subtitle: text(page.subtitle) ?? text(page.hero_content) ?? null,
      body: text(page.hero_content) ?? null,
      primary_cta: primaryCta,
      secondary_cta: secondaryCta,
    });
  }

  if (text(page.body_content) || text(page.intro_content)) {
    sections.push({
      section_key: "body-content",
      section_type: "rich_text",
      title: text(page.intro_content) ? "Overview" : null,
      body: text(page.body_content) ?? text(page.intro_content) ?? null,
    });
  }

  if (Array.isArray(page.faq_items) && page.faq_items.length) {
    sections.push({
      section_key: "faq",
      section_type: "faq",
      title: "Common questions",
      items: page.faq_items,
    });
  }

  if (text(page.footer_seo_content)) {
    sections.push({
      section_key: "footer-seo",
      section_type: "footer_seo",
      title: "More about this page",
      body: text(page.footer_seo_content, 5000) ?? null,
    });
  }

  const rawSections = Array.isArray(page.sections) ? page.sections : Array.isArray(page.content_sections) ? page.content_sections : [];
  for (const section of rawSections) {
    if (isRecord(section)) sections.push(section as CmsContentSection);
  }

  return sections;
}

function contentPageFromPublicPage(page: CmsPublicPage): CmsContentPage {
  return {
    page_key: text(page.slug) ?? null,
    route_path: text(page.route_path) ?? (text(page.slug) ? `/${text(page.slug)}` : null),
    page_type: text(page.page_type) ?? null,
    title: text(page.title) ?? null,
    sections: normalizePublicSections(page),
    status: page.status,
    is_published: page.is_published,
  };
}

export async function getCmsPages(): Promise<CmsPublicPage[]> {
  const pages = await cmsFetch<CmsPublicPage[]>("/pages", 900);
  return arrayData<CmsPublicPage>(pages).filter(isPublished);
}

export async function getCmsPageBySlug(slug: string): Promise<CmsPublicPage | null> {
  const page = await cmsFetch<CmsPublicPage>(`/pages/${encodeURIComponent(slug)}`, 300);
  return isRecord(page) && isPublished(page) ? page : null;
}

export async function getCmsContentPageBySlug(slug: string): Promise<CmsContentPage | null> {
  const page = await getCmsPageBySlug(slug);
  return page ? contentPageFromPublicPage(page) : null;
}

export async function getSeoPageByPath(pathname: string): Promise<CmsSeoPage | null> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const seoPage = await cmsFetch<CmsSeoPage>(`/api/public/cms/seo-page?path=${encodeURIComponent(path)}`, 300);
  if (isRecord(seoPage) && isPublished(seoPage)) return seoPage;

  const publicPage = await getCmsPageBySlug(pageSlugForPath(path));
  return publicPage ? seoFromPublicPage(publicPage) : null;
}

export async function getLandingPageBySlug(slug: string): Promise<CmsLandingPage | null> {
  const page = await cmsFetch<CmsLandingPage>(`/api/public/cms/landing-pages/${encodeURIComponent(slug)}`, 300);
  return isRecord(page) && isPublished(page) ? page : null;
}

export async function getArticles(): Promise<CmsArticle[]> {
  const articles = await cmsFetch<CmsArticle[]>("/api/public/cms/articles", 900);
  return arrayData<CmsArticle>(articles).filter(isPublished);
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  const article = await cmsFetch<CmsArticle>(`/api/public/cms/articles/${encodeURIComponent(slug)}`, 900);
  return isRecord(article) && isPublished(article) ? article : null;
}

export async function getCmsSitemap(): Promise<CmsSitemapEntry[]> {
  const entries = await cmsFetch<CmsSitemapEntry[]>("/api/public/cms/sitemap", 900);
  return arrayData<CmsSitemapEntry>(entries);
}

export async function getCmsRobots(): Promise<CmsRobots | null> {
  const robots = await cmsFetch<CmsRobots>("/api/public/cms/robots", 900);
  return isRecord(robots) ? robots : null;
}

export async function getCmsRedirects(): Promise<CmsRedirect[]> {
  const redirects = await cmsFetch<CmsRedirect[]>("/api/public/cms/redirects", 300);
  return arrayData<CmsRedirect>(redirects).filter((r) => r.is_active !== false && r.is_active !== 0);
}

export async function getCmsContentPages(): Promise<CmsContentPage[]> {
  const pages = await cmsFetch<CmsContentPage[]>("/api/public/cms/content/pages", 900);
  return arrayData<CmsContentPage>(pages).filter(isPublished);
}

export async function getCmsContentPageByPath(pathname: string): Promise<CmsContentPage | null> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const page = await cmsFetch<CmsContentPage>(`/api/public/cms/content/page?path=${encodeURIComponent(path)}`, 300);
  return isRecord(page) && isPublished(page) ? page : null;
}

export async function getCmsContentPageByKey(pageKey: string): Promise<CmsContentPage | null> {
  const page = await cmsFetch<CmsContentPage>(`/api/public/cms/content/page/${encodeURIComponent(pageKey)}`, 300);
  return isRecord(page) && isPublished(page) ? page : null;
}

export async function getCmsNavigation(location?: "header" | "footer" | "mobile"): Promise<CmsNavigationItem[]> {
  const primaryItems = arrayData<CmsNavigationItem>(await cmsFetch<CmsNavigationItem[]>("/navigation", 300));
  const fallbackItems = primaryItems.length
    ? []
    : arrayData<CmsNavigationItem>(await cmsFetch<CmsNavigationItem[]>("/api/public/cms/content/navigation", 300));
  const items = primaryItems.length ? primaryItems : fallbackItems;
  return items.filter((item) => isRecord(item) && item.is_enabled !== false && item.is_enabled !== 0 && (!location || item.location === location));
}

export async function getCmsFooter(): Promise<CmsFooterBlock[]> {
  const blocks = await cmsFetch<CmsFooterBlock[]>("/api/public/cms/content/footer", 300);
  return arrayData<CmsFooterBlock>(blocks).filter((block) => isRecord(block) && block.is_enabled !== false && block.is_enabled !== 0);
}

export async function getCmsCaseStudies(): Promise<CmsPublicCaseStudy[]> {
  const studies = await cmsFetch<CmsPublicCaseStudy[]>("/case-studies", 900);
  return arrayData<CmsPublicCaseStudy>(studies).filter(isPublished);
}

export async function getCmsCaseStudy(slug: string): Promise<CmsPublicCaseStudy | null> {
  const study = await cmsFetch<CmsPublicCaseStudy>(`/case-studies/${encodeURIComponent(slug)}`, 900);
  return isRecord(study) && isPublished(study) ? study : null;
}
