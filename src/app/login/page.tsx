import { Suspense } from "react";
import { login, signup } from "./actions";

type SearchParams = Promise<{ error?: string; message?: string }>;

export default function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <form className="flex w-full max-w-sm flex-col gap-3 rounded-lg border p-6">
        <h1 className="text-2xl font-semibold">Fersa CRM</h1>
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input name="email" type="email" required className="rounded border px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Contraseña
          <input name="password" type="password" required className="rounded border px-3 py-2" />
        </label>
        <Suspense>
          <Mensajes searchParams={searchParams} />
        </Suspense>
        <button formAction={login} className="rounded bg-black px-3 py-2 text-white">
          Ingresar
        </button>
        <button formAction={signup} className="rounded border px-3 py-2">
          Crear cuenta
        </button>
      </form>
    </main>
  );
}

async function Mensajes({ searchParams }: { searchParams: SearchParams }) {
  const { error, message } = await searchParams;
  return (
    <>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {message && <p className="text-sm text-green-600">{message}</p>}
    </>
  );
}
