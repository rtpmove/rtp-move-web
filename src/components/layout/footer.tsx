import Link from 'next/link';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { Logo } from '@/components/layout/logo';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/shared/social-icons';
import { siteConfig } from '@/config/site';

const legalLinks = [
  { label: 'Aviso legal', href: '/aviso-legal' },
  { label: 'Política de privacidad', href: '/privacidad' },
  { label: 'Política de cookies', href: '/cookies' },
];

export function Footer() {
  return (
    <footer className="border-border/60 bg-muted border-t">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
          <Logo className="self-start" markClassName="h-14" />
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            {siteConfig.shortDescription}
          </p>
          <div className="flex gap-3">
            <SocialLink href={siteConfig.social.instagram} label="Instagram">
              <InstagramIcon className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.facebook} label="Facebook">
              <FacebookIcon className="size-4" />
            </SocialLink>
            <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
              <LinkedinIcon className="size-4" />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-neutral-900">Navegación</h3>
          <ul className="flex flex-col gap-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary-700 text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-neutral-900">Contacto</h3>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="text-muted-foreground flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}
              </span>
            </li>
            <li className="text-muted-foreground flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a href={`tel:${siteConfig.contact.phoneHref}`} className="hover:text-primary-700">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="text-muted-foreground flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary-700">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold text-neutral-900">Horario</h3>
          <ul className="flex flex-col gap-3 text-sm">
            {siteConfig.openingHours.map((item) => (
              <li key={item.days} className="text-muted-foreground">
                <span className="font-medium text-neutral-800">{item.days}</span>
                <br />
                {item.hours}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-border/60 border-t">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-primary-700 text-xs"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="border-border bg-neutral-0 text-muted-foreground hover:text-primary-700 hover:border-primary-300 flex size-9 items-center justify-center rounded-full border transition-colors"
    >
      {children}
    </a>
  );
}
