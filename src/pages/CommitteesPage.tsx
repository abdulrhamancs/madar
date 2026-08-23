import React from "react";
import { Check } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_SECTORS } from "../lib/clubData";
import { Button } from "../ui/Button";
import { cx } from "../lib/cx";

const MAX = 3;

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
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <header className="mb-10">
        <h1 className="font-display text-h1 text-ink">
          {t("choose_committees")}
        </h1>
        <p className="mt-2 text-body text-muted">{t("choose_committees_sub")}</p>
        <p className="nums mt-3 text-small font-medium text-accent" aria-live="polite">
          {selected.length} / {MAX}
        </p>
      </header>

      <div className="space-y-8">
        {CLUB_SECTORS.map((sector) => {
          const SectorIcon = sector.icon;
          return (
            <fieldset key={sector.id}>
              <legend className="mb-3 flex items-center gap-2.5 text-h3 text-ink">
                <SectorIcon className="h-5 w-5 text-accent" aria-hidden="true" />
                {sector.title[lang]}
              </legend>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {sector.committees.map((committee) => {
                  const isOn = selected.includes(committee.name);
                  const full = selected.length >= MAX && !isOn;
                  const Icon = committee.icon;
                  return (
                    <label
                      key={committee.name}
                      className={cx(
                        "flex min-h-[56px] cursor-pointer items-center gap-3 rounded-lg border p-3.5 transition-colors duration-quick",
                        isOn
                          ? "border-accent bg-accent/[0.07]"
                          : full
                          ? "cursor-not-allowed border-divider opacity-50"
                          : "border-divider bg-surface hover:border-control"
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
                          "h-5 w-5 shrink-0",
                          isOn ? "text-accent" : "text-muted"
                        )}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 text-small font-medium text-ink">
                        {committee.name}
                      </span>
                      {isOn && (
                        <Check
                          className="h-5 w-5 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                      )}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          );
        })}
      </div>

      {/* Sticky action bar so the primary action is always reachable */}
      <div className="sticky bottom-0 -mx-5 mt-10 flex flex-col-reverse gap-2 border-t border-divider bg-canvas/95 p-5 backdrop-blur sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onSkip} disabled={pending}>
          {t("skip")}
        </Button>
        <Button onClick={onSave} pending={pending} size="lg">
          {t("save_committees")}
        </Button>
      </div>
    </div>
  );
}
