// proxy.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token=request.cookies.get("accessToken")
  console.log(token)
  if (!token && pathname.startsWith('/dashboard')) {
    // Redirect them to the login page
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    
    return NextResponse.redirect(loginUrl);
  }
  // Your logic (redirects, rewrites, etc.) remains the same
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*',
}