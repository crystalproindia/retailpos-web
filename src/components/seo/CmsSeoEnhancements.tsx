import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSeoPageByPath, type CmsSeoPage } from "@/lib/cms";
import { cmsParagraphs, cmsText, schemaJsonFromCms } from "@/lib/cms-content";

interface CmsSeoEnhancementsProps {
  path: string;
  cmsSeoPage?: CmsSeoPage | null;
  schemaJson?: unknown;
  introContent?: unknown;
  footerSeoContent?: unknown;
  heading?: string;
}

export async function CmsSeoEnhancements({
  path,
  cmsSeoPage,
  schemaJson,
  introContent,
  footerSeoContent,
  heading,
}: CmsSeoEnhancementsProps) {
  const seoPage = cmsSeoPage ?? (await getSeoPageByPath(path));
  const schema = schemaJsonFromCms(schemaJson ?? seoPage?.schema_json);
  const paragraphs = cmsParagraphs(footerSeoContent ?? seoPage?.footer_seo_content ?? introContent ?? seoPage?.intro_content);
  const blockHeading = cmsText(heading, 120) ?? "More about RetailPOS";

  if (!schema && paragraphs.length === 0) return null;

  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      {paragraphs.length ? (
        <Section tone="paper" className="py-12 sm:py-16" aria-labelledby="cms-seo-content">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
              RetailPOS guide
            </p>
            <h2 id="cms-seo-content" className="mt-3 font-display text-display-sm font-semibold text-ink">
              {blockHeading}
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
}
