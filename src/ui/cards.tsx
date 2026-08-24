import React from "react";
import { Check, ExternalLink, Users } from "lucide-react";
import { cx } from "../lib/cx";
import { initialsOf } from "../lib/initials";
import { useI18n } from "../lib/i18nContext";
import { Badge, Tag, type Tone } from "./Badge";
import { Button } from "./Button";

/**
 * Content components.
 *
 * These are deliberately not all "cards". Events and news are laid out as
 * editorial rows separated by hairlines — the boxed-card grid is reserved for
 * the few places where the content genuinely is a set of peers (members,
 * statistics). Reducing card usage is what keeps the pages reading like a
 * publication rather than a dashboard.
 */

export type EventStatus = "canceled" | "upcoming" | "current" | "past";

export const STATUS_TONE: Record<EventStatus, Tone> = {
  canceled: "danger",
  upcoming: "accent",
  current: "success",
  past: "neutral",
};

export const STATUS_KEY = {
  canceled: "status_canceled",
  upcoming: "status_upcoming",
  current: "status_current",
  past: "status_past",
} as const;

export interface EventItem {
  id: number;
  title: string;
  desc: string;
  link?: string;
  startDate: string;
  endDate: string;
  isCanceled: boolean;
  registeredUsers?: string[];
}

/**
 * The date block: a large day numeral over a short month.
 *
 * Numerals are Latin-figure and tabular so a column of dates stays aligned —
 * `formatDateParts` pins the calendar and numbering system, so this never
 * silently becomes Hijri. The month is NOT forced to the Latin utility font:
 * in Arabic, `Intl` returns a full Arabic word for `month: "short"` (e.g.
 * "سبتمبر" — Arabic has no three-letter abbreviation convention), so it must
 * stay on the brand face rather than Inter. The day and year are plain digits
 * either way, and Thmanyah covers Latin figures, so the whole block now
 * shares one typeface instead of mixing two.
 */
export function DateBlock({
  date,
  size = "md",
}: {
  date: string;
  size?: "md" | "lg";
}) {
  const { formatDateParts } = useI18n();
  const { day, month, year } = formatDateParts(date);

  return (
    <div className="flex shrink-0 flex-col items-center leading-none">
      <span
        className={cx(
          "nums font-display text-ink",
          size === "lg" ? "text-[3.5rem] leading-[0.9]" : "text-[2.25rem] leading-[0.95]"
        )}
      >
        {day}
      </span>
      <span
        className={cx(
          "mt-2 uppercase tracking-[0.16em] text-faint",
          size === "lg" ? "text-micro" : "text-[0.6875rem]"
        )}
      >
        {month}
      </span>
      <span className="nums mt-1 text-[0.6875rem] text-faint/80">{year}</span>
    </div>
  );
}

/**
 * Featured event — the single event given full editorial weight, used on the
 * homepage and at the top of the events page.
 */
export function FeaturedEvent({
  event,
  status,
  registered,
  canRegister,
  onRegister,
  pending,
}: {
  event: EventItem;
  status: EventStatus;
  registered?: boolean;
  canRegister?: boolean;
  onRegister?: (id: number) => void;
  pending?: boolean;
}) {
  const { t, formatDateRange } = useI18n();

  return (
    <article className="group relative overflow-hidden rounded-card border border-divider bg-surface">
      <div className="grid gap-8 p-7 md:grid-cols-[auto_1fr] md:gap-12 md:p-10">
        <div className="flex items-start gap-6 md:flex-col md:items-center md:border-e md:border-divider md:pe-12">
          <DateBlock date={event.startDate} size="lg" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={STATUS_TONE[status]}>{t(STATUS_KEY[status])}</Badge>
            {(event.registeredUsers?.length ?? 0) > 0 && (
              <Tag>
                <Users className="me-1.5 h-3.5 w-3.5" aria-hidden="true" />
                <span className="nums latin">{event.registeredUsers?.length}</span>
              </Tag>
            )}
          </div>

          <h3 className="mt-5 text-h2 text-ink">{event.title}</h3>
          <p className="nums mt-3 text-small text-faint">
            {formatDateRange(event.startDate, event.endDate)}
          </p>

          {event.desc && (
            <p className="mt-5 max-w-measure text-body text-muted">{event.desc}</p>
          )}

          {(event.link || canRegister) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {canRegister &&
                (registered ? (
                  <span className="inline-flex h-11 items-center gap-2 rounded-md border border-success/35 bg-success/[0.08] px-5 text-small font-medium text-success">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {t("already_registered")}
                  </span>
                ) : (
                  <Button
                    onClick={() => onRegister?.(event.id)}
                    pending={pending}
                    size="lg"
                  >
                    {t("register_event")}
                  </Button>
                ))}
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex min-h-[44px] items-center gap-2 text-small font-medium text-accent transition-colors duration-quick hover:text-accent-strong"
                >
                  {t("event_details")}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

/**
 * Event as an editorial row. Hairline-separated in a list — no box per item.
 * The whole row warms on hover so the target reads as one object.
 */
export function EventRow({
  event,
  status,
  registered,
  canRegister,
  onRegister,
  pending,
}: {
  event: EventItem;
  status: EventStatus;
  registered?: boolean;
  canRegister?: boolean;
  onRegister?: (id: number) => void;
  pending?: boolean;
}) {
  const { t, formatDateRange } = useI18n();

  return (
    <article className="group relative -mx-4 px-4 py-8 transition-colors duration-settle hover:bg-raised/40 sm:-mx-6 sm:px-6">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        <DateBlock date={event.startDate} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone={STATUS_TONE[status]}>{t(STATUS_KEY[status])}</Badge>
            {(event.registeredUsers?.length ?? 0) > 0 && (
              <Tag>
                <Users className="me-1.5 h-3.5 w-3.5" aria-hidden="true" />
                <span className="nums latin">{event.registeredUsers?.length}</span>
              </Tag>
            )}
          </div>

          <h3 className="mt-4 text-h3 text-ink">{event.title}</h3>
          <p className="nums mt-2 text-small text-faint">
            {formatDateRange(event.startDate, event.endDate)}
          </p>

          {event.desc && (
            <p className="mt-4 max-w-measure text-body text-muted">{event.desc}</p>
          )}

          {(event.link || canRegister) && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {canRegister &&
                (registered ? (
                  <span className="inline-flex h-10 items-center gap-2 rounded-md border border-success/35 bg-success/[0.08] px-4 text-small font-medium text-success">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {t("already_registered")}
                  </span>
                ) : (
                  <Button
                    onClick={() => onRegister?.(event.id)}
                    pending={pending}
                    variant="secondary"
                  >
                    {t("register_event")}
                  </Button>
                ))}
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline inline-flex min-h-[44px] items-center gap-2 text-small font-medium text-accent transition-colors duration-quick hover:text-accent-strong"
                >
                  {t("event_details")}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaType?: string;
  date: string;
}

/**
 * News teaser. `lead` is the magazine front-page treatment used once per
 * page; `item` is the smaller stack that follows it.
 */
export function NewsTeaser({
  item,
  variant = "item",
  onOpen,
}: {
  item: NewsItem;
  variant?: "lead" | "item";
  onOpen?: () => void;
}) {
  const isLead = variant === "lead";
  const Wrapper = onOpen ? "button" : "div";

  return (
    <Wrapper
      {...(onOpen
        ? { type: "button" as const, onClick: onOpen }
        : {})}
      className={cx(
        "group block w-full text-start",
        onOpen && "cursor-pointer"
      )}
    >
      {isLead && item.mediaUrl && item.mediaType === "image" && (
        <div className="mb-7 overflow-hidden rounded-card border border-divider bg-raised">
          <img
            src={item.mediaUrl}
            alt=""
            loading="lazy"
            width={1200}
            height={675}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] ease-entrance group-hover:scale-[1.03]"
          />
        </div>
      )}

      <p className="nums latin text-micro uppercase tracking-[0.14em] text-faint">
        {item.date}
      </p>
      <h3
        className={cx(
          "mt-3 text-ink transition-colors duration-quick group-hover:text-accent",
          isLead ? "text-h1" : "text-h3"
        )}
      >
        {item.title}
      </h3>
      <p
        className={cx(
          "mt-3 max-w-measure text-muted",
          isLead ? "text-lead line-clamp-3" : "text-body line-clamp-2"
        )}
      >
        {item.content}
      </p>
    </Wrapper>
  );
}

/**
 * Member. The circular crop is the orbit idea applied to a portrait — there
 * are no uploaded avatars in the schema, so the ring holds initials instead
 * of inventing an image field.
 */
export function MemberCard({
  name,
  username,
  roles = [],
  onClick,
}: {
  name: string;
  username?: string;
  roles?: string[];
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cx(
        "group flex w-full flex-col items-center rounded-card border border-divider bg-surface p-6 text-center",
        "transition-[border-color,background-color,transform] duration-settle ease-standard",
        onClick
          ? "hover:-translate-y-0.5 hover:border-accent/45 hover:bg-raised/40"
          : "cursor-default"
      )}
    >
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/35 bg-accent/[0.07]">
        <span className="text-h4 font-medium text-accent">{initialsOf(name)}</span>
        {/* the orbit ring, drawn only on hover */}
        <span
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full border border-accent/0 transition-colors duration-settle group-hover:border-accent/25"
        />
      </span>

      <span className="mt-4 block w-full truncate text-h4 text-ink">{name}</span>
      {username && (
        <span className="latin mt-1 block w-full truncate text-micro text-faint" dir="ltr">
          @{username}
        </span>
      )}

      {roles.length > 0 && (
        <span className="mt-4 flex flex-wrap justify-center gap-1.5">
          {roles.slice(0, 2).map((role) => (
            <Tag key={role}>{role}</Tag>
          ))}
        </span>
      )}
    </button>
  );
}

/**
 * A single figure. Hairline-separated in a row rather than boxed, so the
 * statistics band reads as one composition instead of four tiles.
 */
export function StatBlock({
  value,
  label,
  loading,
  onDark = false,
}: {
  value: string;
  label: string;
  loading?: boolean;
  /** Recolours for the espresso block. */
  onDark?: boolean;
}) {
  return (
    <div className="px-2 py-8 text-center sm:px-7 sm:text-start">
      {loading ? (
        <div className="skeleton mx-auto h-14 w-24 sm:mx-0" />
      ) : (
        // No `latin` here: Thmanyah carries a full set of figures, and at
        // display size a second typeface for the numerals would read as an
        // inconsistency rather than a refinement.
        <p
          className={cx(
            "nums font-display text-[clamp(2.5rem,5vw,4rem)] leading-none",
            onDark ? "text-on-espresso" : "text-ink"
          )}
        >
          {value}
        </p>
      )}
      <p
        className={cx(
          "mt-4 text-small",
          onDark ? "text-on-espresso/60" : "text-muted"
        )}
      >
        {label}
      </p>
    </div>
  );
}
