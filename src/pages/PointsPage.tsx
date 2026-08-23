import React from "react";
import { Crown, Medal, Award } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { PageHeader } from "../ui/PageHeader";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";
import { cx } from "../lib/cx";

interface PointRow {
  id: number;
  name: string;
  points: number;
}

// Medal colours are literal semantics (gold/silver/bronze), not decoration.
const PODIUM = [
  { icon: Crown, ring: "border-accent/50 bg-accent/10 text-accent" },
  { icon: Medal, ring: "border-muted/40 bg-muted/10 text-muted" },
  { icon: Award, ring: "border-warning/40 bg-warning/10 text-warning" },
];

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
        count={loading ? undefined : String(ranked.length)}
      />

      {error ? (
        <ErrorState
          title={t("error_generic")}
          message={t("error_network")}
          retryLabel={t("retry")}
          onRetry={onRetry}
        />
      ) : loading ? (
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : ranked.length === 0 ? (
        <EmptyState title={t("points_msg")} />
      ) : (
        <>
          {/* Top three get emphasis through scale and a rank mark, not a
              cartoon podium — the bar still encodes the real ratio. */}
          <ol className="mb-8 space-y-3">
            {top.map((row, index) => {
              const Icon = PODIUM[index].icon;
              return (
                <li
                  key={row.id}
                  className="rounded-lg border border-divider bg-surface p-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cx(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                        PODIUM[index].ring
                      )}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-h3 text-ink">
                        {row.name}
                      </span>
                      <span className="nums text-micro text-muted">
                        #{index + 1}
                      </span>
                    </span>
                    <span className="nums shrink-0 text-h2 text-ink">
                      {formatNumber(row.points)}
                    </span>
                  </div>
                  <div
                    className="mt-3 h-1 w-full overflow-hidden rounded-full bg-raised"
                    role="presentation"
                  >
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.max(4, (row.points / max) * 100)}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>

          {rest.length > 0 && (
            <ol className="divide-y divide-divider border-y border-divider">
              {rest.map((row, index) => (
                <li
                  key={row.id}
                  className="flex items-center gap-4 py-3.5"
                >
                  <span className="nums w-8 shrink-0 text-small text-faint">
                    {index + 4}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-body text-ink">
                    {row.name}
                  </span>
                  <span className="nums shrink-0 text-body font-medium text-ink">
                    {formatNumber(row.points)}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  );
}
