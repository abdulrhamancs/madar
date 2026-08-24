import React, { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal primitives.
 *
 * The animation itself lives entirely in CSS (see the `[data-reveal]` block in
 * styles.css). All this does is flip `data-visible` once, when an element
 * first crosses the viewport threshold — so no JavaScript runs per frame and
 * only compositor properties are touched.
 *
 * The governing constraint is that content must never be permanently
 * invisible. Anything that starts at `opacity: 0` is a liability: if the
 * trigger fails to fire, the page is simply blank below the fold. Everything
 * in the engine below is shaped by that — see `register` for why this uses
 * scroll geometry instead of IntersectionObserver, and `atScrollEnd` for the
 * bottom-of-page case.
 */

/**
 * Each variant has a matching rule in the `[data-reveal]` block of
 * styles.css. Bands pick different ones deliberately: a page where every
 * element rises 26px reads as a single mechanical effect rather than as
 * choreography.
 */
export type RevealVariant =
  | "up"       /* short rise — list items, small blocks   */
  | "rise"     /* longer, slower rise — editorial headings */
  | "settle"   /* rise + slight scale — cards, figures     */
  | "wipe"     /* inline-axis clip — headlines             */
  | "left"
  | "right"
  | "scale"
  | "clip"     /* image uncovers downward                  */
  | "clip-up"
  | "fade";

/* ------------------------------------------------------------------ engine */

type Callback = () => void;

/** Elements waiting to be revealed, mapped to the callback that reveals them. */
const pending = new Map<Element, Callback>();
let listening = false;

/**
 * Reveal threshold: the element has cleared the lower tenth of the viewport.
 * Holding the reveal slightly inside the fold is what makes it read as a
 * deliberate entrance rather than a pop-in at the edge.
 */
function inView(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  const viewport =
    window.innerHeight || document.documentElement.clientHeight || 0;
  return rect.top < viewport * 0.9 && rect.bottom > 0;
}

/**
 * The page cannot scroll any further.
 *
 * Without this, anything sitting inside that bottom tenth on a fully scrolled
 * page could never satisfy `inView` and would stay invisible forever — the
 * footer-adjacent sections were doing exactly that.
 */
function atScrollEnd(): boolean {
  const doc = document.documentElement;
  return window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
}

function release(element: Element) {
  const callback = pending.get(element);
  if (!callback) return;
  pending.delete(element);
  callback();
}

function sweep() {
  // At the end of the page nothing further can come into view, so whatever is
  // still waiting is released regardless of where it sits.
  const releaseAll = atScrollEnd();
  const ready: Element[] = [];
  pending.forEach((_callback, element) => {
    if (releaseAll || inView(element)) ready.push(element);
  });
  for (let i = 0; i < ready.length; i += 1) release(ready[i]);
  if (pending.size === 0) stopListening();
}

/**
 * Trailing throttle built on timers rather than requestAnimationFrame: rAF is
 * suspended in backgrounded or non-compositing documents, where reveals still
 * need to resolve rather than leaving the page blank.
 */
let lastSweep = 0;
let sweepTimer = 0;
const SWEEP_INTERVAL = 100;

function queueSweep() {
  const now = Date.now();
  if (now - lastSweep >= SWEEP_INTERVAL) {
    lastSweep = now;
    sweep();
  } else if (!sweepTimer) {
    sweepTimer = window.setTimeout(() => {
      sweepTimer = 0;
      lastSweep = Date.now();
      sweep();
    }, SWEEP_INTERVAL);
  }
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", queueSweep, { passive: true });
  window.addEventListener("resize", queueSweep, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", queueSweep);
  window.removeEventListener("resize", queueSweep);
}

/**
 * Geometry on a throttled scroll listener, rather than IntersectionObserver.
 *
 * IO looks like the obvious tool here and was the first implementation, but it
 * has one disqualifying property for content that starts at `opacity: 0`: its
 * callbacks are only delivered while the document is being rendered. A
 * backgrounded, prerendered or otherwise non-compositing tab can register
 * every element and never hear back, leaving the whole page blank below the
 * fold. A page carries on the order of ten reveals, so a 100ms-throttled
 * `getBoundingClientRect` pass costs nothing measurable — and the listener
 * detaches itself as soon as the last element has been revealed.
 */
function register(element: Element, callback: Callback) {
  // Already on screen at mount — reveal now rather than waiting for a scroll
  // that may never come on a short page.
  if (inView(element)) {
    callback();
    return () => {};
  }

  pending.set(element, callback);
  startListening();
  queueSweep();

  return () => {
    pending.delete(element);
    if (pending.size === 0) stopListening();
  };
}

/* -------------------------------------------------------------------- hook */

/** `true` once the element has been seen. Never flips back. */
export function useInView<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;
    return register(node, () => setSeen(true));
  }, [seen]);

  return [ref, seen];
}

/* -------------------------------------------------------------- components */

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: RevealVariant;
  /** Milliseconds to hold before this element starts. */
  delay?: number;
  /** Render as a different element — `li`, `article`, `section`… */
  as?: React.ElementType;
  children: React.ReactNode;
}

/**
 * Reveals its children once, on scroll.
 *
 *   <Reveal variant="up" delay={80}>…</Reveal>
 */
export function Reveal({
  variant = "up",
  delay = 0,
  as: Tag = "div",
  style,
  children,
  ...rest
}: RevealProps) {
  const [ref, visible] = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-visible={visible || undefined}
      style={
        delay ? { ...style, ["--reveal-delay" as string]: `${delay}ms` } : style
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggers its direct children. Wrapping each child individually would create
 * a registration per child; instead the group is observed once and the
 * children inherit a stepped delay.
 */
export function RevealGroup({
  variant = "up",
  step = 70,
  delay = 0,
  as: Tag = "div",
  children,
  ...rest
}: Omit<RevealProps, "children"> & {
  step?: number;
  children: React.ReactNode;
}) {
  const [ref, visible] = useInView<HTMLDivElement>();
  const items = React.Children.toArray(children);

  return (
    <Tag ref={ref} {...rest}>
      {items.map((child, index) =>
        React.isValidElement(child) ? (
          React.cloneElement(child as React.ReactElement<any>, {
            key: (child as React.ReactElement).key ?? index,
            "data-reveal": variant,
            "data-visible": visible || undefined,
            style: {
              ...((child as React.ReactElement<any>).props.style || {}),
              ["--reveal-delay" as string]: `${delay + index * step}ms`,
            },
          })
        ) : (
          child
        )
      )}
    </Tag>
  );
}

/**
 * Page-entrance animation for content already in view on load (the hero).
 * A plain CSS animation with a delay — it never waits on an intersection that
 * has already happened.
 */
export function Enter({
  delay = 0,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: Omit<RevealProps, "variant"> & { children: React.ReactNode }) {
  return (
    <Tag
      className={className ? `enter ${className}` : "enter"}
      style={{ ...style, ["--enter-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
