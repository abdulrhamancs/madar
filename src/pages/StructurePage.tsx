import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { cx } from "../lib/cx";
import { CLUB_BOARD, CLUB_SECTORS } from "../lib/clubData";
import { PageHeader, SubHeading } from "../ui/Section";
import { Skeleton } from "../ui/States";
import { Reveal, RevealGroup } from "../ui/Reveal";
import { MemberCard } from "../ui/cards";

interface Member {
  id: string;
  fullName: string;
  username: string;
  committees: string[];
  badges: string[];
}

/**
 * The club as people rather than an org chart.
 *
 * The board is a row of portraits; the committees are an index that opens to
 * reveal its roster. Seats with nobody in them are drawn as an outline rather
 * than hidden — a vacancy is information.
 */
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
      <PageHeader
        eyebrow={t("madar_club")}
        title={t("structure")}
        description={t("sectors_lead")}
      />

      {/* ---- Board ---- */}
      <section className="mt-16">
        <SubHeading title={t("board_directors")} />

        <RevealGroup
          variant="up"
          step={70}
          as="ul"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CLUB_BOARD.map((seat) => {
            const holder = loading ? undefined : holderOf(seat.badge);
            const Icon = seat.icon;

            if (loading) {
              return (
                <li key={seat.badge} className="rounded-card border border-divider p-6">
                  <Skeleton className="mx-auto h-16 w-16 rounded-full" />
                  <Skeleton className="mx-auto mt-4 h-5 w-32" />
                  <Skeleton className="mx-auto mt-2 h-3.5 w-20" />
                </li>
              );
            }

            if (!holder) {
              return (
                <li
                  key={seat.badge}
                  className="flex flex-col items-center rounded-card border border-dashed border-divider p-6 text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-divider text-faint">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-4 block text-h4 text-faint">{seat.badge}</span>
                  <span className="mt-1 block text-micro text-faint/80">
                    {t("vacant")}
                  </span>
                </li>
              );
            }

            return (
              <li key={seat.badge}>
                <MemberCard
                  name={holder.fullName}
                  username={holder.username}
                  roles={[seat.badge]}
                  onClick={() => onViewMember(holder)}
                />
              </li>
            );
          })}
        </RevealGroup>
      </section>

      {/* ---- Sectors & committees ---- */}
      <section className="mt-24">
        <SubHeading title={t("sectors")} />

        <div className="space-y-16">
          {CLUB_SECTORS.map((sector) => {
            const SectorIcon = sector.icon;
            return (
              <Reveal variant="up" key={sector.id}>
                <h3 className="flex items-center gap-3 border-b border-divider pb-5 text-h3 text-ink">
                  <SectorIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  {sector.title[lang]}
                </h3>

                <ul className="divide-y divide-divider">
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
                          className="group -mx-4 flex w-[calc(100%+2rem)] items-center gap-4 px-4 py-5 text-start transition-colors duration-settle hover:bg-raised/40"
                        >
                          <CommitteeIcon
                            className="h-5 w-5 shrink-0 text-faint transition-colors duration-quick group-hover:text-accent"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1 text-body text-ink">
                            {committee.name}
                          </span>
                          <span className="nums latin shrink-0 text-small text-faint">
                            {loading ? "—" : roster.length}
                          </span>
                          <ChevronDown
                            className={cx(
                              "h-4 w-4 shrink-0 text-faint transition-transform duration-settle ease-standard",
                              open && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {open && (
                          <div id={panelId} className="pb-8 pt-2">
                            {roster.length === 0 ? (
                              <p className="text-small text-faint">
                                {t("no_members_yet")}
                              </p>
                            ) : (
                              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {roster.map((member, index) => (
                                  <li
                                    key={member.id}
                                    className="enter"
                                    style={{
                                      ["--enter-delay" as string]: `${index * 50}ms`,
                                    }}
                                  >
                                    <MemberCard
                                      name={member.fullName}
                                      username={member.username}
                                      onClick={() => onViewMember(member)}
                                    />
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
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
