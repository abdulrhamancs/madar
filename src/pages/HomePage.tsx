import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_SECTORS } from "../lib/clubData";
import { Button, TextLink } from "../ui/Button";
import { Container, Eyebrow, Section, SectionHeader } from "../ui/Section";
import { OrbitField, OrbitSystem } from "../ui/Orbit";
import { MadarMark } from "../ui/MadarMark";
import { Enter, Reveal, RevealGroup } from "../ui/Reveal";
import { Skeleton } from "../ui/States";
import {
  FeaturedEvent,
  NewsTeaser,
  StatBlock,
  type EventItem,
  type EventStatus,
  type NewsItem,
} from "../ui/cards";
import type { PageId } from "../components/Navbar";

/**
 * Homepage.
 *
 * Composed as a sequence of full-bleed bands rather than one centred column:
 * hero → what is Madar → sectors → next event → community numbers → news →
 * join. Each band picks its own surface, so the page has rhythm without
 * needing a card around every block.
 *
 * Sections that depend on data render only when that data exists — an empty
 * club does not get a row of empty placeholders.
 */
export function HomePage({
  loading,
  news,
  events,
  memberCount,
  onNavigate,
  getEventStatus,
}: {
  loading: boolean;
  news: NewsItem[];
  events: EventItem[];
  memberCount: number;
  onNavigate: (page: PageId) => void;
  getEventStatus: (e: EventItem) => EventStatus;
}) {
  const { t, lang, formatNumber } = useI18n();
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;

  const nextEvent = events.find((e) => {
    const status = getEventStatus(e);
    return status === "current" || status === "upcoming";
  });
  const [leadStory, ...restStories] = news.slice(0, 4);

  const committeeCount = CLUB_SECTORS.reduce(
    (total, sector) => total + sector.committees.length,
    0
  );

  return (
    <>
      {/* ================= HERO ================= */}
      {/*
        Composition notes: the orbit is anchored to the inline-end edge and
        deliberately oversized so it bleeds past the shell — that asymmetry is
        what keeps a short Arabic masthead from floating in an empty field.
        The headline block, the figure, and the grounding strip divide the
        viewport into three deliberate zones rather than one centred column
        surrounded by margin.
      */}
      <section className="relative overflow-hidden">
        {/* The figure sits behind the text layer on the outer side. `end-*` is
            logical, so it moves to the left in Arabic and to the right in
            English without a second rule. */}
        {/* Small screens get the motif too, but pushed into the corner and
            held well back so it never competes with Arabic text for
            legibility — the desktop system is far too large to reuse here. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 start-[-45%] h-[28rem] w-[28rem] opacity-45 lg:hidden"
        >
          <OrbitSystem className="h-full w-full" parallax={false} />
        </div>

        {/* Centred on the whole hero, with the masthead sitting inside the
            field rather than beside it.

            Two earlier arrangements were wrong in opposite ways. It first hung
            51px off the outer edge — 8% of its width, which is the worst
            amount: enough to slice a flat chord off the outer ring, not enough
            to read as a shape deliberately continuing past the frame. Pulling
            it inside fixed that but left it parked in the outer third with the
            middle of the hero empty, so it read as an object beside the text
            instead of the ground the text stands on.

            Centring also removes the whole class of problem the previous
            version had to solve with breakpoint and direction steps: there is
            no near edge to clear and no text column to avoid, so the same
            expression holds in Arabic and English at every width.

            Top and bottom are trimmed by the hero band, deeply and on purpose.
            That reads differently from the old side clip: the band edge is a
            real line in the layout, with the navbar above it and the next
            section below, so the shape reads as passing behind them. The
            viewport edge is not such a line, which is why the same trim there
            looked like damage. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-80 lg:flex"
        >
          <Enter
            delay={520}
            className="[--orbit-size:clamp(30rem,min(84vw,160vh),80rem)]"
          >
            <OrbitSystem className="h-[var(--orbit-size)] w-[var(--orbit-size)]" />
          </Enter>
        </div>

        <Container wide className="relative">
          {/* `main` already clears the fixed bar, so the hero only adds the
              breathing room above the eyebrow. The min-height makes the
              masthead a deliberate full-viewport composition on desktop
              instead of a band floating in vertical margin. */}
          <div className="flex min-h-[34rem] flex-col justify-center pt-10 pb-12 lg:min-h-[calc(100svh-5.5rem)] lg:pt-6 lg:pb-10">
            <div className="flex-1 lg:flex lg:items-center">
              <div className="w-full lg:max-w-[56%]">
                <Enter delay={60}>
                  <Eyebrow>{t("hero_kicker")}</Eyebrow>
                </Enter>

                <Enter delay={170} as="h1" className="mt-7 text-hero text-ink">
                  {t("madar_club")}
                </Enter>

                {/* The motto carries deck weight rather than caption weight —
                    it is the club's own line and the reason the masthead
                    reads as complete at two tiers. */}
                <Enter delay={300}>
                  <p className="mt-6 max-w-[22ch] text-h2 font-normal leading-snug text-muted">
                    {t("coming_soon_sub")}
                  </p>
                </Enter>

                <Enter delay={410}>
                  <p className="mt-7 max-w-measure text-body text-faint">
                    {t("hero_lead")}
                  </p>
                </Enter>

                {/* The hero used to lead with "join us". Members are listed by
                    the admin rather than signing up, so the primary action is
                    now to read the club rather than to enrol in it. */}
                <Enter delay={500}>
                  <div className="mt-10 flex flex-wrap items-center gap-7">
                    <Button
                      size="lg"
                      onClick={() => onNavigate("about")}
                      className="group/cta"
                    >
                      {t("read_about")}
                      {/* The glyph advances the way it points: `Arrow` is
                          already direction-aware, so the nudge is too. */}
                      <Arrow
                        className="h-4 w-4 transition-transform duration-settle ease-entrance ltr:group-hover/cta:translate-x-1 rtl:group-hover/cta:-translate-x-1"
                        aria-hidden="true"
                      />
                    </Button>
                    <TextLink onClick={() => onNavigate("events")}>
                      {t("explore_events")}
                    </TextLink>
                  </div>
                </Enter>
              </div>
            </div>

            {/* Grounding strip: gives the lower third a job. The sector names
                are real club structure, not filler, and they preview the
                section two bands down. */}
            <Enter delay={640}>
              <div className="mt-14 flex flex-col gap-6 border-t border-divider pt-7 sm:flex-row sm:items-center sm:justify-between">
                <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
                  <li className="text-micro uppercase tracking-[0.14em] text-faint">
                    {t("hero_sectors_label")}
                  </li>
                  {CLUB_SECTORS.map((sector) => (
                    <li key={sector.id}>
                      <button
                        type="button"
                        onClick={() => onNavigate("structure")}
                        className="link-underline text-small text-muted transition-colors duration-quick hover:text-accent"
                      >
                        {sector.title[lang]}
                      </button>
                    </li>
                  ))}
                </ul>

                <span className="flex items-center gap-3 text-micro uppercase tracking-[0.14em] text-faint">
                  {t("scroll_hint")}
                  <span aria-hidden="true" className="scroll-cue" />
                </span>
              </div>
            </Enter>
          </div>
        </Container>
      </section>

      {/* ================= WHAT IS MADAR ================= */}
      <Section tone="warm">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal variant="up">
              <Eyebrow className="mb-6">{t("about")}</Eyebrow>
            </Reveal>
            {/* The question wipes open along the reading axis — the one place
                the headline itself performs, rather than just arriving. */}
            <Reveal variant="wipe" delay={120}>
              <h2 className="text-h1 text-ink">{t("what_is_madar")}</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal variant="rise" delay={80}>
              <p className="text-lead text-ink">{t("about_p1")}</p>
            </Reveal>
            <Reveal variant="rise" delay={180}>
              <p className="mt-6 max-w-measure text-body text-muted">
                {t("about_p2")}
              </p>
            </Reveal>
            <Reveal variant="up" delay={280}>
              <div className="mt-9">
                <TextLink onClick={() => onNavigate("about")}>
                  {t("read_about")}
                  <Arrow className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ================= SECTORS ================= */}
      <Section>
        <SectionHeader
          eyebrow={t("structure")}
          title={t("sectors")}
          lead={t("sectors_lead")}
          align="split"
          action={
            <TextLink onClick={() => onNavigate("structure")}>
              {t("view_all")}
              <Arrow className="h-4 w-4" aria-hidden="true" />
            </TextLink>
          }
        />

        <RevealGroup
          variant="up"
          step={110}
          as="ul"
          className="grid gap-px overflow-hidden rounded-card border border-divider bg-divider md:grid-cols-3"
        >
          {CLUB_SECTORS.map((sector) => {
            const Icon = sector.icon;
            return (
              <li
                key={sector.id}
                className="group relative overflow-hidden bg-surface p-8 transition-colors duration-settle hover:bg-raised/45"
              >
                {/* A quarter-arc of the orbit swings into the corner on
                    hover — the motif answering the pointer rather than a
                    generic tint change. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 end-[-4rem] h-40 w-40 rounded-full border border-accent/0 transition-all duration-[700ms] ease-entrance group-hover:border-accent/25 group-hover:-translate-y-1"
                />
                <Icon
                  className="relative h-6 w-6 text-accent transition-transform duration-settle ease-entrance group-hover:-translate-y-1"
                  aria-hidden="true"
                />
                <h3 className="relative mt-6 text-h3 text-ink">{sector.title[lang]}</h3>
                <ul className="relative mt-5 space-y-2.5">
                  {sector.committees.map((committee) => (
                    <li
                      key={committee.name}
                      className="flex items-start gap-2.5 text-small text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-accent/60 transition-transform duration-settle group-hover:scale-150"
                      />
                      {committee.name}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </RevealGroup>
      </Section>

      {/* ================= NEXT EVENT ================= */}
      {loading ? (
        <Section tone="warm">
          <Skeleton className="h-7 w-44" />
          <Skeleton className="mt-8 h-56 w-full" />
        </Section>
      ) : (
        nextEvent && (
          <Section tone="surface">
            <SectionHeader
              eyebrow={t("events")}
              title={t("featured_event")}
              align="split"
              action={
                <TextLink onClick={() => onNavigate("events")}>
                  {t("view_all")}
                  <Arrow className="h-4 w-4" aria-hidden="true" />
                </TextLink>
              }
            />
            <Reveal variant="settle">
              <FeaturedEvent
                event={nextEvent}
                status={getEventStatus(nextEvent)}
              />
            </Reveal>
          </Section>
        )
      )}

      {/* ================= IMPACT =================
        The single dark block on the page, and it sits in the middle rather
        than at the end. Placing it here gives the light bands something to
        resolve against; stacking it against the espresso footer instead —
        which is where it used to be — read as one large dark mass and pushed
        the whole page toward a fashion-brand register rather than a warm
        editorial one.
      */}
      {/* `relative`/`overflow-hidden` come from `.espresso-band` now. */}
      <Section tone="dark" wide>
        <OrbitField onDark className="end-[-12%] top-[-40%] h-[36rem] w-[36rem] opacity-40" />
        <div className="relative">
          <SectionHeader
            eyebrow={t("madar_club")}
            title={t("impact_title")}
            variant="wipe"
            onDark
          />
          <RevealGroup
            variant="settle"
            step={110}
            className="grid grid-cols-2 divide-on-espresso/15 border-y border-on-espresso/15 sm:grid-cols-4 sm:divide-x sm:rtl:divide-x-reverse"
          >
            <StatBlock
              value={formatNumber(memberCount)}
              label={t("members_count")}
              loading={loading}
              onDark
            />
            <StatBlock
              value={formatNumber(events.length)}
              label={t("events")}
              loading={loading}
              onDark
            />
            <StatBlock
              value={formatNumber(committeeCount)}
              label={t("committees_count")}
              onDark
            />
            <StatBlock
              value={formatNumber(CLUB_SECTORS.length)}
              label={t("sectors_count")}
              onDark
            />
          </RevealGroup>
        </div>
      </Section>

      {/* ================= NEWS ================= */}
      {!loading && leadStory && (
        <Section>
          <SectionHeader
            eyebrow={t("news")}
            title={t("latest_news")}
            align="split"
            action={
              <TextLink onClick={() => onNavigate("news")}>
                {t("view_all")}
                <Arrow className="h-4 w-4" aria-hidden="true" />
              </TextLink>
            }
          />

          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="rise" className="lg:col-span-7">
              <NewsTeaser
                item={leadStory}
                variant="lead"
                onOpen={() => onNavigate("news")}
              />
            </Reveal>

            {restStories.length > 0 && (
              <RevealGroup
                variant="up"
                step={90}
                delay={120}
                as="ul"
                className="divide-y divide-divider lg:col-span-5"
              >
                {restStories.map((item) => (
                  <li key={item.id} className="py-7 first:pt-0 last:pb-0">
                    <NewsTeaser item={item} onOpen={() => onNavigate("news")} />
                  </li>
                ))}
              </RevealGroup>
            )}
          </div>
        </Section>
      )}

      {/* ================= JOIN =================
        Warm parchment rather than espresso: the closing invitation reads as
        an open door, and it keeps the page from ending on two dark blocks
        stacked against the footer. The brown CTA carries the emphasis here
        instead of the surface doing it.
      */}
      {/* Kept as the page's closing band, but it no longer invites anyone to
          enrol — the copy and both actions now point at what there is to read.
          Removing the band outright would have ended the page on the figures
          block and the footer, two dark masses stacked together, which is the
          arrangement this section exists to break up. */}
      <Section tone="warm" className="relative overflow-hidden">
        <OrbitField className="start-[-18%] top-[-34%] h-[34rem] w-[34rem] opacity-45" />
        <Reveal
          variant="rise"
          className="relative mx-auto max-w-2xl text-center"
        >
          <h2 className="text-display text-ink">{t("join_cta_title")}</h2>
          <p className="mx-auto mt-6 max-w-measure text-lead text-muted">
            {t("join_cta_body")}
          </p>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-5">
            <Button
              size="lg"
              onClick={() => onNavigate("events")}
              className="group/join"
            >
              {t("explore_events")}
              <Arrow
                className="h-4 w-4 transition-transform duration-settle ease-entrance ltr:group-hover/join:translate-x-1 rtl:group-hover/join:-translate-x-1"
                aria-hidden="true"
              />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate("structure")}
            >
              {t("structure")}
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* ================= FOUNDERS ================= */}
      <Section>
        <Reveal variant="fade" className="flex flex-col items-start gap-8 border-t border-divider pt-14 sm:flex-row sm:items-center sm:gap-12">
          <MadarMark className="h-16 w-16 shrink-0 opacity-85" />
          <p className="max-w-measure text-body leading-loose text-muted">
            <Name>{t("about_footer_p1")}</Name>
            {t("about_footer_p2")}
            <Name>{t("about_footer_p3")}</Name>
            {t("about_footer_p4")}
            <Name>{t("about_footer_p5")}</Name>
            {t("about_footer_p6")}
            <Name>{t("about_footer_p7")}</Name>
            {t("about_footer_p8")}
          </p>
        </Reveal>
      </Section>
    </>
  );
}

function Name({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-ink">{children}</span>;
}
