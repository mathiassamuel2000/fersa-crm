import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { logout } from "../login/actions";

type Cliente = { id: string; nombre: string; email: string | null };

export default function DashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clientes</h1>
        <form action={logout}>
          <button className="rounded border px-3 py-1 text-sm">Salir</button>
        </form>
      </header>
      <Suspense fallback={<p className="text-zinc-500">Cargando...</p>}>
        <ListaClientes />
      </Suspense>
    </main>
  );
}

async function ListaClientes() {
  const supabase = await createClient();

  // Toda la lógica de datos pasa por funciones RPC de Postgres.
  const { data, error } = await supabase.rpc("listar_clientes");
  const clientes = (data ?? []) as Cliente[];

  if (error) return <p className="text-red-600">Error: {error.message}</p>;

  return (
    <ul className="divide-y rounded border">
      {clientes.map((c) => (
        <li key={c.id} className="p-3">
          <p className="font-medium">{c.nombre}</p>
          <p className="text-sm text-zinc-500">{c.email}</p>
        </li>
      ))}
      {clientes.length === 0 && (
        <li className="p-3 text-zinc-500">Todavía no hay clientes.</li>
      )}
    </ul>
  );
}
