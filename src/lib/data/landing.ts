export interface HeroSlide {
  src: string;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    src: '/images/David%20y%20Jorge.png',
    alt: 'David y Jorge, fisioterapeutas de RTP Move',
  },
  {
    src: '/images/David.png',
    alt: 'David, fisioterapeuta de RTP Move',
  },
  {
    src: '/images/Jorge.png',
    alt: 'Jorge, fisioterapeuta de RTP Move',
  },
];

export const landingIntro = {
  eyebrow: 'Fisioterapia basada en la evidencia',
  title: 'Fisioterapia con ciencia, sin milagros',
  description:
    'Somos David y Jorge, fisioterapeutas expertos en Fisioterapia Deportiva. Aquí compartimos fisioterapia basada en la ciencia, lejos de pseudociencias y técnicas milagrosas.',
};

// Textos de marca y SEO del modo one page: no mencionan clínica, dirección ni horarios.
export const landingMeta = {
  name: 'RTP move',
  title: 'RTP move — Fisioterapia basada en la ciencia',
  description:
    'David y Jorge, fisioterapeutas expertos en Fisioterapia Deportiva, comparten fisioterapia basada en la ciencia, lejos de pseudociencias y técnicas milagrosas.',
  ogSubtitle: 'Fisioterapia con ciencia, sin milagros',
  keywords: [
    'fisioterapia basada en la evidencia',
    'fisioterapia deportiva',
    'blog de fisioterapia',
    'fisioterapeutas',
    'readaptación deportiva',
  ],
};

export const aboutUs = {
  eyebrow: 'Quiénes somos',
  title: 'Somos David y Jorge',
  highlights: [
    'Fisioterapeutas',
    'Graduados en Ciencias de la Actividad Física y del Deporte',
    'Expertos en Fisioterapia Deportiva (URJC)',
    'Más de tres años trabajando juntos',
  ],
  paragraphs: [
    'Lo primero de todo, queremos daros las gracias por llegar hasta aquí. Simplemente que dediquéis un poco de vuestro tiempo, que es lo más preciado que tenemos, a nuestro proyecto nos da fuerzas para seguir, así que, de verdad, gracias infinitas.',
    'Vamos a presentarnos: somos David y Jorge, fisioterapeutas y graduados en Ciencias de la Actividad Física y del Deporte, y expertos en Fisioterapia Deportiva por la Universidad Rey Juan Carlos. Y si os estáis preguntando si los dos tenemos la misma formación, la respuesta es SÍ. Hemos estudiado juntos los seis años del doble grado y también el año del experto en Fisioterapia Deportiva; además, llevamos más de tres años trabajando juntos.',
    'Y es que, aparte de disfrutar de nuestra mutua compañía, también compartimos el mismo punto de vista sobre la fisioterapia, que no es otro que intentar acercarnos a la fisioterapia más científica, huyendo de las pseudociencias o técnicas milagrosas que muchos venden.',
    'El objetivo de este blog es intentar responder de la manera más objetiva posible a los principales problemas que vemos a diario en consulta. Y es obvio que no tenemos la respuesta concreta para cada circunstancia particular, porque cada persona presenta unas características concretas que no están definidas únicamente por el posible problema estructural o mecanicista subyacente, sino que también entran en juego factores ambientales y emocionales que forman parte de cada individuo y que interfieren —y en ocasiones tienen mucho peso— en los procesos de rehabilitación de los pacientes.',
    'Pero lo que vamos a presentar son los datos, la prevalencia y todo lo que la ciencia nos proporciona, para después poder aplicarlo a cada caso, porque si no conocemos la base, ¿cómo vamos a saber qué camino seguir?',
    'Nos encantaría que esto fuese un canal de comunicación bidireccional, y que, si tenéis alguna duda o necesitáis alguna aclaración sobre algún tema, no dudéis en escribirnos para poder ayudaros. De verdad que nos haría mucha ilusión poder hablar sobre lo que más nos gusta con todos aquellos que sientan que necesitan ayuda, y así poder aportar nuestro granito de arena.',
  ],
  contact: {
    email: 'rtpmove.contacto@gmail.com',
    instagramHandle: '@rtpmove',
    instagramUrl: 'https://instagram.com/rtpmove',
  },
  signOff: 'Bienvenidos a RTP move.',
};
