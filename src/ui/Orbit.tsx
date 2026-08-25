import React, { useEffect, useRef } from "react";
import { cx } from "../lib/cx";

/**
 * مدار means orbit — a path traced around a shared centre.
 *
 * The concept is stated as geometry, never as illustration: concentric rings,
 * inclined paths, and small bodies moving along them. The bodies are the
 * point — orbit here means *people around a shared centre*, which is what a
 * club is. Deliberately not a space theme: no planets, no stars, no glow.
 */

/**
 * Small decorative field for section backgrounds — one ring, one path, one
 * body. Used behind auth/onboarding panels where it must stay quiet.
 */
export function OrbitField({
  className,
  onDark = false,
}: {
  className?: string;
  /**
   * On the espresso block the light-mode accent is a dark brown, which is
   * all but invisible against cherry. `onDark` switches the strokes to the
   * block's own ink via `currentColor` instead.
   */
  onDark?: boolean;
}) {
  const stroke = onDark ? "stroke-current" : "stroke-accent";
  const fill = onDark ? "fill-current" : "fill-accent";

  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none absolute select-none", className)}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
        <circle
          cx="200"
          cy="200"
          r="138"
          className={stroke}
          strokeWidth="1"
          opacity="0.16"
        />
        <g className="orbit-spin" style={{ transformOrigin: "200px 200px" }}>
          <ellipse
            cx="200"
            cy="200"
            rx="186"
            ry="76"
            className={stroke}
            strokeWidth="1"
            opacity="0.2"
          />
          <circle cx="386" cy="200" r="3" className={fill} opacity="0.45" />
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Hero orbit system
   ------------------------------------------------------------------------- */

/** A body on a path: angle in degrees around the centre, radius, size. */
type Body = { angle: number; radius: number; r: number; dim?: boolean };

const CENTRE = 240;

/** Places a body on its circular path. */
function place({ angle, radius }: Body) {
  const rad = (angle * Math.PI) / 180;
  return {
    cx: CENTRE + radius * Math.cos(rad),
    cy: CENTRE + radius * Math.sin(rad),
  };
}

/** Bodies grouped by the path they ride, so each group can spin separately. */
const OUTER: Body[] = [
  { angle: 0, radius: 210, r: 5 },
  { angle: 130, radius: 210, r: 3.5, dim: true },
  { angle: 250, radius: 210, r: 4 },
];
const MIDDLE: Body[] = [
  { angle: 62, radius: 150, r: 4.5 },
  { angle: 205, radius: 150, r: 3, dim: true },
];
const INNER: Body[] = [{ angle: 315, radius: 92, r: 3.5 }];

function Bodies({ bodies }: { bodies: Body[] }) {
  return (
    <>
      {bodies.map((body, i) => {
        const { cx: x, cy: y } = place(body);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={body.r}
            className="fill-accent"
            opacity={body.dim ? 0.45 : 0.72}
          />
        );
      })}
    </>
  );
}

/**
 * The hero's visual anchor.
 *
 * Three concentric rings establish the shared centre; two inclined ellipses
 * give the composition depth without becoming a scribble; and six small
 * bodies ride the rings at different speeds and directions. The differing
 * speeds are what stop it reading as a spinner — nothing ever returns to the
 * same arrangement, so the movement registers as drift rather than a loop.
 *
 * `parallax` couples the whole system loosely to scroll (see useOrbitScroll).
 */
export function OrbitSystem({
  className,
  parallax = true,
}: {
  className?: string;
  parallax?: boolean;
}) {
  const ref = useOrbitScroll(parallax);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cx("orbit-system pointer-events-none select-none", className)}
    >
      <svg viewBox="0 0 480 480" className="h-full w-full" fill="none">
        {/* --- layered circular geometry: the shared centre --- */}
        <circle cx={CENTRE} cy={CENTRE} r="210" className="stroke-accent" strokeWidth="1" opacity="0.28" />
        <circle
          cx={CENTRE}
          cy={CENTRE}
          r="150"
          className="stroke-accent"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="2 7"
        />
        <circle cx={CENTRE} cy={CENTRE} r="92" className="stroke-accent" strokeWidth="1" opacity="0.28" />

        {/* --- inclined paths: depth, drawn once, never rotating --- */}
        {/* The one cherry path — the same single-ring-in-colour relationship
            the Madar mark uses, so the hero reads as the logo enlarged. */}
        <ellipse
          cx={CENTRE}
          cy={CENTRE}
          rx="228"
          ry="88"
          className="stroke-cherry"
          strokeWidth="1.3"
          opacity="0.3"
          transform={`rotate(-22 ${CENTRE} ${CENTRE})`}
        />
        <ellipse
          cx={CENTRE}
          cy={CENTRE}
          rx="228"
          ry="88"
          className="stroke-accent"
          strokeWidth="1"
          opacity="0.2"
          transform={`rotate(44 ${CENTRE} ${CENTRE})`}
        />

        {/* --- the community: bodies on the rings, all at different rates --- */}
        <g className="orbit-drift-slow" style={{ transformOrigin: `${CENTRE}px ${CENTRE}px` }}>
          <Bodies bodies={OUTER} />
        </g>
        <g className="orbit-drift-reverse" style={{ transformOrigin: `${CENTRE}px ${CENTRE}px` }}>
          <Bodies bodies={MIDDLE} />
        </g>
        <g className="orbit-drift-fast" style={{ transformOrigin: `${CENTRE}px ${CENTRE}px` }}>
          <Bodies bodies={INNER} />
        </g>

        {/* --- focal point ---
            Kept small and concentric rather than a large tinted disc around a
            dark dot: at that scale the pairing read as an iris and pupil,
            which is the one thing this composition must not look like. Three
            close hairlines plus a modest centre now read as a shared centre
            being circled. */}
        <circle cx={CENTRE} cy={CENTRE} r="34" className="stroke-accent" strokeWidth="1" opacity="0.4" />
        <circle cx={CENTRE} cy={CENTRE} r="22" className="stroke-accent" strokeWidth="1" opacity="0.24" />
        <circle cx={CENTRE} cy={CENTRE} r="8" className="fill-accent" opacity="0.85" />
      </svg>
    </div>
  );
}

/**
 * Couples the orbit to scroll position.
 *
 * Writes two custom properties the CSS consumes — a small rotation and a
 * small vertical drift — so the system reacts to scrolling without React
 * re-rendering and without touching layout. Reads are batched into a single
 * rAF per frame; the listener detaches once the element leaves the viewport
 * region, and never attaches at all under `prefers-reduced-motion`.
 */
function useOrbitScroll(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !enabled) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 0 while the element sits at the top of the viewport, 1 once it has
      // scrolled a full viewport past — clamped so it never runs away.
      const progress = Math.min(Math.max(-rect.top / viewport, -1), 1);
      node.style.setProperty("--orbit-rot", `${progress * 16}deg`);
      node.style.setProperty("--orbit-shift", `${progress * -28}px`);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return ref;
}
