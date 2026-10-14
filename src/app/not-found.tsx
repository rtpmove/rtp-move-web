import Link from 'next/link';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-24">
      <Container className="flex flex-col items-center text-center">
        <span className="text-primary-600 text-sm font-semibold">Error 404</span>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-900 sm:text-4xl">
          No hemos encontrado esta página
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-base leading-relaxed">
          Puede que el enlace esté roto o que la página se haya movido. Vuelve al inicio para seguir
          navegando.
        </p>
        <Button render={<Link href="/" />} size="lg" className="mt-8 h-12 rounded-xl px-7">
          Volver al inicio
        </Button>
      </Container>
    </section>
  );
}
