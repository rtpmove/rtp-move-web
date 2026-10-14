import { Container } from '@/components/shared/container';

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">{title}</h1>
        <div className="text-muted-foreground prose-neutral mt-8 flex flex-col gap-4 text-sm leading-relaxed">
          {children}
        </div>
      </Container>
    </section>
  );
}
