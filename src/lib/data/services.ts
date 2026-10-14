import { Activity, Bone, Brain, HeartPulse, PersonStanding, Waves } from 'lucide-react';
import type { Service } from '@/types';

export const services: Service[] = [
  {
    slug: 'fisioterapia-traumatologica',
    title: 'Fisioterapia traumatológica',
    shortDescription: 'Recuperación de lesiones musculoesqueléticas y postoperatorias.',
    description:
      'Tratamiento especializado para esguinces, roturas fibrilares, tendinopatías y procesos postquirúrgicos, con planes de recuperación personalizados.',
    icon: Bone,
  },
  {
    slug: 'fisioterapia-deportiva',
    title: 'Fisioterapia deportiva',
    shortDescription: 'Prevención y recuperación de lesiones para deportistas.',
    description:
      'Readaptación funcional, prevención de lesiones y optimización del rendimiento para deportistas amateur y profesionales.',
    icon: Activity,
  },
  {
    slug: 'rehabilitacion-neurologica',
    title: 'Rehabilitación neurológica',
    shortDescription: 'Recuperación funcional tras daño neurológico.',
    description:
      'Programas de neurorrehabilitación para ictus, esclerosis múltiple, Parkinson y otras afectaciones del sistema nervioso.',
    icon: Brain,
  },
  {
    slug: 'suelo-pelvico',
    title: 'Suelo pélvico',
    shortDescription: 'Tratamiento especializado en salud pélvica.',
    description:
      'Abordaje de incontinencias, preparación al parto y recuperación postparto mediante técnicas específicas de suelo pélvico.',
    icon: PersonStanding,
  },
  {
    slug: 'terapia-manual',
    title: 'Terapia manual',
    shortDescription: 'Técnicas manuales avanzadas para el dolor.',
    description:
      'Movilizaciones articulares, punción seca y masoterapia para el alivio del dolor y la mejora de la movilidad.',
    icon: HeartPulse,
  },
  {
    slug: 'readaptacion-funcional',
    title: 'Readaptación funcional',
    shortDescription: 'Vuelta progresiva a la actividad diaria.',
    description:
      'Ejercicio terapéutico guiado para recuperar fuerza, movilidad y autonomía tras una lesión o intervención.',
    icon: Waves,
  },
];
