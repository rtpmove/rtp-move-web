import { Container } from '@/components/shared/container';
import { LogoMark } from '@/components/layout/logo';
import { InstagramIcon } from '@/components/shared/social-icons';
import { aboutUs } from '@/lib/data/landing';
import { Check, Mail } from 'lucide-react';

/** Carta de presentación del equipo: columna lateral fija y texto largo legible. */
export function AboutUs({ id }: { id?: string }) {
  const { contact } = aboutUs;

  return (
    <section id={id} className="bg-muted scroll-mt-8 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
        <aside className="lg:sticky lg:top-12 lg:self-start">
          <span className="text-secondary-600 text-sm font-semibold tracking-wide uppercase">
            {aboutUs.eyebrow}
          </span>

          <ul className="mt-8 flex flex-col gap-3">
            {aboutUs.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-neutral-700">
                <span className="bg-primary-50 text-primary-600 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-3.5" strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="border-border/60 bg-background mt-10 flex flex-col gap-3 rounded-2xl border p-5">
            <p className="text-sm font-medium text-neutral-900">Escríbenos</p>
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-primary-600 flex items-center gap-3 text-sm break-all text-neutral-700 transition-colors"
            >
              <Mail className="size-4 shrink-0" />
              {contact.email}
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 flex items-center gap-3 text-sm text-neutral-700 transition-colors"
            >
              <InstagramIcon className="size-4 shrink-0" />
              {contact.instagramHandle}
            </a>
          </div>
        </aside>

        <div className="max-w-prose text-base leading-relaxed text-neutral-700 sm:text-lg">
          {aboutUs.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={index === 0 ? 'text-lg font-medium text-neutral-900 sm:text-xl' : 'mt-6'}
            >
              {paragraph}
            </p>
          ))}
          <p className="mt-6">
            Podéis hacerlo a través del correo electrónico{' '}
            <a
              href={`mailto:${contact.email}`}
              className="text-primary-600 font-medium underline-offset-4 hover:underline"
            >
              {contact.email}
            </a>{' '}
            o a través de nuestro Instagram (
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 font-medium underline-offset-4 hover:underline"
            >
              {contact.instagramHandle}
            </a>
            ).
          </p>
          <div className="border-border mt-10 border-t pt-8">
            <p className="text-xl font-semibold text-neutral-900 sm:text-2xl">{aboutUs.signOff}</p>
            <LogoMark className="mt-6 h-14 text-neutral-900 sm:h-16" />
          </div>
        </div>
      </Container>
    </section>
  );
}
