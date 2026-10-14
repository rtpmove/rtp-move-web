import { NextResponse, type NextRequest } from 'next/server';
import { features } from '@/config/features';
import { protectAdmin } from '@/lib/supabase/middleware';

/** Rutas que siguen abiertas aunque el sitio esté en modo one page. */
const ALWAYS_OPEN_API = ['/api/cron/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // El panel de administración funciona siempre, esté o no activado el modo one page.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return protectAdmin(request);

  if (!features.onePage) return NextResponse.next();
  if (pathname === '/') return NextResponse.next();

  if (pathname.startsWith('/api/')) {
    if (ALWAYS_OPEN_API.some((prefix) => pathname.startsWith(prefix))) return NextResponse.next();
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
