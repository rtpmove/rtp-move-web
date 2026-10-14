import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="text-muted-foreground size-3.5" />}
            {isLast ? (
              <span className="text-neutral-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-muted-foreground hover:text-primary-700">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
