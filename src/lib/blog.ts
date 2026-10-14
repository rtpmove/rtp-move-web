import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { siteConfig } from '@/config/site';
import type { BlogPostMeta } from '@/types';

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');

interface RawPost {
  meta: BlogPostMeta;
  content: string;
}

function readPostFile(fileName: string): RawPost {
  const slug = fileName.replace(/\.mdx$/, '');
  const filePath = path.join(BLOG_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const meta: BlogPostMeta = {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    updatedAt: data.updatedAt,
    author: data.author ?? `Equipo ${siteConfig.name}`,
    coverImage: data.coverImage,
    tags: data.tags ?? [],
    readingTime: readingTime(content, { wordsPerMinute: 200 }).text,
  };

  return { meta, content };
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) return [];

  return fs
    .readdirSync(BLOG_DIRECTORY)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => readPostFile(file).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): RawPost | null {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  return readPostFile(`${slug}.mdx`);
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post);
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractTableOfContents(content: string): TocItem[] {
  const headingRegex = /^(##|###)\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length === 2 ? 2 : 3;
    const text = match[2].trim();
    const id = slugifyHeading(text);
    items.push({ id, text, level });
  }

  return items;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
