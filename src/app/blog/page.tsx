import type { Metadata } from 'next';
import { Container } from '@/components/shared/container';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { PostGrid } from '@/components/blog/post-grid';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { getAllPosts } from '@/lib/blog';

const TITLE = 'Blog de fisioterapia y rehabilitación';
const DESCRIPTION =
  'Artículos sobre fisioterapia, rehabilitación y salud escritos por nuestro equipo, con consejos prácticos para tu recuperación.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/blog',
});

export default function BlogPage() {
  const posts = getAllPosts();
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <section className="py-16 sm:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-6 max-w-2xl">
            <h1 className="text-4xl font-semibold text-neutral-900 sm:text-5xl">{TITLE}</h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{DESCRIPTION}</p>
          </div>

          <PostGrid posts={posts} className="mt-14" />
        </Container>
      </section>
    </>
  );
}
