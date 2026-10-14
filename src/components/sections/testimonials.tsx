import { Star } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { testimonials } from '@/lib/data/testimonials';

export function Testimonials() {
  return (
    <section id="opiniones" className="bg-muted scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Opiniones"
          title="La confianza de nuestros pacientes"
          description="Estas son algunas de las experiencias de quienes han confiado en nosotros para su recuperación."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="bg-neutral-0 border-border/60 flex flex-col rounded-2xl border p-6"
            >
              <div className="flex gap-0.5" aria-hidden>
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} className="text-secondary-500 size-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-muted-foreground mt-4 flex-1 text-sm leading-relaxed">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-muted-foreground text-xs">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
