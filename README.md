# نادي مدار (Madar Club)

The website and member portal for **Madar Club**, a student club in Taif.

> في مدار بصمةٌ تـبقى، وفـكرٌ يُـدار
> *"In Madar, a mark that lasts, and a thought that's steered."*

Arabic-first, right-to-left by default, with a full English translation. The
public site and the member portal are one app: the same routes serve visitors,
signed-in members and admins, gated by role.

---

## Features

- **Club structure** — board, three sectors, nine committees, with live rosters
- **Events** — browse, filter by status, register; admins create and cancel
- **News** — magazine layout with image and YouTube/video embeds
- **Leaderboard** — points table
- **Member profiles** — badges, committees, social links
- **Admin panel** — members, news, points and events, in the same design system
- **Onboarding** — new members pick up to three committees
- **Light / dark theme** and **Arabic ⇄ English**, both persisted

## Design system

The visual language is built around مدار — *orbit*: a path traced around a
shared centre, which is also what a club is.

**Palette.** Cream and parchment carry the page, espresso brown anchors it, and
a cherry accent — taken from the ring in the club mark — appears only as an
accent, never as a surface. Colours are CSS custom properties in
`src/styles.css` exposed to Tailwind as semantic names (`bg-canvas`,
`text-ink`, `border-divider`), so no component knows which theme is active.
Every foreground/background pair is contrast-checked: all meet WCAG AA and most
reach AAA in both themes.

**Typography.** [Thmanyah](https://thmanyah.com) (خط ثمانية) in three optical
cuts — Serif Display for headlines, Serif Text for body copy, Sans for UI
chrome. Hierarchy comes from size and weight, never from swapping typefaces.
Arabic gets generous line-height and is never letter-spaced, since tracking
breaks its joins.

**Motion.** Staggered page entrances, per-section scroll choreography, and a
slowly drifting orbital system in the hero. Everything stops under
`prefers-reduced-motion`, and reveals are forced to their visible state rather
than merely having their duration zeroed — content must never depend on an
animation firing to be readable.

## Tech stack

| | |
|---|---|
| Framework | React 18 + TypeScript, via Create React App (`react-scripts` 5) |
| Styling | Tailwind CSS 3 (a build dependency, compiled — not a CDN script) |
| Backend | [Supabase](https://supabase.com) — Postgres, Auth, row-level security |
| Icons | [Lucide](https://lucide.dev), plus hand-drawn brand glyphs and the Madar mark as inline SVG |

No animation library: the motion system is CSS plus a single shared scroll
listener.

## Getting started

Requires Node 16 or newer.

```bash
npm install
```

Create a `.env` in the project root (it is gitignored — never commit it):

```bash
REACT_APP_SUPABASE_URL=https://<your-project>.supabase.co
REACT_APP_SUPABASE_ANON_KEY=<your-anon-key>
```

Use the **anon** key, not the service-role key. CRA inlines every `REACT_APP_*`
variable into the client bundle, so anything placed here is public by
definition; access control has to come from row-level security policies on the
database, not from hiding the key.

```bash
npm start        # dev server at http://localhost:3000
npm run build    # production bundle into build/
```

### Fonts

The Thmanyah binaries live in `public/fonts/` and are declared in
`public/fonts/thmanyah.css`, which is linked directly from `index.html` rather
than bundled. That is deliberate — see the note in that folder's README. In
short: CRA resolves `url(/fonts/…)` inside *bundled* CSS at build time, so a
missing font would break `npm run build`; keeping the declarations unbundled
means the app builds and runs either way, falling back gracefully when a face
is absent.

## Database

Five tables in Supabase:

| Table | Holds |
|---|---|
| `profiles` | members — name, username, role, committees, badges |
| `events` | title, description, link, start/end dates, cancelled flag |
| `event_registrations` | join table between `profiles` and `events` |
| `news` | title, content, optional media URL and type |
| `points` | leaderboard rows |

Members sign up with a **username**, not an email. Supabase Auth requires an
address, so a stable synthetic one is derived
(`<username>@members.madarclub.com`) — see `src/lib/supabaseClient.ts`. Admin
access is a `role` column on `profiles`; the UI hides admin routes, but the
real enforcement belongs in RLS policies.

## Project structure

```
src/
  App.tsx                 # state, data loading, routing, dialogs
  index.tsx               # entry point
  styles.css              # design tokens, base styles, motion system
  components/
    AppShell.tsx          # navbar + main + footer frame
    Navbar.tsx            # top bar and full-screen mobile menu
    Footer.tsx
    Intro.tsx             # brief brand beat after sign-in
  pages/                  # one file per route (+ Auth, Committees onboarding)
  ui/                     # design-system primitives
    Section.tsx           # Container, Section, PageHeader, Eyebrow
    Reveal.tsx            # scroll-reveal engine
    Orbit.tsx             # decorative orbital field and hero system
    MadarMark.tsx         # the club mark, animatable
    cards.tsx             # events, news, members, statistics
    Button / Field / Modal / Badge / Toast / States
  lib/
    supabaseClient.ts     # client + username→email helper
    i18n.ts               # dictionaries, date and number formatting
    i18nContext.tsx       # keeps <html lang/dir> in sync
    clubData.ts           # sectors, committees, board seats
public/
  index.html
  fonts/                  # Thmanyah + @font-face declarations
```

Routes map to paths directly (`/events`, `/news`, `/admin`, …) and are driven
by the History API — no router dependency.

## Accessibility and RTL

Direction and language are set on `<html>` and switch with the language toggle,
so screen readers and CSS logical properties both follow. Layout is written in
logical properties (`start`/`end`, `ms`/`me`) throughout, which is why the
whole UI mirrors correctly rather than only flipping text. Dialogs trap focus
and restore it on close, every control has a real label, and interactive
targets clear the 44px minimum.

## Status

In development. The portal is complete and wired to Supabase; content is added
through the admin panel.

## License

All rights reserved — see [LICENSE](LICENSE). The Thmanyah typeface is licensed
separately by its foundry; its license is included in `public/fonts/`.
