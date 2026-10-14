/** Bucket de Supabase Storage donde se guardan las imágenes del blog. */
export const BLOG_BUCKET = 'blog';

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL y/o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. ' +
        'Añádelas a .env.local (en local) y a las variables de entorno del proyecto en Vercel.',
    );
  }

  return { url, key };
}
