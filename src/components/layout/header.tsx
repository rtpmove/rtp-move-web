import Link from 'next/link';
import { Phone } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { MobileNav } from '@/components/layout/mobile-nav';
import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="border-border/60 bg-neutral-0/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <Logo markClassName="h-11 lg:h-14" />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegación principal">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary-700 text-sm font-medium text-neutral-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            render={<a href={`tel:${siteConfig.contact.phoneHref}`} />}
            variant="ghost"
            className="hidden h-10 gap-2 rounded-xl px-3 sm:flex"
          >
            <Phone className="size-4" />
            {siteConfig.contact.phone}
          </Button>
          <Button
            render={<Link href="/contacto" />}
            size="lg"
            className="hidden h-10 rounded-xl px-5 lg:inline-flex"
          >
            Pedir cita
          </Button>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
