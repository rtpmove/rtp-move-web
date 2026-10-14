import { GraduationCap, ShieldCheck, Timer, UserCheck } from 'lucide-react';
import type { Differentiator } from '@/types';

export const differentiators: Differentiator[] = [
  {
    title: 'Equipo especializado',
    description:
      'Fisioterapeutas colegiados con formación continua en las últimas técnicas de rehabilitación.',
    icon: GraduationCap,
  },
  {
    title: 'Atención personalizada',
    description: 'Un mismo fisioterapeuta te acompaña durante todo el proceso de recuperación.',
    icon: UserCheck,
  },
  {
    title: 'Sesiones sin esperas',
    description: 'Agenda flexible y puntualidad: tu tiempo es tan valioso como tu recuperación.',
    icon: Timer,
  },
  {
    title: 'Resultados medibles',
    description: 'Evaluamos tu progreso con criterios objetivos en cada fase del tratamiento.',
    icon: ShieldCheck,
  },
];
