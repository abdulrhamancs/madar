import React, { useId } from "react";
import { cx } from "../lib/cx";

interface FieldShellProps {
  label: string;
  /** Rendered under the control and linked via aria-describedby. */
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    describedBy: string | undefined;
    invalid: boolean;
    className: string;
  }) => React.ReactNode;
}

/**
 * Form controls sit on the paper surface with a hairline underneath rather
 * than a full box — the tactile, low-noise treatment the rest of the UI uses.
 * The border thickens and warms on focus instead of a ring being bolted on.
 */
const CONTROL_CLASS =
  // 44px min height keeps every control above the touch-target floor.
  "w-full min-h-[46px] rounded-md border bg-surface px-3.5 py-2.5 text-body text-ink " +
  "placeholder:text-faint transition-colors duration-quick ease-standard " +
  "disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Every control gets a real `<label for>` — association is enforced here
 * rather than left to call sites.
 */
export function Field({
  label,
  hint,
  error,
  required,
  children,
}: FieldShellProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-small font-medium text-ink">
        {label}
        {required && (
          <span className="text-danger ms-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children({
        id,
        describedBy,
        invalid: Boolean(error),
        className: cx(
          CONTROL_CLASS,
          error
            ? "border-danger"
            : "border-divider hover:border-control focus:border-accent"
        ),
      })}

      {hint && !error && (
        <p id={hintId} className="text-micro text-faint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-micro font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextField({ label, hint, error, ...rest }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error} required={rest.required}>
      {({ id, describedBy, invalid, className }) => (
        <input
          {...rest}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={className}
        />
      )}
    </Field>
  );
}

type AreaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function TextArea({ label, hint, error, ...rest }: AreaProps) {
  return (
    <Field label={label} hint={hint} error={error} required={rest.required}>
      {({ id, describedBy, invalid, className }) => (
        <textarea
          {...rest}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cx(className, "min-h-[112px] resize-y leading-relaxed")}
        />
      )}
    </Field>
  );
}

type SelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  label: string;
  hint?: string;
  error?: string;
};

export function SelectField({
  label,
  hint,
  error,
  children,
  ...rest
}: SelectProps) {
  return (
    <Field label={label} hint={hint} error={error} required={rest.required}>
      {({ id, describedBy, invalid, className }) => (
        <select
          {...rest}
          id={id}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          className={cx(className, "cursor-pointer pe-8")}
        >
          {children}
        </select>
      )}
    </Field>
  );
}

/**
 * Search input with a leading glyph. The icon sits on the inline-start edge so
 * it moves to the right in Arabic without a direction-specific rule.
 */
export function SearchField({
  label,
  className,
  ...rest
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "id"> & { label: string }) {
  return (
    <div className={cx("relative", className)}>
      <svg
        viewBox="0 0 20 20"
        className="pointer-events-none absolute inset-y-0 start-4 my-auto h-4 w-4 text-faint"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="m13.5 13.5 3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <input
        {...rest}
        type="search"
        aria-label={label}
        className={cx(
          CONTROL_CLASS,
          "border-divider ps-11 pe-4 hover:border-control focus:border-accent"
        )}
      />
    </div>
  );
}
