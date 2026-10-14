'use server';

import { postQuestionSchema } from '@/lib/validations/post-question';

export interface PostQuestionState {
  status: 'idle' | 'success' | 'error';
  fieldErrors?: { email?: string[]; question?: string[] };
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

  // TODO: conectar con el servicio de email real cuando esté disponible.
  // Por ahora se registra la duda recibida.
  console.info('Nueva duda recibida desde el blog', { post: result.data.postSlug });

  return { status: 'success' };
}
