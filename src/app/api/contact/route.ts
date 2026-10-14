import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: Request) {
  const body = await request.json();
  const result = contactFormSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // TODO: conectar con backend real (Server Action + Prisma/servicio de email)
  // cuando esté disponible. Por ahora se registra la solicitud recibida.
  console.info('Nueva solicitud de contacto recibida', {
    name: result.data.name,
    service: result.data.service,
  });

  return NextResponse.json({ success: true });
}
