import React from "react";
import { Plus, Trash2, Users, Eye, Ban } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { AVAILABLE_BADGES } from "../lib/i18n";
import { PageHeader } from "../ui/PageHeader";
import { Button, IconButton } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { SelectField, TextArea, TextField } from "../ui/Field";
import { EmptyState } from "../ui/States";
import { cx } from "../lib/cx";

type Tab = "members" | "news" | "points" | "events";
const TABS: { id: Tab; labelKey: "admin_members" | "admin_news" | "admin_points" | "admin_events" }[] = [
  { id: "members", labelKey: "admin_members" },
  { id: "news", labelKey: "admin_news" },
  { id: "points", labelKey: "admin_points" },
  { id: "events", labelKey: "admin_events" },
];

export interface AdminPageProps {
  tab: Tab;
  onTabChange: (tab: Tab) => void;

  members: any[];
  news: any[];
  points: any[];
  events: any[];

  badgeSelect: Record<string, string>;
  onBadgeSelect: (username: string, badge: string) => void;
  onAssignBadge: (username: string) => void;
  onRemoveBadge: (username: string, badge: string) => void;
  onDeleteUser: (username: string) => void;

  newsForm: any;
  onNewsFormChange: (form: any) => void;
  onAddNews: (e: React.FormEvent) => void;
  onDeleteNews: (id: number) => void;

  pointsForm: any;
  onPointsFormChange: (form: any) => void;
  onAddPoints: (e: React.FormEvent) => void;
  onDeletePoints: (id: number) => void;

  eventForm: any;
  onEventFormChange: (form: any) => void;
  onAddEvent: (e: React.FormEvent) => void;
  onCancelEvent: (id: number) => void;
  onDeleteEvent: (id: number) => void;
  onViewRegistrations: (event: any) => void;

  pending: boolean;
}

export function AdminPage(props: AdminPageProps) {
  const { t } = useI18n();
  const { tab, onTabChange } = props;

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("admin_panel")} />

      <div role="tablist" aria-label={t("admin_panel")} className="mb-8 flex flex-wrap gap-1 border-b border-divider">
        {TABS.map(({ id, labelKey }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              aria-controls={`admin-panel-${id}`}
              id={`admin-tab-${id}`}
              onClick={() => onTabChange(id)}
              className={cx(
                "relative min-h-[44px] px-4 text-small font-medium transition-colors duration-quick",
                active ? "text-ink" : "text-muted hover:text-ink"
              )}
            >
              {t(labelKey)}
              {active && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                />
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`admin-panel-${tab}`}
        aria-labelledby={`admin-tab-${tab}`}
      >
        {tab === "members" && <MembersTab {...props} />}
        {tab === "news" && <NewsTab {...props} />}
        {tab === "points" && <PointsTab {...props} />}
        {tab === "events" && <EventsTab {...props} />}
      </div>
    </div>
  );
}

function MembersTab({
  members,
  badgeSelect,
  onBadgeSelect,
  onAssignBadge,
  onRemoveBadge,
  onDeleteUser,
}: AdminPageProps) {
  const { t } = useI18n();

  if (members.length === 0) return <EmptyState title={t("no_members_yet")} />;

  return (
    <ul className="space-y-3">
      {members.map((member) => (
        <li
          key={member.id}
          className="rounded-lg border border-divider bg-surface p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-body font-medium text-ink">{member.fullName}</p>
              <p className="text-small text-muted" dir="ltr">
                @{member.username}
              </p>
            </div>
            {member.role !== "admin" && (
              <IconButton
                label={t("delete_btn")}
                variant="ghost"
                onClick={() => onDeleteUser(member.username)}
                className="text-danger hover:bg-danger/10"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </IconButton>
            )}
          </div>

          {member.badges?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {member.badges.map((badge: string) => (
                <li key={badge}>
                  <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/35 bg-accent/10 px-2 py-0.5 text-micro font-medium text-accent">
                    {badge}
                    <button
                      type="button"
                      onClick={() => onRemoveBadge(member.username, badge)}
                      aria-label={`${t("delete_btn")}: ${badge}`}
                      className="rounded-sm p-0.5 hover:bg-accent/20"
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
                        <path
                          d="M3 3l6 6M9 3l-6 6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 flex flex-col gap-2 border-t border-divider pt-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <SelectField
                label={t("assign_badge")}
                value={badgeSelect[member.username] || ""}
                onChange={(e) => onBadgeSelect(member.username, e.target.value)}
              >
                <option value="">—</option>
                {AVAILABLE_BADGES.map((badge) => (
                  <option key={badge} value={badge}>
                    {badge}
                  </option>
                ))}
              </SelectField>
            </div>
            <Button
              variant="secondary"
              onClick={() => onAssignBadge(member.username)}
              disabled={!badgeSelect[member.username]}
            >
              <Plus className="h-4 w-4" />
              {t("add_btn")}
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

function NewsTab({
  news,
  newsForm,
  onNewsFormChange,
  onAddNews,
  onDeleteNews,
  pending,
}: AdminPageProps) {
  const { t } = useI18n();
  const set = (patch: any) => onNewsFormChange({ ...newsForm, ...patch });

  return (
    <div className="space-y-10">
      <form onSubmit={onAddNews} className="max-w-lg space-y-4" noValidate>
        <TextField
          label={t("news_title_input")}
          required
          value={newsForm.title}
          onChange={(e) => set({ title: e.target.value })}
        />
        <TextArea
          label={t("news_content_input")}
          required
          rows={4}
          value={newsForm.content}
          onChange={(e) => set({ content: e.target.value })}
        />
        <SelectField
          label={t("news_media_type")}
          value={newsForm.mediaType}
          onChange={(e) => set({ mediaType: e.target.value })}
        >
          <option value="none">{t("media_none")}</option>
          <option value="image">{t("media_image")}</option>
          <option value="video">{t("media_video")}</option>
        </SelectField>
        {newsForm.mediaType !== "none" && (
          <TextField
            label={t("news_media_url")}
            type="url"
            dir="ltr"
            value={newsForm.mediaUrl}
            onChange={(e) => set({ mediaUrl: e.target.value })}
          />
        )}
        <Button type="submit" pending={pending}>
          <Plus className="h-4 w-4" />
          {t("add_btn")}
        </Button>
      </form>

      {news.length === 0 ? (
        <EmptyState title={t("empty_news")} />
      ) : (
        <ul className="divide-y divide-divider border-t border-divider">
          {news.map((item) => (
            <li key={item.id} className="flex items-start gap-3 py-3.5">
              <div className="min-w-0 flex-1">
                <p className="nums text-micro text-faint">{item.date}</p>
                <p className="truncate text-body text-ink">{item.title}</p>
              </div>
              <IconButton
                label={t("delete_btn")}
                variant="ghost"
                onClick={() => onDeleteNews(item.id)}
                className="text-danger hover:bg-danger/10"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PointsTab({
  points,
  pointsForm,
  onPointsFormChange,
  onAddPoints,
  onDeletePoints,
  pending,
}: AdminPageProps) {
  const { t, formatNumber } = useI18n();
  const set = (patch: any) => onPointsFormChange({ ...pointsForm, ...patch });

  return (
    <div className="space-y-10">
      <form onSubmit={onAddPoints} className="max-w-lg space-y-4" noValidate>
        <TextField
          label={t("fullname")}
          required
          value={pointsForm.name}
          onChange={(e) => set({ name: e.target.value })}
        />
        <TextField
          label={t("admin_points")}
          type="number"
          inputMode="numeric"
          required
          dir="ltr"
          value={pointsForm.points}
          onChange={(e) => set({ points: e.target.value })}
        />
        <Button type="submit" pending={pending}>
          <Plus className="h-4 w-4" />
          {t("add_btn")}
        </Button>
      </form>

      {points.length === 0 ? (
        <EmptyState title={t("points_msg")} />
      ) : (
        <ul className="divide-y divide-divider border-t border-divider">
          {points.map((row) => (
            <li key={row.id} className="flex items-center gap-3 py-3.5">
              <span className="min-w-0 flex-1 truncate text-body text-ink">
                {row.name}
              </span>
              <span className="nums shrink-0 text-body font-medium text-ink">
                {formatNumber(row.points)}
              </span>
              <IconButton
                label={t("delete_btn")}
                variant="ghost"
                onClick={() => onDeletePoints(row.id)}
                className="text-danger hover:bg-danger/10"
              >
                <Trash2 className="h-4.5 w-4.5" />
              </IconButton>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EventsTab({
  events,
  eventForm,
  onEventFormChange,
  onAddEvent,
  onCancelEvent,
  onDeleteEvent,
  onViewRegistrations,
  pending,
}: AdminPageProps) {
  const { t, formatDateRange } = useI18n();
  const set = (patch: any) => onEventFormChange({ ...eventForm, ...patch });

  return (
    <div className="space-y-10">
      <form onSubmit={onAddEvent} className="max-w-lg space-y-4" noValidate>
        <TextField
          label={t("news_title_input")}
          required
          value={eventForm.title}
          onChange={(e) => set({ title: e.target.value })}
        />
        <TextArea
          label={t("news_content_input")}
          rows={3}
          value={eventForm.desc}
          onChange={(e) => set({ desc: e.target.value })}
        />
        <TextField
          label={t("news_media_url")}
          type="url"
          dir="ltr"
          value={eventForm.link}
          onChange={(e) => set({ link: e.target.value })}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label={t("events_upcoming")}
            type="date"
            required
            dir="ltr"
            value={eventForm.startDate}
            onChange={(e) => set({ startDate: e.target.value })}
          />
          <TextField
            label={t("events_past")}
            type="date"
            required
            dir="ltr"
            value={eventForm.endDate}
            onChange={(e) => set({ endDate: e.target.value })}
          />
        </div>
        <Button type="submit" pending={pending}>
          <Plus className="h-4 w-4" />
          {t("add_btn")}
        </Button>
      </form>

      {events.length === 0 ? (
        <EmptyState title={t("empty_events")} />
      ) : (
        <ul className="space-y-3 border-t border-divider pt-6">
          {events.map((ev) => (
            <li
              key={ev.id}
              className="rounded-lg border border-divider bg-surface p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-body font-medium text-ink">{ev.title}</p>
                  <p className="nums text-small text-muted">
                    {formatDateRange(ev.startDate, ev.endDate)}
                  </p>
                </div>
                {ev.isCanceled && <Badge tone="danger">{t("status_canceled")}</Badge>}
              </div>
              <div className="mt-3 flex flex-wrap gap-2 border-t border-divider pt-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onViewRegistrations(ev)}
                >
                  <Users className="h-4 w-4" />
                  {t("view_registered")}
                  <span className="nums ms-1 text-muted">
                    {(ev.registeredUsers || []).length}
                  </span>
                </Button>
                {!ev.isCanceled && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onCancelEvent(ev.id)}
                  >
                    <Ban className="h-4 w-4" />
                    {t("cancel_btn")}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEvent(ev.id)}
                  className="text-danger hover:bg-danger/10"
                >
                  <Trash2 className="h-4 w-4" />
                  {t("delete_btn")}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
