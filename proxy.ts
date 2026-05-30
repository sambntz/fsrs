import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import {
  AUTH_CALLBACK_URL_PARAM,
  AUTH_PATHS,
  DASHBOARD_HOME_PATH,
  LOGIN_PATH,
} from "@/features/auth/constants/routes";

function getPathWithSearch(request: NextRequest) {
  return `${request.nextUrl.pathname}${request.nextUrl.search}`;
}

function isAuthPath(pathname: string) {
  return AUTH_PATHS.some((path) => pathname === path);
}

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;
  const isDashboardPath = pathname.startsWith("/dashboard");

  if (isDashboardPath && !token) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set(AUTH_CALLBACK_URL_PARAM, getPathWithSearch(request));

    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath(pathname) && token) {
    return NextResponse.redirect(new URL(DASHBOARD_HOME_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
