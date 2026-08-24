import React from "react";
import { cx } from "../lib/cx";
import { Button } from "./Button";
import { MadarMark } from "./MadarMark";

/** Shimmer placeholder. Match the shape of the content it stands in for. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cx("skeleton", className)} aria-hidden="true" />;
}

/**
 * Empty states carry the orbit mark, one line of guidance and an optional
 * action. Set on warm paper so an empty page still looks composed rather than
 * unfinished.
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
    <div className="flex flex-col items-center justify-center rounded-card border border-divider bg-raised/40 px-6 py-20 text-center">
      <MadarMark className="h-14 w-14 opacity-70" />
      <h3 className="mt-6 text-h3 text-ink">{title}</h3>
      {message && (
        <p className="mt-2 max-w-sm text-small text-muted">{message}</p>
      )}
      {action && (
        <Button className="mt-7" variant="secondary" onClick={action.onClick}>
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
      className="flex flex-col items-center justify-center rounded-card border border-divider bg-raised/40 px-6 py-20 text-center"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-danger/35 bg-danger/[0.08]">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-danger" aria-hidden="true">
          <path
            d="M12 8v5m0 3.5h.01M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20.4h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3 className="mt-6 text-h3 text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-small text-muted">{message}</p>
      {onRetry && retryLabel && (
        <Button className="mt-7" variant="secondary" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
