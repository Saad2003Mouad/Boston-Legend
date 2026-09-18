import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Ignore API routes, static files, images, etc.
  if (
    path.startsWith('/api') ||
    path.startsWith('/_next') ||
    path.includes('.')
  ) {
    return NextResponse.next();
  }

  // Force lowercase paths to prevent 404s from mixed-case URLs
  if (path !== path.toLowerCase()) {
    url.pathname = path.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // Handle trailing slashes gracefully if they sneak in
  if (path.length > 1 && path.endsWith('/')) {
    url.pathname = path.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

// Only run middleware on non-static, non-api routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
  ],
};
