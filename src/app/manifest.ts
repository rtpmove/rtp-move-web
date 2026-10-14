import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { features } from '@/config/features';
import { landingMeta } from '@/lib/data/landing';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: features.onePage ? landingMeta.name : siteConfig.legalName,
    short_name: features.onePage ? landingMeta.name : siteConfig.name,
    description: features.onePage ? landingMeta.description : siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2c4a3e',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
