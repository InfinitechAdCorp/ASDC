// app\(admin)\middleware.ts

import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // console.log("APP Middleware: Checking admin cookie");
  const adminCookie = request.cookies.get('AdminVerified');
  // console.log("APP Admin cookie value:", adminCookie);
console.error("Middleware Debug:", adminCookie);

  if (!adminCookie || adminCookie.value !== 'True') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
