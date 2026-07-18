import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PREVIEW_COOKIE = "retailpos_preview_token";

export function proxy(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")?.trim();
  if (!token || !request.nextUrl.pathname.startsWith("/preview/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.searchParams.delete("token");

  const response = NextResponse.redirect(url, 307);
  response.cookies.set({
    name: PREVIEW_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/preview",
    maxAge: 60 * 30,
  });

  return response;
}

export const config = {
  matcher: ["/preview/:path*"],
};
