import React from "react";
import { Sun, Moon, Check } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import type { Lang } from "../lib/i18n";
import { PageHeader, SectionHeading } from "../ui/PageHeader";
import { cx } from "../lib/cx";

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

      <section className="mb-10">
        <SectionHeading title={t("theme_title")} />
        <div role="radiogroup" aria-label={t("theme_title")} className="grid gap-3 sm:grid-cols-2">
          <Choice
            selected={!isDark}
            onSelect={() => onThemeChange(false)}
            icon={<Sun className="h-5 w-5" />}
            label={t("light_mode")}
          />
          <Choice
            selected={isDark}
            onSelect={() => onThemeChange(true)}
            icon={<Moon className="h-5 w-5" />}
            label={t("dark_mode")}
          />
        </div>
      </section>

      <section>
        <SectionHeading title={t("language")} />
        <div role="radiogroup" aria-label={t("language")} className="grid gap-3 sm:grid-cols-2">
          <Choice
            selected={lang === "ar"}
            onSelect={() => onLangChange("ar")}
            label="العربية"
            hint="Arabic"
          />
          <Choice
            selected={lang === "en"}
            onSelect={() => onLangChange("en")}
            label="English"
            hint="الإنجليزية"
          />
        </div>
      </section>
    </div>
  );
}

function Choice({
  selected,
  onSelect,
  icon,
  label,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  icon?: React.ReactNode;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cx(
        "flex min-h-[56px] items-center gap-3 rounded-lg border p-4 text-start transition-colors duration-quick",
        selected
          ? "border-accent bg-accent/[0.07]"
          : "border-divider bg-surface hover:border-control"
      )}
    >
      {icon && (
        <span className={cx("shrink-0", selected ? "text-accent" : "text-muted")}>
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-body font-medium text-ink">{label}</span>
        {hint && <span className="block text-micro text-muted">{hint}</span>}
      </span>
      {/* selection is marked by an icon as well as colour */}
      {selected && <Check className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />}
    </button>
  );
}
