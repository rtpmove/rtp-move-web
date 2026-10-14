import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Introduce tu nombre completo.').max(80),
  email: z.email('Introduce un email válido.'),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s]{6,15}$/, 'Introduce un teléfono válido.'),
  service: z.string().min(1, 'Selecciona un servicio.'),
  message: z.string().trim().min(10, 'Cuéntanos brevemente qué te ocurre.').max(1000),
  consent: z.literal(true, 'Debes aceptar la política de privacidad para continuar.'),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
