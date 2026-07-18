import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CmsContentSections } from "@/components/cms/CmsContentSections";
import { PreviewBanner, PreviewUnavailable } from "@/components/cms/PreviewChrome";
import { Container } from "@/components/ui/Container";
import { fetchPreviewPage } from "@/lib/cms";
import { cmsContentSections } from "@/lib/cms-content-editor";
import { cmsText } from "@/lib/cms-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "CMS Draft Preview | RetailPOS.biz",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noarchive: true },
  },
};

type PreviewPageProps = {
  params: Promise<{ slug: string }>;
};

async function previewToken(): Promise<string> {
  return (await cookies()).get("retailpos_preview_token")?.value.trim() ?? "";
}

export default async function PagePreview({ params }: PreviewPageProps) {
  const [{ slug }, token] = await Promise.all([params, previewToken()]);
  if (!token) return <PreviewUnavailable />;

  const page = await fetchPreviewPage(slug, token);
  if (!page) return <PreviewUnavailable />;

  const sections = cmsContentSections(page);
  const title = cmsText(page.title, 180) ?? cmsText(page.page_key, 180) ?? "Draft page";

  return (
    <>
      <PreviewBanner label={title} />
      {sections.length ? (
        <CmsContentSections sections={sections} previewMode />
      ) : (
        <Container className="py-16 sm:py-20">
          <h1 className="font-display text-display-md font-bold text-ink">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
            This authorized draft has no active preview sections yet.
          </p>
        </Container>
      )}
    </>
  );
}
