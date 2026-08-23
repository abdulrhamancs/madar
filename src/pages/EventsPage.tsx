import React from "react";
import { CalendarDays, Check, ExternalLink, Search } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { PageHeader } from "../ui/PageHeader";
import { Badge, type Tone } from "../ui/Badge";
import { Button } from "../ui/Button";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";

interface EventItem {
  id: number;
  title: string;
  desc: string;
  link: string;
  startDate: string;
  endDate: string;
  isCanceled: boolean;
  registeredUsers: string[];
}

type Status = "canceled" | "upcoming" | "current" | "past";

const STATUS_TONE: Record<Status, Tone> = {
  canceled: "danger",
  upcoming: "accent",
  current: "success",
  past: "neutral",
};
const STATUS_KEY = {
  canceled: "status_canceled",
  upcoming: "status_upcoming",
  current: "status_current",
  past: "status_past",
} as const;

const FILTERS = [
  "all",
  "current",
  "upcoming",
  "past",
  "registered",
  "canceled",
] as const;
const FILTER_KEY = {
  all: "events_all",
  current: "events_current",
  upcoming: "events_upcoming",
  past: "events_past",
  registered: "events_registered",
  canceled: "events_canceled",
} as const;

export function EventsPage({
  events,
  loading,
  error,
  onRetry,
  currentUser,
  filter,
  onFilterChange,
  search,
  onSearchChange,
  getEventStatus,
  onRegister,
  pendingId,
}: {
  events: EventItem[];
  loading: boolean;
  error: boolean;
  onRetry: () => void;
  currentUser: { username?: string } | null;
  filter: string;
  onFilterChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  getEventStatus: (e: EventItem) => Status;
  onRegister: (id: number) => void;
  pendingId: number | null;
}) {
  const { t, formatDateRange } = useI18n();

  const visible = events
    .filter((ev) => {
      if (filter === "all") return true;
      if (filter === "registered")
        return (
          currentUser &&
          (ev.registeredUsers || []).includes(currentUser.username ?? "")
        );
      return getEventStatus(ev) === filter;
    })
    .filter((ev) =>
      (ev.title || "").toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div>
      <PageHeader
        eyebrow={t("madar_club")}
        title={t("events")}
        count={loading ? undefined : String(visible.length)}
      />

      {/* Toolbar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-faint"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("events_search")}
            aria-label={t("events_search")}
            className="h-11 w-full rounded-md border border-control bg-surface ps-9 pe-3 text-body text-ink placeholder:text-faint transition-colors duration-quick hover:border-ink/40"
          />
        </div>
      </div>

      {/* Filters as a scrollable chip row — wraps rather than truncating */}
      <div
        role="tablist"
        aria-label={t("events")}
        className="mb-8 flex flex-wrap gap-2"
      >
        {FILTERS.map((value) => {
          const active = filter === value;
          return (
            <button
              key={value}
              role="tab"
              aria-selected={active}
              onClick={() => onFilterChange(value)}
              className={
                "min-h-[40px] rounded-sm border px-3.5 text-small font-medium transition-colors duration-quick " +
                (active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-divider text-muted hover:border-control hover:text-ink")
              }
            >
              {t(FILTER_KEY[value])}
            </button>
          );
        })}
      </div>

      {error ? (
        <ErrorState
          title={t("error_generic")}
          message={t("error_network")}
          retryLabel={t("retry")}
          onRetry={onRetry}
        />
      ) : loading ? (
        <ul className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="rounded-lg border border-divider p-5">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="mt-3 h-6 w-2/3" />
              <Skeleton className="mt-2 h-4 w-40" />
              <Skeleton className="mt-4 h-4 w-full" />
            </li>
          ))}
        </ul>
      ) : visible.length === 0 ? (
        <EmptyState
          title={events.length === 0 ? t("empty_events") : t("events_none")}
          message={events.length === 0 ? undefined : t("events_search")}
        />
      ) : (
        <ul className="space-y-4">
          {visible.map((ev) => {
            const status = getEventStatus(ev);
            const registered =
              currentUser &&
              (ev.registeredUsers || []).includes(currentUser.username ?? "");
            const canRegister =
              currentUser && status !== "canceled" && status !== "past";

            return (
              <li
                key={ev.id}
                className="rounded-lg border border-divider bg-surface p-5 transition-colors duration-quick hover:border-control"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Badge tone={STATUS_TONE[status]}>{t(STATUS_KEY[status])}</Badge>
                    <h2 className="mt-2.5 text-h3 text-ink">{ev.title}</h2>
                    <p className="nums mt-1 flex items-center gap-1.5 text-small text-muted">
                      <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {formatDateRange(ev.startDate, ev.endDate)}
                    </p>
                  </div>
                </div>

                {ev.desc && (
                  <p className="mt-3 text-body text-muted">{ev.desc}</p>
                )}

                {(ev.link || canRegister) && (
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-divider pt-4">
                    {ev.link && (
                      <a
                        href={ev.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-control px-4 text-small font-medium text-ink transition-colors duration-quick hover:bg-ink/[0.04]"
                      >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        {t("event_details")}
                      </a>
                    )}
                    {canRegister &&
                      (registered ? (
                        <span className="inline-flex h-10 items-center gap-2 rounded-md border border-success/40 bg-success/10 px-4 text-small font-medium text-success">
                          <Check className="h-4 w-4" aria-hidden="true" />
                          {t("already_registered")}
                        </span>
                      ) : (
                        <Button
                          onClick={() => onRegister(ev.id)}
                          pending={pendingId === ev.id}
                        >
                          {t("register_event")}
                        </Button>
                      ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
