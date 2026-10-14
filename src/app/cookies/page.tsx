import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Política de cookies',
  description: `Política de cookies de ${siteConfig.legalName}.`,
  path: '/cookies',
  noIndex: true,
});

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies">
      <p>
        Este sitio utiliza cookies técnicas necesarias para su correcto funcionamiento. En futuras
        versiones se podrán incorporar cookies analíticas o de terceros, que se solicitarán con el
        correspondiente consentimiento.
      </p>
      <p>
        Este contenido es un texto de ejemplo. Sustitúyelo por la política de cookies definitiva
        antes de publicar el sitio.
      </p>
    </LegalPage>
  );
}
