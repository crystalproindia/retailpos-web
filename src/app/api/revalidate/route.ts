import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface RevalidatePayload {
  path?: unknown;
  slug?: unknown;
  type?: unknown;
  secret?: unknown;
}

function text(value: unknown, maxLength = 300): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function tokenFromRequest(request: Request, payload: RevalidatePayload): string {
  const headerToken =
    request.headers.get("x-retailpos-revalidate-token") ??
    request.headers.get("x-revalidate-token") ??
    "";
  const auth = request.headers.get("authorization") ?? "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return headerToken || text(payload.secret, 300);
}

function normalizePath(value: string): string | null {
  if (!value) return null;
  if (!value.startsWith("/") || value.startsWith("//")) return null;
  if (value.includes("..")) return null;
  return value;
}

function pathsFromPayload(payload: RevalidatePayload): string[] {
  const type = text(payload.type, 80).toLowerCase();
  const slug = text(payload.slug, 180).replace(/^\/+|\/+$/g, "");
  const explicitPath = normalizePath(text(payload.path, 300));
  const paths = new Set<string>();

  if (explicitPath) paths.add(explicitPath);

  if (type === "case-study" || type === "case_study" || type === "case-studies") {
    paths.add("/case-studies");
    if (slug) paths.add(`/case-studies/${slug}`);
  }

  if (type === "page" && slug) {
    paths.add(slug === "home" ? "/" : `/${slug}`);
  }

  if (type === "sitemap") {
    paths.add("/sitemap.xml");
  }

  if (!paths.size) paths.add("/");
  paths.add("/sitemap.xml");
  return [...paths];
}

export async function POST(request: Request) {
  let payload: RevalidatePayload = {};

  try {
    payload = (await request.json()) as RevalidatePayload;
  } catch {
    payload = {};
  }

  const expectedToken = process.env.RETAILPOS_REVALIDATE_TOKEN;
  const providedToken = tokenFromRequest(request, payload);

  if (!expectedToken || providedToken !== expectedToken) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const paths = pathsFromPayload(payload);
  const revalidated: string[] = [];
  const failed: string[] = [];

  for (const path of paths) {
    try {
      revalidatePath(path);
      revalidated.push(path);
    } catch {
      failed.push(path);
    }
  }

  return NextResponse.json({
    ok: failed.length === 0,
    revalidated,
    failed,
  });
}
