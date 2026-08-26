import React from "react";
import { Crown } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { seatBadges } from "../lib/clubData";
import { cx } from "../lib/cx";
import { HonourEmblem } from "../ui/Badge";
import { PageHeader } from "../ui/Section";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";
import { Reveal, RevealGroup } from "../ui/Reveal";

interface PointRow {
  id: number;
  name: string;
  points: number;
}

interface Member {
  id: string;
  fullName: string;
  username: string;
  role: string;
  committees: string[];
  badges: string[];
}

interface Entry {
  key: string;
  name: string;
  /** Only real accounts have one; listed members do not. */
  username: string;
  /** Their role or committee, shown when there is no handle to show. */
  detail: string;
  /** The raw column, so the emblem resolves an honour from it itself. */
  badges: string[];
  points: number;
}

/**
 * The podium, in the palette the site already owns.
 *
 * Gold, silver and bronze would be three colours from outside the system
 * sitting on a cream page. These read as first, second and third by falling
 * in weight instead: the brand's one accent colour, then the everyday accent,
 * then a hairline.
 */
const RANK_RING = [
  // First place is tinted lighter than the others on purpose. Cherry sits
  // closer to its own tint than the brown accent does to hers, so a 7% fill
  // took the numeral to 4.55:1 in dark — over the line, but with nothing to
  // spare. At 4% it clears comfortably and the ring still reads as filled.
  "border-cherry/45 bg-cherry/[0.04]",
  "border-accent/40 bg-accent/[0.07]",
  "border-divider bg-raised/40",
] as const;

const RANK_TEXT = ["text-cherry", "text-accent", "text-muted"] as const;

/** `@handle` for a real account, otherwise whatever role we know them by. */
function Detail({ username, detail }: { username: string; detail: string }) {
  if (username) {
    return (
      <span className="latin mt-0.5 block truncate text-micro text-faint" dir="ltr">
        @{username}
      </span>
    );
  }
  if (detail) {
    return (
      <span className="mt-0.5 block truncate text-micro text-faint">
        {detail}
      </span>
    );
  }
  return null;
}

/**
 * Share of the leader's score.
 *
 * With nobody on the board yet the track is drawn empty rather than given a
 * token sliver. A minimum width would draw progress that does not exist, and
 * an all-zero board is the state this club actually starts in — nine empty
 * rails read as a season not yet begun, which is the truth.
 */
function Bar({
  points,
  max,
  prominent = false,
  className,
}: {
  points: number;
  max: number;
  prominent?: boolean;
  className?: string;
}) {
  const pct = max > 0 ? (points / max) * 100 : 0;
  return (
    <div
      className={cx(
        // A hairline in divider was technically present and practically
        // invisible — 1.34:1 against the page. Given real height it reads as
        // an empty rail at nothing, which is the state the club starts in.
        "w-full overflow-hidden rounded-full bg-divider",
        prominent ? "h-2" : "h-1.5",
        className
      )}
      role="presentation"
    >
      {/* No inline-start rule needed: in normal flow the fill begins at the
          inline start of its track, so it grows leftwards in Arabic and
          rightwards in English on its own. */}
      <div
        className={cx(
          "h-full rounded-full transition-[width] duration-[900ms] ease-entrance",
          prominent ? "bg-accent" : "bg-accent/70"
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

/**
 * Leaderboard.
 *
 * Ranking is carried by typographic scale and a share bar rather than by
 * trophies or a podium — the top three get more room, a larger figure and a
 * ring around their position, and first place alone is sealed with a crown.
 * That keeps a competitive table looking like a club record rather than a
 * game score screen.
 *
 * Everyone in the club appears from the start, on nothing. Points live in
 * their own table keyed by name, so before this the board listed only people
 * who had already scored — which meant an empty page for a club that simply
 * had not started counting yet.
 */
export function PointsPage({
  points,
  members,
  loading,
  error,
  onRetry,
}: {
  points: PointRow[];
  members: Member[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  const { t, formatNumber, lang } = useI18n();

  const scoreOf = new Map(points.map((p) => [p.name, p.points]));

  // Admins run the board rather than compete on it. This is a view filter and
  // nothing more — it does not touch `profiles.role`, `is_admin()` or any
  // policy, so an excluded account keeps every one of its privileges and its
  // place everywhere else on the site, the structure page included.
  //
  // It does tie "operates the club" to "does not compete". That holds while
  // one person runs things; a second admin who *did* compete would quietly
  // drop off here, and at that point this wants to become its own column
  // rather than a reading of the role.
  const entries: Entry[] = members
    .filter((m) => m.role !== "admin")
    .map((m) => ({
      key: m.id,
      name: m.fullName,
      username: m.username || "",
      // Seats only. An honour already shows as an emblem beside the name, so
      // reading it here too would print the same fact twice in one row.
      detail: seatBadges(m.badges)[0] || (m.committees || [])[0] || "",
      badges: m.badges || [],
      points: scoreOf.get(m.fullName) ?? 0,
    }));

  // A points row whose name matches nobody still belongs on the board. The
  // admin form takes a free-text name, so dropping these would quietly lose
  // any score recorded against someone not currently listed as a member.
  const named = new Set(members.map((m) => m.fullName));
  points
    .filter((p) => !named.has(p.name))
    .forEach((p) =>
      entries.push({
        key: `points-${p.id}`,
        name: p.name,
        username: "",
        detail: "",
        badges: [],
        points: p.points,
      })
    );

  // Score first, then name — so a board where everyone is on nothing has a
  // settled order instead of reshuffling on every render.
  const ranked = entries.sort(
    (a, b) => b.points - a.points || a.name.localeCompare(b.name, lang)
  );
  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const max = ranked[0]?.points ?? 0;

  return (
    <div>
      <PageHeader
        eyebrow={t("madar_club")}
        title={t("points_title")}
      />

      <div className="mt-14">
        {error ? (
          <ErrorState
            title={t("error_generic")}
            message={t("error_network")}
            retryLabel={t("retry")}
            onRetry={onRetry}
          />
        ) : loading ? (
          <div className="space-y-4" aria-busy="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : ranked.length === 0 ? (
          <EmptyState title={t("points_msg")} />
        ) : (
          <>
            <RevealGroup
              variant="up"
              step={90}
              as="ol"
              className="border-t border-divider"
            >
              {top.map((row, index) => (
                <li
                  key={row.key}
                  className="group border-b border-divider py-8"
                >
                  {/* The bar sits between the name and the score rather than
                      under the row. A name that only sized to its text left
                      nearly 900px of nothing before the figure, so the two
                      read as unrelated; the bar now spans that distance and
                      ties them together. The score stays at the inline end so
                      the column of figures still reads down the page. */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* The ring is the site's own motif — the same circle the
                        member cards put initials in — so a podium place is
                        marked without importing a medal. First place takes
                        cherry, which is already reserved for exactly this kind
                        of single accent: the logo ring, one orbital path. */}
                    <span
                      className={cx(
                        "relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border",
                        RANK_RING[index]
                      )}
                    >
                      <span className={cx("nums latin text-h4", RANK_TEXT[index])}>
                        {formatNumber(index + 1)}
                      </span>
                      {/* First place, and only first place, is sealed.
                          The crown sits on the ring's edge rather than inside
                          it, so the numeral keeps its full size and the row
                          still reads as a ranked list rather than a trophy
                          shelf. `bg-canvas` cuts the hairline behind it, which
                          is what makes it read as set into the ring instead of
                          floating over it.

                          `left-1/2` is physical on purpose: centring is the
                          same operation in both directions, and pairing a
                          logical `start-1/2` with a physical `-translate-x-1/2`
                          would send it off the ring in Arabic.

                          Withheld while the board is on nothing. First place
                          is alphabetical until somebody scores, and a crown on
                          an unearned lead is the same untruth the share bars
                          already refuse to tell by drawing themselves empty. */}
                      {index === 0 && row.points > 0 && (
                        <span className="absolute -top-2 left-1/2 flex -translate-x-1/2 items-center bg-canvas px-1 text-cherry">
                          <Crown className="h-3.5 w-3.5" aria-hidden="true" />
                          <span className="sr-only">{t("rank_first")}</span>
                        </span>
                      )}
                    </span>

                    <span className="min-w-0 shrink">
                      <span className="flex items-center gap-2.5">
                        <span className="min-w-0 truncate font-display text-h2 text-ink">
                          {row.name}
                        </span>
                        <HonourEmblem badges={row.badges} />
                      </span>
                      <Detail username={row.username} detail={row.detail} />
                    </span>

                    <Bar
                      points={row.points}
                      max={max}
                      prominent
                      className="hidden flex-1 sm:block"
                    />

                    <span className="nums latin ms-auto shrink-0 font-display text-h2 text-ink sm:ms-0">
                      {formatNumber(row.points)}
                    </span>
                  </div>
                  {/* Too narrow to bridge anything on a phone, so it goes back
                      under the row there. */}
                  <Bar
                    points={row.points}
                    max={max}
                    prominent
                    className="mt-4 sm:hidden"
                  />
                </li>
              ))}
            </RevealGroup>

            {rest.length > 0 && (
              <Reveal variant="up" delay={120}>
                <ol className="divide-y divide-divider border-b border-divider">
                  {rest.map((row, index) => (
                    <li
                      key={row.key}
                      className={cx(
                        "-mx-4 px-4 py-4 transition-colors duration-settle",
                        "hover:bg-raised/40"
                      )}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-5">
                        {/* Was 15px in `faint` at 5:1, held a column's width
                            from the name it belonged to. Larger, in `muted`,
                            and closer — still plainly lighter than the podium's
                            48px ring, so the two tiers stay distinct. */}
                        <span className="nums latin w-6 shrink-0 text-body text-muted">
                          {formatNumber(index + 4)}
                        </span>
                        <span className="min-w-0 shrink">
                          <span className="flex items-center gap-2">
                            <span className="min-w-0 truncate text-body text-ink">
                              {row.name}
                            </span>
                            <HonourEmblem badges={row.badges} size="sm" />
                          </span>
                          <Detail username={row.username} detail={row.detail} />
                        </span>
                        <Bar
                          points={row.points}
                          max={max}
                          className="hidden flex-1 sm:block"
                        />
                        <span className="nums latin ms-auto shrink-0 text-body font-medium text-ink sm:ms-0">
                          {formatNumber(row.points)}
                        </span>
                      </div>
                      <Bar
                        points={row.points}
                        max={max}
                        className="mt-3 sm:hidden"
                      />
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </>
        )}
      </div>
    </div>
  );
}
