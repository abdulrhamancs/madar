import React from "react";
import { cx } from "../lib/cx";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "quiet"
  | "danger"
  // `secondary` holding an on-state — a toggle that is currently set.
  | "selected"
  // For the espresso block. Overriding `primary` with utilities at the call
  // site does not work reliably — `bg-accent` and `bg-on-espresso` have equal
  // specificity, so the winner depends on stylesheet order, not on the order
  // they appear in the class string. These are explicit variants instead.
  | "inverse"
  | "inverse-outline";
type Size = "sm" | "md" | "lg";

/**
 * Buttons.
 *
 * Primary is espresso on cream — one per viewport, ideally. Everything else
 * steps down to an outline or a text button so the page never shows five
 * competing calls to action.
 *
 * Hover moves colour and border only. Press uses a 1px nudge, which reads as
 * physical without shifting neighbouring layout. Nothing scales or bounces.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong active:bg-accent-strong " +
    "disabled:hover:bg-accent",
  secondary:
    "border border-control text-ink hover:border-accent hover:bg-accent/[0.06] " +
    "active:bg-accent/[0.1] disabled:hover:bg-transparent disabled:hover:border-control",
  // A variant rather than utilities passed to `secondary` at the call site, for
  // the same reason `inverse` is one: `border-accent` and `border-control` have
  // equal specificity, and Tailwind emits them in palette order, so the override
  // silently loses and the on-state renders identical to the off-state.
  selected:
    "border border-accent bg-accent/[0.1] text-accent hover:bg-accent/[0.16] " +
    "active:bg-accent/[0.2] disabled:hover:bg-accent/[0.1]",
  ghost: "text-ink hover:bg-ink/[0.05] active:bg-ink/[0.08]",
  // Reads as body copy until hovered — for tertiary actions inside content.
  quiet:
    "text-accent underline-offset-4 hover:text-accent-strong hover:underline " +
    "px-0 h-auto min-h-[44px]",
  danger:
    "bg-danger text-on-status hover:opacity-90 active:opacity-100 " +
    "disabled:hover:opacity-100",
  inverse:
    "bg-on-espresso text-espresso hover:bg-on-espresso/90 active:bg-on-espresso " +
    "disabled:hover:bg-on-espresso",
  "inverse-outline":
    "border border-on-espresso/30 text-on-espresso hover:border-on-espresso/60 " +
    "hover:bg-on-espresso/10 active:bg-on-espresso/[0.14]",
};

// `md` is the default and sits on the 44px touch floor; `sm` is only for dense
// admin rows, where it still clears the WCAG pointer minimum.
const SIZES: Record<Size, string> = {
  sm: "h-10 px-3.5 text-small gap-1.5",
  md: "h-11 px-5 text-small gap-2",
  lg: "h-[3.25rem] px-7 text-body gap-2.5",
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
        // `whitespace-nowrap`: a button's label is a single action and must not
        // break across lines — as a flex child under horizontal pressure it
        // otherwise wraps and the control grows taller than its declared size.
        "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium",
        "transition-[background-color,border-color,color,opacity] duration-quick ease-standard",
        "active:translate-y-px disabled:pointer-events-none disabled:opacity-45",
        VARIANTS[variant],
        variant !== "quiet" && SIZES[size],
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
        "transition-[background-color,border-color,color] duration-quick ease-standard",
        "disabled:pointer-events-none disabled:opacity-45",
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

/**
 * Editorial text link with an underline that grows from the inline-start edge
 * — so it runs right-to-left in Arabic without a separate rule.
 */
export function TextLink({
  className,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...rest}
      className={cx(
        "link-underline inline-flex min-h-[44px] items-center gap-2 text-small font-medium text-accent",
        "transition-colors duration-quick hover:text-accent-strong",
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
