import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles, getCmsSettings, getSeoPageByPath, type CmsSeoPage } from "@/lib/cms";
import {
  articleCategory,
  articleCoverAlt,
  articleCoverImage,
  articleDate,
  articleExcerpt,
  articleParagraphs,
  articleReadMinutes,
  articleSlug,
  articleTags,
  articleTitle,
  readableDate,
} from "@/lib/cms-articles";
import { buildMetadataFromCms } from "@/lib/seo/metadata";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .map((article) => articleSlug(article))
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const path = `/blog/${slug}`;
  const [article, seoPage, settings] = await Promise.all([
    getArticleBySlug(slug),
    getSeoPageByPath(path),
    getCmsSettings(),
  ]);

  if (!article) {
    return buildMetadataFromCms(seoPage, {
      title: "RetailPOS Blog Article",
      description: "RetailPOS insights for retail software, POS, ERP, inventory and store operations.",
      path,
      noIndex: true,
    });
  }

  const articleSeo: CmsSeoPage = {
    meta_title: article.meta_title ?? article.title,
    meta_description: article.meta_description ?? article.excerpt,
    canonical_url: article.canonical_url,
    og_title: article.og_title ?? article.title,
    og_description: article.og_description ?? article.excerpt,
    og_image: article.og_image ?? article.cover_image_url ?? article.image_url ?? article.cover_image,
    twitter_title: article.twitter_title ?? article.og_title ?? article.title,
    twitter_description: article.twitter_description ?? article.og_description ?? article.excerpt,
    twitter_image: article.twitter_image ?? article.og_image ?? article.cover_image_url ?? article.image_url ?? article.cover_image,
  };

  return buildMetadataFromCms(seoPage ?? articleSeo, {
    title: articleTitle(article),
    description: articleExcerpt(article),
    path,
  }, settings);
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const path = `/blog/${slug}`;
  const tags = articleTags(article);
  const category = articleCategory(article);
  const published = readableDate(articleDate(article));
  const readMinutes = articleReadMinutes(article);
  const coverImage = articleCoverImage(article);
  const paragraphs = articleParagraphs(article);

  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: articleTitle(article), path },
            ]}
          />
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {category ? <Badge tone="brand">{category}</Badge> : null}
            {published ? <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">{published}</span> : null}
            {readMinutes ? <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">{readMinutes} min read</span> : null}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            {articleTitle(article)}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-muted sm:text-lg">{articleExcerpt(article)}</p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <article className="mx-auto max-w-3xl">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={articleCoverAlt(article)}
              width={1200}
              height={675}
              unoptimized
              className="mb-8 aspect-[16/9] w-full rounded-lg border border-line object-cover shadow-card"
            />
          ) : null}
          <div className="space-y-5 text-base leading-8 text-ink-muted">
            {paragraphs.length ? paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>) : <p>{articleExcerpt(article)}</p>}
          </div>
          {tags.length ? (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Article tags">
              {tags.map((tag) => (
                <li key={tag} className="rounded-full bg-paper px-3 py-1 text-xs text-ink-muted">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <Link href="/blog" className="mt-10 inline-flex text-sm font-medium text-brand-700 hover:underline">
            Back to blog
          </Link>
        </article>
      </Section>
      <CmsSeoEnhancements path={path} schemaJson={article.schema_json} />
    </>
  );
}
