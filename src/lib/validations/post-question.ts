import { z } from 'zod';

export const postQuestionSchema = z.object({
  postSlug: z.string().min(1),
  email: z.email('Introduce un email válido.'),
  question: z
    .string()
    .trim()
    .min(10, 'Cuéntanos tu duda con un poco más de detalle.')
    .max(1000, 'La duda no puede superar los 1000 caracteres.'),
});

export type PostQuestionValues = z.infer<typeof postQuestionSchema>;
