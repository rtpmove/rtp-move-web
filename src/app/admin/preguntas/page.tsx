import { Mail, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { deleteQuestion, toggleQuestionAnswered } from '@/lib/actions/admin-questions';
import { createSessionClient } from '@/lib/supabase/server';

interface QuestionRow {
  id: string;
  post_slug: string;
  email: string;
  question: string;
  answered: boolean;
  created_at: string;
}

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'Europe/Madrid',
});

export default async function AdminQuestionsPage() {
  const supabase = await createSessionClient();
  const [{ data: isAdmin }, { data, error }, { data: posts }] = await Promise.all([
    supabase.rpc('is_admin'),
    supabase
      .from('post_questions')
      .select('id, post_slug, email, question, answered, created_at')
      .order('answered', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase.from('posts').select('slug, title'),
  ]);

  if (!isAdmin) {
    return <p className="text-muted-foreground">Tu usuario no es administrador.</p>;
  }
  if (error) throw new Error(`No se pudieron cargar las dudas: ${error.message}`);

  const questions = data as QuestionRow[];
  const titles = new Map((posts ?? []).map((p) => [p.slug as string, p.title as string]));
  const pending = questions.filter((q) => !q.answered).length;

  return (
    <>
      <h1 className="text-2xl font-semibold text-neutral-900">Dudas de los lectores</h1>
      <p className="text-muted-foreground mt-2 text-sm">
        {pending === 0
          ? 'No hay dudas pendientes.'
          : `${pending} pendiente${pending > 1 ? 's' : ''} de responder.`}
      </p>

      {questions.length === 0 ? (
        <p className="text-muted-foreground mt-10">Todavía no ha llegado ninguna duda.</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-4">
          {questions.map((q) => {
            const title = titles.get(q.post_slug) ?? q.post_slug;
            const subject = encodeURIComponent(`Tu duda sobre «${title}»`);
            const body = encodeURIComponent(`\n\n---\nTu duda:\n${q.question}`);
            return (
              <li
                key={q.id}
                className={`border-border/60 bg-neutral-0 rounded-2xl border p-5 ${q.answered ? 'opacity-60' : ''}`}
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <Badge variant={q.answered ? 'outline' : 'default'}>
                    {q.answered ? 'Respondida' : 'Pendiente'}
                  </Badge>
                  <span className="text-muted-foreground">
                    {dateFormatter.format(new Date(q.created_at))} · {title}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-900">{q.email}</p>
                <p className="mt-2 text-sm whitespace-pre-wrap text-neutral-800">{q.question}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${q.email}?subject=${subject}&body=${body}`}
                    className={buttonVariants({ size: 'sm' })}
                  >
                    <Mail />
                    Responder por email
                  </a>
                  <form action={toggleQuestionAnswered}>
                    <input type="hidden" name="id" value={q.id} />
                    <input type="hidden" name="answered" value={String(!q.answered)} />
                    <Button type="submit" variant="outline" size="sm">
                      {q.answered ? 'Marcar como pendiente' : 'Marcar como respondida'}
                    </Button>
                  </form>
                  <form action={deleteQuestion}>
                    <input type="hidden" name="id" value={q.id} />
                    <Button type="submit" variant="ghost" size="sm" aria-label="Borrar duda">
                      <Trash2 />
                    </Button>
                  </form>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
