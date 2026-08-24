import React, { useEffect, useRef } from "react";
import { useI18n } from "../lib/i18nContext";
import { MadarMark } from "../ui/MadarMark";

/**
 * Brand beat, not a toll booth. Runs ~1.2s, is skippable by any key, tap or
 * the visible button, and never gates data — fetching continues underneath it.
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
      className="fixed inset-0 z-intro flex animate-fade-in flex-col items-center justify-center gap-9 bg-canvas px-6 text-center"
    >
      {/* concentric rings echo the hero, so the transition into the app reads
          as one continuous idea rather than a separate splash */}
      <div className="relative flex h-52 w-52 items-center justify-center">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-divider"
        />
        <span
          aria-hidden="true"
          className="absolute inset-7 rounded-full border border-divider/70"
        />
        <MadarMark className="h-24 w-24" animate />
      </div>

      <div
        className="enter"
        style={{ ["--enter-delay" as string]: "260ms" }}
      >
        <p className="font-display text-h1 text-ink">{t("madar_club")}</p>
        <p className="mt-3 text-body text-muted">{message}</p>
      </div>

      <button
        type="button"
        onClick={onDone}
        className="enter min-h-[44px] rounded-md px-4 text-small font-medium text-faint transition-colors duration-quick hover:text-ink"
        style={{ ["--enter-delay" as string]: "420ms" }}
      >
        {t("skip")}
      </button>
    </div>
  );
}
