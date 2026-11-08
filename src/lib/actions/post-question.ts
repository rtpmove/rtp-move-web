'use server';

import { postQuestionSchema } from '@/lib/validations/post-question';
import { createPublicClient } from '@/lib/supabase/public';

export interface PostQuestionState {
  status: 'idle' | 'success' | 'error';
  fieldErrors?: { email?: string[]; question?: string[] };
  /** Error general (p. ej. la base de datos no responde). */
  formError?: string;
  /** Valores enviados, para no perder lo escrito si la validación falla. */
  values?: { email: string; question: string };
}

/**
 * Se usa una Server Action (y no `/api/*`) porque se envía contra `/`, la única ruta
 * que deja pasar el middleware en modo one page.
 */
export async function sendPostQuestion(
  _prevState: PostQuestionState,
  formData: FormData,
): Promise<PostQuestionState> {
  // Campo trampa invisible: solo lo rellenan los bots. Se finge éxito para no darles pistas.
  if (String(formData.get('website') ?? '').trim() !== '') return { status: 'success' };

  const values = {
    postSlug: String(formData.get('postSlug') ?? ''),
    email: String(formData.get('email') ?? ''),
    question: String(formData.get('question') ?? ''),
  };
  const result = postQuestionSchema.safeParse(values);

  if (!result.success) {
    return {
      status: 'error',
      fieldErrors: result.error.flatten().fieldErrors,
      values: { email: values.email, question: values.question },
    };
  }

  // Se guarda en Supabase; solo los admins pueden leerla (ver supabase/schema.sql).
  const supabase = createPublicClient();
  const { error } = await supabase.from('post_questions').insert({
    post_slug: result.data.postSlug,
    email: result.data.email,
    question: result.data.question,
  });

  if (error) {
    console.error('No se pudo guardar la duda del blog', { post: result.data.postSlug, error });
    return {
      status: 'error',
      formError: 'No hemos podido enviar tu duda. Inténtalo de nuevo en unos minutos.',
      values: { email: values.email, question: values.question },
    };
  }

  return { status: 'success' };
}
