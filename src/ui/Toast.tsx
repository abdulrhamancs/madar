import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { cx } from "../lib/cx";

type ToastTone = "success" | "danger" | "info";
interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

const ToastContext = createContext<(message: string, tone?: ToastTone) => void>(
  () => {}
);

/** Fire-and-forget feedback: `const notify = useToast(); notify("Saved")`. */
export const useToast = () => useContext(ToastContext);

const TONES: Record<ToastTone, string> = {
  success: "border-success/35 text-success",
  danger: "border-danger/35 text-danger",
  info: "border-info/35 text-info",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const notify = useCallback((message: string, tone: ToastTone = "success") => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, message, tone }]);
    window.setTimeout(
      () => setToasts((current) => current.filter((t) => t.id !== id)),
      4000
    );
  }, []);

  const value = useMemo(() => notify, [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* polite + never focused, so it announces without interrupting */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-toast flex flex-col items-center gap-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] md:pb-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cx(
              "pointer-events-auto flex max-w-sm items-center gap-3 rounded-lg border bg-surface px-4 py-3.5 text-small font-medium shadow-lift animate-fade-up",
              TONES[toast.tone]
            )}
          >
            <Glyph tone={toast.tone} />
            <span className="text-ink">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function Glyph({ tone }: { tone: ToastTone }) {
  const path =
    tone === "success"
      ? "M4 10.5 8 14.5 16 6"
      : tone === "danger"
      ? "M10 6v5m0 3h.01"
      : "M10 9v5m0-8h.01";
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0" aria-hidden="true">
      {tone !== "success" && (
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" fill="none" />
      )}
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
