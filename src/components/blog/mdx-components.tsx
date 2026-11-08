import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import Image from 'next/image';
import { CircleAlert, CircleCheck, CircleHelp, Lightbulb, TriangleAlert } from 'lucide-react';
import { slugifyHeading } from '@/lib/mdx-headings';
import { cn } from '@/lib/utils';

function headingWithId(Tag: 'h2' | 'h3') {
  function Heading({ children }: { children: React.ReactNode }) {
    const id = slugifyHeading(String(children));
    const className =
      Tag === 'h2'
        ? 'mt-12 scroll-mt-28 text-2xl font-semibold text-neutral-900'
        : 'mt-8 scroll-mt-28 text-xl font-semibold text-neutral-900';

    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  Heading.displayName = `Mdx${Tag.toUpperCase()}`;
  return Heading;
}

// next-mdx-remote v6 elimina las expresiones JS de los atributos (`blockJS`), así que en el MDX
// los números se escriben como texto (`width="1160"`) y se convierten aquí.
type NumericProp = number | string;

interface FigureProps {
  src: string;
  alt: string;
  width: NumericProp;
  height: NumericProp;
  caption?: string;
}

/** Imagen del artículo con pie de foto: `<Figure src alt width="…" height="…" caption />`. */
function Figure({ src, alt, width, height, caption }: FigureProps) {
  return (
    <figure className="mt-8">
      <div className="border-border/60 bg-muted overflow-hidden rounded-xl border">
        <Image
          src={src}
          alt={alt}
          width={Number(width)}
          height={Number(height)}
          sizes="(min-width: 768px) 768px, 100vw"
          unoptimized={src.endsWith('.svg')}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="text-muted-foreground mt-3 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Paso numerado de una guía: `<Step number="1" title="¿Pregunta?">…</Step>`. */
function Step({
  number,
  title,
  children,
}: {
  number: NumericProp;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-14 flex gap-4 sm:gap-6">
      <span className="bg-primary-600 text-neutral-0 font-heading flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
        {number}
      </span>
      <div className="min-w-0 flex-1">
        <h2
          id={slugifyHeading(title)}
          className="scroll-mt-28 pt-1 text-2xl font-semibold text-neutral-900"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

/** Agrupa varias `<Branch>` en columnas. */
function Branches({ children }: { children: ReactNode }) {
  return <div className="mt-8 grid gap-4 sm:grid-cols-2">{children}</div>;
}

const branchTones = {
  azul: {
    box: 'border-ocean-200 bg-ocean-50 border-t-ocean-500',
    badge: 'bg-ocean-500 text-neutral-0',
    title: 'text-ocean-700',
    marker: '[&_li::marker]:text-ocean-500',
    Icon: CircleCheck,
  },
  arena: {
    box: 'border-sand-200 bg-sand-50 border-t-sand-500',
    badge: 'bg-sand-500 text-neutral-0',
    title: 'text-sand-700',
    marker: '[&_li::marker]:text-sand-500',
    Icon: CircleAlert,
  },
};

// Estilo original (verde / burdeos): lo siguen usando los artículos ya publicados.
const legacyBranchTones = {
  primary: { box: 'border-primary-200 bg-primary-50/60', title: 'text-primary-700' },
  secondary: { box: 'border-secondary-200 bg-secondary-50/60', title: 'text-secondary-600' },
};

/** Rama de una decisión (p. ej. «Si la respuesta es sí»). */
function Branch({
  title,
  tone = 'primary',
  children,
}: {
  title: string;
  tone?: keyof typeof branchTones | keyof typeof legacyBranchTones;
  children: ReactNode;
}) {
  if (tone === 'primary' || tone === 'secondary' || !(tone in branchTones)) {
    const l =
      legacyBranchTones[tone as keyof typeof legacyBranchTones] ?? legacyBranchTones.primary;
    return (
      <div className={cn('rounded-xl border p-5', l.box)}>
        <p className={cn('text-xs font-semibold tracking-wide uppercase', l.title)}>{title}</p>
        {/* El contenido puede llegar como párrafos o como texto suelto según cómo se escriba el MDX. */}
        <div className="text-muted-foreground mt-2 text-[0.95rem] leading-relaxed [&>p]:text-[0.95rem] [&>p:first-child]:mt-0">
          {children}
        </div>
      </div>
    );
  }
  const t = branchTones[tone as keyof typeof branchTones];
  return (
    <div
      className={cn(
        'rounded-2xl border border-t-4 p-5 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-md',
        t.box,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', t.badge)}
        >
          <t.Icon className="size-4.5" />
        </span>
        <p className={cn('font-heading text-sm font-semibold tracking-wide uppercase', t.title)}>
          {title}
        </p>
      </div>
      {/* El contenido puede llegar como párrafos o como texto suelto según cómo se escriba el MDX. */}
      <div
        className={cn(
          'mt-3 text-[0.95rem] leading-relaxed text-neutral-700 [&>p]:text-[0.95rem] [&>p]:text-neutral-700 [&>p:first-child]:mt-0 [&>ul]:mt-2',
          t.marker,
        )}
      >
        {children}
      </div>
    </div>
  );
}

const calloutTones = {
  aviso: {
    box: 'border-sand-200 bg-sand-50 border-l-sand-500',
    badge: 'bg-sand-500 text-neutral-0',
    title: 'text-sand-700',
    Icon: TriangleAlert,
  },
  lectura: {
    box: 'border-ocean-200 bg-ocean-50 border-l-ocean-500',
    badge: 'bg-ocean-500 text-neutral-0',
    title: 'text-ocean-700',
    Icon: Lightbulb,
  },
  curiosidad: {
    box: 'border-neutral-200 bg-neutral-100 border-l-neutral-500',
    badge: 'bg-neutral-700 text-neutral-0',
    title: 'text-neutral-800',
    Icon: CircleHelp,
  },
};

/** Aviso destacado: `<Callout title="Con cautela">…</Callout>`. Con `tone="aviso|lectura|curiosidad"` usa el diseño nuevo. */
function Callout({
  title,
  tone,
  children,
}: {
  title?: string;
  tone?: keyof typeof calloutTones;
  children: ReactNode;
}) {
  // Sin `tone`: estilo original, el que usan los artículos ya publicados.
  if (!tone || !(tone in calloutTones)) {
    return (
      <aside className="border-secondary-200 bg-secondary-50 mt-5 flex gap-3 rounded-xl border p-4">
        <TriangleAlert className="text-secondary-600 mt-0.5 size-5 shrink-0" />
        <div className="text-sm leading-relaxed text-neutral-700 [&>p]:mt-0 [&>p]:text-sm [&>p]:text-neutral-700">
          {title && <strong className="text-secondary-700 font-semibold">{title}: </strong>}
          {children}
        </div>
      </aside>
    );
  }
  const t = calloutTones[tone];
  return (
    <aside
      className={cn(
        'mt-8 flex gap-4 rounded-2xl border border-l-4 p-5 shadow-sm transition duration-300 ease-out hover:shadow-md',
        t.box,
      )}
    >
      <span
        className={cn('flex size-9 shrink-0 items-center justify-center rounded-full', t.badge)}
      >
        <t.Icon className="size-5" />
      </span>
      <div className="min-w-0 text-[0.95rem] leading-relaxed text-neutral-700 [&>p]:text-[0.95rem] [&>p]:text-neutral-700 [&>p:first-of-type]:mt-1">
        {title && (
          <p className={cn('font-heading !mt-1.5 text-base font-semibold', t.title)}>{title}</p>
        )}
        {children}
      </div>
    </aside>
  );
}

/** Agrupa varios `<Stat>` en una fila de cifras destacadas. */
function Stats({ children }: { children: ReactNode }) {
  return <div className="mt-8 grid gap-4 sm:auto-cols-fr sm:grid-flow-col">{children}</div>;
}

/** Cifra destacada: `<Stat value="−8 mmHg" label="Tensión sistólica" />`. */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-ocean-200 bg-neutral-0 rounded-2xl border p-5 text-center shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-md">
      <p className="font-heading text-ocean-600 text-3xl font-bold sm:text-4xl">{value}</p>
      <p className="mt-2 text-sm leading-snug text-neutral-600">{label}</p>
    </div>
  );
}

export const mdxComponents = {
  Figure,
  Step,
  Branches,
  Branch,
  Callout,
  Stats,
  Stat,
  h2: headingWithId('h2'),
  h3: headingWithId('h3'),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-muted-foreground mt-5 text-base leading-relaxed" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="text-muted-foreground mt-5 list-outside list-disc space-y-2 pl-5" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="text-muted-foreground mt-5 list-outside list-decimal space-y-2 pl-5"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => <li className="leading-relaxed" {...props} />,
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-neutral-900" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a className="text-primary-700 underline underline-offset-4" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-primary-300 mt-6 border-l-4 pl-4 text-neutral-700 italic"
      {...props}
    />
  ),
};
