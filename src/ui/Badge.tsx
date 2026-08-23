import React from "react";
import { cx } from "../lib/cx";

export type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

// Tones map to semantic tokens — this is what replaces the ~66 raw
// `bg-red-500` / `text-blue-500` utilities the audit found scattered around.
const TONES: Record<Tone, string> = {
  neutral: "border-divider bg-raised text-muted",
  accent: "border-accent/35 bg-accent/10 text-accent",
  success: "border-success/35 bg-success/10 text-success",
  warning: "border-warning/35 bg-warning/10 text-warning",
  danger: "border-danger/35 bg-danger/10 text-danger",
  info: "border-info/35 bg-info/10 text-info",
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
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-micro font-medium",
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
