import "server-only";

import { getCmsContentPageByKey, getCmsContentPageByPath, getCmsContentPageBySlug, type CmsContentPage } from "@/lib/cms";

export async function getCmsContentPageForRoute(path: string, pageKey?: string): Promise<CmsContentPage | null> {
  const byPath = await getCmsContentPageByPath(path);
  if (byPath || !pageKey) return byPath;
  const byKey = await getCmsContentPageByKey(pageKey);
  if (byKey) return byKey;
  return getCmsContentPageBySlug(pageKey);
}
