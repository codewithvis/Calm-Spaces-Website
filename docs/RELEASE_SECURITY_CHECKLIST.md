# Calm Spaces Release Security Checklist

## Credentials and sessions

- [ ] Only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are browser-visible.
- [ ] No service-role key exists in local, preview, or production client bundles.
- [ ] Supabase auth redirect URLs match each deployed origin.
- [ ] Session refresh and logout are verified in a real Supabase project.
- [ ] Account deletion uses the existing `delete-user-auth` function and cleanup flow.

## Authorization and data

- [ ] `profiles` reads and updates are scoped to the authenticated owner or authorized role.
- [ ] `mood_entries` uses the existing `auth.uid() = user_id` RLS policy.
- [ ] Journal persistence matches the Android contract and does not create an unapproved table.
- [ ] Messages are restricted to conversation/session participants.
- [ ] Bookings and schedules are accessed through the existing authorization and `book-session` function.
- [ ] Community posts, reports, blocks, and moderation actions have RLS coverage.
- [ ] Storage objects remain ownership-scoped.

## Privacy and safety

- [ ] Journal contents, mood notes, private chats, and profile details are excluded from analytics.
- [ ] Global search cannot query private journal or mood data.
- [ ] Error messages do not expose SQL, Supabase, or internal identifiers.
- [ ] Safety resources are available without relying on AI output.
- [ ] Community reporting, blocking, and escalation are tested with authorized and unauthorized users.

## Release verification

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Unit, integration, and end-to-end tests pass.
- [ ] Keyboard, focus, contrast, reduced-motion, and responsive checks pass.
- [ ] Android behavior remains unaffected by backend changes.
