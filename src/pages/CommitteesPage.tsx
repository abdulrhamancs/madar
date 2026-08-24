import React from "react";
import { Check } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { cx } from "../lib/cx";
import { CLUB_SECTORS } from "../lib/clubData";
import { Button } from "../ui/Button";
import { Container, Eyebrow } from "../ui/Section";
import { Enter } from "../ui/Reveal";
import { OrbitField } from "../ui/Orbit";

const MAX = 3;

/**
 * Onboarding step: pick up to three committees.
 *
 * A standalone screen rather than a page inside the shell — there is no
 * navigation here on purpose, since the only way forward is to choose or
 * skip. The counter is `aria-live` so the limit is announced, not just shown.
 */
export function CommitteesPage({
  selected,
  onToggle,
  onSave,
  onSkip,
  pending,
}: {
  selected: string[];
  onToggle: (name: string) => void;
  onSave: () => void;
  onSkip: () => void;
  pending: boolean;
}) {
  const { t, lang } = useI18n();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-canvas pb-40 pt-16 md:pt-24">
      <OrbitField className="end-[-24%] top-[-10%] h-[40rem] w-[40rem] opacity-50" />

      <Container className="relative">
        <header className="max-w-2xl">
          <Enter delay={40}>
            <Eyebrow>{t("madar_club")}</Eyebrow>
          </Enter>
          <Enter delay={130}>
            <h1 className="mt-7 text-display text-ink">{t("choose_committees")}</h1>
          </Enter>
          <Enter delay={220}>
            <p className="mt-5 text-lead text-muted">{t("choose_committees_sub")}</p>
          </Enter>
          <Enter delay={300}>
            <p
              className="nums latin mt-7 text-small font-medium text-accent"
              aria-live="polite"
            >
              {selected.length} / {MAX}
            </p>
          </Enter>
        </header>

        <div className="mt-16 space-y-14">
          {CLUB_SECTORS.map((sector, sectorIndex) => {
            const SectorIcon = sector.icon;
            return (
              <Enter
                key={sector.id}
                as="fieldset"
                delay={380 + sectorIndex * 90}
              >
                <legend className="flex items-center gap-3 border-b border-divider pb-4 text-h3 text-ink">
                  <SectorIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                  {sector.title[lang]}
                </legend>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {sector.committees.map((committee) => {
                    const isOn = selected.includes(committee.name);
                    const full = selected.length >= MAX && !isOn;
                    const Icon = committee.icon;

                    return (
                      <label
                        key={committee.name}
                        className={cx(
                          "group flex min-h-[5.5rem] items-start gap-3.5 rounded-card border p-5",
                          "transition-[border-color,background-color,transform] duration-settle ease-standard",
                          isOn
                            ? "border-accent bg-accent/[0.06]"
                            : full
                            ? "cursor-not-allowed border-divider opacity-45"
                            : "cursor-pointer border-divider bg-surface hover:-translate-y-0.5 hover:border-accent/45"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={isOn}
                          disabled={full}
                          onChange={() => onToggle(committee.name)}
                          className="sr-only"
                        />
                        <Icon
                          className={cx(
                            "mt-0.5 h-5 w-5 shrink-0 transition-colors duration-quick",
                            isOn ? "text-accent" : "text-faint"
                          )}
                          aria-hidden="true"
                        />
                        <span className="min-w-0 flex-1 text-small text-ink">
                          {committee.name}
                        </span>
                        <Check
                          className={cx(
                            "h-5 w-5 shrink-0 text-accent transition-opacity duration-settle",
                            isOn ? "opacity-100" : "opacity-0"
                          )}
                          aria-hidden="true"
                        />
                      </label>
                    );
                  })}
                </div>
              </Enter>
            );
          })}
        </div>
      </Container>

      {/* Sticky action bar so the primary action is always reachable */}
      <div className="fixed inset-x-0 bottom-0 z-sticky border-t border-divider bg-canvas/90 backdrop-blur-md">
        <Container>
          <div className="flex flex-col-reverse gap-3 py-4 sm:flex-row sm:items-center sm:justify-end">
            <Button variant="ghost" onClick={onSkip} disabled={pending}>
              {t("skip")}
            </Button>
            <Button onClick={onSave} pending={pending} size="lg">
              {t("save_committees")}
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
