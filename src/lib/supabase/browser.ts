import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from '@/lib/supabase/config';

/** Cliente del navegador. El editor lo usa para subir imágenes directamente a Storage. */
export function createBrowserSupabase() {
  const { url, key } = getSupabaseConfig();
  return createBrowserClient(url, key);
}
