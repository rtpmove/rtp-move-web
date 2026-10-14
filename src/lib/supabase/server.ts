import 'server-only';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getSupabaseConfig } from '@/lib/supabase/config';

/** Cliente con la sesión del usuario (cookies). Se usa en el panel de administración. */
export async function createSessionClient() {
  const { url, key } = getSupabaseConfig();
  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Desde un Server Component no se pueden escribir cookies; el middleware ya
          // refresca la sesión en cada petición a /admin.
        }
      },
    },
  });
}
