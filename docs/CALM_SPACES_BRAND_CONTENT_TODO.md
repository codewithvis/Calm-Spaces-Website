# C.A.L.M Spaces Official Brand and Product To-do

This checklist translates the official institutional addendum and redesign brief into traceable work. `[x]` means implemented locally, `[~]` means started but requires official asset/live-content verification, and `[ ]` means not started.

## Official identity and provenance

- [x] Use the hierarchy C.A.L.M Spaces -> CEAPS -> SGT University in structured content.
- [x] Use the approved official short bio, one-line bio, location, contact, and role descriptions supplied in the brief.
- [x] Use the official CALM phrase: “Cultivating Awareness, Lightening Stress, and Healing through Movement.”
- [ ] Resolve the official wording for the letter A if the institution requires a four-word acronym presentation.
- [~] Create source fields for every institutional claim.
- [ ] Verify every claim against the official CEAPS page, SGT University faculty profiles, and approved university publications before launch.
- [ ] Add visible source references or CMS provenance for bios, services, events, location, impact, and contact data.

## Official brand assets

- [~] Create the central `brand-assets/` directory and provenance readme.
- [ ] Obtain the original official CALM Spaces logo from CEAPS/SGT University.
- [ ] Obtain the official SGT University logo from an official source.
- [ ] Add only supplied/approved SVG or PNG assets.
- [ ] Add approved light, dark, horizontal, and mark variants only when supplied.
- [ ] Add an institutional lockup without merging or redrawing logos.
- [ ] Add clear-space tokens and usage guidance.
- [ ] Replace the current heart icon fallback after official logo delivery.
- [ ] Complete logo visual QA on desktop, mobile, light mode, dark mode, and footer contexts.

## Official team and bios

- [x] Add structured content for Dr. Astha Chaudhry, Ms. Parvneet Kaur, Ms. Vaishnavi, and CEAPS leadership roles.
- [x] Keep professional designations distinct from CALM Spaces roles.
- [ ] Obtain approved photographs or use marked initials placeholders.
- [ ] Add verified profile URLs where available.
- [ ] Build lead editorial profiles for Dr. Astha Chaudhry and Ms. Parvneet Kaur.
- [ ] Build compact CEAPS team profiles for Ms. Arvinder Kaur Pabla, Ms. Monika Sharma, and Dr. Vinika Chaudhary.
- [ ] Add Ms. Himanshi Punia only after the official source and approved bio are verified.
- [ ] Add TeamCard, TeamProfile, LeadershipProfile, and TeamDrawer components.
- [ ] Review all bios for invented credentials, specializations, awards, and experience claims.

## Public information architecture

- [x] Home
- [x] About
- [x] How it works
- [x] For students
- [x] For institutions
- [x] For professionals
- [x] Resources
- [x] Help
- [x] Safety
- [x] Privacy
- [x] Terms
- [x] Contact
- [ ] Find support
- [ ] Counselling
- [ ] C.A.L.M Companions
- [ ] Events
- [ ] Stories
- [ ] Team
- [ ] Impact
- [ ] App showcase
- [ ] Visit us

## Homepage and signature discovery

- [~] Establish “C.A.L.M Spaces · CEAPS · SGT University” above the fold.
- [~] Replace startup-style hero language with “You deserve a space to pause.”
- [~] Add authentic campus imagery when supplied; do not use stock or generated team imagery.
- [x] Public no-login mood interaction.
- [~] Expand “What do you need right now?” to talk, breathe, understand, connect, express, learn, and not sure.
- [ ] Add “More than a counselling room.” editorial section.
- [ ] Add “People who make CALM Spaces possible.” team section.
- [ ] Add “Built within SGT University.” institutional trust section.
- [ ] Add “CALM Spaces in action.” verified impact section.
- [ ] Add “CALM Spaces, wherever you are.” app section using real screenshots.
- [ ] Add physical campus “Come find us” section.
- [ ] End with “Whatever today feels like, you don’t have to navigate it alone.”

## Services and student journeys

- [ ] Counselling page and request flow.
- [ ] CALM Companions page and peer-listener application information.
- [ ] Support groups and listening circles content.
- [ ] Workshops and psycho-educational resources.
- [ ] Movement and expressive activities.
- [~] Wellness toolkit: breathing, grounding, focus, gratitude, reflection.
- [~] Mood and journal flow with non-diagnostic language.
- [~] Resource browsing with search/filter.
- [~] Community with privacy, report, block, moderation, and crisis guidance.
- [~] Expert support and booking adapter.
- [ ] Events calendar with filters and registration.
- [ ] “Your first visit doesn’t have to be difficult” journey.
- [ ] “Who is this for?” student lifecycle section.

## Institutional content and trust

- [x] Official location content: A Block, Lower Ground Floor, Room No. 10, SGT University, Gurugram, Haryana.
- [x] Official CEAPS contact emails, university phone, and app support contacts in structured content.
- [ ] Verify WhatsApp and visiting information before display.
- [ ] Add campus map/directions from an approved map source.
- [ ] Do not publish opening hours until verified.
- [ ] Add verified 2026 impact figures only after source review.
- [ ] Add Colour the Chaos only with approved photographs, dates, departments, and participant figures.
- [ ] Add real approved stories only with permission.
- [ ] Add app screenshots from the official app, never fabricated screenshots.

## Design and accessibility

- [x] Warm ivory, forest, sage, clay, lavender, and sand token system.
- [x] Editorial display + readable UI typography.
- [x] Reduced motion, focus ring, semantic state, chart, safety, and dark-mode tokens.
- [~] Migrate remaining component arbitrary values to semantic tokens.
- [~] Validate WCAG 2.2 AA contrast and touch targets.
- [~] Validate 320px through 1920px responsive layouts.
- [ ] Validate authentic imagery loading, alt text, captions, and performance.
- [ ] Add accessible dialogs, drawers, calendars, event registration, and team profiles.

## Backend, governance, and release

- [~] Preserve Supabase Auth, PostgreSQL, RLS, Storage, Edge Functions, and Android contracts.
- [~] Server-side role checks for Student, Peer Listener, Expert, and Admin.
- [~] Privacy-safe analytics allowlist with no sensitive content.
- [~] Booking adapter uses existing `book-session` Edge Function.
- [ ] Connect events, stories, team, impact, FAQs, and resources to approved CMS/content data.
- [ ] Verify every RLS policy and Storage policy against the production project.
- [ ] Add integration and end-to-end tests using a safe test project.
- [ ] Complete official content provenance review.
- [ ] Complete logo/photography approval review.
- [ ] Complete accessibility, responsive, performance, and security release review.
