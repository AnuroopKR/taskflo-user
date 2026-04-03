// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  console.log("Proxy cookies:", accessToken, refreshToken);

  // 🚫 No refresh token → redirect
  if (!refreshToken) {
    return redirectToLogin(request, pathname);
  }

  try {
    const backendResponse = await fetch(
      `${process.env.BACKEND_URL}/auth/verify-token`,
      {
        method: "GET",
        headers: {
          // ✅ Forward ALL cookies safely
          cookie: request.headers.get("cookie") || "",
        },
        cache: "no-store", // 🔥 IMPORTANT
      }
    );

    //  Invalid → redirect
    if (!backendResponse.ok) {
      return redirectToLogin(request, pathname);
    }
    if(pathname==="/login"){
return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    // ✅ Create response (NO redirect loop)
    const response = NextResponse.next();

    // 🔥 Handle multiple cookies properly
    const setCookie = backendResponse.headers.get("set-cookie");

    if (setCookie) {
      response.headers.append("set-cookie", setCookie);
    }

    return response;

  } catch (error) {
    console.error("Proxy error:", error);
    return redirectToLogin(request, pathname);
  }
}

// 🔁 Helper
function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('from', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher:[ '/dashboard/:path*','/login']
};