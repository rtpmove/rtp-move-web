'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSessionClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/admin/login');

  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) throw new Error('Tu usuario no tiene permisos de administración.');

  return supabase;
}

/** Marca o desmarca una duda como respondida. */
export async function toggleQuestionAnswered(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const answered = formData.get('answered') === 'true';
  const supabase = await requireAdmin();

  const { error } = await supabase.from('post_questions').update({ answered }).eq('id', id);
  if (error) throw new Error(`No se pudo actualizar la duda: ${error.message}`);

  revalidatePath('/admin/preguntas');
}

export async function deleteQuestion(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const supabase = await requireAdmin();

  const { error } = await supabase.from('post_questions').delete().eq('id', id);
  if (error) throw new Error(`No se pudo borrar la duda: ${error.message}`);

  revalidatePath('/admin/preguntas');
}
