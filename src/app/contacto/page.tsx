import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { LocationMap } from '@/components/shared/location-map';
import { ContactForm } from '@/components/contact/contact-form';
import { JsonLd } from '@/components/seo/json-ld';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

const TITLE = 'Contacto';
const DESCRIPTION =
  'Reserva tu cita en nuestra clínica de fisioterapia en Arganzuela, Madrid. Escríbenos, llámanos o visítanos.';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: '/contacto',
});

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Contacto', href: '/contacto' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />
      <section className="py-16 sm:py-24">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mt-6 max-w-2xl">
            <h1 className="text-4xl font-semibold text-neutral-900 sm:text-5xl">{TITLE}</h1>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">{DESCRIPTION}</p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-5">
                <li className="flex items-start gap-3">
                  <MapPin className="text-primary-600 mt-0.5 size-5 shrink-0" />
                  <span className="text-sm text-neutral-800">
                    {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="text-primary-600 mt-0.5 size-5 shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.phoneHref}`}
                    className="text-sm text-neutral-800"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="text-primary-600 mt-0.5 size-5 shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-sm text-neutral-800"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="text-primary-600 mt-0.5 size-5 shrink-0" />
                  <div className="text-sm text-neutral-800">
                    {siteConfig.openingHours.map((item) => (
                      <p key={item.days}>
                        <span className="font-medium">{item.days}:</span> {item.hours}
                      </p>
                    ))}
                  </div>
                </li>
              </ul>

              <LocationMap />
            </div>

            <div className="bg-neutral-0 border-border/60 rounded-2xl border p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
