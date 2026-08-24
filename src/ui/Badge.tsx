import React from "react";
import { cx } from "../lib/cx";

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
