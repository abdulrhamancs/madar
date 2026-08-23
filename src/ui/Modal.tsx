import React, { useCallback, useEffect, useId, useRef } from "react";
import { cx } from "../lib/cx";
import { Button } from "./Button";

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Accessible label for the close control (localised by the caller). */
  closeLabel: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const SIZES = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" } as const;

/**
 * The single dialog primitive for the app — replaces five ad-hoc overlays that
 * had no keyboard handling at all. Handles focus trapping, focus restoration,
 * Escape, scroll lock and the dialog ARIA contract.
 */
export function Modal({
  open,
  onClose,
  title,
  closeLabel,
  description,
  children,
  footer,
  size = "md",
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Focus the first control, else the panel itself.
    const target =
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? panelRef.current;
    target?.focus();

    return () => {
      document.body.style.overflow = overflow;
      restoreRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 animate-fade-in bg-[rgb(var(--scrim)/0.55)]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={cx(
          "relative w-full bg-surface shadow-overlay",
          // Bottom sheet on phones, centred dialog from `sm` up.
          "max-h-[90dvh] overflow-y-auto rounded-t-lg animate-sheet-up",
          "sm:rounded-lg sm:animate-scale-in",
          SIZES[size]
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-divider p-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-h3 text-ink">
              {title}
            </h2>
            {description && (
              <p id={descId} className="mt-1 text-small text-muted">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="-me-2 -mt-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted transition-colors duration-quick hover:bg-ink/[0.05] hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {children && <div className="p-5">{children}</div>}
        {footer && (
          <footer className="flex flex-col-reverse gap-2 border-t border-divider p-5 sm:flex-row sm:justify-end">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  closeLabel: string;
  destructive?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Replaces `window.confirm()` — themed, translated and keyboard accessible. */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  closeLabel,
  destructive,
  pending,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      closeLabel={closeLabel}
      size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            onClick={onConfirm}
            pending={pending}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-body text-muted">{message}</p>
    </Modal>
  );
}
