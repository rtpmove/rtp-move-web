import Link from 'next/link';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/images/rtpmove-logo-negro.svg';

/**
 * Marca de RTP move. El SVG se usa como máscara, así que el logo toma el color
 * del texto (`currentColor`): usa `text-*` para cambiarlo y `h-*` para el tamaño.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block aspect-[761/559] h-12 shrink-0 bg-current', className)}
      style={{
        maskImage: `url(${LOGO_SRC})`,
        WebkitMaskImage: `url(${LOGO_SRC})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <Link href="/" className={cn('inline-flex items-center text-neutral-900', className)}>
      <LogoMark className={markClassName} />
      <span className="sr-only">RTP move — inicio</span>
    </Link>
  );
}
