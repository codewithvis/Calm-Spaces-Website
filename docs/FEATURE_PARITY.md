# Feature Parity Matrix

| Android feature | Existing implementation | Web route | Web status | Backend used |
| --- | --- | --- | --- | --- |
| Authentication | Supabase Auth with role-based profile flow | `/`, `/dashboard` | Planned / shell ready | Supabase Auth |
| Mood tracking | Mood entries, daily prompts, summary logic | `/mood` | Web shell implemented | Supabase tables |
| Journal | Private entries and journaling | `/journal` | Web shell implemented | Supabase tables |
| AI Assistant | Chat feature with resource-aware AI flows | `/ai-assistant` | Web shell implemented | Supabase + external AI or function |
| Buddy Connect | Peer listener request and chat flows | `/buddy-connect` | Web shell implemented | Supabase tables + realtime |
| Expert Support | Booking and consultation flows | `/experts` and `/appointments` | Web shell implemented | Supabase tables + functions |
| Resources | Learning library and media resources | `/resources` | Web shell implemented | Supabase tables |
| Community | Community posts and interactions | `/dashboard` | Shell ready | Supabase tables |
| SOS | Emergency and crisis access | `/sos` | Web shell implemented | Supabase / profile data |

> The web app is intentionally designed as a second client of the existing backend, not a new product surface.
