import type { CmsArticle } from "@/lib/cms";
import { cmsParagraphs, cmsText, safeImageUrl, stringArray } from "@/lib/cms-content";

export function articleSlug(article: CmsArticle): string | undefined {
  const slug = cmsText(article.slug, 120);
  return slug && /^[a-z0-9][a-z0-9-]*$/i.test(slug) ? slug : undefined;
}

export function articleTitle(article: CmsArticle): string {
  return cmsText(article.title, 160) ?? "RetailPOS article";
}

export function articleExcerpt(article: CmsArticle): string {
  return (
    cmsText(article.excerpt, 320) ??
    cmsText(article.meta_description, 320) ??
    cmsText(article.content ?? article.body ?? article.content_html ?? article.body_html, 320) ??
    "RetailPOS insights for retail operators evaluating POS, ERP, inventory and store management systems."
  );
}

export function articleCategory(article: CmsArticle): string | undefined {
  return cmsText(article.category, 80);
}

export function articleTags(article: CmsArticle): string[] {
  return stringArray(article.tags, 8);
}

export function articleCoverImage(article: CmsArticle): string | undefined {
  return safeImageUrl(article.cover_image_url ?? article.image_url ?? article.cover_image);
}

export function articleCoverAlt(article: CmsArticle): string {
  return cmsText(article.cover_image_alt, 140) ?? articleTitle(article);
}

export function articleParagraphs(article: CmsArticle): string[] {
  return cmsParagraphs(article.content_html ?? article.body_html ?? article.content ?? article.body, 16);
}

export function articleDate(article: CmsArticle): string | undefined {
  return cmsText(article.published_at ?? article.updated_at, 80);
}

export function readableDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export function articleReadMinutes(article: CmsArticle): string | undefined {
  if (typeof article.read_minutes === "number" && Number.isFinite(article.read_minutes)) {
    return String(Math.max(1, Math.round(article.read_minutes)));
  }

  const configured = cmsText(article.read_minutes, 12);
  if (configured) return configured;

  const wordCount = articleParagraphs(article).join(" ").split(/\s+/).filter(Boolean).length;
  if (!wordCount) return undefined;
  return String(Math.max(1, Math.round(wordCount / 220)));
}
