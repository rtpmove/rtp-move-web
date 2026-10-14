import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { services } from '@/lib/data/services';

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Servicios"
          title="Tratamientos especializados para cada etapa de tu recuperación"
          description="Combinamos terapia manual, ejercicio terapéutico y tecnología para diseñar el plan más adecuado a tu lesión."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.slug}
                className="group border-border/60 hover:border-primary-300 relative flex flex-col rounded-2xl border p-7 transition-colors hover:shadow-sm"
              >
                <div className="bg-primary-50 text-primary-700 flex size-12 items-center justify-center rounded-xl">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-neutral-900">{service.title}</h3>
                <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                  {service.shortDescription}
                </p>
                <Link
                  href="/contacto"
                  className="text-primary-700 mt-5 inline-flex items-center gap-1.5 text-sm font-medium"
                >
                  Más información
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
