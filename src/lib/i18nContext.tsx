import React, { createContext, useContext, useEffect, useMemo } from "react";
import {
  createT,
  dirFor,
  formatDate,
  formatDateParts,
  formatDateRange,
  formatNumber,
  type Lang,
  type TranslationKey,
} from "./i18n";

interface I18nValue {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: (key: TranslationKey) => string;
  formatDate: (value: string | null | undefined) => string;
  formatDateRange: (
    start: string | null | undefined,
    end: string | null | undefined
  ) => string;
  formatDateParts: (
    value: string | null | undefined
  ) => { day: string; month: string; year: string };
  formatNumber: (value: number) => string;
}

const I18nContext = createContext<I18nValue | null>(null);

/**
 * `t` and `lang` are needed by essentially every component, so they travel by
 * context. Everything else in the app is passed explicitly.
 */
export function I18nProvider({
  lang,
  isDark,
  children,
}: {
  lang: Lang;
  isDark: boolean;
  children: React.ReactNode;
}) {
  // Language and direction belong on <html>, not on an inner <div> — screen
  // readers and the CSS logical-property engine both read them from the root.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dirFor(lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const value = useMemo<I18nValue>(() => {
    const t = createT(lang);
    return {
      lang,
      dir: dirFor(lang),
      t,
      formatDate: (v) => formatDate(v, lang),
      formatDateRange: (s, e) => formatDateRange(s, e, lang),
      formatDateParts: (v) => formatDateParts(v, lang),
      formatNumber: (n) => formatNumber(n, lang),
    };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
