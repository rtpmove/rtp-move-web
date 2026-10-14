import type { MetadataRoute } from 'next';
import { features } from '@/config/features';
import { siteConfig } from '@/config/site';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const homeRoute: MetadataRoute.Sitemap[number] = {
    url: siteConfig.url,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  };

  if (features.onePage) return [homeRoute];

  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    homeRoute,
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
