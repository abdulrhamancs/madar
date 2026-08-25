import React from "react";
import { Plus, Trash2, Users, Ban } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { AVAILABLE_BADGES } from "../lib/i18n";
import { CLUB_SECTORS } from "../lib/clubData";
import { cx } from "../lib/cx";
import { PageHeader } from "../ui/Section";
import { Button, IconButton } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { SelectField, TextArea, TextField } from "../ui/Field";
import { MediaField } from "../ui/MediaField";
import { EmptyState } from "../ui/States";
import { Reveal } from "../ui/Reveal";

type Tab = "members" | "display" | "news" | "points" | "events";

const TABS: {
  id: Tab;
  labelKey:
    | "admin_members"
    | "admin_display"
    | "admin_news"
    | "admin_points"
    | "admin_events";
}[] = [
  { id: "members", labelKey: "admin_members" },
  { id: "display", labelKey: "admin_display" },
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

  /** People listed on the site with no login account. */
  displayMembers: any[];
  displayForm: any;
  onDisplayFormChange: (form: any) => void;
  onAddDisplayMember: (e: React.FormEvent) => void;
  onUpdateDisplayMember: (
    id: string,
    patch: {
      fullName?: string;
      badge?: string;
      committee?: string;
      points?: string;
    }
  ) => void;
  onDeleteDisplayMember: (id: string) => void;
  /** Current score per name, so a listed member's points can be edited inline. */
  pointsByName: Record<string, number>;

  eventForm: any;
  onEventFormChange: (form: any) => void;
  onAddEvent: (e: React.FormEvent) => void;
  onCancelEvent: (id: number) => void;
  onDeleteEvent: (id: number) => void;
  onViewRegistrations: (event: any) => void;

  pending: boolean;
}

/**
 * Admin.
 *
 * Same tokens, type and controls as the public site — only the density
 * changes. Each tab is a two-column working layout: the composer stays put on
 * the inline-start side while the existing records list beside it, so
 * publishing does not mean scrolling past everything already published.
 */
export function AdminPage(props: AdminPageProps) {
  const { t } = useI18n();
  const { tab, onTabChange } = props;

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("admin_panel")} />

      <div
        role="tablist"
        aria-label={t("admin_panel")}
        className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-b border-divider"
      >
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
                "relative min-h-[44px] pb-3 text-small transition-colors duration-quick",
                active ? "font-medium text-ink" : "text-faint hover:text-ink"
              )}
            >
              {t(labelKey)}
              <span
                aria-hidden="true"
                className={cx(
                  "absolute inset-x-0 -bottom-px h-0.5 bg-accent transition-transform duration-settle ease-standard",
                  active ? "scale-x-100" : "scale-x-0"
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`admin-panel-${tab}`}
        aria-labelledby={`admin-tab-${tab}`}
        className="mt-12"
      >
        {tab === "members" && <MembersTab {...props} />}
        {tab === "display" && <DisplayMembersTab {...props} />}
        {tab === "news" && <NewsTab {...props} />}
        {tab === "points" && <PointsTab {...props} />}
        {tab === "events" && <EventsTab {...props} />}
      </div>
    </div>
  );
}

/** Shared two-column frame: sticky composer beside a scrolling record list. */
function Workbench({
  form,
  children,
}: {
  form: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-14 lg:grid-cols-[22rem_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">{form}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function RecordCount({ label, value }: { label: string; value: number }) {
  return (
    <p className="mb-5 text-micro text-faint">
      <span className="nums latin font-medium text-ink">{value}</span> {label}
    </p>
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
    <>
      <RecordCount label={t("members_count")} value={members.length} />
      <ul className="divide-y divide-divider border-y border-divider">
        {members.map((member) => (
          <li key={member.id} className="py-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-body font-medium text-ink">{member.fullName}</p>
                <p className="latin text-small text-faint" dir="ltr">
                  @{member.username}
                </p>
              </div>
              {member.role === "admin" ? (
                <Badge tone="accent">{t("admin_panel")}</Badge>
              ) : (
                <IconButton
                  label={`${t("delete_btn")}: ${member.fullName}`}
                  variant="ghost"
                  onClick={() => onDeleteUser(member.username)}
                  className="text-danger hover:bg-danger/10"
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              )}
            </div>

            {member.badges?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {member.badges.map((badge: string) => (
                  <li key={badge}>
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/[0.09] px-2.5 py-1 text-micro font-medium leading-none text-accent">
                      {badge}
                      <button
                        type="button"
                        onClick={() => onRemoveBadge(member.username, badge)}
                        aria-label={`${t("delete_btn")}: ${badge}`}
                        className="-me-1 rounded-sm p-1 transition-colors duration-quick hover:bg-accent/20"
                      >
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
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

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="max-w-sm flex-1">
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
    </>
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
    <Workbench
      form={
        <form onSubmit={onAddNews} className="space-y-5" noValidate>
          <TextField
            label={t("news_title_input")}
            required
            value={newsForm.title}
            onChange={(e) => set({ title: e.target.value })}
          />
          <TextArea
            label={t("news_content_input")}
            required
            rows={5}
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
            <MediaField
              mediaType={newsForm.mediaType === "video" ? "video" : "image"}
              value={newsForm.mediaUrl}
              onChange={(url) => set({ mediaUrl: url })}
              disabled={pending}
            />
          )}
          <Button type="submit" pending={pending} block>
            <Plus className="h-4 w-4" />
            {t("add_btn")}
          </Button>
        </form>
      }
    >
      {news.length === 0 ? (
        <EmptyState title={t("empty_news")} />
      ) : (
        <>
          <RecordCount label={t("admin_news")} value={news.length} />
          <ul className="divide-y divide-divider border-y border-divider">
            {news.map((item) => (
              <li key={item.id} className="flex items-start gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <p className="nums latin text-micro text-faint">{item.date}</p>
                  <p className="mt-1 truncate text-body text-ink">{item.title}</p>
                </div>
                <IconButton
                  label={`${t("delete_btn")}: ${item.title}`}
                  variant="ghost"
                  onClick={() => onDeleteNews(item.id)}
                  className="text-danger hover:bg-danger/10"
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </li>
            ))}
          </ul>
        </>
      )}
    </Workbench>
  );
}

/**
 * Listed members: people who appear on the site but never sign in.
 *
 * Badge and committee are dropdowns rather than free text on purpose — both are
 * join keys against the structure page, so a typo would not fail loudly, it
 * would silently drop the person off the page.
 *
 * Points are not a column on the row. They live in the shared `points` table,
 * keyed by name, so a listed member ranks in the same single leaderboard as
 * everyone else instead of a parallel one.
 */
function DisplayMembersTab({
  displayMembers,
  displayForm,
  onDisplayFormChange,
  onAddDisplayMember,
  onUpdateDisplayMember,
  onDeleteDisplayMember,
  pointsByName,
  pending,
}: AdminPageProps) {
  const { t, lang } = useI18n();
  const set = (patch: any) => onDisplayFormChange({ ...displayForm, ...patch });

  const committees = CLUB_SECTORS.flatMap((sector) =>
    sector.committees.map((committee) => ({
      sector: sector.title[lang],
      name: committee.name,
    }))
  );

  return (
    <Workbench
      form={
        <form onSubmit={onAddDisplayMember} className="space-y-5" noValidate>
          <p className="text-small text-muted">{t("display_member_lead")}</p>

          <TextField
            label={t("fullname")}
            required
            value={displayForm.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
          />

          <SelectField
            label={t("display_badge")}
            value={displayForm.badge}
            onChange={(e) => set({ badge: e.target.value })}
          >
            <option value="">{t("display_none")}</option>
            {AVAILABLE_BADGES.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </SelectField>

          <SelectField
            label={t("display_committee")}
            value={displayForm.committee}
            onChange={(e) => set({ committee: e.target.value })}
          >
            <option value="">{t("display_none")}</option>
            {committees.map(({ sector, name }) => (
              <option key={name} value={name}>
                {sector} — {name}
              </option>
            ))}
          </SelectField>

          <TextField
            label={t("admin_points")}
            type="number"
            inputMode="numeric"
            dir="ltr"
            value={displayForm.points}
            onChange={(e) => set({ points: e.target.value })}
          />

          <Button type="submit" pending={pending} block>
            <Plus className="h-4 w-4" />
            {t("add_btn")}
          </Button>
        </form>
      }
    >
      {displayMembers.length === 0 ? (
        <EmptyState title={t("no_display_members")} />
      ) : (
        <>
          <RecordCount
            label={t("members_count")}
            value={displayMembers.length}
          />
          <ul className="divide-y divide-divider border-y border-divider">
            {displayMembers.map((member) => (
              <DisplayMemberRow
                key={member.id}
                member={member}
                committees={committees}
                points={pointsByName[member.fullName]}
                pending={pending}
                onSave={onUpdateDisplayMember}
                onDelete={onDeleteDisplayMember}
              />
            ))}
          </ul>
        </>
      )}
    </Workbench>
  );
}

/** One editable row. Kept local so each row owns its own draft state. */
function DisplayMemberRow({
  member,
  committees,
  points,
  pending,
  onSave,
  onDelete,
}: {
  member: any;
  committees: { sector: string; name: string }[];
  points?: number;
  pending: boolean;
  onSave: AdminPageProps["onUpdateDisplayMember"];
  onDelete: (id: string) => void;
}) {
  const { t, formatNumber } = useI18n();
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState({
    fullName: member.fullName,
    badge: member.badges[0] || "",
    committee: member.committees[0] || "",
    points: points === undefined ? "" : String(points),
  });

  return (
    <li className="py-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-body font-medium text-ink">{member.fullName}</p>
          <p className="mt-1 text-micro text-faint">
            {[member.badges[0], member.committees[0]]
              .filter(Boolean)
              .join(" · ") || t("display_none")}
          </p>
        </div>
        {points !== undefined && (
          <span className="nums latin shrink-0 text-body font-medium text-ink">
            {formatNumber(points)}
          </span>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {t("update_profile")}
        </Button>
        <IconButton
          label={`${t("delete_btn")}: ${member.fullName}`}
          variant="ghost"
          onClick={() => onDelete(member.id)}
          className="text-danger hover:bg-danger/10"
        >
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>

      {open && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <TextField
            label={t("fullname")}
            value={draft.fullName}
            onChange={(e) => setDraft({ ...draft, fullName: e.target.value })}
          />
          <TextField
            label={t("admin_points")}
            type="number"
            inputMode="numeric"
            dir="ltr"
            value={draft.points}
            onChange={(e) => setDraft({ ...draft, points: e.target.value })}
          />
          <SelectField
            label={t("display_badge")}
            value={draft.badge}
            onChange={(e) => setDraft({ ...draft, badge: e.target.value })}
          >
            <option value="">{t("display_none")}</option>
            {AVAILABLE_BADGES.map((badge) => (
              <option key={badge} value={badge}>
                {badge}
              </option>
            ))}
          </SelectField>
          <SelectField
            label={t("display_committee")}
            value={draft.committee}
            onChange={(e) => setDraft({ ...draft, committee: e.target.value })}
          >
            <option value="">{t("display_none")}</option>
            {committees.map(({ sector, name }) => (
              <option key={name} value={name}>
                {sector} — {name}
              </option>
            ))}
          </SelectField>
          <div className="sm:col-span-2">
            <Button
              pending={pending}
              onClick={() => {
                onSave(member.id, draft);
                setOpen(false);
              }}
            >
              {t("save_btn")}
            </Button>
          </div>
        </div>
      )}
    </li>
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
    <Workbench
      form={
        <form onSubmit={onAddPoints} className="space-y-5" noValidate>
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
          <Button type="submit" pending={pending} block>
            <Plus className="h-4 w-4" />
            {t("add_btn")}
          </Button>
        </form>
      }
    >
      {points.length === 0 ? (
        <EmptyState title={t("points_msg")} />
      ) : (
        <>
          <RecordCount label={t("admin_points")} value={points.length} />
          <ul className="divide-y divide-divider border-y border-divider">
            {points.map((row) => (
              <li key={row.id} className="flex items-center gap-4 py-3.5">
                <span className="min-w-0 flex-1 truncate text-body text-ink">
                  {row.name}
                </span>
                <span className="nums latin shrink-0 text-body font-medium text-ink">
                  {formatNumber(row.points)}
                </span>
                <IconButton
                  label={`${t("delete_btn")}: ${row.name}`}
                  variant="ghost"
                  onClick={() => onDeletePoints(row.id)}
                  className="text-danger hover:bg-danger/10"
                >
                  <Trash2 className="h-4 w-4" />
                </IconButton>
              </li>
            ))}
          </ul>
        </>
      )}
    </Workbench>
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
    <Workbench
      form={
        <form onSubmit={onAddEvent} className="space-y-5" noValidate>
          <TextField
            label={t("news_title_input")}
            required
            value={eventForm.title}
            onChange={(e) => set({ title: e.target.value })}
          />
          <TextArea
            label={t("news_content_input")}
            rows={4}
            value={eventForm.desc}
            onChange={(e) => set({ desc: e.target.value })}
          />
          {/* This is the event's details link, not media — it renders as the
              "event details" anchor on the card. It was previously labelled
              with the news media-URL string, which described the wrong thing.
              `events` has no media column at all. */}
          <TextField
            label={t("event_link_label")}
            type="url"
            dir="ltr"
            placeholder="https://…"
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
          <Button type="submit" pending={pending} block>
            <Plus className="h-4 w-4" />
            {t("add_btn")}
          </Button>
        </form>
      }
    >
      {events.length === 0 ? (
        <EmptyState title={t("empty_events")} />
      ) : (
        <>
          <RecordCount label={t("admin_events")} value={events.length} />
          <ul className="divide-y divide-divider border-y border-divider">
            {events.map((ev) => (
              <li key={ev.id} className="py-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-body font-medium text-ink">{ev.title}</p>
                    <p className="nums mt-1 text-small text-faint">
                      {formatDateRange(ev.startDate, ev.endDate)}
                    </p>
                  </div>
                  {ev.isCanceled && (
                    <Badge tone="danger">{t("status_canceled")}</Badge>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onViewRegistrations(ev)}
                  >
                    <Users className="h-4 w-4" />
                    {t("view_registered")}
                    <span className="nums latin ms-1 text-faint">
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
        </>
      )}
    </Workbench>
  );
}
