import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="text-secondary-600 text-sm font-semibold tracking-wide uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold text-balance text-neutral-900 sm:text-4xl">{title}</h2>
      {description && (
        <p
          className={cn(
            'text-muted-foreground text-base text-balance sm:text-lg',
            align === 'center' ? 'max-w-2xl' : 'max-w-2xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
