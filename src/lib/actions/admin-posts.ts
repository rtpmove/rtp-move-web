'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { serialize } from 'next-mdx-remote/serialize';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { POSTS_CACHE_TAG } from '@/lib/blog';
import { BLOG_BUCKET } from '@/lib/supabase/config';
import { createSessionClient } from '@/lib/supabase/server';
import { adminPostSchema, type AdminPostValues } from '@/lib/validations/admin-post';

/** Devuelve un cliente con sesión, o corta la acción si quien llama no es admin. */
async function requireAdmin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) throw new Error('Tu usuario no tiene permisos de administración.');

  return supabase;
}

/** Vacía la caché para que la web pública muestre los cambios al momento. */
function refreshPublicSite() {
  revalidateTag(POSTS_CACHE_TAG);
  revalidatePath('/', 'layout');
}

export interface SavePostState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  fieldErrors?: Partial<Record<keyof AdminPostValues, string[]>>;
}

export async function savePost(values: AdminPostValues): Promise<SavePostState> {
  const result = adminPostSchema.safeParse(values);
  if (!result.success) {
    return {
      status: 'error',
      message: 'Revisa los campos marcados.',
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const supabase = await requireAdmin();
  const post = result.data;
  const { error } = await supabase.from('posts').upsert({
    id: post.id,
    slug: post.slug,
    title: post.title,
    description: post.description,
    content: post.content,
    author: post.author || null,
    cover_image: post.coverImage || null,
    tags: post.tags,
    date: post.date,
    status: post.status,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    // 23505: violación de clave única (el slug ya existe).
    if (error.code === '23505') {
      return {
        status: 'error',
        message: 'Ya hay otro artículo con ese slug.',
        fieldErrors: { slug: ['Ya existe un artículo con este slug.'] },
      };
    }
    return { status: 'error', message: `No se pudo guardar: ${error.message}` };
  }

  refreshPublicSite();
  return {
    status: 'success',
    message: post.status === 'published' ? 'Artículo publicado.' : 'Borrador guardado.',
  };
}

export async function deletePost(id: string) {
  const supabase = await requireAdmin();

  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) throw new Error(`No se pudo borrar el artículo: ${error.message}`);

  // Las imágenes de cada artículo están en `posts/<id>/`.
  const folder = `posts/${id}`;
  const { data: files } = await supabase.storage.from(BLOG_BUCKET).list(folder);
  if (files?.length) {
    await supabase.storage.from(BLOG_BUCKET).remove(files.map((file) => `${folder}/${file.name}`));
  }

  refreshPublicSite();
  redirect('/admin');
}

export type PreviewResult =
  | { ok: true; source: MDXRemoteSerializeResult }
  | { ok: false; error: string };

/** Compila el MDX del editor para la vista previa. */
export async function previewMdx(content: string): Promise<PreviewResult> {
  await requireAdmin();
  try {
    return { ok: true, source: await serialize(content) };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}
