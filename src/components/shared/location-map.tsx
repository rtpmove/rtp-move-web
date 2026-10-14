import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

export function LocationMap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'bg-muted aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-video',
        className,
      )}
    >
      <iframe
        src={siteConfig.mapsEmbedUrl}
        title={`Mapa de ubicación de ${siteConfig.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    </div>
  );
}
