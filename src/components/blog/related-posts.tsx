import type { BlogPostMeta } from '@/types';
import { PostCard } from '@/components/blog/post-card';

export function RelatedPosts({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-posts-heading" className="mt-20">
      <h2 id="related-posts-heading" className="mb-6 text-2xl font-semibold text-neutral-900">
        Artículos relacionados
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
