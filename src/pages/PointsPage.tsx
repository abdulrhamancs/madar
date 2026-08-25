import React from "react";
import { useI18n } from "../lib/i18nContext";
import { cx } from "../lib/cx";
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
  compact = false,
}: {
  points: number;
  max: number;
  compact?: boolean;
}) {
  const pct = max > 0 ? (points / max) * 100 : 0;
  return (
    <div
      className={cx("w-full bg-divider", compact ? "mt-3 h-px" : "mt-5 h-px")}
      role="presentation"
    >
      <div
        className={cx(
          "h-px transition-[width] duration-[900ms] ease-entrance",
          compact ? "bg-accent/60" : "bg-accent"
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
 * ring around their position. That keeps a competitive table looking like a
 * club record rather than a game score screen.
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

  const entries: Entry[] = members.map((m) => ({
    key: m.id,
    name: m.fullName,
    username: m.username || "",
    detail: (m.badges || [])[0] || (m.committees || [])[0] || "",
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
                  <div className="flex items-center gap-5 sm:gap-8">
                    {/* The ring is the site's own motif — the same circle the
                        member cards put initials in — so a podium place is
                        marked without importing a medal. First place takes
                        cherry, which is already reserved for exactly this kind
                        of single accent: the logo ring, one orbital path. */}
                    <span
                      className={cx(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border",
                        RANK_RING[index]
                      )}
                    >
                      <span className={cx("nums latin text-h4", RANK_TEXT[index])}>
                        {formatNumber(index + 1)}
                      </span>
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-h2 text-ink">
                        {row.name}
                      </span>
                      <Detail username={row.username} detail={row.detail} />
                    </span>

                    <span className="nums latin shrink-0 font-display text-h2 text-ink">
                      {formatNumber(row.points)}
                    </span>
                  </div>
                  <Bar points={row.points} max={max} />
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
                      <div className="flex items-center gap-5 sm:gap-6">
                        <span className="nums latin w-8 shrink-0 text-small text-faint">
                          {formatNumber(index + 4)}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-body text-ink">
                            {row.name}
                          </span>
                          <Detail username={row.username} detail={row.detail} />
                        </span>
                        <span className="nums latin shrink-0 text-body font-medium text-ink">
                          {formatNumber(row.points)}
                        </span>
                      </div>
                      <Bar points={row.points} max={max} compact />
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
