export const siteConfig = {
  name: 'RTP',
  legalName: 'RTP Centro de Fisioterapia y Rehabilitación',
  shortDescription:
    'Fisioterapia y rehabilitación especializada en el barrio de Arganzuela, Madrid.',
  description:
    'Clínica de fisioterapia y rehabilitación en Arganzuela (Madrid). Tratamientos personalizados de fisioterapia deportiva, traumatológica, neurológica y suelo pélvico con un equipo especializado.',
  url: 'https://www.fisioarganzuela.es',
  ogImage: '/images/og/default.jpg',
  locale: 'es_ES',
  keywords: [
    'fisioterapia Arganzuela',
    'fisioterapeuta Madrid',
    'rehabilitación Madrid',
    'clínica de fisioterapia Arganzuela',
    'fisioterapia deportiva Madrid',
    'fisioterapia traumatológica',
    'suelo pélvico Madrid',
  ],
  contact: {
    phone: '+34 910 000 000',
    phoneHref: '+34910000000',
    whatsapp: '+34 600 000 000',
    email: 'hola@fisioarganzuela.es',
  },
  address: {
    streetAddress: 'Calle de Embajadores, 123',
    addressLocality: 'Madrid',
    addressRegion: 'Madrid',
    postalCode: '28045',
    addressCountry: 'ES',
    neighborhood: 'Arganzuela',
  },
  geo: {
    latitude: 40.3956,
    longitude: -3.6975,
  },
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.489!2d-3.6975!3d40.3956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDIzJzQ0LjIiTiAzwrA0MSc1MSA=!5e0!3m2!1ses!2ses!4v0000000000000',
  mapsUrl: 'https://maps.google.com/?q=RTP+Fisioterapia+Madrid',
  openingHours: [
    { days: 'Lunes a Viernes', hours: '09:00–14:00 y 16:00–20:30' },
    { days: 'Sábado', hours: '10:00–14:00' },
  ],
  social: {
    instagram: 'https://instagram.com/fisioarganzuela',
    facebook: 'https://facebook.com/fisioarganzuela',
    linkedin: 'https://linkedin.com/company/fisioarganzuela',
  },
  nav: [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Cómo trabajamos', href: '/#como-trabajamos' },
    { label: 'Opiniones', href: '/#opiniones' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contacto' },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
