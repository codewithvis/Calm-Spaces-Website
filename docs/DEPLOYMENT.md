# Calm Spaces Deployment Guide

## Production deployment goals

- deploy the Next.js web app to the configured Calm Spaces subdomain
- connect to the existing Supabase project
- preserve existing security model and database policies
- keep auth redirect URLs aligned with production host

## Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=https://app.calmspaces.example
NEXT_PUBLIC_SITE_URL=https://calmspaces.example
```

## Build and run

```bash
npm install
npm run build
npm run start
```

## Domain configuration

- Set DNS to the existing subdomain
- Enable HTTPS and proper redirect handling
- Add production auth callback URLs in Supabase
- Configure storage and public resources as required by the backend

## Supabase configuration

- Reuse the existing project; do not create a parallel backend
- Ensure the project URL and anon key match the deployment environment
- Verify RLS and storage permissions remain intact
- Re-deploy or verify any required edge functions

## Recommended deployment targets

- Vercel for the frontend
- Supabase for the database, auth, storage, and edge functions

## Operational notes

- Never commit secrets or service role keys
- Use environment-specific values per deployment stage
- Keep a documented rollback plan
