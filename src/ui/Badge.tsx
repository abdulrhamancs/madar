import React from "react";
import { cx } from "../lib/cx";
import { honourOf } from "../lib/clubData";
import { useI18n } from "../lib/i18nContext";

export type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

/**
 * Small status label.
 *
 * Tones map to semantic tokens rather than raw colours, and every tone pairs a
 * tinted fill with a hairline of the same hue — so a badge still reads as a
 * badge in the warm palette, where fills alone are very low contrast.
 */
const TONES: Record<Tone, string> = {
  neutral: "border-divider bg-raised/60 text-muted",
  accent: "border-accent/30 bg-accent/[0.09] text-accent",
  success: "border-success/30 bg-success/[0.09] text-success",
  warning: "border-warning/30 bg-warning/[0.09] text-warning",
  danger: "border-danger/30 bg-danger/[0.09] text-danger",
  info: "border-info/30 bg-info/[0.09] text-info",
};

export function Badge({
  tone = "neutral",
  icon,
  className,
  children,
}: {
  tone?: Tone;
  /** Paired with the label so meaning never rests on colour alone. */
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-micro font-medium leading-none",
        TONES[tone],
        className
      )}
    >
      {icon && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

/**
 * Borderless variant for dense lists of roles, where a full badge per item
 * would turn a member card into a wall of boxes.
 */
export function Tag({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-sm bg-raised/70 px-2.5 py-1 text-micro text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

/**
 * An honour, drawn as an emblem rather than a labelled chip.
 *
 * It sits beside a name in dense lists — a leaderboard row, a roster card —
 * where a chip carrying the full "عضو متميز" would be wider than the name it
 * qualifies and, on a phone, the widest thing in the row. The ring is the one
 * the member cards already put initials in: an `accent/35` hairline over an
 * `accent/[0.07]` tint. Reusing it is what keeps this reading as part of the
 * set rather than as a sticker applied on top of it.
 *
 * The label is not decorative. It is the only thing that says what the icon
 * means, so it is always present — for a screen reader and on hover — and the
 * meaning never rests on the glyph or on colour alone.
 *
 * Takes the whole `badges` array rather than a boolean so every call site
 * stays honest about where an honour lives: in the same column as the seats.
 */
export function HonourEmblem({
  badges,
  size = "md",
  className,
}: {
  badges?: string[];
  /** `sm` for the secondary leaderboard rows, where the type steps down too. */
  size?: "sm" | "md";
  className?: string;
}) {
  const { t } = useI18n();
  const honour = honourOf(badges);
  if (!honour) return null;

  const Icon = honour.icon;
  const label = t(honour.labelKey);

  return (
    <span
      title={label}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full border",
        "border-accent/35 bg-accent/[0.07] text-accent",
        size === "sm" ? "h-5 w-5" : "h-6 w-6",
        className
      )}
    >
      <Icon
        className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
