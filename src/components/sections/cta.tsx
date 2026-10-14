import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

export function Cta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="from-primary-600 to-primary-800 relative overflow-hidden rounded-3xl bg-gradient-to-br px-8 py-16 text-center sm:px-16">
          <div
            aria-hidden
            className="bg-neutral-0/10 absolute -top-24 -right-24 size-72 rounded-full blur-2xl"
          />
          <h2 className="text-neutral-0 relative text-3xl font-semibold text-balance sm:text-4xl">
            Empieza hoy tu recuperación
          </h2>
          <p className="text-primary-100 relative mx-auto mt-4 max-w-xl text-balance">
            Reserva tu primera valoración y descubre un plan de tratamiento pensado específicamente
            para ti.
          </p>
          <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              variant="secondary"
              className="text-primary-800 h-12 gap-2 rounded-xl bg-white px-7 text-base hover:bg-white/90"
            >
              Pedir cita
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href={`tel:${siteConfig.contact.phoneHref}`} />}
              variant="outline"
              size="lg"
              className="text-neutral-0 h-12 gap-2 rounded-xl border-white/30 bg-transparent px-7 text-base hover:bg-white/10 hover:text-white"
            >
              <Phone className="size-4" />
              {siteConfig.contact.phone}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
