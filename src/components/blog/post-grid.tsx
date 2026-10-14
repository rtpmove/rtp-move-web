import type { BlogPostMeta } from '@/types';
import { PostCard } from '@/components/blog/post-card';
import { cn } from '@/lib/utils';

interface PostGridProps {
  posts: BlogPostMeta[];
  linkable?: boolean;
  className?: string;
}

export function PostGrid({ posts, linkable = true, className }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <p className={cn('text-muted-foreground text-center', className)}>
        Muy pronto publicaremos nuestros primeros artículos.
      </p>
    );
  }

  return (
    <div
      className={cn(
        // `group/posts` permite a cada tarjeta reaccionar cuando se pasa el ratón por otra.
        'group/posts grid gap-8 sm:grid-cols-2 lg:grid-cols-3',
        className,
      )}
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} linkable={linkable} />
      ))}
    </div>
  );
}
