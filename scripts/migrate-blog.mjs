// Migra los artículos de src/content/blog/*.mdx (y sus imágenes de public/images/blog) a Supabase.
// Se ejecuta una sola vez y se puede repetir sin duplicar nada (actualiza por slug):
//
//   node --env-file=.env.local scripts/migrate-blog.mjs
//
// Necesita SUPABASE_SECRET_KEY (la clave secreta / service_role) en .env.local. Esa clave solo
// la usa este script: la web nunca la necesita y no debe subirse a Vercel.

import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

const BUCKET = 'blog';
const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');
const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public');
const LOCAL_IMAGE_REGEX = /\/images\/blog\/[^\s"')]+/g;
const MIME_TYPES = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
};

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secretKey = process.env.SUPABASE_SECRET_KEY;
if (!url || !secretKey) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SECRET_KEY en .env.local.');
  process.exit(1);
}

const supabase = createClient(url, secretKey, { auth: { persistSession: false } });

async function uploadLocalImage(localPath, postId) {
  const filePath = path.join(PUBLIC_DIRECTORY, localPath);
  const storagePath = `posts/${postId}/${path.basename(localPath)}`;
  const contentType = MIME_TYPES[path.extname(localPath).toLowerCase()] ?? 'application/octet-stream';

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fs.readFileSync(filePath), { contentType, upsert: true, cacheControl: '31536000' });
  if (error) throw new Error(`No se pudo subir ${localPath}: ${error.message}`);

  return supabase.storage.from(BUCKET).getPublicUrl(storagePath).data.publicUrl;
}

const files = fs.readdirSync(BLOG_DIRECTORY).filter((file) => file.endsWith('.mdx'));

for (const file of files) {
  const slug = file.replace(/\.mdx$/, '');
  const { data: frontmatter, content } = matter(fs.readFileSync(path.join(BLOG_DIRECTORY, file), 'utf8'));

  const { data: existing } = await supabase.from('posts').select('id').eq('slug', slug).maybeSingle();
  const id = existing?.id ?? randomUUID();

  let migratedContent = content.trim() + '\n';
  for (const localPath of new Set(content.match(LOCAL_IMAGE_REGEX) ?? [])) {
    migratedContent = migratedContent.replaceAll(localPath, await uploadLocalImage(localPath, id));
  }

  // Las portadas `/blog-cover/<slug>` son las automáticas: en la base de datos se guardan como null.
  let coverImage = null;
  if (frontmatter.coverImage?.startsWith('/images/')) {
    coverImage = await uploadLocalImage(frontmatter.coverImage, id);
  } else if (frontmatter.coverImage && !frontmatter.coverImage.startsWith('/blog-cover/')) {
    coverImage = frontmatter.coverImage;
  }

  const { error } = await supabase.from('posts').upsert(
    {
      id,
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      content: migratedContent,
      author: frontmatter.author ?? null,
      cover_image: coverImage,
      tags: frontmatter.tags ?? [],
      date: frontmatter.date,
      status: 'published',
      updated_at: new Date(frontmatter.updatedAt ?? frontmatter.date).toISOString(),
    },
    { onConflict: 'slug' },
  );
  if (error) throw new Error(`No se pudo migrar ${file}: ${error.message}`);

  console.info(`✔ ${slug}`);
}

console.info(`\n${files.length} artículos migrados.`);
