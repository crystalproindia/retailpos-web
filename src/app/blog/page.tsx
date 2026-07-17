import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { getArticles } from "@/lib/cms";
import {
  articleCategory,
  articleDate,
  articleExcerpt,
  articleReadMinutes,
  articleSlug,
  articleTags,
  articleTitle,
  readableDate,
} from "@/lib/cms-articles";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/blog", {
    title: "RetailPOS Blog - Retail Software Guides & Insights",
    description:
      "Read RetailPOS guides on POS billing, retail ERP, inventory, multi-store operations, CRM, analytics and AI-powered retail management.",
    path: "/blog",
  });
}

export default async function BlogIndexPage() {
  const articles = (await getArticles()).filter((article) => articleSlug(article));

  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            RetailPOS blog
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Practical guides for retail teams evaluating POS, ERP, inventory control, store operations and modern
            retail software.
          </p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        {articles.length ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => {
              const slug = articleSlug(article);
              if (!slug) return null;
              const tags = articleTags(article);
              const published = readableDate(articleDate(article));
              const readMinutes = articleReadMinutes(article);

              return (
                <li key={slug}>
                  <Link
                    href={`/blog/${slug}`}
                    className="group flex h-full flex-col rounded-lg border border-line bg-white p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {articleCategory(article) ? <Badge tone="brand">{articleCategory(article)}</Badge> : null}
                      {published ? <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{published}</span> : null}
                    </div>
                    <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink group-hover:text-brand-700">
                      {articleTitle(article)}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{articleExcerpt(article)}</p>
                    {tags.length ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag) => (
                          <li key={tag} className="rounded-full bg-paper px-2.5 py-1 text-xs text-ink-muted">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="mt-5 text-sm font-medium text-brand-600 group-hover:underline">
                      Read article{readMinutes ? ` - ${readMinutes} min` : ""}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-lg border border-line bg-paper p-8">
            <SectionHeading
              eyebrow="Resources"
              title="Articles are being prepared"
              description="The CMS is connected, but no published articles are available yet. Existing product, solution and industry pages remain available while the resource library is populated."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/products" variant="ghost">
                Explore Products
              </ButtonLink>
              <ButtonLink href="/book-demo">Book a Demo</ButtonLink>
            </div>
          </div>
        )}
      </Section>
      <CmsSeoEnhancements path="/blog" />
    </>
  );
}
