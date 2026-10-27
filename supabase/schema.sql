-- Esquema del blog. Pégalo entero en Supabase → SQL Editor → New query → Run.
-- Se puede ejecutar más de una vez sin romper nada.

-- ─── Administradores ────────────────────────────────────────────────────────
-- Solo los usuarios de esta tabla pueden escribir en el blog. No tiene políticas,
-- así que nadie puede leerla ni modificarla desde la API: solo desde el panel de Supabase.
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ─── Artículos ──────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  description text not null,
  content text not null default '',
  author text,
  -- URL de la portada. Si es null se usa la portada generada en /blog-cover/<slug>.
  cover_image text,
  tags text[] not null default '{}',
  date date not null default current_date,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_status_date_idx on public.posts (status, date desc);
alter table public.posts enable row level security;

drop policy if exists "Lectura pública de artículos publicados" on public.posts;
create policy "Lectura pública de artículos publicados" on public.posts
  for select to anon, authenticated
  using (status = 'published' or public.is_admin());

drop policy if exists "Los admins crean artículos" on public.posts;
create policy "Los admins crean artículos" on public.posts
  for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Los admins editan artículos" on public.posts;
create policy "Los admins editan artículos" on public.posts
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Los admins borran artículos" on public.posts;
create policy "Los admins borran artículos" on public.posts
  for delete to authenticated
  using (public.is_admin());

-- ─── Imágenes ───────────────────────────────────────────────────────────────
-- Bucket público: cualquiera puede ver las imágenes por su URL, solo los admins suben o borran.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'blog',
  'blog',
  true,
  5242880, -- 5 MB por imagen
  array['image/png', 'image/jpeg', 'image/webp', 'image/avif', 'image/gif', 'image/svg+xml']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Los admins ven las imágenes del blog" on storage.objects;
create policy "Los admins ven las imágenes del blog" on storage.objects
  for select to authenticated
  using (bucket_id = 'blog' and public.is_admin());

drop policy if exists "Los admins suben imágenes al blog" on storage.objects;
create policy "Los admins suben imágenes al blog" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'blog' and public.is_admin());

drop policy if exists "Los admins actualizan imágenes del blog" on storage.objects;
create policy "Los admins actualizan imágenes del blog" on storage.objects
  for update to authenticated
  using (bucket_id = 'blog' and public.is_admin());

drop policy if exists "Los admins borran imágenes del blog" on storage.objects;
create policy "Los admins borran imágenes del blog" on storage.objects
  for delete to authenticated
  using (bucket_id = 'blog' and public.is_admin());

-- ─── Keep-alive ─────────────────────────────────────────────────────────────
-- Supabase pausa los proyectos gratuitos con poca actividad y una lectura diaria no basta,
-- así que el cron de /api/cron/keep-alive escribe aquí cada día. Tabla de una sola fila
-- y sin políticas: solo se modifica a través de la función.
create table if not exists public.keep_alive (
  id smallint primary key default 1 check (id = 1),
  runs bigint not null default 0,
  last_run timestamptz not null default now()
);
alter table public.keep_alive enable row level security;
revoke all on public.keep_alive from anon, authenticated;

-- security definer para que la llame la clave pública: la secret key no se guarda en Vercel.
-- Lo peor que puede hacer quien la llame es subir el contador.
create or replace function public.keep_alive()
returns bigint
language sql
security definer
set search_path = ''
as $$
  insert into public.keep_alive as k (id, runs, last_run)
  values (1, 1, now())
  on conflict (id) do update set runs = k.runs + 1, last_run = now()
  returning k.runs;
$$;
revoke all on function public.keep_alive() from public, anon, authenticated;
grant execute on function public.keep_alive() to anon, service_role;

-- ─── Dar permisos de admin ──────────────────────────────────────────────────
-- Primero crea tu usuario en Authentication → Users → Add user (con contraseña).
-- Después ejecuta esto cambiando el email:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'tu@email.com'
-- on conflict do nothing;
