'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact';
import { services } from '@/lib/data/services';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      consent: undefined as unknown as true,
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-primary-200 bg-primary-50 flex flex-col items-center gap-3 rounded-2xl border p-10 text-center">
        <CheckCircle2 className="text-primary-600 size-10" />
        <h3 className="text-lg font-semibold text-neutral-900">
          ¡Gracias! Hemos recibido tu solicitud.
        </h3>
        <p className="text-muted-foreground text-sm">
          Nuestro equipo se pondrá en contacto contigo en menos de 24 horas laborables.
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setStatus('idle')}>
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre completo</FormLabel>
                <FormControl>
                  <Input placeholder="Tu nombre" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="tu@email.com" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="600 000 000" autoComplete="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicio de interés</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un servicio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.slug} value={service.slug}>
                        {service.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuéntanos qué te ocurre</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe brevemente tu lesión o el motivo de la consulta"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem>
              <label className="flex items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={field.value === true}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="border-input accent-primary-600 mt-0.5 size-4 rounded"
                />
                <span className="text-muted-foreground">
                  He leído y acepto la{' '}
                  <a href="/privacidad" className="text-primary-700 underline">
                    política de privacidad
                  </a>
                  .
                </span>
              </label>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === 'error' && (
          <p className="text-destructive text-sm">
            Ha ocurrido un error al enviar el formulario. Inténtalo de nuevo o llámanos
            directamente.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="h-12 gap-2 rounded-xl text-base"
        >
          {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Enviar solicitud
        </Button>
      </form>
    </Form>
  );
}
