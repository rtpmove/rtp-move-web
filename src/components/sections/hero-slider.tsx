'use client';

import { Container } from '@/components/shared/container';
import { Button } from '@/components/ui/button';
import type { HeroSlide } from '@/lib/data/landing';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { getImageProps } from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

const SLIDE_INTERVAL_MS = 3000;
const DESKTOP_QUERY = '(min-width: 768px)';

function subscribeDesktop(onChange: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

/** En servidor se asume móvil; el <picture> ya elige la foto correcta antes de hidratar. */
function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

/** Foto con dirección de arte: horizontal en escritorio y 4x5 en móvil. */
function SlideImage({ slide, priority }: { slide: HeroSlide; priority: boolean }) {
  const common = { alt: slide.alt, fill: true, priority, sizes: '100vw' };
  const { props: mobileProps } = getImageProps({ ...common, src: slide.mobile });
  const desktopSrcSet = slide.desktop
    ? getImageProps({ ...common, src: slide.desktop }).props.srcSet
    : undefined;

  return (
    <picture>
      {desktopSrcSet && <source media={DESKTOP_QUERY} srcSet={desktopSrcSet} sizes="100vw" />}
      <img {...mobileProps} alt={slide.alt} className="object-cover" />
    </picture>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export interface HeroAction {
  label: string;
  href: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  eyebrow?: string;
  title: string;
  description: string;
  /** Botones bajo la descripción; el primero se muestra destacado. */
  actions?: HeroAction[];
  /** Contenido extra sobre las fotos, p. ej. el logo. */
  topSlot?: React.ReactNode;
}

export function HeroSlider({
  slides: allSlides,
  eyebrow,
  title,
  description,
  actions,
  topSlot,
}: HeroSliderProps) {
  const isDesktop = useIsDesktop();
  const desktopSlides = allSlides.filter((slide) => slide.desktop);
  // En escritorio solo se usan las fotos horizontales (si no hay ninguna, se usan todas).
  const slides = isDesktop && desktopSlides.length > 0 ? desktopSlides : allSlides;

  const [selected, setCurrent] = useState(0);
  // Al cambiar de móvil a escritorio cambia el número de diapositivas.
  const current = selected % slides.length;
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const next = useCallback(
    () => setCurrent((index) => ((index % slides.length) + 1) % slides.length),
    [slides.length],
  );

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return;
    const timer = setInterval(next, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next, paused, reduceMotion, slides.length, current]);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Presentación"
      className="relative isolate flex h-[100svh] min-h-[560px] w-full overflow-hidden bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="ease-smooth absolute inset-0 -z-20 flex transition-transform duration-[1200ms] motion-reduce:transition-none"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.mobile}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${slides.length}`}
            aria-hidden={index !== current}
            className="relative h-full w-full shrink-0"
          >
            <SlideImage slide={slide} priority={index === 0} />
          </div>
        ))}
      </div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-neutral-950/85 via-neutral-950/45 to-neutral-950/30"
      />

      {topSlot && (
        <div className="absolute inset-x-0 top-0">
          <Container className="flex h-20 items-center">{topSlot}</Container>
        </div>
      )}

      <Container className="flex flex-col justify-end pb-24 sm:pb-28">
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.span
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="bg-neutral-0/15 text-neutral-0 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            initial="hidden"
            animate="visible"
            custom={0.08}
            variants={fadeUp}
            className="text-neutral-0 mt-6 text-4xl font-semibold text-balance sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.16}
            variants={fadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-100"
          >
            {description}
          </motion.p>
          {actions && actions.length > 0 && (
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.24}
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              {actions.map((action, index) => (
                <Button
                  key={action.href}
                  render={<Link href={action.href} />}
                  variant={index === 0 ? 'default' : 'outline'}
                  size="lg"
                  className={cn(
                    'h-13 gap-2 rounded-xl px-7 text-base',
                    index > 0 &&
                      'border-neutral-0/60 text-neutral-0 hover:bg-neutral-0/15 hover:text-neutral-0 bg-transparent backdrop-blur-sm',
                  )}
                >
                  {action.label}
                  {index === 0 && <ArrowDown className="size-4" />}
                </Button>
              ))}
            </motion.div>
          )}
        </div>
      </Container>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-8">
          <Container className="flex items-center">
            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.mobile}
                  type="button"
                  onClick={() => setCurrent(index)}
                  aria-label={`Ver foto ${index + 1}`}
                  aria-current={index === current}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    index === current
                      ? 'bg-neutral-0 w-8'
                      : 'bg-neutral-0/40 hover:bg-neutral-0/70 w-4',
                  )}
                />
              ))}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
