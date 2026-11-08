// TEMPORAL: página de revisión del nuevo diseño de cajas del blog. Borrar antes de fusionar.
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/shared/container';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { mdxComponents } from '@/components/blog/mdx-components';
import { extractTableOfContents } from '@/lib/blog';
import { content } from './content';

export const metadata: Metadata = {
  title: 'Vista previa · Isométricos',
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  const toc = extractTableOfContents(content);
  return (
    <article className="py-16 sm:py-24">
      <Container>
        <p className="bg-sand-100 text-sand-700 inline-block rounded-full px-3 py-1 text-xs font-semibold">
          Vista previa del nuevo diseño · no publicado
        </p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Isométricos: el ejercicio «quieto» que se ha ganado su sitio en la rehabilitación
        </h1>
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
      </Container>
    </article>
  );
}
