import "server-only";

const DEFAULT_CMS_API_BASE_URL = "https://app.retailpos.biz";
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

function cmsBaseUrl(): string {
  return (process.env.RETAILPOS_CMS_API_BASE_URL || DEFAULT_CMS_API_BASE_URL).replace(/\/+$/, "");
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

function endpointUrl(path: string): string {
  return `${cmsBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function unwrapData(value: unknown): unknown {
  if (isRecord(value) && "data" in value) return value.data;
  return value;
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
  try {
    const response = await fetch(endpointUrl(path), {
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

export async function getSeoPageByPath(pathname: string): Promise<CmsSeoPage | null> {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const seoPage = await cmsFetch<CmsSeoPage>(`/api/public/cms/seo-page?path=${encodeURIComponent(path)}`, 300);
  return isRecord(seoPage) && isPublished(seoPage) ? seoPage : null;
}

export async function getLandingPageBySlug(slug: string): Promise<CmsLandingPage | null> {
  const page = await cmsFetch<CmsLandingPage>(`/api/public/cms/landing-pages/${encodeURIComponent(slug)}`, 300);
  return isRecord(page) && isPublished(page) ? page : null;
}

export async function getArticles(): Promise<CmsArticle[]> {
  const articles = await cmsFetch<CmsArticle[]>("/api/public/cms/articles", 900);
  return Array.isArray(articles) ? articles.filter(isPublished) : [];
}

export async function getArticleBySlug(slug: string): Promise<CmsArticle | null> {
  const article = await cmsFetch<CmsArticle>(`/api/public/cms/articles/${encodeURIComponent(slug)}`, 900);
  return isRecord(article) && isPublished(article) ? article : null;
}

export async function getCmsSitemap(): Promise<CmsSitemapEntry[]> {
  const entries = await cmsFetch<CmsSitemapEntry[]>("/api/public/cms/sitemap", 900);
  return Array.isArray(entries) ? entries : [];
}

export async function getCmsRobots(): Promise<CmsRobots | null> {
  const robots = await cmsFetch<CmsRobots>("/api/public/cms/robots", 900);
  return isRecord(robots) ? robots : null;
}

export async function getCmsRedirects(): Promise<CmsRedirect[]> {
  const redirects = await cmsFetch<CmsRedirect[]>("/api/public/cms/redirects", 300);
  return Array.isArray(redirects) ? redirects.filter((r) => r.is_active !== false && r.is_active !== 0) : [];
}

export async function getCmsContentPages(): Promise<CmsContentPage[]> {
  const pages = await cmsFetch<CmsContentPage[]>("/api/public/cms/content/pages", 900);
  return Array.isArray(pages) ? pages.filter(isPublished) : [];
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
  const items = await cmsFetch<CmsNavigationItem[]>("/api/public/cms/content/navigation", 300);
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item.is_enabled !== false && item.is_enabled !== 0 && (!location || item.location === location));
}

export async function getCmsFooter(): Promise<CmsFooterBlock[]> {
  const blocks = await cmsFetch<CmsFooterBlock[]>("/api/public/cms/content/footer", 300);
  return Array.isArray(blocks) ? blocks.filter((block) => block.is_enabled !== false && block.is_enabled !== 0) : [];
}
