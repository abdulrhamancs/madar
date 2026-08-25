import React from "react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_BOARD, CLUB_SECTORS } from "../lib/clubData";
import { PageHeader, SubHeading } from "../ui/Section";
import { Skeleton } from "../ui/States";
import { Reveal, RevealGroup } from "../ui/Reveal";
import { MemberCard } from "../ui/cards";
import { Tag } from "../ui/Badge";

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
 * The board is a row of portraits; beneath it each sector lists its committees
 * with their rosters already open. The committees used to be an index that had
 * to be clicked open, which meant the club's actual membership — the thing the
 * page exists to show — was hidden behind nine separate interactions.
 *
 * Rosters use the compact card so the board stays the heaviest element here.
 * Seats and committees with nobody in them are drawn as an outline rather than
 * hidden — a vacancy is information.
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
                  {/* `faint/80` measured 3.4:1 light and 3.9:1 dark at 13px,
                      under the 4.5:1 AA floor for normal text. */}
                  <span className="mt-1 block text-micro text-faint">
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

                {/* Committees stagger in after their sector; the roster inside
                    each staggers again. `RevealGroup` registers once per group
                    rather than once per child, so the whole section costs a
                    couple of dozen observations, not one per person. */}
                <RevealGroup
                  variant="up"
                  step={70}
                  as="ul"
                  className="divide-y divide-divider"
                >
                  {sector.committees.map((committee) => {
                    const roster = loading
                      ? []
                      : members.filter((m) =>
                          (m.committees || []).includes(committee.name)
                        );
                    const CommitteeIcon = committee.icon;

                    return (
                      <li key={committee.name} className="py-7">
                        {/* Static now, not a disclosure — the roster below is
                            always rendered, so there is nothing to expand.

                            The name deliberately does not take `flex-1`. It did
                            while this was a disclosure, because the row was one
                            wide target and the count sat beside the chevron at
                            the far edge. With the chevron gone that stretch left
                            the count marooned about a thousand pixels from the
                            word it counts. Sized to its text, the two read as
                            one thing. */}
                        <div className="flex items-center gap-3">
                          <CommitteeIcon
                            className="h-5 w-5 shrink-0 text-faint"
                            aria-hidden="true"
                          />
                          <h4 className="min-w-0 truncate text-body text-ink">
                            {committee.name}
                          </h4>
                          {/* An empty committee says so here rather than in a
                              full-width panel below. It used to do both — a "0"
                              here and a box saying شاغر underneath — which
                              stated the same fact twice and gave the emptiest
                              rows the most room on the page. */}
                          <Tag className="nums latin shrink-0">
                            {loading
                              ? "—"
                              : roster.length > 0
                              ? roster.length
                              : t("vacant")}
                          </Tag>
                        </div>

                        {roster.length > 0 && (
                          <div className="mt-5">
                            <RevealGroup
                              variant="up"
                              step={45}
                              as="ul"
                              // `grid-cols-1` is not decorative. Without it the
                              // single-column fallback is an auto track sized to
                              // max-content, so one long unbroken name widens the
                              // column past the viewport and the page scrolls
                              // sideways. The explicit class emits
                              // `minmax(0, 1fr)`, which lets the name truncate
                              // instead of pushing the layout.
                              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                            >
                              {roster.map((member) => (
                                <li key={member.id}>
                                  <MemberCard
                                    compact
                                    name={member.fullName}
                                    username={member.username}
                                    onClick={() => onViewMember(member)}
                                  />
                                </li>
                              ))}
                            </RevealGroup>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </RevealGroup>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
