'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, MapPin, ShieldCheck, Star } from 'lucide-react';
import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="bg-primary-100/60 absolute top-0 -right-40 -z-10 size-[520px] rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-secondary-100/50 absolute -bottom-32 -left-32 -z-10 size-[420px] rounded-full blur-3xl"
      />

      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <motion.span
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeUp}
            className="bg-primary-50 text-primary-700 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium"
          >
            <MapPin className="size-3.5" />
            Fisioterapia en Arganzuela, Madrid
          </motion.span>

          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
            className="mt-6 text-4xl font-semibold text-balance text-neutral-900 sm:text-5xl lg:text-6xl"
          >
            Recupera tu movimiento con un equipo que te acompaña de verdad
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeUp}
            className="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed"
          >
            Fisioterapia y rehabilitación personalizada para recuperar tu movilidad, aliviar el
            dolor y volver a tu día a día sin miedo a recaídas.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.24}
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              render={<Link href="/contacto" />}
              size="lg"
              className="h-13 gap-2 rounded-xl px-7 text-base"
            >
              Pedir cita
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<Link href="#servicios" />}
              variant="outline"
              size="lg"
              className="h-13 rounded-xl px-7 text-base"
            >
              Ver servicios
            </Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.32}
            variants={fadeUp}
            className="text-muted-foreground mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="text-primary-600 size-4" />
              Fisioterapeutas colegiados
            </span>
            <span className="flex items-center gap-2">
              <Star className="text-secondary-600 size-4 fill-current" />
              4.9/5 en más de 200 opiniones
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative hidden aspect-[4/5] w-full lg:block"
        >
          <div className="from-primary-600 to-primary-800 absolute inset-0 rounded-[2rem] bg-gradient-to-br shadow-xl" />
          <div className="bg-neutral-0 absolute top-8 -left-6 flex items-center gap-3 rounded-2xl p-4 shadow-lg">
            <div className="bg-primary-50 flex size-10 items-center justify-center rounded-xl">
              <ShieldCheck className="text-primary-600 size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">+12 años</p>
              <p className="text-muted-foreground text-xs">de experiencia</p>
            </div>
          </div>
          <div className="bg-neutral-0 absolute right-6 bottom-10 flex items-center gap-3 rounded-2xl p-4 shadow-lg">
            <div className="bg-secondary-50 flex size-10 items-center justify-center rounded-xl">
              <Star className="text-secondary-600 size-5 fill-current" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900">98%</p>
              <p className="text-muted-foreground text-xs">pacientes satisfechos</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
