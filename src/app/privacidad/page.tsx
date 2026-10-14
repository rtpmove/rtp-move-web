import type { Metadata } from 'next';
import { LegalPage } from '@/components/shared/legal-page';
import { buildMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = buildMetadata({
  title: 'Política de privacidad',
  description: `Política de privacidad de ${siteConfig.legalName}.`,
  path: '/privacidad',
  noIndex: true,
});

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        {siteConfig.legalName} trata los datos personales facilitados a través del formulario de
        contacto con la única finalidad de responder a tu solicitud de información o cita.
      </p>
      <p>
        Este contenido es un texto de ejemplo. Sustitúyelo por la política de privacidad definitiva,
        adaptada al RGPD y a la LOPDGDD, antes de publicar el sitio.
      </p>
    </LegalPage>
  );
}
