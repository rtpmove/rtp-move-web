import { MDXRemote } from 'next-mdx-remote/rsc';
import type { BlogPostMeta } from '@/types';
import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { PostReader, type ReadablePost } from '@/components/blog/post-reader';
import { mdxComponents } from '@/components/blog/mdx-components';
import { getPostBySlug } from '@/lib/blog';

interface BlogSectionProps {
  id?: string;
  posts: BlogPostMeta[];
  eyebrow?: string;
  title: string;
  description?: string;
}

export function BlogSection({ id, posts, eyebrow, title, description }: BlogSectionProps) {
  // El MDX se renderiza aquí, en el servidor, y el modal (cliente) solo recibe el resultado.
  const readablePosts: ReadablePost[] = posts.map((meta) => ({
    meta,
    body: <MDXRemote source={getPostBySlug(meta.slug)?.content ?? ''} components={mdxComponents} />,
  }));

  return (
    <section id={id} className="scroll-mt-8 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <PostReader posts={readablePosts} className="mt-14" />
      </Container>
    </section>
  );
}
