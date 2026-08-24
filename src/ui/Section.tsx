import React from "react";
import { cx } from "../lib/cx";
import { Reveal, type RevealVariant } from "./Reveal";

/**
 * Layout primitives.
 *
 * These carry the editorial rhythm — shell width, section spacing, the eyebrow
 * + headline pairing — so pages compose sections instead of re-deriving
 * padding and type sizes each time.
 */

/**
 * Centred content column at the shell width.
 *
 * `wide` opts into the wider compositional shell — used by the hero and the
 * figures band, where the arrangement needs the horizontal room. Reading copy
 * inside stays capped by `max-w-measure` either way.
 */
export function Container({
  wide = false,
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { wide?: boolean }) {
  return (
    <div className={cx(wide ? "shell-wide" : "shell", className)} {...rest}>
      {children}
    </div>
  );
}

/**
 * A page section with the standard vertical rhythm.
 *
 * `tone` picks the surface: the default is the page canvas, `warm` is the
 * parchment tint used to separate a band of content, and `dark` is the
 * espresso block that appears at most once or twice per page.
 */
export function Section({
  tone = "canvas",
  bleed = false,
  wide = false,
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & {
  tone?: "canvas" | "warm" | "surface" | "dark";
  /** Skip the inner container — the section manages its own width. */
  bleed?: boolean;
  /** Use the wider compositional shell. */
  wide?: boolean;
}) {
  const TONES = {
    canvas: "",
    surface: "bg-surface",
    warm: "bg-raised/55",
    dark: "surface-espresso text-on-espresso",
  } as const;

  return (
    <section
      className={cx("py-section", TONES[tone], className)}
      {...rest}
    >
      {bleed ? children : <Container wide={wide}>{children}</Container>}
    </section>
  );
}

/**
 * Tracked label with a leading hairline. Flips with direction automatically.
 *
 * Every caller in this app passes translated copy — Arabic by default — so
 * this must not force the Latin utility font: Thmanyah covers Latin fully,
 * and `.eyebrow:lang(ar)` in styles.css already handles the Arabic-specific
 * tracking and casing. Forcing `latin` here previously rendered every
 * eyebrow on every page in Inter regardless of language.
 */
export function Eyebrow({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cx("eyebrow", className)} {...rest}>
      {children}
    </p>
  );
}

/**
 * Section header: eyebrow, headline, optional lead paragraph and action.
 *
 * `align="split"` puts the action opposite the headline on wide screens and
 * stacks it underneath on narrow ones — the common editorial arrangement.
 */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  align = "start",
  variant = "rise",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  align?: "start" | "split" | "center";
  /** Reveal choreography — varied per band so the page is not one effect. */
  variant?: RevealVariant;
  /** Recolours for the espresso block, where `text-ink` would vanish. */
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      variant={variant}
      className={cx(
        "mb-12 flex gap-6",
        align === "split"
          ? "flex-col items-start justify-between md:flex-row md:items-end"
          : align === "center"
          ? "flex-col items-center text-center"
          : "flex-col items-start",
        className
      )}
    >
      <div className={cx("min-w-0", align === "center" && "flex flex-col items-center")}>
        {eyebrow && (
          <Eyebrow className={cx("mb-5", onDark && "text-on-espresso/60")}>
            {eyebrow}
          </Eyebrow>
        )}
        <h2 className={cx("text-h1", onDark ? "text-on-espresso" : "text-ink")}>
          {title}
        </h2>
        {lead && (
          <p
            className={cx(
              "mt-5 max-w-measure text-lead",
              onDark ? "text-on-espresso/70" : "text-muted"
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}

/**
 * Page header for interior pages.
 *
 * Interior pages open on the same editorial device as the homepage sections —
 * an eyebrow, a large headline, a hairline — rather than a boxed title bar.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="border-b border-divider pb-10 pt-14 md:pt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          {eyebrow && (
            <Eyebrow className="mb-5 enter" style={{ ["--enter-delay" as string]: "40ms" }}>
              {eyebrow}
            </Eyebrow>
          )}
          <h1
            className="enter text-display text-ink"
            style={{ ["--enter-delay" as string]: "110ms" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="enter mt-5 max-w-measure text-lead text-muted"
              style={{ ["--enter-delay" as string]: "180ms" }}
            >
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div
            className="enter flex shrink-0 items-center gap-4"
            style={{ ["--enter-delay" as string]: "240ms" }}
          >
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

/** Smaller heading for a block inside a page. */
export function SubHeading({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "mb-7 flex flex-wrap items-baseline justify-between gap-4",
        className
      )}
    >
      <div className="min-w-0">
        <h2 className="text-h2 text-ink">{title}</h2>
        {description && (
          <p className="mt-2 max-w-measure text-small text-muted">{description}</p>
        )}
      </div>
      {actions}
    </div>
  );
}
