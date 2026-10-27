'use client';

import { Component, useEffect, useRef, useState, useTransition, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote';
import { ArrowLeft, ImagePlus, LoaderCircle, Trash2, X } from 'lucide-react';
import { mdxComponents } from '@/components/blog/mdx-components';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  deletePost,
  previewMdx,
  savePost,
  type PreviewResult,
  type SavePostState,
} from '@/lib/actions/admin-posts';
import { uploadPostImage } from '@/lib/admin/upload-image';
import { slugify, type AdminPostValues } from '@/lib/validations/admin-post';
import { cn } from '@/lib/utils';

const PREVIEW_DELAY_MS = 600;

/** Fragmentos de los componentes propios del blog (ver `mdx-components.tsx`). */
const SNIPPETS = [
  { label: 'Aviso', text: '<Callout title="Importante">\n  Texto del aviso.\n</Callout>\n' },
  {
    label: 'Paso numerado',
    text: '<Step number="1" title="Título del paso">\n  Explicación del paso.\n</Step>\n',
  },
  {
    label: 'Dos ramas',
    text: '<Branches>\n  <Branch title="Si la respuesta es sí">\n    Texto.\n  </Branch>\n  <Branch title="Si la respuesta es no" tone="secondary">\n    Texto.\n  </Branch>\n</Branches>\n',
  },
];

interface PostEditorProps {
  initialValues: AdminPostValues;
  isNew: boolean;
}

export function PostEditor({ initialValues, isNew }: PostEditorProps) {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [tagsText, setTagsText] = useState(initialValues.tags.join(', '));
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialValues));
  const [savedStatus, setSavedStatus] = useState(initialValues.status);
  const [result, setResult] = useState<SavePostState>({ status: 'idle' });
  const [saving, startSaving] = useTransition();
  const [uploading, setUploading] = useState<'cover' | 'content' | null>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const currentValues: AdminPostValues = { ...values, tags: parseTags(tagsText) };
  const dirty = JSON.stringify(currentValues) !== savedSnapshot;

  // Avisa antes de salir de la página si hay cambios sin guardar.
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function update<K extends keyof AdminPostValues>(key: K, value: AdminPostValues[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function updateTitle(title: string) {
    setValues((previous) => ({
      ...previous,
      title,
      slug: slugTouched ? previous.slug : slugify(title),
    }));
  }

  function save(status: AdminPostValues['status']) {
    const toSave = { ...currentValues, status };
    startSaving(async () => {
      const response = await savePost(toSave);
      setResult(response);
      if (response.status !== 'success') return;

      setValues(toSave);
      setSavedSnapshot(JSON.stringify(toSave));
      setSavedStatus(status);
      if (isNew) router.replace(`/admin/posts/${toSave.id}`);
    });
  }

  async function handleUpload(file: File | undefined, target: 'cover' | 'content') {
    if (!file) return;
    setUploading(target);
    try {
      const image = await uploadPostImage(file, values.id);
      if (target === 'cover') {
        update('coverImage', image.url);
      } else {
        insertAtCursor(
          `<Figure\n  src="${image.url}"\n  alt="Describe la imagen"\n  width="${image.width}"\n  height="${image.height}"\n  caption="Pie de foto (opcional)"\n/>\n`,
        );
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: `No se pudo subir la imagen: ${error instanceof Error ? error.message : error}`,
      });
    } finally {
      setUploading(null);
    }
  }

  function insertAtCursor(text: string) {
    const textarea = contentRef.current;
    const start = textarea?.selectionStart ?? values.content.length;
    const end = textarea?.selectionEnd ?? values.content.length;
    const before = values.content.slice(0, start);
    // El MDX necesita líneas en blanco alrededor de los componentes de bloque.
    const prefix = before && !before.endsWith('\n\n') ? (before.endsWith('\n') ? '\n' : '\n\n') : '';
    const inserted = `${prefix}${text}\n`;

    update('content', before + inserted + values.content.slice(end));
    requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(start + inserted.length, start + inserted.length);
    });
  }

  const errors = result.status === 'error' ? (result.fieldErrors ?? {}) : {};

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/admin"
          className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="size-4" />
          Artículos
        </Link>
        <Badge variant={savedStatus === 'published' && !isNew ? 'default' : 'outline'}>
          {isNew ? 'Nuevo' : savedStatus === 'published' ? 'Publicado' : 'Borrador'}
        </Badge>
        {dirty && <span className="text-muted-foreground text-xs">Cambios sin guardar</span>}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {savedStatus === 'published' && !isNew ? (
            <>
              <Button variant="outline" size="lg" disabled={saving} onClick={() => save('draft')}>
                Pasar a borrador
              </Button>
              <Button size="lg" disabled={saving} onClick={() => save('published')}>
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="lg" disabled={saving} onClick={() => save('draft')}>
                Guardar borrador
              </Button>
              <Button size="lg" disabled={saving} onClick={() => save('published')}>
                {saving ? 'Guardando…' : 'Publicar'}
              </Button>
            </>
          )}
        </div>
      </div>

      {result.message && (
        <p
          role="status"
          className={cn(
            'rounded-lg px-4 py-3 text-sm',
            result.status === 'success'
              ? 'bg-primary-50 text-primary-700'
              : 'bg-destructive/10 text-destructive',
          )}
        >
          {result.message}
        </p>
      )}

      <section className="bg-neutral-0 border-border/60 grid gap-5 rounded-2xl border p-6 md:grid-cols-2">
        <Field label="Título" htmlFor="title" error={errors.title} className="md:col-span-2">
          <Input id="title" value={values.title} onChange={(e) => updateTitle(e.target.value)} />
        </Field>
        <Field
          label="Slug (URL)"
          htmlFor="slug"
          error={errors.slug}
          hint={`/blog/${values.slug || '…'}`}
        >
          <Input
            id="slug"
            value={values.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update('slug', e.target.value);
            }}
          />
        </Field>
        <Field label="Fecha" htmlFor="date" error={errors.date}>
          <Input
            id="date"
            type="date"
            value={values.date}
            onChange={(e) => update('date', e.target.value)}
          />
        </Field>
        <Field
          label="Descripción"
          htmlFor="description"
          error={errors.description}
          hint={`${values.description.length}/300 · Se ve en Google y en las tarjetas del blog.`}
          className="md:col-span-2"
        >
          <Textarea
            id="description"
            rows={2}
            value={values.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </Field>
        <Field
          label="Etiquetas"
          htmlFor="tags"
          error={errors.tags}
          hint="Separadas por comas. Se usan para sugerir artículos relacionados."
        >
          <Input id="tags" value={tagsText} onChange={(e) => setTagsText(e.target.value)} />
        </Field>
        <Field label="Autor" htmlFor="author" error={errors.author} hint="Vacío = «Equipo RTP».">
          <Input
            id="author"
            value={values.author}
            onChange={(e) => update('author', e.target.value)}
          />
        </Field>

        <Field
          label="Portada"
          htmlFor="cover"
          error={errors.coverImage}
          hint="Si no subes ninguna se genera una automáticamente con el título."
          className="md:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-muted relative aspect-[16/10] w-48 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element -- miniatura del panel */}
              <img
                src={values.coverImage || `/blog-cover/${values.slug || 'nuevo'}`}
                alt=""
                className="size-full object-cover"
              />
            </div>
            <FileButton
              id="cover"
              label={values.coverImage ? 'Cambiar portada' : 'Subir portada'}
              busy={uploading === 'cover'}
              onFile={(file) => handleUpload(file, 'cover')}
            />
            {values.coverImage && (
              <Button variant="ghost" size="lg" onClick={() => update('coverImage', '')}>
                <X />
                Usar la automática
              </Button>
            )}
          </div>
        </Field>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="mr-auto font-semibold text-neutral-900">Contenido (MDX)</h2>
            <FileButton
              id="content-image"
              label="Insertar imagen"
              busy={uploading === 'content'}
              onFile={(file) => handleUpload(file, 'content')}
            />
            {SNIPPETS.map((snippet) => (
              <Button
                key={snippet.label}
                variant="outline"
                size="sm"
                onClick={() => insertAtCursor(snippet.text)}
              >
                {snippet.label}
              </Button>
            ))}
          </div>
          <Textarea
            ref={contentRef}
            aria-label="Contenido del artículo en MDX"
            value={values.content}
            onChange={(e) => update('content', e.target.value)}
            spellCheck
            className="min-h-[70vh] font-mono text-sm leading-relaxed field-sizing-fixed"
          />
          <p className="text-muted-foreground text-xs">
            Markdown normal: <code>## Título</code>, <code>**negrita**</code>, <code>- lista</code>
            , <code>[enlace](https://…)</code>. Los <code>##</code> y <code>###</code> forman el
            índice del artículo.
          </p>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <h2 className="font-semibold text-neutral-900">Vista previa</h2>
          <div className="bg-neutral-0 border-border/60 max-h-[calc(70vh+2.5rem)] min-h-[70vh] overflow-y-auto rounded-2xl border px-6 pb-10">
            <LivePreview content={values.content} />
          </div>
        </div>
      </section>

      {!isNew && (
        <section className="border-destructive/30 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-6">
          <div>
            <h2 className="font-semibold text-neutral-900">Borrar artículo</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Se borran el artículo y sus imágenes. No se puede deshacer.
            </p>
          </div>
          <form
            action={deletePost.bind(null, values.id)}
            onSubmit={(event) => {
              if (!window.confirm(`¿Seguro que quieres borrar «${values.title}»?`)) {
                event.preventDefault();
              }
            }}
          >
            <Button type="submit" variant="destructive" size="lg">
              <Trash2 />
              Borrar
            </Button>
          </form>
        </section>
      )}
    </div>
  );
}

function parseTags(text: string): string[] {
  return [...new Set(text.split(',').map((tag) => tag.trim()).filter(Boolean))];
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string[];
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error?.length ? (
        <p className="text-destructive text-xs">{error[0]}</p>
      ) : (
        hint && <p className="text-muted-foreground text-xs">{hint}</p>
      )}
    </div>
  );
}

function FileButton({
  id,
  label,
  busy,
  onFile,
}: {
  id: string;
  label: string;
  busy: boolean;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'border-border bg-background hover:bg-muted inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 text-[0.8rem] font-medium',
        busy && 'pointer-events-none opacity-60',
      )}
    >
      {busy ? <LoaderCircle className="size-3.5 animate-spin" /> : <ImagePlus className="size-3.5" />}
      {busy ? 'Subiendo…' : label}
      <input
        id={id}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
        className="sr-only"
        onChange={(event) => {
          onFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
    </label>
  );
}

/** Compila el MDX en el servidor (con un pequeño retardo) y lo pinta con los mismos componentes que la web. */
function LivePreview({ content }: { content: string }) {
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const id = ++requestId.current;
    const timeout = setTimeout(async () => {
      const result = await previewMdx(content);
      if (id === requestId.current) setPreview(result);
    }, PREVIEW_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [content]);

  if (!preview) return <p className="text-muted-foreground mt-6 text-sm">Cargando vista previa…</p>;
  if (!preview.ok) return <PreviewError message={preview.error} />;

  return (
    <PreviewBoundary resetKey={preview.source.compiledSource}>
      <MDXRemote {...preview.source} components={mdxComponents} />
    </PreviewBoundary>
  );
}

function PreviewError({ message }: { message: string }) {
  return (
    <div className="bg-destructive/10 text-destructive mt-6 rounded-lg p-4 text-sm">
      <p className="font-medium">El MDX tiene un error:</p>
      <pre className="mt-2 font-mono text-xs whitespace-pre-wrap">{message}</pre>
    </div>
  );
}

/** Evita que un error al pintar el MDX (p. ej. un componente que no existe) rompa el editor. */
class PreviewBoundary extends Component<
  { resetKey: string; children: ReactNode },
  { error: string | null; resetKey: string }
> {
  state = { error: null as string | null, resetKey: this.props.resetKey };

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }

  static getDerivedStateFromProps(
    props: { resetKey: string },
    state: { error: string | null; resetKey: string },
  ) {
    return props.resetKey === state.resetKey ? null : { error: null, resetKey: props.resetKey };
  }

  render() {
    return this.state.error ? <PreviewError message={this.state.error} /> : this.props.children;
  }
}
