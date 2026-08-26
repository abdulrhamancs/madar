import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Camera,
  Crown,
  Globe,
  Handshake,
  Lightbulb,
  Mic,
  Palette,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "./i18n";

/**
 * Club structure — carried over unchanged from the original App.tsx.
 * Badge strings are the join key against `profiles.badges`, so they must match
 * AVAILABLE_BADGES exactly and must never be translated.
 */
export interface BoardSeat {
  badge: string;
  icon: LucideIcon;
}

export const CLUB_BOARD: BoardSeat[] = [
  { badge: "رئيس النادي", icon: Crown },
  { badge: "نائب الرئيس", icon: Award },
  { badge: "رئيس القطاع التطويري", icon: Star },
  { badge: "رئيس القطاع الإبداعي", icon: Palette },
  { badge: "رئيس القطاع التشغيلي", icon: Activity },
];

export interface Committee {
  name: string;
  icon: LucideIcon;
}

export interface Sector {
  id: string;
  title: Record<Lang, string>;
  icon: LucideIcon;
  committees: Committee[];
}

export const CLUB_SECTORS: Sector[] = [
  {
    // Identified by its committees (الموارد البشرية / مدار), which match the
    // club's org chart. Was labelled "القطاع الجوهري" / "Core Sector"; the
    // chart names it التطويري. `id` is a React key only — no database meaning.
    id: "development",
    title: { ar: "القطاع التطويري", en: "Development Sector" },
    icon: Star,
    committees: [
      { name: "لجنة الموارد البشرية", icon: Users },
      { name: "لجنة مدار", icon: Globe },
      { name: "لجنة واعد", icon: BookOpen },
    ],
  },
  {
    id: "central",
    title: { ar: "القطاع الإبداعي", en: "Creative Sector" },
    icon: Palette,
    committees: [
      { name: "اللجنة الإعلامية", icon: Camera },
      { name: "لجنة المحتوى العلمي", icon: Lightbulb },
      { name: "لجنة صناعة المحتوى", icon: Mic },
    ],
  },
  {
    id: "operations",
    title: { ar: "القطاع التشغيلي", en: "Operations Sector" },
    icon: Activity,
    committees: [
      { name: "لجنة الخدمات اللوجستية", icon: Briefcase },
      { name: "لجنة تنظيم الفعاليات", icon: Calendar },
      { name: "لجنة العلاقات العامة والشراكات", icon: Handshake },
    ],
  },
];

/* -------------------------------------------------------------------------
   Honours
   ------------------------------------------------------------------------- */

/**
 * An accolade rather than a seat.
 *
 * Honours are stored in the very same `badges` array the board and committee
 * seats use, and that is the whole point of the design: `profiles.badges` is
 * already written only through admin-only paths and guarded by the
 * `profiles_enforce_privilege_columns` trigger, `display_members.badges` is
 * already admin-only by policy, and both kinds of member already carry the
 * column. Granting an honour stores nothing new and needs no migration.
 *
 * The distinction between an honour and a seat matters at exactly the points
 * where a badge is read as a *position* — the seat pickers in the admin panel
 * and the subtitle under a name on the leaderboard. Those read `seatBadges`.
 */
export interface Honour {
  /** The join key. Matched, never translated — see the note at the top. */
  badge: string;
  icon: LucideIcon;
  /** Accessible name for the emblem, since the emblem shows no text. */
  labelKey: "distinguished_member";
}

export const HONOURS: Honour[] = [
  { badge: "عضو متميز", icon: Award, labelKey: "distinguished_member" },
];

/** The one honour the admin panel grants with a single control. */
export const DISTINGUISHED = HONOURS[0].badge;

const HONOUR_BY_BADGE = new Map(HONOURS.map((honour) => [honour.badge, honour]));

export const isHonour = (badge: string) => HONOUR_BY_BADGE.has(badge);

/** The first honour a member holds, if any — what the emblem renders from. */
export function honourOf(badges: string[] = []): Honour | undefined {
  for (const badge of badges) {
    const honour = HONOUR_BY_BADGE.get(badge);
    if (honour) return honour;
  }
  return undefined;
}

/** Everything in `badges` that names a position rather than an accolade. */
export const seatBadges = (badges: string[] = []) =>
  badges.filter((badge) => !isHonour(badge));

/**
 * What a listed member's `badges` should hold after the row editor is saved.
 *
 * One array carries two different kinds of thing, and the editor shows one of
 * each at a time: a single seat picker and a single honour toggle. Writing
 * back only what those two controls hold would drop anything else the row
 * carries — most really, a sector head who also chairs a committee holds two
 * seats and the picker can only show one of them.
 *
 * So this edits in place instead of replacing: the picker swaps out the first
 * seat and leaves the rest standing, and the toggle adds or removes exactly
 * one string. A key left `undefined` means its control was not touched.
 */
export function mergeBadges(
  current: string[] = [],
  patch: { badge?: string; honour?: boolean }
): string[] {
  let next = current;

  if (patch.badge !== undefined) {
    const firstSeat = seatBadges(next)[0];
    const kept = next.filter((badge) => badge !== firstSeat);
    next = patch.badge ? [patch.badge, ...kept] : kept;
  }

  if (patch.honour !== undefined) {
    next = patch.honour
      ? next.includes(DISTINGUISHED)
        ? next
        : [...next, DISTINGUISHED]
      : next.filter((badge) => badge !== DISTINGUISHED);
  }

  return next;
}
