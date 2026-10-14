import Link from 'next/link';
import { HeartPulse } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-semibold text-neutral-900',
        className,
      )}
    >
      <span className="bg-primary-600 text-neutral-0 flex size-9 items-center justify-center rounded-xl">
        <HeartPulse className="size-5" strokeWidth={2.25} aria-hidden />
      </span>
      <span>{siteConfig.name}</span>
    </Link>
  );
}
