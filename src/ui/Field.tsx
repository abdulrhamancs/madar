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

const CONTROL_CLASS =
  // 44px min height keeps every control above the touch-target floor.
  "w-full min-h-[44px] rounded-md border bg-surface px-3 py-2 text-body text-ink " +
  "placeholder:text-faint transition-colors duration-quick ease-standard " +
  "disabled:cursor-not-allowed disabled:opacity-60";

/**
 * Every control gets a real <label for> — the audit found 23 labels with zero
 * `htmlFor`, so association is enforced here rather than left to call sites.
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
    <div className="space-y-1.5">
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
          error ? "border-danger" : "border-control hover:border-ink/40"
        ),
      })}

      {hint && !error && (
        <p id={hintId} className="text-micro text-muted">
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
          className={cx(className, "min-h-[96px] resize-y")}
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
