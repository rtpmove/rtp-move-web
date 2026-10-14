import { z } from 'zod';

export const adminPostSchema = z.object({
  id: z.uuid(),
  slug: z
    .string()
    .trim()
    .min(1, 'El slug es obligatorio.')
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones (p. ej. dolor-de-espalda).'),
  title: z.string().trim().min(1, 'El título es obligatorio.').max(200),
  description: z
    .string()
    .trim()
    .min(1, 'La descripción es obligatoria.')
    .max(300, 'Mejor no pasar de 300 caracteres: es lo que se ve en Google y en las tarjetas.'),
  content: z.string(),
  author: z.string().trim().max(100),
  coverImage: z.union([z.literal(''), z.url('La portada debe ser una URL.')]),
  tags: z.array(z.string().trim().min(1)).max(10, 'Como mucho 10 etiquetas.'),
  date: z.iso.date('Fecha no válida.'),
  status: z.enum(['draft', 'published']),
});

export type AdminPostValues = z.infer<typeof adminPostSchema>;

/** Convierte un título en slug: «¿Qué es el LCA?» → «que-es-el-lca». */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-')
    .replace(/^-|-$/g, '');
}
