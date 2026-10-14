import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { LocationMap } from '@/components/shared/location-map';
import { ContactForm } from '@/components/contact/contact-form';
import { siteConfig } from '@/config/site';

export function ContactSection() {
  return (
    <section id="contacto" className="bg-muted scroll-mt-20 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Contacto"
          title="Reserva tu primera valoración"
          description="Escríbenos y te ayudaremos a encontrar el tratamiento más adecuado para tu recuperación."
        />

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
                <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-neutral-800">
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
  );
}
