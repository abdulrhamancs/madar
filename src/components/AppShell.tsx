import React, { useEffect, useRef } from "react";
import { cx } from "../lib/cx";
import { useI18n } from "../lib/i18nContext";
import { Navbar, type PageId } from "./Navbar";
import { Footer } from "./Footer";

export type { PageId } from "./Navbar";

export interface AppShellProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: { fullName?: string; username?: string } | null;
  isAdmin: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
  children: React.ReactNode;
}

/**
 * The public shell: fixed navbar, full-bleed main, footer.
 *
 * The old left sidebar and mobile tab bar are gone. Content now runs the full
 * width of the shell so sections can bleed, break the grid and set their own
 * surface — which is what makes an editorial layout possible at all.
 *
 * Only the homepage runs its own full-bleed sections; every other page gets a
 * centred column, so pages do not each re-declare their width.
 */
export function AppShell({
  activePage,
  onNavigate,
  currentUser,
  isAdmin,
  isDark,
  onToggleTheme,
  onToggleLang,
  onLogin,
  onRegister,
  onLogout,
  children,
}: AppShellProps) {
  const { t } = useI18n();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // Screen-reader users need focus to land in the new page after navigating;
  // skipped on first paint so the app doesn't steal focus on load.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [activePage]);

  const isHome = activePage === "home";

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-toast focus:rounded-md focus:border focus:border-divider focus:bg-surface focus:px-4 focus:py-2.5 focus:text-small focus:font-medium focus:shadow-overlay"
      >
        {t("skip_to_content")}
      </a>

      <Navbar
        activePage={activePage}
        onNavigate={onNavigate}
        currentUser={currentUser}
        isAdmin={isAdmin}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
        onToggleLang={onToggleLang}
        onLogin={onLogin}
        onRegister={onRegister}
        onLogout={onLogout}
      />

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className={cx(
          "flex-1 outline-none",
          // clears the fixed header — keep in step with the heights set in
          // Navbar (h-[4.75rem] / lg:h-[5.5rem])
          "pt-[4.75rem] lg:pt-[5.5rem]",
          // the homepage composes its own full-bleed bands
          !isHome && "shell pb-section"
        )}
      >
        {children}
      </main>

      <Footer
        onNavigate={onNavigate}
        currentUser={currentUser}
        isAdmin={isAdmin}
      />
    </div>
  );
}
