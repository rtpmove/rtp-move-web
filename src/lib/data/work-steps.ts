import type { WorkStep } from '@/types';

export const workSteps: WorkStep[] = [
  {
    step: 1,
    title: 'Valoración inicial',
    description:
      'Evaluamos tu historial clínico y realizamos una exploración física completa para entender el origen del problema.',
  },
  {
    step: 2,
    title: 'Diagnóstico funcional',
    description:
      'Definimos un diagnóstico fisioterapéutico preciso y establecemos objetivos claros y medibles contigo.',
  },
  {
    step: 3,
    title: 'Plan de tratamiento',
    description:
      'Diseñamos un plan personalizado combinando terapia manual, ejercicio terapéutico y tecnología cuando es necesario.',
  },
  {
    step: 4,
    title: 'Seguimiento y alta',
    description:
      'Medimos tu evolución en cada sesión y te acompañamos hasta la recuperación completa y la prevención de recaídas.',
  },
];
