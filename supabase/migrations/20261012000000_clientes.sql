-- Tabla de clientes. Cada fila pertenece al usuario que la creó.
create table public.clientes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  nombre text not null,
  email text,
  telefono text,
  created_at timestamptz not null default now()
);

-- Row Level Security: cada usuario solo ve y modifica sus propios clientes.
alter table public.clientes enable row level security;

create policy "clientes: ver propios" on public.clientes
  for select using (owner_id = auth.uid());
create policy "clientes: crear propios" on public.clientes
  for insert with check (owner_id = auth.uid());
create policy "clientes: editar propios" on public.clientes
  for update using (owner_id = auth.uid());
create policy "clientes: borrar propios" on public.clientes
  for delete using (owner_id = auth.uid());

-- Funciones RPC: se llaman desde Next.js con supabase.rpc("nombre", { ...args }).
-- "security invoker" hace que respeten las políticas RLS de arriba.
create or replace function public.listar_clientes()
returns setof public.clientes
language sql
security invoker
stable
as $$
  select * from public.clientes order by created_at desc;
$$;

create or replace function public.crear_cliente(
  p_nombre text,
  p_email text default null,
  p_telefono text default null
)
returns public.clientes
language sql
security invoker
as $$
  insert into public.clientes (nombre, email, telefono)
  values (p_nombre, p_email, p_telefono)
  returning *;
$$;
