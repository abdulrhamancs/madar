# نادي مدار (Madar Club)

The website and member portal for **Madar Club**, a student club in Taif.

> في مدار بصمةٌ تـبقى، وفـكرٌ يُـدار
> *"In Madar, a mark that lasts, and a thought that's steered."*

Arabic-first, right-to-left by default, with a full English translation. The
whole site is public to read; one admin account maintains it.

**The club is listed, not self-service.** Members do not create accounts —
there is no public sign-up. An admin adds people, and they appear on the
structure page and the leaderboard straight away. The app still carries a full
auth stack, and a member *can* hold a real account, but that is the exception
rather than the way the club is run. The practical consequence runs through the
whole codebase: most people on the site have no `auth.users` row at all.

---

## Features

- **Club structure** — board, three sectors, nine committees, with rosters
  shown inline rather than behind a disclosure
- **Events** — browse, filter by status, register; admins create and cancel
- **News** — magazine layout, with media uploaded from the device or linked
  externally (YouTube and the like)
- **Leaderboard** — every member from the start, on zero until they score,
  ranked with a share bar; admins run it rather than compete on it. First
  place is sealed with a crown once anyone has actually scored
- **Member profiles** — badges, committees, social links
- **Honours** — an admin-granted mark (`عضو متميز`) shown as an emblem beside
  the name, on the leaderboard and the committee rosters
- **Admin panel** — members, listed members, news, points and events, in the
  same design system
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

Six tables in Supabase:

| Table | Holds |
|---|---|
| `profiles` | accounts — name, username, role, committees, badges |
| `display_members` | listed people with no account — name, badges, committees |
| `events` | title, description, link, start/end dates, cancelled flag |
| `event_registrations` | join table between `profiles` and `events` |
| `news` | title, content, optional media URL and type |
| `points` | leaderboard rows, keyed by name |

### Two kinds of member

`profiles.id` references `auth.users`, so a profile cannot exist without an
account — and Postgres has no conditional foreign key. Rather than drop that
constraint, people without accounts live in `display_members`, which mirrors
the same `badges` and `committees` array shape. The two are concatenated into
one roster in `App.tsx`, so the structure page and the leaderboard treat them
alike and never ask which kind they are looking at.

`points` is keyed by **name**, not by a member id, and is deliberately
independent of both tables. That is what lets the leaderboard rank accounts and
listed members in one table, and why a score recorded against someone who is
not currently listed still shows rather than vanishing.

### Auth

Accounts sign in with a **username**, not an email. Supabase Auth requires an
address, so a stable synthetic one is derived
(`<username>@members.madarclub.com`) — see `src/lib/supabaseClient.ts`.

Because those addresses cannot receive mail, **email confirmation must stay
off** in the Auth settings. With it on, `signUp()` returns no session, so the
client is still anonymous when it writes the profile and the row-level policy
rejects it — which surfaces as a confusing RLS error rather than a mail
problem. `handle_new_user` also writes the profile server-side, so the row
survives even if the client never gets to make that call.

### Enforcement

Access control is in the database, not the interface:

| | |
|---|---|
| `is_admin()` | `profiles.role = 'admin'` for the caller; the predicate every write policy uses |
| `handle_new_user` | creates the profile the moment an auth user exists |
| `profiles_enforce_privilege_columns` | blocks non-admins changing `role` or `badges` |

That last one is not decoration. The policies on `profiles` are row-scoped but
not column-scoped, so the owner of a row could otherwise set their own
`role` to `admin` — and `is_admin()` reads that same column. RLS cannot express
"every column except these two", so the restriction lives in a trigger, on
insert as well as update.

Every public-facing table is readable by anyone and writable only by admins,
except `profiles`, where a member may edit their own row minus the two columns
above.

### Storage

News media goes to a public `media` bucket. Reads are public; uploads, updates
and deletes require `is_admin()`. Deleting a news item removes its file too,
but only once nothing else references it. Nothing private should ever be put
there.

The bucket itself caps uploads at 50MB and accepts five mime types. The tighter
5MB limit on images is `MediaField`'s alone — client-side, so treat it as a
courtesy to the uploader rather than as enforcement.

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
    MediaField.tsx        # upload to storage, or paste an external link
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

`clubData.ts` is worth knowing about before editing: the badge and committee
strings there are the **join keys** against `profiles.badges`,
`profiles.committees` and `display_members`. They are matched, never
translated, and renaming one orphans every member holding it — which fails
silently, by dropping them off the structure page rather than raising anything.
`AVAILABLE_BADGES` in `i18n.ts` feeds the admin picker and has to be kept in
step with it.

Not every badge names a seat. `HONOURS` in `clubData.ts` marks the ones that are
an accolade instead, which is what keeps them out of the single-value seat
pickers and out of the subtitle under a name on the leaderboard. Add an honour
there, not just to `AVAILABLE_BADGES`, or it will be offered as a position and
overwrite a real one.

## Accessibility and RTL

Direction and language are set on `<html>` and switch with the language toggle,
so screen readers and CSS logical properties both follow. Layout is written in
logical properties (`start`/`end`, `ms`/`me`) throughout, which is why the
whole UI mirrors correctly rather than only flipping text. Dialogs trap focus
and restore it on close, and every control has a real label. Standalone
controls clear the 44px target minimum; the one exception is the quiet login
link in the footer, which is a text link inside a sentence and takes the
inline exception instead.

## Status

Live and maintained by one admin. The club's board and nine committees are
listed; news, events and points are added through the admin panel.

The leaderboard starts with every member on zero — that is the intended opening
state, not an empty page waiting to be filled.

## License

All rights reserved — see [LICENSE](LICENSE). The Thmanyah typeface is licensed
separately by its foundry; its license is included in `public/fonts/`.
