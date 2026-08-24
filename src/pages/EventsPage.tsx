import React from "react";
import { useI18n } from "../lib/i18nContext";
import { cx } from "../lib/cx";
import { PageHeader } from "../ui/Section";
import { SearchField } from "../ui/Field";
import { EmptyState, ErrorState, Skeleton } from "../ui/States";
import { Reveal } from "../ui/Reveal";
import {
  EventRow,
  FeaturedEvent,
  type EventItem,
  type EventStatus,
} from "../ui/cards";

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

/**
 * Events read as a programme, not a card grid: the soonest live or upcoming
 * event is given full editorial weight at the top, and the rest follow as
 * hairline-separated rows.
 */
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
  getEventStatus: (e: EventItem) => EventStatus;
  onRegister: (id: number) => void;
  pendingId: number | null;
}) {
  const { t } = useI18n();

  const isRegistered = (ev: EventItem) =>
    Boolean(
      currentUser && (ev.registeredUsers || []).includes(currentUser.username ?? "")
    );

  const visible = events
    .filter((ev) => {
      if (filter === "all") return true;
      if (filter === "registered") return isRegistered(ev);
      return getEventStatus(ev) === filter;
    })
    .filter((ev) =>
      (ev.title || "").toLowerCase().includes(search.toLowerCase())
    );

  // Only promote a lead event on the unfiltered, unsearched view — once the
  // reader is filtering, every result is equally relevant.
  const isBrowsing = filter === "all" && search.trim() === "";
  const lead = isBrowsing
    ? visible.find((ev) => {
        const status = getEventStatus(ev);
        return status === "current" || status === "upcoming";
      })
    : undefined;
  const rows = lead ? visible.filter((ev) => ev.id !== lead.id) : visible;

  const canRegister = (ev: EventItem) => {
    const status = getEventStatus(ev);
    return Boolean(currentUser) && status !== "canceled" && status !== "past";
  };

  return (
    <div>
      <PageHeader
        eyebrow={t("madar_club")}
        title={t("events")}
      />

      {/* --- toolbar --- */}
      <div className="mt-10 flex flex-col gap-6">
        <SearchField
          label={t("events_search")}
          placeholder={t("events_search")}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-md"
        />

        <div role="tablist" aria-label={t("events")} className="flex flex-wrap gap-x-6 gap-y-2">
          {FILTERS.map((value) => {
            const active = filter === value;
            return (
              <button
                key={value}
                role="tab"
                aria-selected={active}
                onClick={() => onFilterChange(value)}
                className={cx(
                  "relative min-h-[40px] text-small transition-colors duration-quick",
                  active
                    ? "font-medium text-ink"
                    : "text-faint hover:text-ink"
                )}
              >
                {t(FILTER_KEY[value])}
                <span
                  aria-hidden="true"
                  className={cx(
                    "absolute inset-x-0 bottom-1 h-px bg-accent transition-transform duration-settle ease-standard",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-12">
        {error ? (
          <ErrorState
            title={t("error_generic")}
            message={t("error_network")}
            retryLabel={t("retry")}
            onRetry={onRetry}
          />
        ) : loading ? (
          <div className="space-y-10" aria-busy="true">
            <Skeleton className="h-64 w-full" />
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-8">
                <Skeleton className="h-20 w-16 shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="mt-4 h-7 w-2/3" />
                  <Skeleton className="mt-3 h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          <EmptyState
            title={events.length === 0 ? t("empty_events") : t("events_none")}
            message={events.length === 0 ? undefined : t("events_search")}
          />
        ) : (
          <>
            {lead && (
              <Reveal variant="up" className="mb-14">
                <FeaturedEvent
                  event={lead}
                  status={getEventStatus(lead)}
                  registered={isRegistered(lead)}
                  canRegister={canRegister(lead)}
                  onRegister={onRegister}
                  pending={pendingId === lead.id}
                />
              </Reveal>
            )}

            {rows.length > 0 && (
              <ul className="divide-y divide-divider border-y border-divider">
                {rows.map((ev, index) => (
                  <Reveal
                    as="li"
                    key={ev.id}
                    variant="up"
                    delay={Math.min(index, 4) * 60}
                  >
                    <EventRow
                      event={ev}
                      status={getEventStatus(ev)}
                      registered={isRegistered(ev)}
                      canRegister={canRegister(ev)}
                      onRegister={onRegister}
                      pending={pendingId === ev.id}
                    />
                  </Reveal>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}
