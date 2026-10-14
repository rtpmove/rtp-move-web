'use client';

import { useActionState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sendPostQuestion, type PostQuestionState } from '@/lib/actions/post-question';
import { cn } from '@/lib/utils';

const initialState: PostQuestionState = { status: 'idle' };

interface PostQuestionFormProps {
  postSlug: string;
  className?: string;
}

export function PostQuestionForm({ postSlug, className }: PostQuestionFormProps) {
  const [state, formAction, isPending] = useActionState(sendPostQuestion, initialState);

  return (
    <section
      className={cn('border-primary-200 bg-primary-50 rounded-2xl border p-6 sm:p-8', className)}
    >
      {state.status === 'success' ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="text-primary-600 size-10" />
          <h3 className="text-lg font-semibold text-neutral-900">
            ¡Gracias! Hemos recibido tu duda.
          </h3>
          <p className="text-muted-foreground text-sm">
            Te responderemos por email lo antes posible.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-xl font-semibold text-neutral-900">¿Te ha quedado alguna duda?</h3>
          <p className="text-muted-foreground mt-2 text-sm">
            Escríbenos directamente y te respondemos por email.
          </p>

          <form action={formAction} className="mt-6 flex flex-col gap-5" noValidate>
            <input type="hidden" name="postSlug" value={postSlug} />

            <div className="flex flex-col gap-2">
              <Label htmlFor={`${postSlug}-email`}>Tu email</Label>
              <Input
                id={`${postSlug}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tucorreo@ejemplo.com"
                defaultValue={state.values?.email}
                aria-invalid={Boolean(state.fieldErrors?.email)}
                className="bg-neutral-0 h-11"
              />
              {state.fieldErrors?.email && (
                <p className="text-destructive text-sm">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={`${postSlug}-question`}>Tu duda</Label>
              <Textarea
                id={`${postSlug}-question`}
                name="question"
                rows={4}
                placeholder="Cuéntanos qué te gustaría preguntarnos..."
                defaultValue={state.values?.question}
                aria-invalid={Boolean(state.fieldErrors?.question)}
                className="bg-neutral-0 min-h-28"
              />
              {state.fieldErrors?.question && (
                <p className="text-destructive text-sm">{state.fieldErrors.question[0]}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="h-11 gap-2 self-start rounded-xl px-6 text-base"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              Enviar duda
            </Button>
          </form>
        </>
      )}
    </section>
  );
}
