import React from "react";

/**
 * Editorial page header: a small eyebrow, a start-aligned title and an optional
 * action slot, separated by a hairline rule. Deliberately *not* the old
 * centred icon-tile + giant title block that made six pages look identical.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  count,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  /** Small trailing figure, e.g. "12 members". */
  count?: string;
}) {
  return (
    <header className="mb-8 border-b border-divider pb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          {eyebrow && (
            <p className="mb-1.5 flex items-center gap-2 text-micro font-medium uppercase tracking-wide text-accent">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-h1 text-ink sm:text-display">{title}</h1>
          {description && (
            <p className="mt-2 max-w-prose text-body text-muted">{description}</p>
          )}
        </div>
        {(actions || count) && (
          <div className="flex shrink-0 items-center gap-3">
            {count && <span className="nums text-small text-muted">{count}</span>}
            {actions}
          </div>
        )}
      </div>
    </header>
  );
}

/** Section divider inside a page — smaller than PageHeader. */
export function SectionHeading({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
      <div>
        <h2 className="text-h2 text-ink">{title}</h2>
        {description && (
          <p className="mt-1 text-small text-muted">{description}</p>
        )}
      </div>
      {actions}
    </div>
  );
}
