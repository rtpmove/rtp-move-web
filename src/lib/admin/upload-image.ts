import { BLOG_BUCKET } from '@/lib/supabase/config';
import { createBrowserSupabase } from '@/lib/supabase/browser';

export interface UploadedImage {
  url: string;
  width: number;
  height: number;
}

/** Medidas que se usan si el navegador no sabe leerlas (p. ej. algunos SVG). */
const FALLBACK_SIZE = { width: 1200, height: 800 };

function readImageSize(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(
        image.naturalWidth && image.naturalHeight
          ? { width: image.naturalWidth, height: image.naturalHeight }
          : FALLBACK_SIZE,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(FALLBACK_SIZE);
    };
    image.src = objectUrl;
  });
}

function safeFileName(name: string): string {
  const dot = name.lastIndexOf('.');
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const extension = dot > 0 ? name.slice(dot + 1).toLowerCase() : 'bin';
  return `${base || 'imagen'}.${extension}`;
}

/**
 * Sube una imagen a `blog/posts/<postId>/` directamente desde el navegador, con la sesión
 * del admin. Así no pasa por el servidor de Vercel ni por su límite de tamaño.
 */
export async function uploadPostImage(file: File, postId: string): Promise<UploadedImage> {
  const supabase = createBrowserSupabase();
  const path = `posts/${postId}/${Date.now()}-${safeFileName(file.name)}`;

  const [{ error }, size] = await Promise.all([
    supabase.storage.from(BLOG_BUCKET).upload(path, file, {
      contentType: file.type,
      cacheControl: '31536000',
    }),
    readImageSize(file),
  ]);
  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(BLOG_BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, ...size };
}
