import React from "react";
import { cx } from "../lib/cx";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

// Hover changes colour and border only — never scale. Press uses a 1px nudge,
// which reads as physical without shifting neighbouring layout.
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-ink text-canvas hover:bg-ink/90 active:bg-ink disabled:hover:bg-ink",
  secondary:
    "border border-control text-ink hover:bg-ink/[0.04] active:bg-ink/[0.07] disabled:hover:bg-transparent",
  ghost: "text-ink hover:bg-ink/[0.05] active:bg-ink/[0.08]",
  danger:
    "bg-danger text-on-status hover:bg-danger/90 active:bg-danger disabled:hover:bg-danger",
};

// `md` is the default and sits on the 44px touch floor; `sm` is only for dense
// desktop admin rows, where it still clears the 24px WCAG pointer minimum.
const SIZES: Record<Size, string> = {
  sm: "h-10 px-3 text-small gap-1.5",
  md: "h-11 px-4 text-small gap-2",
  lg: "h-12 px-6 text-body gap-2.5",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Shows a spinner and blocks interaction while an async action runs. */
  pending?: boolean;
  block?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  pending = false,
  block = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      className={cx(
        "inline-flex items-center justify-center rounded-md font-medium",
        "transition-colors duration-quick ease-standard",
        "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        block && "w-full",
        className
      )}
    >
      {pending && <Spinner />}
      {children}
    </button>
  );
}

/** Icon-only control. `label` is required — it becomes the accessible name. */
export function IconButton({
  label,
  variant = "ghost",
  className,
  children,
  ...rest
}: Omit<ButtonProps, "size" | "block"> & { label: string }) {
  return (
    <button
      {...rest}
      aria-label={label}
      title={label}
      className={cx(
        // 44px hit area even though the glyph inside is 20px.
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
        "transition-colors duration-quick ease-standard",
        "disabled:pointer-events-none disabled:opacity-50",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 shrink-0 animate-spin"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
      />
      <path
        d="M14.5 8A6.5 6.5 0 0 0 8 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
