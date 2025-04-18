import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "./i18nConfig";

export function middleware(request: NextRequest) {
  // Check if we're in production
  if (process.env.NODE_ENV === "production") {
    // Check if the request is for the /admin path
    const restrictedPaths = ["/admin", "/admin/people", "/admin/positions"];
    if (restrictedPaths.includes(request.nextUrl.pathname)) {
      // Redirect to home page
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const ignorePaths = ["/admin/positions", "/admin/people", "/about", "/admin"];

  if (ignorePaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return i18nRouter(request, i18nConfig);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    "/admin/positions",
    "/admin/people",
    "/admin",
    "/((?!api|static|.*\\..*|_next).*)",
  ],
};
