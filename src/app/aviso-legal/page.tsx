import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Aviso legal',
  description: `Aviso legal de ${siteConfig.legalName}.`,
  path: '/aviso-legal',
  noIndex: true,
});

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal">
      <p>
        En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y Comercio
        Electrónico, se informa de los datos identificativos de {siteConfig.legalName}, con
        domicilio en {siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, y
        correo de contacto {siteConfig.contact.email}.
      </p>
      <p>
        Este contenido es un texto de ejemplo. Sustitúyelo por el aviso legal definitivo redactado
        por un profesional antes de publicar el sitio.
      </p>
    </LegalPage>
  );
}
