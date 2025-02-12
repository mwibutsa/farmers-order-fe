import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isAdmin = request.cookies.get("isAdmin");

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/admin/orders") ||
    request.nextUrl.pathname.startsWith("/farmers");

  if (pathname.includes("login") && token) {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/orders"));
    }
    return NextResponse.redirect(new URL("/farmers/land"));
  }
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(
      new URL(
        pathname.includes("admin") ? "/admin/login" : "/login",
        request.url
      )
    );
  }

  if (isProtectedRoute && pathname.includes("admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If trying to access protected route without token

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
