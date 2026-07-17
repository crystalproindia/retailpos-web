import { getCmsRedirects, type CmsRedirect } from "@/lib/cms";

export interface SafeCmsRedirect {
  source: string;
  destination: string;
  permanent: boolean;
}

function relativePath(value: string | null | undefined): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

function destinationPath(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function redirectStatus(value: number | string | null | undefined): 301 | 302 | null {
  const status = Number(value);
  if (status === 301 || status === 302) return status;
  return null;
}

export function normalizeCmsRedirect(redirect: CmsRedirect): SafeCmsRedirect | null {
  const source = relativePath(redirect.source ?? redirect.from);
  const destination = destinationPath(redirect.destination ?? redirect.target ?? redirect.to);
  const status = redirectStatus(redirect.status_code ?? redirect.status);

  if (!source || !destination || !status || source === destination) return null;

  return {
    source,
    destination,
    permanent: status === 301,
  };
}

export async function getSafeCmsRedirects(): Promise<SafeCmsRedirect[]> {
  const redirects = await getCmsRedirects();
  return redirects.map(normalizeCmsRedirect).filter((redirect): redirect is SafeCmsRedirect => Boolean(redirect));
}
