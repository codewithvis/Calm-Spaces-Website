# Supabase clients

- `client.ts` creates the browser client with only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- `server.ts` creates a cookie-aware server client for route handlers, server components, and future server actions.
- `env.ts` fails clearly when public Supabase configuration is missing.

The service-role key must never be added to browser code or public environment variables.
