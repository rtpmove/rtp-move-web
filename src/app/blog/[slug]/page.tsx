import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { CalendarDays, Clock } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { RelatedPosts } from '@/components/blog/related-posts';
import { mdxComponents } from '@/components/blog/mdx-components';
import { JsonLd } from '@/components/seo/json-ld';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { formatPostDate } from '@/lib/format';
import { extractTableOfContents, getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
    image: post.meta.coverImage,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const toc = extractTableOfContents(content);
  const relatedPosts = await getRelatedPosts(slug, meta.tags);
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: meta.title, href: `/blog/${slug}` },
  ];

  return (
    <>
      <JsonLd data={[articleSchema(meta), breadcrumbSchema(breadcrumbItems)]} />
      <article className="py-16 sm:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mt-6 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">
              {meta.title}
            </h1>
            <div className="text-muted-foreground mt-4 flex items-center gap-5 text-sm">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {formatPostDate(meta.date)}
              </span>
              {meta.readingTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {meta.readingTime}
                </span>
              )}
              <span>Por {meta.author}</span>
            </div>
          </header>

          <div className="bg-muted relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={meta.coverImage}
              alt={meta.title}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
            <div className="max-w-3xl">
              <MDXRemote source={content} components={mdxComponents} />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={toc} />
              </div>
            </aside>
          </div>

          <RelatedPosts posts={relatedPosts} />
        </Container>
      </article>
    </>
  );
}
