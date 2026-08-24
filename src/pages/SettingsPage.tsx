import React from "react";
import { Sun, Moon, Check } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { cx } from "../lib/cx";
import type { Lang } from "../lib/i18n";
import { PageHeader, SubHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export function SettingsPage({
  isDark,
  onThemeChange,
  lang,
  onLangChange,
}: {
  isDark: boolean;
  onThemeChange: (dark: boolean) => void;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}) {
  const { t } = useI18n();

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("settings")} />

      <Reveal variant="up" as="section" className="mt-16">
        <SubHeading title={t("theme_title")} />
        <div
          role="radiogroup"
          aria-label={t("theme_title")}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Choice
            selected={!isDark}
            onSelect={() => onThemeChange(false)}
            icon={<Sun className="h-5 w-5" />}
            label={t("light_mode")}
            swatch={["#F3EEE5", "#E7D9C7", "#6B4B36"]}
          />
          <Choice
            selected={isDark}
            onSelect={() => onThemeChange(true)}
            icon={<Moon className="h-5 w-5" />}
            label={t("dark_mode")}
            swatch={["#1A1512", "#2D251F", "#D0B08F"]}
          />
        </div>
      </Reveal>

      <Reveal variant="up" delay={100} as="section" className="mt-16">
        <SubHeading title={t("language")} />
        <div
          role="radiogroup"
          aria-label={t("language")}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Choice
            selected={lang === "ar"}
            onSelect={() => onLangChange("ar")}
            label="العربية"
            hint="Arabic · RTL"
          />
          <Choice
            selected={lang === "en"}
            onSelect={() => onLangChange("en")}
            label="English"
            hint="الإنجليزية · LTR"
          />
        </div>
      </Reveal>
    </div>
  );
}

function Choice({
  selected,
  onSelect,
  icon,
  label,
  hint,
  swatch,
}: {
  selected: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
  label: string;
  hint?: string;
  /** Three literal palette colours, so the theme is previewed not described. */
  swatch?: string[];
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cx(
        "flex min-h-[5.5rem] items-center gap-4 rounded-card border p-5 text-start",
        "transition-[border-color,background-color,transform] duration-settle ease-standard",
        selected
          ? "border-accent bg-accent/[0.06]"
          : "border-divider bg-surface hover:-translate-y-0.5 hover:border-accent/45"
      )}
    >
      {icon && (
        <span className={cx("shrink-0", selected ? "text-accent" : "text-faint")}>
          {icon}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block text-body font-medium text-ink">{label}</span>
        {/* Language hints mix scripts ("الإنجليزية · LTR") — never force
            the whole string to the Latin utility font. */}
        {hint && <span className="block text-micro text-faint">{hint}</span>}
      </span>

      {swatch && (
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          {swatch.map((colour) => (
            <span
              key={colour}
              className="h-6 w-2.5 rounded-full border border-divider"
              style={{ backgroundColor: colour }}
            />
          ))}
        </span>
      )}

      {/* selection is marked by an icon as well as colour */}
      <Check
        className={cx(
          "h-5 w-5 shrink-0 text-accent transition-opacity duration-settle",
          selected ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />
    </button>
  );
}
