import { MDXRemote } from 'next-mdx-remote/rsc';
import type { BlogPostMeta } from '@/types';
import { Container } from '@/components/shared/container';
import { PostReader, type ReadablePost } from '@/components/blog/post-reader';
import { mdxComponents } from '@/components/blog/mdx-components';
import { getPostBySlug } from '@/lib/blog';

interface BlogSectionProps {
  id?: string;
  posts: BlogPostMeta[];
  title: string;
}

export async function BlogSection({ id, posts, title }: BlogSectionProps) {
  // El MDX se renderiza aquí, en el servidor, y el modal (cliente) solo recibe el resultado.
  const readablePosts: ReadablePost[] = await Promise.all(
    posts.map(async (meta) => ({
      meta,
      body: (
        <MDXRemote
          source={(await getPostBySlug(meta.slug))?.content ?? ''}
          components={mdxComponents}
        />
      ),
    })),
  );

  return (
    <section id={id} className="scroll-mt-8 py-20 sm:py-28">
      <Container>
        <h2 className="text-secondary-600 text-center text-3xl font-bold tracking-wide uppercase sm:text-4xl">
          {title}
        </h2>
        <PostReader posts={readablePosts} className="mt-14" />
      </Container>
    </section>
  );
}
