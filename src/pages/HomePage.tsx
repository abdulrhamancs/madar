import React from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Users, Newspaper } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { OrbitLogo } from "../ui/BrandIcons";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { Skeleton } from "../ui/States";
import type { PageId } from "../components/AppShell";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
}
interface EventItem {
  id: number;
  title: string;
  desc: string;
  startDate: string;
  endDate: string;
  isCanceled: boolean;
}

export function HomePage({
  loading,
  news,
  events,
  memberCount,
  currentUser,
  onNavigate,
  onRegister,
  getEventStatus,
}: {
  loading: boolean;
  news: NewsItem[];
  events: EventItem[];
  memberCount: number;
  currentUser: unknown;
  onNavigate: (page: PageId) => void;
  onRegister: () => void;
  getEventStatus: (e: EventItem) => string;
}) {
  const { t, lang, formatDateRange, formatNumber } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const nextEvent = events.find((e) => {
    const s = getEventStatus(e);
    return s === "current" || s === "upcoming";
  });
  const latestNews = news.slice(0, 2);

  return (
    <div className="space-y-14">
      {/* --- Brand block: compact and typographic, not a full-viewport splash --- */}
      <section className="flex flex-col items-start gap-5">
        <OrbitLogo className="h-16 w-16" />
        <div>
          <h1 className="font-display text-display text-ink">{t("madar_club")}</h1>
          <p className="mt-2 max-w-prose text-body text-muted">
            {t("coming_soon_sub")}
          </p>
        </div>
        {!currentUser && (
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onRegister}>
              {t("join_us")}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => onNavigate("about")}>
              {t("about")}
            </Button>
          </div>
        )}
      </section>

      {/* --- About + at-a-glance --- */}
      <section className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-h2 text-ink">{t("about_title")}</h2>
          <p className="mt-3 text-body text-muted">{t("about_p1")}</p>
          <p className="mt-3 text-body text-muted">{t("about_p2")}</p>
        </div>

        <aside className="lg:col-span-5">
          <ul className="grid grid-cols-3 gap-3 lg:grid-cols-1">
            <Stat
              icon={<Users className="h-4 w-4" />}
              value={loading ? null : formatNumber(memberCount)}
              label={t("members_count")}
            />
            <Stat
              icon={<CalendarDays className="h-4 w-4" />}
              value={loading ? null : formatNumber(events.length)}
              label={t("events")}
            />
            <Stat
              icon={<Newspaper className="h-4 w-4" />}
              value={loading ? null : formatNumber(news.length)}
              label={t("news")}
            />
          </ul>
        </aside>
      </section>

      {/* --- Next event: only rendered when there is one --- */}
      {!loading && nextEvent && (
        <section>
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="text-h2 text-ink">{t("events")}</h2>
            <button
              type="button"
              onClick={() => onNavigate("events")}
              className="text-small font-medium text-accent hover:underline"
            >
              {t("events_all")}
            </button>
          </div>
          <article className="rounded-lg border border-divider bg-surface p-5 transition-colors duration-quick hover:border-control">
            <Badge tone={getEventStatus(nextEvent) === "current" ? "success" : "accent"}>
              {t(
                getEventStatus(nextEvent) === "current"
                  ? "status_current"
                  : "status_upcoming"
              )}
            </Badge>
            <h3 className="mt-3 text-h3 text-ink">{nextEvent.title}</h3>
            <p className="nums mt-1 text-small text-muted">
              {formatDateRange(nextEvent.startDate, nextEvent.endDate)}
            </p>
            {nextEvent.desc && (
              <p className="mt-3 line-clamp-2 text-small text-muted">
                {nextEvent.desc}
              </p>
            )}
          </article>
        </section>
      )}

      {/* --- Latest news --- */}
      {!loading && latestNews.length > 0 && (
        <section>
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="text-h2 text-ink">{t("news_title")}</h2>
            <button
              type="button"
              onClick={() => onNavigate("news")}
              className="text-small font-medium text-accent hover:underline"
            >
              {t("more")}
            </button>
          </div>
          <ul className="divide-y divide-divider border-y border-divider">
            {latestNews.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate("news")}
                  className="w-full py-4 text-start transition-colors duration-quick hover:bg-ink/[0.02]"
                >
                  <p className="nums text-micro text-faint">{item.date}</p>
                  <h3 className="mt-1 text-h3 text-ink">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-small text-muted">
                    {item.content}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {loading && (
        <section className="space-y-3">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-24 w-full" />
        </section>
      )}

      {/* --- Founders credit: the club's own words --- */}
      <section className="border-t border-divider pt-8">
        <p className="max-w-prose text-small leading-relaxed text-muted">
          <Name>{t("about_footer_p1")}</Name>
          {t("about_footer_p2")}
          <Name>{t("about_footer_p3")}</Name>
          {t("about_footer_p4")}
          <Name>{t("about_footer_p5")}</Name>
          {t("about_footer_p6")}
          <Name>{t("about_footer_p7")}</Name>
          {t("about_footer_p8")}
        </p>
      </section>
    </div>
  );
}

function Name({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-ink">{children}</span>;
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | null;
  label: string;
}) {
  return (
    <li className="rounded-lg border border-divider bg-surface p-4">
      <span className="flex items-center gap-1.5 text-micro text-muted">
        <span className="text-accent" aria-hidden="true">
          {icon}
        </span>
        {label}
      </span>
      {value === null ? (
        <Skeleton className="mt-2 h-7 w-12" />
      ) : (
        <p className="nums mt-1 text-h1 text-ink">{value}</p>
      )}
    </li>
  );
}
