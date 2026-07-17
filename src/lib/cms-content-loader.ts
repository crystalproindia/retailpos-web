import "server-only";

import { getCmsContentPageByKey, getCmsContentPageByPath, type CmsContentPage } from "@/lib/cms";

export async function getCmsContentPageForRoute(path: string, pageKey?: string): Promise<CmsContentPage | null> {
  const byPath = await getCmsContentPageByPath(path);
  if (byPath || !pageKey) return byPath;
  return getCmsContentPageByKey(pageKey);
}
