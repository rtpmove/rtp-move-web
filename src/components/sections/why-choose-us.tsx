import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { differentiators } from '@/lib/data/differentiators';

export function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Por qué elegirnos"
          title="Cercanía y rigor clínico en cada sesión"
          description="No somos una clínica más: cuidamos cada detalle para que tu recuperación sea segura, cómoda y eficaz."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-start gap-4">
                <div className="bg-secondary-50 text-secondary-700 flex size-12 items-center justify-center rounded-xl">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
