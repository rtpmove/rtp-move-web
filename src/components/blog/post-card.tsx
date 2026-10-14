import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, Clock } from 'lucide-react';
import type { BlogPostMeta } from '@/types';
import { formatPostDate } from '@/lib/format';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: BlogPostMeta;
  /** Si es `false`, la tarjeta se muestra sin enlace al artículo. */
  linkable?: boolean;
  /** Si se indica, la tarjeta abre el artículo (p. ej. en un modal) en vez de enlazar a su página. */
  onOpen?: () => void;
}

export function PostCard({ post, linkable = true, onOpen }: PostCardProps) {
  const interactive = linkable || Boolean(onOpen);
  const className = cn(
    'group border-border/60 bg-neutral-0 relative flex flex-col overflow-hidden rounded-2xl border',
    'has-[button:focus-visible]:ring-ring/50 has-[button:focus-visible]:ring-3',
    'transition-[scale,opacity,filter,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none',
    // Resto de tarjetas: se encogen y se apagan cuando otra está en hover.
    'group-has-[>*:hover]/posts:scale-[0.97] group-has-[>*:hover]/posts:opacity-60 group-has-[>*:hover]/posts:saturate-50',
    // Tarjeta activa: crece, se ilumina y se eleva sobre las demás.
    'hover:border-primary-300 hover:z-10 hover:scale-[1.04]! hover:opacity-100! hover:shadow-xl hover:brightness-105 hover:saturate-100!',
  );

  const content = (
    <>
      <div className="bg-muted relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            'object-cover',
            interactive && 'transition-transform duration-500 group-hover:scale-105',
          )}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="text-muted-foreground flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatPostDate(post.date)}
          </span>
          {post.readingTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readingTime}
            </span>
          )}
        </div>
        <h3
          className={cn(
            'text-lg font-semibold text-neutral-900 transition-colors',
            interactive && 'group-hover:text-primary-700',
          )}
        >
          {onOpen ? (
            // El `after` estira el botón sobre toda la tarjeta para que sea clicable entera.
            <button
              type="button"
              onClick={onOpen}
              className="cursor-pointer text-left outline-none after:absolute after:inset-0"
            >
              {post.title}
            </button>
          ) : (
            post.title
          )}
        </h3>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {post.description}
        </p>
      </div>
    </>
  );

  if (onOpen || !linkable) return <article className={className}>{content}</article>;

  return (
    <Link href={`/blog/${post.slug}`} className={className}>
      {content}
    </Link>
  );
}
