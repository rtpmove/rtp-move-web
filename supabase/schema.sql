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

-- ─── Dar permisos de admin ──────────────────────────────────────────────────
-- Primero crea tu usuario en Authentication → Users → Add user (con contraseña).
-- Después ejecuta esto cambiando el email:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'tu@email.com'
-- on conflict do nothing;
