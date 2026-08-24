import React from "react";
import { cx } from "../lib/cx";

/**
 * The Madar mark.
 *
 * A spiral wound around a shared centre, a serpent closing the loop around
 * it, and a single inclined ring crossing in front — the ring in cherry, the
 * rest in brown, exactly the relationship the supplied artwork uses.
 *
 * Drawn as geometry rather than traced from the illustration on purpose. The
 * supplied logo is a detailed stippled drawing: at the 36–40px the navbar
 * renders it at, the stipple collapses into grey mush and the serpent's
 * scales disappear entirely. This keeps the mark's structure — spiral, coil,
 * ring — at a line weight that survives every size the site uses, and it
 * matches the hairline language the rest of the page is built from.
 *
 * If you want the full illustration for a large placement (a poster, an OG
 * image, the auth panel at desktop size), drop the real asset into
 * `public/brand/` and it can sit alongside this rather than replace it.
 */

/** Archimedean spiral, sampled into a polyline. */
function buildSpiral(
  cx: number,
  cy: number,
  turns: number,
  from: number,
  to: number,
  steps: number
) {
  const points: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const radius = from + (to - from) * t;
    points.push(
      `${(cx + radius * Math.cos(angle)).toFixed(2)},${(
        cy +
        radius * Math.sin(angle)
      ).toFixed(2)}`
    );
  }
  return `M${points.join(" L")}`;
}

// Computed once at module load — the path never changes.
const SPIRAL = buildSpiral(32, 32, 2.5, 1.4, 11, 190);

/**
 * The serpent: a near-closed ring with the gap at the top, where the head
 * sits. `large-arc` + `sweep 0` takes the long way round the bottom.
 */
const SERPENT = "M26.6 14.9 A17.6 17.6 0 1 0 37.4 14.9";

export function MadarMark({
  className,
  animate = false,
  spin = false,
  onDark = false,
}: {
  className?: string;
  /** Draws the ring and spiral in on mount. */
  animate?: boolean;
  /** Slow continuous rotation of the spiral core. */
  spin?: boolean;
  /** Use the surrounding ink instead of the accent, for dark blocks. */
  onDark?: boolean;
}) {
  const line = onDark ? "stroke-current" : "stroke-accent";
  const solid = onDark ? "fill-current" : "fill-accent";

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      {/* --- the coil: a spiral around the centre --- */}
      <g
        className={spin ? "madar-spin" : undefined}
        style={spin ? { transformOrigin: "32px 32px" } : undefined}
      >
        <path
          d={SPIRAL}
          className={line}
          strokeWidth="1.5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={animate ? 1 : undefined}
          strokeDashoffset={animate ? 1 : undefined}
        >
          {animate && (
            <animate
              attributeName="stroke-dashoffset"
              from="1"
              to="0"
              dur="1.4s"
              fill="freeze"
              calcMode="spline"
              keySplines="0.16 1 0.3 1"
              keyTimes="0;1"
            />
          )}
        </path>
      </g>

      {/* --- the serpent closing the loop --- */}
      <path
        d={SERPENT}
        className={line}
        strokeWidth="2.6"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={animate ? 1 : undefined}
        strokeDashoffset={animate ? 1 : undefined}
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            from="1"
            to="0"
            dur="1.1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.16 1 0.3 1"
            keyTimes="0;1"
          />
        )}
      </path>
      {/* head, at the mouth of the gap */}
      <circle cx="26.6" cy="14.9" r="2.9" className={solid} />
      <circle cx="25.8" cy="14.1" r="0.66" className="fill-canvas" />

      {/* --- the ring, in cherry, crossing in front --- */}
      <ellipse
        cx="32"
        cy="32"
        rx="27"
        ry="10.2"
        className={onDark ? "stroke-cherry-soft" : "stroke-cherry"}
        strokeWidth="2.2"
        transform="rotate(-21 32 32)"
        pathLength={1}
        strokeDasharray={animate ? 1 : undefined}
        strokeDashoffset={animate ? 1 : undefined}
      >
        {animate && (
          <animate
            attributeName="stroke-dashoffset"
            from="1"
            to="0"
            dur="1.15s"
            begin="0.25s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.16 1 0.3 1"
            keyTimes="0;1"
          />
        )}
      </ellipse>
    </svg>
  );
}
