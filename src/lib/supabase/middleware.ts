import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseConfig } from '@/lib/supabase/config';

const LOGIN_PATH = '/admin/login';

/**
 * Refresca la sesión de Supabase y protege `/admin`: sin sesión, cualquier ruta del panel
 * redirige al login. La comprobación de que el usuario es admin la hacen las políticas de
 * la base de datos y las Server Actions.
 */
export async function protectAdmin(request: NextRequest) {
  let response = NextResponse.next({ request });
  const { url, key } = getSupabaseConfig();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookiesToSet, headers) => {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([header, value]) => response.headers.set(header, value));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoginPage = request.nextUrl.pathname === LOGIN_PATH;

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }
  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}
