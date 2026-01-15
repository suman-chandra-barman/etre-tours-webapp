import { TUserRole } from "@/types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Constants
const ROUTES = {
  LOGIN: "/login",
  CHIEF_ADMIN: "/chief-admin",
  CRUISE_SALES: "/cruise-sales",
  DIRECT_SALES: "/direct-sales",
  PARTNER_SALES: "/partner-sales",
} as const;


// Route permissions mapping
const ROUTE_PERMISSIONS: Record<string, TUserRole[]> = {
  [ROUTES.CHIEF_ADMIN]: ["chief-admin"],
  [ROUTES.CRUISE_SALES]: ["cruise-sales"],
  [ROUTES.DIRECT_SALES]: ["direct-sales"],
  [ROUTES.PARTNER_SALES]: ["partner-sales"],
};

// Role to dashboard mapping
const ROLE_DASHBOARD_MAP: Record<TUserRole, string> = {
  "chief-admin": ROUTES.CHIEF_ADMIN,
  "cruise-sales": ROUTES.CRUISE_SALES,
  "direct-sales": ROUTES.DIRECT_SALES,
  "partner-sales": ROUTES.PARTNER_SALES,
};

/**
 * Get user role from request cookie
 */
function getUserRole(request: NextRequest): TUserRole | null {
  const userRole = request.cookies.get("userRole")?.value;

  if (!userRole || !(userRole in ROLE_DASHBOARD_MAP)) {
    return null;
  }

  return userRole as TUserRole;
}

/**
 * Redirect user to their role-specific dashboard
 */
function redirectToDashboard(
  userRole: TUserRole | null,
  request: NextRequest
): NextResponse {
  if (!userRole || !(userRole in ROLE_DASHBOARD_MAP)) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }
  return NextResponse.redirect(
    new URL(ROLE_DASHBOARD_MAP[userRole], request.url)
  );
}

/**
 * Check if user has access to the requested route
 */
function hasAccess(pathname: string, userRole: TUserRole | null): boolean {
  const protectedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
    pathname.startsWith(route)
  );

  if (!protectedRoute) {
    return true; // Route is not protected
  }

  if (!userRole) {
    return false; // No user role
  }

  return ROUTE_PERMISSIONS[protectedRoute].includes(userRole);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = getUserRole(request);

  // Allow login page without authentication
  if (pathname === ROUTES.LOGIN) {
    // If user is already logged in, redirect to their dashboard
    if (userRole) {
      return redirectToDashboard(userRole, request);
    }
    return NextResponse.next();
  }

  // Handle root route - redirect to role-based dashboard or login
  if (pathname === "/") {
    return redirectToDashboard(userRole, request);
  }

  // Check authentication for protected routes
  if (!userRole) {
    const protectedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
      pathname.startsWith(route)
    );

    if (protectedRoute) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
  }

  // Check authorization for protected routes
  if (userRole && !hasAccess(pathname, userRole)) {
    return redirectToDashboard(userRole, request);
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    "/",
    "/login",
    "/chief-admin/:path*",
    "/cruise-sales/:path*",
    "/direct-sales/:path*",
    "/partner-sales/:path*",
  ],
};
