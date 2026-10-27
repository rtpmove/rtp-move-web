import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ['image/avif', 'image/webp'],
    // Fotos de ejemplo del slider de la home (src/lib/data/landing.ts).
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Imágenes del blog subidas desde /admin a Supabase Storage. Solo nuestro proyecto: con
      // `*.supabase.co` el optimizador procesaría imágenes de cualquier proyecto de Supabase.
      {
        protocol: 'https',
        hostname: 'peoqraznkiskvgrutlmx.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
