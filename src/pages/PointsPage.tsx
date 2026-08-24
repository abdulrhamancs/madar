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

/**
 * Leaderboard.
 *
 * Ranking is carried by typographic scale and a hairline share bar, not by
 * medals, trophies or a podium — the top three simply get more room and a
 * larger figure. That keeps a competitive table looking like a club record
 * rather than a game score screen.
 */
export function PointsPage({
  points,
  loading,
  error,
  onRetry,
}: {
  points: PointRow[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
}) {
  const { t, formatNumber } = useI18n();

  const ranked = [...points].sort((a, b) => b.points - a.points);
  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3);
  const max = ranked[0]?.points || 1;

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
                  key={row.id}
                  className="group border-b border-divider py-8"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="nums latin w-8 shrink-0 text-h3 text-accent">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-display text-h2 text-ink">
                      {row.name}
                    </span>
                    <span className="nums latin shrink-0 font-display text-h2 text-ink">
                      {formatNumber(row.points)}
                    </span>
                  </div>
                  {/* the bar still encodes the real ratio to the leader */}
                  <div
                    className="mt-5 h-px w-full bg-divider"
                    role="presentation"
                  >
                    <div
                      className="h-px bg-accent transition-[width] duration-[900ms] ease-entrance"
                      style={{ width: `${Math.max(3, (row.points / max) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </RevealGroup>

            {rest.length > 0 && (
              <Reveal variant="up" delay={120}>
                <ol className="divide-y divide-divider border-b border-divider">
                  {rest.map((row, index) => (
                    <li
                      key={row.id}
                      className={cx(
                        "-mx-4 flex items-center gap-6 px-4 py-4 transition-colors duration-settle",
                        "hover:bg-raised/40"
                      )}
                    >
                      <span className="nums latin w-8 shrink-0 text-small text-faint">
                        {index + 4}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-body text-ink">
                        {row.name}
                      </span>
                      <span className="nums latin shrink-0 text-body font-medium text-ink">
                        {formatNumber(row.points)}
                      </span>
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
