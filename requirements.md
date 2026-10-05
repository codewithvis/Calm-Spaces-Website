# Calm Spaces Web Requirements

## Purpose

Build Calm Spaces into a production-grade web client for the existing Android product and Supabase backend. The web app must feel like a quiet, welcoming digital safe space while preserving existing authentication, database, RLS, Storage, Edge Function, and role contracts.

Official institutional brand and content requirements are tracked in [docs/CALM_SPACES_BRAND_CONTENT_TODO.md](docs/CALM_SPACES_BRAND_CONTENT_TODO.md). The remaining inputs requested from the project owner are listed in [docs/CONTENT_AND_ASSET_REQUEST.md](docs/CONTENT_AND_ASSET_REQUEST.md). The official identity is C.A.L.M Spaces under CEAPS at SGT University; logo, photography, biographies, events, impact, and other institutional claims require source verification before launch.

## Status key

- `[x]` Implemented and validated in the current web client.
- `[~]` Started or represented by a shell; requires production completion.
- `[ ]` Not yet implemented.

## 1. Product foundations

- [x] Audit the Android reference product, routes, roles, backend architecture, and security model.
- [x] Document UI/UX gaps in `docs/UI_UX_AUDIT.md`.
- [x] Document personas, journeys, and information architecture in `docs/PRODUCT_ARCHITECTURE.md`.
- [x] Document visual direction in `docs/DESIGN_DIRECTION.md`.
- [x] Document the reusable design system in `docs/DESIGN_SYSTEM.md`.
- [x] Keep the web app as a second client of the existing Supabase backend, never a parallel backend.
- [ ] Add a production requirements traceability review before release.

## 2. Brand, design, and accessibility

- [x] Use a warm, natural visual language: sage, sand, muted lavender, terracotta, warm off-white, and deep green-charcoal.
- [x] Use expressive display typography and readable UI typography.
- [x] Avoid generic SaaS, excessive gradients, decorative blobs, fake trust badges, and toxic gamification.
- [x] Support reduced motion and visible keyboard focus.
- [~] Ensure WCAG 2.2 AA contrast, semantic landmarks, labels, error states, and screen-reader behavior across interactive flows.
- [~] Test responsive layouts at 320, 375, 390, 414, 768, 1024, 1280, 1440, and 1920px.
- [ ] Add persisted accessibility preferences: larger text, reduced motion, and higher contrast.
- [ ] Design and validate a purpose-built dark theme.

## 3. Public experience

- [x] Homepage emotional flow: welcome, recognition, discovery, support, trust, invitation.
- [x] Homepage hero: “A little space for you.”
- [x] Public no-login mood discovery interaction.
- [x] Need-based discovery: talk, slow down, understand, create, learn, and guided discovery.
- [x] About, features, resources, privacy, terms, and contact pages.
- [x] How it works, For students, and public Safety pages.
- [x] Institutional and professional information pages.
- [x] Help center and community guidelines pages.
- [x] Public footer with Explore, Support, and Legal navigation.
- [ ] Add reviewed real photography or approved visual assets where appropriate.
- [ ] Add official social links only when verified accounts exist.
- [ ] Add complete public “How it works,” “For students,” and safety content based on approved copy.

## 4. Authentication and onboarding

- [x] Create the Supabase browser/server client using only public environment variables.
- [~] Implement sign up, sign in, sign out, password reset, and session persistence.
- [x] Implement auth callback handling and local redirect plumbing.
- [~] Add route protection for authenticated pages through Next.js Proxy; live Supabase verification remains pending.
- [~] Load the authenticated profile and role from the existing `profiles` contract.
- [~] Implement role-aware navigation for Student, Peer Listener, Expert, and Admin.
- [ ] Add onboarding with no more than 3–5 meaningful questions.
- [ ] Allow onboarding to be skipped and resumed.
- [ ] Support account deletion through the existing `delete-user-auth` Edge Function flow.
- [ ] Never rely on client-side role checks as authorization.

## 5. Authenticated information architecture

- [x] “Your space” personal home shell.
- [x] Grouped desktop sidebar: Your space, Explore, Support, More.
- [x] Mobile bottom navigation: Home, Explore, Support, Journal, Profile.
- [x] Routes for check-in, patterns, journal, wellness, create, Talk Space, buddy support, experts, appointments, saved, notifications, settings, and safety.
- [~] Add active route states and accessible mobile navigation state.
- [ ] Add global search for public resources, wellness exercises, community topics, experts, and help pages only.
- [ ] Add optional Ctrl/Cmd+K quick actions.
- [ ] Add loading, empty, error, and retry states to every data surface.

## 6. Student/member functionality

- [~] Mood check-in and mood choices.
- [~] Persist mood entries to the existing Supabase tables.
- [ ] Add conversational mood follow-up, optional contributing factors, and optional journal handoff.
- [ ] Add responsible pattern summaries without diagnosis or medical inference.
- [~] Private journal surface.
- [~] Persist, edit, list, and delete journal entries according to the Android app's local journal contract.
- [x] Add rotating prompts and a large writing surface.
- [~] Wellness space routes.
- [~] Implement breathing, grounding, focus, relax, reflect, sleep, and reset experiences.
- [~] Add immersive wellness mode with timer, sound preference, animation, and reduced-motion behavior.
- [~] Create & Unwind route.
- [ ] Implement mandala, doodle, coloring, and creative prompt experiences where supported by the product scope.
- [~] Resource library route.
- [~] Connect resources to Supabase-backed published content, categories, tags, media, saved state, and curated collections.
- [ ] Add resource detail pages with author/source, read time, related content, and save-for-later.
- [~] Talk Space route.
- [~] Connect the existing AI/support contract and clearly state that it is not therapy or emergency care.
- [ ] Add crisis-aware escalation to safety resources.
- [~] Buddy Connect route.
- [ ] Implement listener availability, matching/request flow, privacy controls, chat, reporting, blocking, and escalation.
- [~] Expert and appointment routes.
- [~] Connect verified expert profiles, availability, booking, rescheduling, cancellation, and confirmation flows.
- [~] Community route placeholder.
- [~] Implement moderated posts, prompts, topic spaces, anonymous posting where supported, reporting, blocking, and crisis guidance.
- [~] Saved and notifications routes.
- [ ] Persist saved content and notification read state.
- [~] Profile, settings, and safety routes.
- [ ] Connect profile updates, notification preferences, accessibility preferences, data controls, trusted contacts, and institutional crisis contacts to supported backend contracts.

## 7. Peer Listener, Expert, and Admin functionality

- [~] Peer Listener dashboard, availability, assigned clients, sessions, conversations, history, and escalation workflow.
- [~] Expert dashboard, consultation management, availability, client conversations, resource tools, and settings.
- [~] Admin overview, users, roles, experts, peer listeners, resources, community moderation, appointments, reports, aggregate analytics, and settings.
- [ ] Ensure admin interfaces do not expose individual sensitive wellbeing data unnecessarily.
- [ ] Add role-specific route protection and RLS verification for every module.

## 8. Supabase and backend integration

- [ ] Inventory exact tables, views, Storage buckets, Edge Functions, and RLS policies from the Android/backend repository.
- [ ] Generate shared TypeScript database types from the authoritative schema.
- [ ] Add typed query functions and mutation functions per feature.
- [ ] Add TanStack Query or the project-approved data cache pattern.
- [ ] Add realtime only where required; keep queries as the source of truth.
- [ ] Reuse existing `send-push` and `delete-user-auth` Edge Functions.
- [ ] Keep service-role credentials server-side only.
- [ ] Validate Storage upload and download policies.
- [ ] Validate auth redirects, secure cookies, session refresh, and logout behavior.
- [ ] Do not change Android-facing schema or contracts without an approved migration plan.

## 9. Privacy, safety, and responsible product behavior

- [ ] Verify RLS for profiles, moods, journals, messages, bookings, resources, Storage, and role-specific records.
- [ ] Prevent IDOR and cross-user data access.
- [ ] Keep journal contents, private moods, and private chats out of global search and analytics.
- [ ] Use optional, non-diagnostic language everywhere.
- [ ] Keep urgent support one step away without making the whole UI alarming.
- [ ] Provide emergency services, crisis lines, institutional contacts, and trusted contacts where supported.
- [ ] Sanitize user-generated content and avoid unsafe HTML.
- [ ] Do not log sensitive user content.
- [ ] Add report, block, moderation, and escalation paths to community and support flows.

## 10. Analytics and performance

- [~] Add privacy-conscious analytics only for feature discovery, onboarding completion, resource engagement, wellness usage, and appointment conversion.
- [ ] Never collect journal contents, private chat contents, or sensitive notes for analytics.
- [ ] Use server rendering and code splitting where useful.
- [ ] Lazy-load media, charts, and immersive wellness modules.
- [ ] Optimize images and avoid unnecessary client JavaScript.
- [ ] Validate performance on mobile and slower connections.

## 11. Testing and release acceptance

- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [~] Add automated tests for token contracts; mood, journal, booking, safety, and role policy tests remain pending.
- [ ] Add integration tests for Supabase auth and representative RLS queries.
- [ ] Add end-to-end tests for onboarding, check-in, journal, support request, booking, safety, and account deletion.
- [ ] Add accessibility checks for keyboard, screen reader labels, focus, contrast, reduced motion, and touch targets.
- [ ] Test all required responsive breakpoints with no horizontal overflow.
- [ ] Validate error and retry states without exposing backend internals.
- [ ] Verify Android behavior remains unaffected by all backend changes.
- [ ] Configure production environment variables and Supabase redirect URLs.
- [ ] Complete a security review before production deployment.

## Definition of done

The web product is ready when a new visitor understands the purpose within seconds, can find a helpful path without feeling judged, and can reach human or emergency support clearly. Authenticated users have a personal, privacy-aware home. All sensitive workflows use the existing Supabase Auth, PostgreSQL, RLS, Storage, and Edge Function contracts. Every role is protected server-side, every major feature has loading/empty/error states, accessibility and responsive checks pass, and production tests cover the highest-risk flows.
