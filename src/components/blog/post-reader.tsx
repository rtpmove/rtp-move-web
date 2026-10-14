'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Dialog } from '@base-ui/react/dialog';
import { CalendarDays, Clock, XIcon } from 'lucide-react';
import type { BlogPostMeta } from '@/types';
import { PostCard } from '@/components/blog/post-card';
import { PostQuestionForm } from '@/components/blog/post-question-form';
import { siteConfig } from '@/config/site';
import { formatPostDate } from '@/lib/format';
import { cn } from '@/lib/utils';

export interface ReadablePost {
  meta: BlogPostMeta;
  /** Cuerpo del artículo ya renderizado en el servidor (MDX). */
  body: ReactNode;
}

interface PostReaderProps {
  posts: ReadablePost[];
  className?: string;
}

/** Rejilla de artículos que abre cada uno completo en un modal casi a pantalla completa. */
export function PostReader({ posts, className }: PostReaderProps) {
  const [open, setOpen] = useState(false);
  // Se conserva el último artículo abierto para que no desaparezca durante la animación de cierre.
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const activePost = posts.find((post) => post.meta.slug === activeSlug);

  if (posts.length === 0) {
    return (
      <p className={cn('text-muted-foreground text-center', className)}>
        Muy pronto publicaremos nuestros primeros artículos.
      </p>
    );
  }

  return (
    <>
      <div className={cn('group/posts grid gap-8 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {posts.map(({ meta }) => (
          <PostCard
            key={meta.slug}
            post={meta}
            onOpen={() => {
              setActiveSlug(meta.slug);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
          <Dialog.Viewport className="fixed inset-0 z-50 flex justify-center p-2 sm:p-6 lg:p-10">
            <Dialog.Popup className="bg-neutral-0 ease-smooth relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-2xl transition-[opacity,scale,translate] duration-300 outline-none data-ending-style:translate-y-4 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:translate-y-4 data-starting-style:scale-[0.98] data-starting-style:opacity-0 motion-reduce:transition-none">
              {/* Va primero en el DOM para que reciba el foco inicial y no salte al formulario del final. */}
              <Dialog.Close className="bg-neutral-0/90 focus-visible:ring-ring/50 absolute top-3 right-3 z-10 flex size-10 cursor-pointer items-center justify-center rounded-full text-neutral-900 shadow-md backdrop-blur transition-colors outline-none hover:bg-neutral-100 focus-visible:ring-3">
                <XIcon className="size-5" />
                <span className="sr-only">Cerrar artículo</span>
              </Dialog.Close>
              {activePost && <PostReaderContent post={activePost} />}
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function PostReaderContent({ post: { meta, body } }: { post: ReadablePost }) {
  return (
    <div className="h-full overflow-y-auto overscroll-contain">
      <div className="bg-muted relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src={meta.coverImage}
          alt={meta.title}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>

      <article className="mx-auto max-w-3xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14">
        <p className="text-primary-700 text-xs font-semibold tracking-[0.2em] uppercase">
          {siteConfig.name} · Blog
        </p>
        <Dialog.Title className="mt-3 text-3xl font-semibold text-balance text-neutral-900 sm:text-4xl">
          {meta.title}
        </Dialog.Title>
        <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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

        <div className="mt-6">{body}</div>

        <PostQuestionForm postSlug={meta.slug} className="mt-16" />
      </article>
    </div>
  );
}
