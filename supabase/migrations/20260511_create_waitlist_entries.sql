create extension if not exists pgcrypto;

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  role text not null check (role in ('host', 'driver', 'both')),
  last_source text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists waitlist_entries_email_unique
  on public.waitlist_entries (email);

create or replace function public.set_waitlist_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists trg_waitlist_updated_at on public.waitlist_entries;

create trigger trg_waitlist_updated_at
before update on public.waitlist_entries
for each row
execute function public.set_waitlist_updated_at();

alter table public.waitlist_entries enable row level security;

drop policy if exists "waitlist_insert_anon" on public.waitlist_entries;
create policy "waitlist_insert_anon"
on public.waitlist_entries
for insert
to anon
with check (true);

drop policy if exists "waitlist_update_anon" on public.waitlist_entries;
create policy "waitlist_update_anon"
on public.waitlist_entries
for update
to anon
using (true)
with check (true);

drop policy if exists "waitlist_select_anon" on public.waitlist_entries;
create policy "waitlist_select_anon"
on public.waitlist_entries
for select
to anon
using (true);

grant usage on schema public to anon;
grant select, insert, update on public.waitlist_entries to anon;
