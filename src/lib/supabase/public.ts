import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseConfig } from '@/lib/supabase/config';

/**
 * Cliente anónimo, sin cookies ni sesión. Es el que usa la web pública: al no depender
 * de la petición se puede cachear, y las políticas de la base de datos solo le dejan
 * leer los artículos publicados.
 */
export function createPublicClient() {
  const { url, key } = getSupabaseConfig();
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
