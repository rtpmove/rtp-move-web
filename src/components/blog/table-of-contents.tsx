import type { TocItem } from '@/lib/mdx-headings';

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Tabla de contenidos" className="border-border/60 rounded-2xl border p-6">
      <p className="mb-4 text-sm font-semibold text-neutral-900">En este artículo</p>
      <ul className="flex flex-col gap-2.5 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : undefined}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-primary-700 leading-snug transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
