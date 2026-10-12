# Fersa CRM

Stack: **Next.js 16** (App Router) · **Supabase** (Postgres + Auth + RPC) · **Vercel** (hosting).
La documentación y el kanban del proyecto viven en **Notion**.

## Correr en local

```bash
npm install
cp .env.example .env.local   # completar con las claves de Supabase
npm run dev                  # http://localhost:3000
```

## Estructura

| Ruta | Qué es |
|---|---|
| `src/lib/supabase/client.ts` | Cliente Supabase para componentes del navegador |
| `src/lib/supabase/server.ts` | Cliente Supabase para el servidor (Server Components / Actions) |
| `src/proxy.ts` | Refresca la sesión y protege rutas (antes se llamaba `middleware.ts`) |
| `src/app/login` | Login / registro con Supabase Auth |
| `src/app/dashboard` | Página protegida, lista clientes vía RPC |
| `supabase/migrations` | Cambios de base de datos (tablas, RLS, funciones RPC) |

## Convención de datos: RPC

Toda lectura/escritura pasa por funciones de Postgres llamadas con `supabase.rpc("nombre", args)`.
Las funciones usan `security invoker` para respetar Row Level Security.

## Base de datos (migraciones)

```bash
npx supabase login
npx supabase link --project-ref <ref-del-proyecto>
npx supabase db push         # aplica supabase/migrations al proyecto remoto
```
