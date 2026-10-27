import { NextResponse } from 'next/server';
import { createPublicClient } from '@/lib/supabase/public';

export const dynamic = 'force-dynamic';

/**
 * Supabase pausa los proyectos gratuitos con poca actividad. Como la web pública sirve el
 * blog desde la caché de Next, puede pasar una semana sin consultas reales, así que un cron
 * de Vercel (ver `vercel.json`) llama aquí una vez al día. Solo leer no basta para evitar la
 * pausa: también escribe en `public.keep_alive` (ver `supabase/schema.sql`).
 */
export async function GET(request: Request) {
  // Vercel envía `Authorization: Bearer <CRON_SECRET>` si la variable está definida.
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createPublicClient();

    const read = await supabase.from('posts').select('id').limit(1);
    if (read.error) throw read.error;

    const { data: runs, error } = await supabase.rpc('keep_alive');
    if (error) throw error;

    return NextResponse.json({ ok: true, runs });
  } catch (error) {
    // El detalle va a los logs de Vercel, no a la respuesta.
    console.error('keep-alive', error);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
