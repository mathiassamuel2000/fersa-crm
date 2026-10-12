-- Solo los usuarios logueados ("authenticated") pueden usar la tabla y sus RPC.
-- Los visitantes sin sesión ("anon") no tienen acceso. RLS sigue filtrando por usuario.
grant select, insert, update, delete on public.clientes to authenticated;

revoke execute on function public.listar_clientes() from public, anon;
revoke execute on function public.crear_cliente(text, text, text) from public, anon;
grant execute on function public.listar_clientes() to authenticated;
grant execute on function public.crear_cliente(text, text, text) to authenticated;
