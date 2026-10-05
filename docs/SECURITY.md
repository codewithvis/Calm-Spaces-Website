# Calm Spaces Security Review

## Priority rules

- never trust client-side role checks
- never expose Supabase service-role credentials on the browser
- enforce database-side authorization through RLS
- keep sensitive private data scoped to the authenticated owner or authorized role

## Key risks reviewed

- XSS: sanitize user-generated content and avoid unsafe HTML
- IDOR: ensure resource access is tied to authenticated ownership and role policies
- storage access: keep uploads scoped by user ownership
- auth bypass: use Supabase auth and guarded routes
- community privacy: do not leak journal or mood records to unrelated users
- AI safety: keep assistant clearly non-clinical and route crisis calls to emergency resources

## Production checks to perform

- verify `profiles` access policies
- verify mood and journal table permissions
- verify message access for session participants only
- verify bookings and schedules by authorized listeners or experts
- verify storage bucket policies
- verify the `send-push` function is authenticated and scoped
- verify account deletion removes linked records and auth records

## Browser-side hardening

- use secure cookies and production auth redirects
- avoid leaking sensitive content into logs
- keep empty/error states informative without exposing internals
- use server-side validation for user-submitted forms
