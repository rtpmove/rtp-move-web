import 'server-only';
import { unstable_cache } from 'next/cache';
import readingTime from 'reading-time';
import { siteConfig } from '@/config/site';
import { createPublicClient } from '@/lib/supabase/public';
import type { BlogPostMeta } from '@/types';

export { extractTableOfContents, slugifyHeading, type TocItem } from '@/lib/mdx-headings';

/** Etiqueta de caché de los artículos. El panel la invalida al guardar o borrar. */
export const POSTS_CACHE_TAG = 'posts';

/** Fila de la tabla `posts` de Supabase (ver `supabase/schema.sql`). */
export interface PostRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string | null;
  cover_image: string | null;
  tags: string[];
  date: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

interface RawPost {
  meta: BlogPostMeta;
  content: string;
}

export function defaultCoverImage(slug: string): string {
  return `/blog-cover/${slug}`;
}

function toRawPost(row: PostRow): RawPost {
  const meta: BlogPostMeta = {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date: row.date,
    updatedAt: row.updated_at,
    author: row.author || `Equipo ${siteConfig.name}`,
    coverImage: row.cover_image || defaultCoverImage(row.slug),
    tags: row.tags,
    readingTime: readingTime(row.content, { wordsPerMinute: 200 }).text,
  };

  return { meta, content: row.content };
}

// Las páginas del blog son estáticas: Supabase solo se consulta al compilar y cuando el
// panel invalida la caché, no en cada visita. El listado guarda solo los metadatos para no
// superar el tamaño máximo de una entrada de caché cuando haya muchos artículos.
export const getAllPosts = unstable_cache(
  async (): Promise<BlogPostMeta[]> => {
    const { data, error } = await createPublicClient()
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) throw new Error(`No se pudieron cargar los artículos: ${error.message}`);
    return (data as PostRow[]).map((row) => toRawPost(row).meta);
  },
  ['published-posts'],
  { tags: [POSTS_CACHE_TAG] },
);

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<RawPost | null> => {
    const { data, error } = await createPublicClient()
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .eq('slug', slug)
      .maybeSingle();

    if (error) throw new Error(`No se pudo cargar el artículo "${slug}": ${error.message}`);
    return data ? toRawPost(data as PostRow) : null;
  },
  ['published-post'],
  { tags: [POSTS_CACHE_TAG] },
);

export async function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3,
): Promise<BlogPostMeta[]> {
  return (await getAllPosts())
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}
