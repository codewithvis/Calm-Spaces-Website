# Feature data services

- `mood.ts` follows the Android `mood_entries` contract and enforces the authenticated user id in every browser mutation. Supabase RLS remains authoritative.
- `journal.ts` mirrors the Android app's existing AsyncStorage behavior with user-scoped browser storage. No journal table is invented.
- Profile data uses the exact Android `profiles` fields and role values in `lib/auth/profile.ts`.
