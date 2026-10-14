import { NextResponse, type NextRequest } from 'next/server';
import { features } from '@/config/features';

export function middleware(request: NextRequest) {
  if (!features.onePage) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (pathname === '/') return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  // Deja pasar los recursos que necesita la home: assets de Next, iconos, SEO y portadas del blog.
  matcher: [
    '/((?!_next/|favicon.ico|icon.svg|apple-icon|opengraph-image|manifest.webmanifest|robots.txt|sitemap.xml|blog-cover/|images/).*)',
  ],
};
