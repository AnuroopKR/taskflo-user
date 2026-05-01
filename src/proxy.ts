import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;


  // 🚫 No tokens → redirect
  if (!accessToken && !refreshToken) {
    return redirectToLogin(request, pathname);
  }

  try {
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/auth/verify-token`,
      {
        method: "GET",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        cache: "no-store",
      }
    );

    // ❌ Invalid → redirect
    if (!backendResponse.ok) {
      return redirectToLogin(request, pathname);
    }

    // ✅ Prevent login access if already authenticated
    if (pathname === "/login") {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const response = NextResponse.next();

    // ✅ Forward all cookies properly
    const setCookies = backendResponse.headers.getSetCookie?.();

    if (setCookies) {
      setCookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
      });
    }

    return response;

  } catch (error) {
    console.error("Middleware error:", error);
    return redirectToLogin(request, pathname);
  }
}

// 🔁 Helper
function redirectToLogin(request: NextRequest, pathname: string) {
  // 🚫 prevent loop
  if (pathname === "/login") {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*','/login'],
};