import { NextResponse } from 'next/server';
import { createPublicClient } from '@/lib/supabase/public';

export const dynamic = 'force-dynamic';

/**
 * Supabase pausa los proyectos gratuitos tras 7 días sin actividad. Como la web pública
 * sirve el blog desde la caché de Next, puede pasar una semana sin consultas reales, así
 * que un cron de Vercel (ver `vercel.json`) llama aquí una vez al día.
 */
export async function GET(request: Request) {
  // Vercel envía `Authorization: Bearer <CRON_SECRET>` si la variable está definida.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await createPublicClient().from('posts').select('id').limit(1);
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
