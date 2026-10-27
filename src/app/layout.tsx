import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { poppins, openSans } from '@/lib/fonts';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo/metadata';
import { medicalBusinessSchema } from '@/lib/seo/schema';
import { JsonLd } from '@/components/seo/json-ld';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { LandingFooter } from '@/components/layout/landing-footer';
import { features } from '@/config/features';
import { landingMeta } from '@/lib/data/landing';
import './globals.css';

const defaultTitle = features.onePage
  ? landingMeta.title
  : `${siteConfig.name} — Fisioterapia y Rehabilitación en Arganzuela, Madrid`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: defaultTitle,
    template: `%s — ${features.onePage ? landingMeta.name : siteConfig.name}`,
  },
  ...buildMetadata({
    title: defaultTitle,
    description: features.onePage ? landingMeta.description : siteConfig.description,
    keywords: features.onePage ? landingMeta.keywords : undefined,
  }),
  icons: {
    icon: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.variable} ${openSans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        {!features.onePage && <JsonLd data={medicalBusinessSchema()} />}
        <a
          href="#main-content"
          className="bg-primary-600 text-neutral-0 sr-only z-50 rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido principal
        </a>
        {!features.onePage && <Header />}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {features.onePage ? <LandingFooter /> : <Footer />}
        <Analytics />
      </body>
    </html>
  );
}
