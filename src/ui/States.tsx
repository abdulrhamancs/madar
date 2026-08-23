import React from "react";
import { cx } from "../lib/cx";
import { Button } from "./Button";

/** Shimmer placeholder. Match the shape of the content it stands in for. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("skeleton", className)} aria-hidden="true" />;
}

/** Announces that a region is loading without flashing for fast responses. */
export function LoadingRegion({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div role="status" aria-label={label} aria-live="polite" aria-busy="true">
      {children}
    </div>
  );
}

/**
 * Empty states carry an orbit-arc mark, one line of guidance and an optional
 * action — replacing the bare `opacity-60` paragraphs used previously.
 */
export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message?: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <OrbitMark />
      <h3 className="mt-5 text-h3 text-ink">{title}</h3>
      {message && (
        <p className="mt-1.5 max-w-sm text-small text-muted">{message}</p>
      )}
      {action && (
        <Button className="mt-5" variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

/** Failure state — always states what happened and offers a way forward. */
export function ErrorState({
  title,
  message,
  retryLabel,
  onRetry,
}: {
  title: string;
  message: string;
  retryLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center px-6 py-16 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-danger/40 bg-danger/10">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-danger" aria-hidden="true">
          <path
            d="M12 8v5m0 3.5h.01M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20.4h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3 className="mt-5 text-h3 text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-small text-muted">{message}</p>
      {onRetry && retryLabel && (
        <Button className="mt-5" variant="secondary" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

/** The club's orbit motif, reused as the empty-state mark. */
function OrbitMark() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-14 w-14 text-accent"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.85" />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="11"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
        transform="rotate(-24 32 32)"
      />
      <ellipse
        cx="32"
        cy="32"
        rx="26"
        ry="11"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.22"
        transform="rotate(28 32 32)"
      />
    </svg>
  );
}
