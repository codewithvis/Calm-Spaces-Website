# Calm Spaces: What I Need From You

This file lists the remaining inputs required to finish the official C.A.L.M Spaces website without inventing institutional content or assets.

## 1. Official brand assets

Please provide the original approved files from C.A.L.M Spaces, CEAPS, or SGT University.

Place them here:

```text
brand-assets/calm-spaces/calm-spaces-logo.svg
brand-assets/calm-spaces/calm-spaces-logo-horizontal.svg
brand-assets/calm-spaces/calm-spaces-logo-mark.svg
brand-assets/sgt/sgt-university-logo.svg
brand-assets/sgt/sgt-university-logo-horizontal.svg
```

Only add variants that officially exist. If a variant is not supplied, leave it absent. Do not send screenshots or recreated logos.

For each asset, also provide:

- Official source URL or approval reference
- Light/dark background usage guidance
- Minimum clear space
- Minimum display size
- Approved color values, if documented

## 2. Official photography

Place approved originals here:

```text
brand-assets/photography/team/
brand-assets/photography/campus/
brand-assets/photography/programs/
brand-assets/photography/students/
brand-assets/app-screenshots/
```

For each photograph or screenshot, provide:

- Filename
- Photographer or source
- Usage approval
- People consent status where applicable
- Alt-text guidance
- Date and event context, if relevant

Do not add AI portraits, stock therapy photography, or unapproved student images.

## 3. Team verification

Please provide official source URLs and approval for:

- Dr. Astha Chaudhry
- Ms. Parvneet Kaur
- Ms. Vaishnavi
- Ms. Arvinder Kaur Pabla
- Ms. Monika Sharma
- Dr. Vinika Chaudhary
- Ms. Himanshi Punia, if she should be included

For each person, provide:

- Approved name and designation
- Approved short biography
- Approved full biography, if needed
- Official photograph filename
- Official university profile URL
- Areas of work that may be displayed
- Display order
- Whether the person is part of the C.A.L.M Spaces team or CEAPS supporting leadership

Place structured content updates in:

```text
content/institutional.ts
```

## 4. Official institutional sources

Provide the authoritative URLs for:

- Official C.A.L.M Spaces page
- Official CEAPS page
- Official CEAPS team page
- SGT University profile pages
- SGT University brand guidelines/assets
- Official app store listing
- Official published impact/program articles

These sources will be recorded in the content model before launch.

## 5. Campus visit information

The current verified location is:

```text
A Block, Lower Ground Floor
Room No. 10
SGT University
Gurugram, Haryana
```

Please provide or approve:

- Official map pin URL
- Walking/driving directions
- Campus landmark
- Building access instructions
- Visiting hours
- Whether an appointment is required
- Accessibility information
- Official WhatsApp number, if one should be displayed

Do not add opening hours or directions until confirmed.

## 6. Events and programs

For each event or recurring program, provide:

- Official title
- Type: workshop, support group, listening circle, creative, awareness, or peer support
- Date and timezone
- Start/end time
- Location
- Audience
- Registration URL or workflow
- Capacity, if public
- Approved image
- Organizer
- Cancellation/update policy
- Source URL

Place approved static seed content, if needed for the first release, in:

```text
content/events.ts
```

Future event management should use the approved Supabase/CMS contract rather than hardcoded production content.

## 7. Impact and stories

For every statistic, provide:

- Exact number
- Measurement period
- Definition of what was counted
- Source publication URL
- Approval date
- Expiry/review date

For every student story or testimonial, provide:

- Written consent
- Approved wording
- Whether the student is named or anonymous
- Department/year only if approved
- Photograph approval, if applicable
- Source and publication date

Place approved content in:

```text
content/impact.ts
content/stories.ts
```

No statistics or testimonials will be published from memory or third-party summaries.

## 8. App integration

Provide:

- Official Google Play URL
- Official app screenshots for mood, journal, wellness, support, and community
- Approved app description
- Supported platforms
- App support URL/email
- Whether the website CTA should deep-link to the app

Place screenshots under:

```text
brand-assets/app-screenshots/
```

## 9. Safety and privacy

Please confirm the official:

- University emergency contact
- Campus safety contact
- Counselling contact
- Crisis/helpline resources by operating region
- Trusted-contact behavior
- Privacy policy URL or approved policy text
- Data retention/deletion wording
- Whether any service is confidential, private, or anonymous, and under what exact guarantees

No stronger privacy or clinical claims will be added without backend and policy confirmation.

## 10. Social and external links

Provide only verified official accounts and URLs for:

- C.A.L.M Spaces
- CEAPS
- SGT University
- Official app listing

If no official account exists, the footer will omit social links.

## 11. Supabase and production verification

Do not send secrets through chat.

Create a local `.env.local` file from `.env.example` and set:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

For live verification, the project also needs:

- Approved Supabase project/environment
- Auth redirect URLs for local, preview, and production
- Test accounts for Student, Peer Listener, Expert, and Admin roles
- Safe test data or a staging project
- Confirmation that the Android-facing migrations are applied
- Confirmation that `book-session`, `send-push`, and `delete-user-auth` are deployed
- Permission to run read-only schema/RLS verification against the approved environment

Never place a service-role key in `.env.local` for browser use. Never send any key or password through chat.

## 12. Approval checklist

Before official launch, please approve:

- [ ] Logo files and lockup
- [ ] Institutional hierarchy wording
- [ ] CALM phrase wording
- [ ] Team names, roles, bios, and photographs
- [ ] Location, directions, hours, and contacts
- [ ] Events and registration links
- [ ] Impact statistics and stories
- [ ] App screenshots and links
- [ ] Safety and privacy language
- [ ] Public SEO title and description
- [ ] Final responsive screenshots

Until these are supplied and approved, the website will continue to use source-tracked copy and clearly marked pending states.
