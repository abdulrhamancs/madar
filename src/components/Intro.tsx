import React, { useEffect, useRef } from "react";
import { useI18n } from "../lib/i18nContext";
import { OrbitLogo } from "../ui/BrandIcons";

/**
 * Brand beat, not a toll booth. The original blocked for 4s (twice during
 * registration); this runs ~1.2s, is skippable by any key, tap or the visible
 * button, and never gates data — fetching continues underneath it.
 * Reduced-motion users get a static mark and a short fade.
 */
const DURATION = 1200;

export function Intro({
  message,
  onDone,
}: {
  message: string;
  onDone: () => void;
}) {
  const { t } = useI18n();
  const done = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (done.current) return;
      done.current = true;
      onDone();
    };

    const timer = window.setTimeout(finish, DURATION);
    const onKey = () => finish();
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onKey);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onKey);
    };
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-intro flex flex-col items-center justify-center gap-6 bg-canvas px-6 text-center animate-fade-in"
    >
      <OrbitLogo className="h-24 w-24" animate />
      <div>
        <p className="font-display text-h1 text-ink">{t("madar_club")}</p>
        <p className="mt-2 text-small text-muted">{message}</p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="mt-2 min-h-[44px] rounded-md px-4 text-small font-medium text-muted transition-colors duration-quick hover:text-ink"
      >
        {t("skip")}
      </button>
    </div>
  );
}
