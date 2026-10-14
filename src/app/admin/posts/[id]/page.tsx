import { notFound } from 'next/navigation';
import { PostEditor } from '@/components/admin/post-editor';
import type { PostRow } from '@/lib/blog';
import { createSessionClient } from '@/lib/supabase/server';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createSessionClient();
  const { data, error } = await supabase.from('posts').select('*').eq('id', id).maybeSingle();

  // Un id con formato no válido también da error en Postgres: se trata como «no encontrado».
  if (error || !data) notFound();
  const post = data as PostRow;

  return (
    <PostEditor
      key={post.id}
      isNew={false}
      initialValues={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        description: post.description,
        content: post.content,
        author: post.author ?? '',
        coverImage: post.cover_image ?? '',
        tags: post.tags,
        date: post.date,
        status: post.status,
      }}
    />
  );
}
