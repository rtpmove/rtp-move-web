'use server';

import { redirect } from 'next/navigation';
import { createSessionClient } from '@/lib/supabase/server';

export interface SignInState {
  error?: string;
  email?: string;
}

export async function signIn(_prevState: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: 'Email o contraseña incorrectos.', email };

  redirect('/admin');
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}
