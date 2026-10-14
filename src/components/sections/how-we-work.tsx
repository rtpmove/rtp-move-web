import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { workSteps } from '@/lib/data/work-steps';

export function HowWeWork() {
  return (
    <section id="como-trabajamos" className="bg-muted scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Cómo trabajamos"
          title="Un proceso claro, pensado para tu recuperación"
          description="Cada paciente sigue un proceso estructurado que garantiza objetivos claros y resultados medibles."
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="bg-border absolute top-6 right-0 left-0 hidden h-px lg:block"
          />
          {workSteps.map((item) => (
            <div key={item.step} className="relative flex flex-col items-start">
              <span className="bg-primary-600 text-neutral-0 relative z-10 flex size-12 items-center justify-center rounded-full text-lg font-semibold">
                {item.step}
              </span>
              <h3 className="mt-5 text-base font-semibold text-neutral-900">{item.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
