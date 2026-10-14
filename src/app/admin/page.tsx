import Link from 'next/link';
import { ExternalLink, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { features } from '@/config/features';
import { formatPostDate } from '@/lib/format';
import type { PostRow } from '@/lib/blog';
import { createSessionClient } from '@/lib/supabase/server';

export default async function AdminPostsPage() {
  const supabase = await createSessionClient();
  const [{ data: isAdmin }, { data, error }] = await Promise.all([
    supabase.rpc('is_admin'),
    supabase
      .from('posts')
      .select('id, slug, title, date, status, updated_at')
      .order('date', { ascending: false }),
  ]);

  if (!isAdmin) {
    return (
      <p className="text-muted-foreground">
        Tu usuario ha iniciado sesión pero no es administrador. Añádelo a la tabla{' '}
        <code>admins</code> en Supabase (las instrucciones están en <code>supabase/schema.sql</code>
        ).
      </p>
    );
  }
  if (error) throw new Error(`No se pudieron cargar los artículos: ${error.message}`);

  const posts = data as Pick<PostRow, 'id' | 'slug' | 'title' | 'date' | 'status' | 'updated_at'>[];

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-neutral-900">Artículos</h1>
        <Link href="/admin/posts/new" className={buttonVariants({ size: 'lg' })}>
          <Plus />
          Nuevo artículo
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground mt-10">Todavía no hay artículos.</p>
      ) : (
        <ul className="border-border/60 bg-neutral-0 mt-8 divide-y overflow-hidden rounded-2xl border">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="hover:text-primary-700 block truncate font-medium text-neutral-900"
                >
                  {post.title}
                </Link>
                <p className="text-muted-foreground mt-1 text-xs">
                  {formatPostDate(post.date)} · /{post.slug}
                </p>
              </div>
              <Badge variant={post.status === 'published' ? 'default' : 'outline'}>
                {post.status === 'published' ? 'Publicado' : 'Borrador'}
              </Badge>
              {/* En modo one page /blog/* redirige a la home, así que el enlace no aporta nada. */}
              {post.status === 'published' && !features.onePage && (
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Ver «${post.title}» en la web`}
                >
                  <ExternalLink className="size-4" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
