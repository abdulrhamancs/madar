import React, { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_BOARD, CLUB_SECTORS } from "../lib/clubData";
import { PageHeader, SectionHeading } from "../ui/PageHeader";
import { Skeleton } from "../ui/States";
import { cx } from "../lib/cx";

interface Member {
  id: string;
  fullName: string;
  username: string;
  committees: string[];
  badges: string[];
}

export function StructurePage({
  members,
  loading,
  onViewMember,
}: {
  members: Member[];
  loading: boolean;
  onViewMember: (member: Member) => void;
}) {
  const { t, lang } = useI18n();
  const [openCommittee, setOpenCommittee] = useState<string | null>(null);

  const holderOf = (badge: string) =>
    members.find((m) => (m.badges || []).includes(badge));

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("structure")} />

      {/* ---- Board ---- */}
      <section className="mb-14">
        <SectionHeading title={t("board_directors")} />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CLUB_BOARD.map((seat) => {
            const holder = loading ? undefined : holderOf(seat.badge);
            const Icon = seat.icon;
            return (
              <li key={seat.badge}>
                <button
                  type="button"
                  disabled={!holder}
                  onClick={() => holder && onViewMember(holder)}
                  className={cx(
                    "flex w-full items-center gap-3 rounded-lg border p-4 text-start transition-colors duration-quick",
                    holder
                      ? "border-divider bg-surface hover:border-control"
                      : "border-dashed border-divider bg-transparent"
                  )}
                >
                  <span
                    className={cx(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                      holder
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-divider text-faint"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-small font-medium text-ink">
                      {seat.badge}
                    </span>
                    {loading ? (
                      <Skeleton className="mt-1 h-3.5 w-20" />
                    ) : (
                      <span
                        className={cx(
                          "block truncate text-micro",
                          holder ? "text-muted" : "text-faint"
                        )}
                      >
                        {holder ? holder.fullName : t("vacant")}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ---- Sectors & committees ---- */}
      <section>
        <SectionHeading title={t("sectors")} />
        <div className="space-y-10">
          {CLUB_SECTORS.map((sector) => {
            const SectorIcon = sector.icon;
            return (
              <div key={sector.id}>
                <h3 className="mb-3 flex items-center gap-2.5 text-h3 text-ink">
                  <SectorIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  {sector.title[lang]}
                </h3>
                <ul className="divide-y divide-divider rounded-lg border border-divider bg-surface">
                  {sector.committees.map((committee) => {
                    const open = openCommittee === committee.name;
                    const roster = loading
                      ? []
                      : members.filter((m) =>
                          (m.committees || []).includes(committee.name)
                        );
                    const CommitteeIcon = committee.icon;
                    const panelId = `panel-${sector.id}-${committee.name}`;

                    return (
                      <li key={committee.name}>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenCommittee(open ? null : committee.name)
                          }
                          aria-expanded={open}
                          aria-controls={panelId}
                          className="flex w-full items-center gap-3 p-4 text-start transition-colors duration-quick hover:bg-ink/[0.02]"
                        >
                          <CommitteeIcon
                            className="h-5 w-5 shrink-0 text-muted"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1 text-small font-medium text-ink">
                            {committee.name}
                          </span>
                          <span className="nums shrink-0 text-micro text-muted">
                            {loading ? "—" : roster.length}
                          </span>
                          <ChevronDown
                            className={cx(
                              "h-4 w-4 shrink-0 text-muted transition-transform duration-settle",
                              open && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {open && (
                          <div id={panelId} className="border-t border-divider px-4 py-3">
                            {roster.length === 0 ? (
                              <p className="py-2 text-small text-muted">
                                {t("no_members_yet")}
                              </p>
                            ) : (
                              <ul className="flex flex-wrap gap-2">
                                {roster.map((member) => (
                                  <li key={member.id}>
                                    <button
                                      type="button"
                                      onClick={() => onViewMember(member)}
                                      className="inline-flex items-center gap-2 rounded-sm border border-divider bg-raised px-2.5 py-1.5 text-micro text-ink transition-colors duration-quick hover:border-control"
                                    >
                                      <User
                                        className="h-3.5 w-3.5 text-accent"
                                        aria-hidden="true"
                                      />
                                      {member.fullName}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
