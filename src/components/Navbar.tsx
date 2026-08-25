import React, { useEffect, useRef, useState } from "react";
import { LogIn, LogOut, Languages, Moon, Shield, Sun, User } from "lucide-react";
import { cx } from "../lib/cx";
import { useI18n } from "../lib/i18nContext";
import type { TranslationKey } from "../lib/i18n";
import { MadarMark } from "../ui/MadarMark";
import { Button, IconButton } from "../ui/Button";

export type PageId =
  | "home"
  | "structure"
  | "events"
  | "news"
  | "points"
  | "contact"
  | "about"
  | "settings"
  | "profile"
  | "admin";

export interface NavItem {
  id: PageId;
  labelKey: TranslationKey;
  authOnly?: boolean;
  adminOnly?: boolean;
}

/** The public spine of the site. Account routes live in the account cluster. */
export const PRIMARY_NAV: NavItem[] = [
  { id: "home", labelKey: "home" },
  { id: "about", labelKey: "about" },
  { id: "structure", labelKey: "structure" },
  { id: "events", labelKey: "events" },
  { id: "news", labelKey: "news" },
  { id: "points", labelKey: "points" },
];

/** Reachable from the mobile menu and the footer on every screen size. */
export const SECONDARY_NAV: NavItem[] = [
  { id: "contact", labelKey: "contact" },
  { id: "settings", labelKey: "settings" },
  { id: "profile", labelKey: "profile", authOnly: true },
  { id: "admin", labelKey: "admin_panel", adminOnly: true },
];

interface NavbarProps {
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
}

/** True once the page has scrolled past the hero's first few pixels. */
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/**
 * The navbar is a hairline, a wordmark and a row of text — no boxed container,
 * no pill buttons. It starts transparent over the hero and settles onto a
 * translucent paper background once the page scrolls, so the top of the page
 * reads as one composition.
 */
export function Navbar({
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
}: NavbarProps) {
  const { t } = useI18n();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (page: PageId) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-nav transition-[background-color,border-color,backdrop-filter] duration-settle ease-standard",
          scrolled
            ? "border-b border-divider bg-canvas/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* `shell-wide` so the bar's margins line up with the hero beneath
            it — on a wide monitor the old narrow shell left the navigation
            visibly inset from the composition it sits above. */}
        <div className="shell-wide flex h-[4.75rem] items-center justify-between gap-8 lg:h-[5.5rem]">
          {/* --- wordmark --- */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group -ms-2 flex shrink-0 items-center gap-3.5 rounded-md px-2 py-2"
            aria-label={t("madar_club")}
          >
            <MadarMark className="h-9 w-9 shrink-0 transition-transform duration-[1200ms] ease-entrance group-hover:rotate-[40deg] lg:h-10 lg:w-10" />
            <span className="font-display text-h3 tracking-tight text-ink">
              {t("madar_club")}
            </span>
          </button>

          {/* --- desktop links ---
              `xl`, not `lg`: laid out on one line the wordmark, six Arabic
              links, two icon buttons and the login/join pair need ~1156px,
              so at the 1024px `lg` breakpoint the row was always overflowing
              its shell and compressing the links. Below 1280px the mobile
              menu handles navigation instead. */}
          <nav aria-label={t("menu")} className="hidden xl:block">
            <ul className="flex items-center gap-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.id}>
                  <NavLink
                    active={activePage === item.id}
                    label={t(item.labelKey)}
                    onClick={() => go(item.id)}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* --- account cluster --- */}
          <div className="flex shrink-0 items-center gap-1.5">
            <IconButton label={t("toggle_theme")} onClick={onToggleTheme}>
              {isDark ? <Sun className="h-[1.15rem] w-[1.15rem]" /> : <Moon className="h-[1.15rem] w-[1.15rem]" />}
            </IconButton>
            <IconButton label={t("language")} onClick={onToggleLang}>
              <Languages className="h-[1.15rem] w-[1.15rem]" />
            </IconButton>

            {currentUser ? (
              <div className="hidden items-center gap-1 xl:flex">
                {isAdmin && (
                  <IconButton
                    label={t("admin_panel")}
                    onClick={() => go("admin")}
                    className={activePage === "admin" ? "text-accent" : undefined}
                  >
                    <Shield className="h-[1.15rem] w-[1.15rem]" />
                  </IconButton>
                )}
                <button
                  type="button"
                  onClick={() => go("profile")}
                  className="ms-1 flex items-center gap-2.5 rounded-md py-1.5 pe-2 ps-1.5 transition-colors duration-quick hover:bg-ink/[0.04]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/[0.07]">
                    <User className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  <span className="max-w-[8rem] truncate text-small font-medium text-ink">
                    {currentUser.fullName?.split(" ")[0]}
                  </span>
                </button>
                <IconButton label={t("logout")} onClick={onLogout}>
                  <LogOut className="h-[1.15rem] w-[1.15rem]" />
                </IconButton>
              </div>
            ) : (
              <div className="ms-2 hidden items-center gap-3 xl:flex">
                <Button variant="ghost" onClick={onLogin}>
                  {t("login_btn")}
                </Button>
                {/* The one place on the page where a filled button appears
                    above the fold — sized up so it reads as the primary
                    action rather than a peer of the nav links. */}
                <Button size="lg" onClick={onRegister} className="px-6">
                  {t("join_us")}
                </Button>
              </div>
            )}

            <MenuToggle
              open={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              label={menuOpen ? t("close_menu") : t("open_menu")}
            />
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activePage={activePage}
        onNavigate={go}
        currentUser={currentUser}
        isAdmin={isAdmin}
        onLogin={onLogin}
        onRegister={onRegister}
        onLogout={onLogout}
      />
    </>
  );
}

/** Desktop link. The active marker is a small orbit dot, not a filled pill. */
function NavLink({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cx(
        // extra bottom padding leaves room for the active dot under the label
        // `whitespace-nowrap` + `shrink-0`: as flex children these default to
        // shrinkable with wrapping text, so once the row ran out of room the
        // two-word Arabic labels ("نبذة عنا", "جدول النقاط") broke onto a
        // second line and those buttons rendered 80px tall against their
        // 52px neighbours — a visibly ragged bar.
        "relative shrink-0 whitespace-nowrap rounded-md px-4 pb-4 pt-2 text-[0.9375rem] transition-colors duration-quick",
        active
          ? "font-medium text-ink"
          : "text-muted hover:text-ink"
      )}
    >
      {label}
      {/* Centred by a full-width flex row rather than a translate — a
          `-translate-x-1/2` would push the dot the wrong way in RTL. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center"
      >
        <span
          className={cx(
            "h-1 w-1 rounded-full bg-accent transition-opacity duration-settle",
            active ? "opacity-100" : "opacity-0"
          )}
        />
      </span>
    </button>
  );
}

/** Two hairlines that cross into an ✕. Hidden from desktop. */
function MenuToggle({
  open,
  onClick,
  label,
}: {
  open: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={open}
      className="ms-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-colors duration-quick hover:bg-ink/[0.04] xl:hidden"
    >
      <span className="relative block h-3.5 w-5" aria-hidden="true">
        <span
          className={cx(
            "absolute inset-x-0 block h-px bg-ink transition-transform duration-settle ease-standard",
            open ? "top-1/2 rotate-45" : "top-0"
          )}
        />
        <span
          className={cx(
            "absolute inset-x-0 block h-px bg-ink transition-transform duration-settle ease-standard",
            open ? "top-1/2 -rotate-45" : "top-full"
          )}
        />
      </span>
    </button>
  );
}

/**
 * Full-screen mobile menu.
 *
 * Built here rather than reusing `Modal` because it is a navigation surface,
 * not a dialog: it fills the viewport, staggers its items in, and the links
 * are set at display size. It still does the things a dialog must — Escape to
 * close, scroll lock, focus moved in and restored on the way out.
 */
function MobileMenu({
  open,
  onClose,
  activePage,
  onNavigate,
  currentUser,
  isAdmin,
  onLogin,
  onRegister,
  onLogout,
}: {
  open: boolean;
  onClose: () => void;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  currentUser: { fullName?: string } | null;
  isAdmin: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}) {
  const { t } = useI18n();
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    panelRef.current?.querySelector<HTMLElement>("button, a")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const items = [
    ...PRIMARY_NAV,
    ...SECONDARY_NAV.filter(
      (item) => (!item.authOnly || currentUser) && (!item.adminOnly || isAdmin)
    ),
  ];

  return (
    <div
      ref={panelRef}
      id="madar-mobile-menu"
      className="fixed inset-0 z-drawer animate-fade-in bg-canvas xl:hidden"
    >
      {/* clears the fixed header so the first link is never underneath it */}
      <div className="flex h-full flex-col overflow-y-auto px-gutter pb-10 pt-[5.5rem]">
        <nav aria-label={t("menu")} className="flex-1">
          <ul>
            {items.map((item, index) => (
              <li
                key={item.id}
                className="enter border-b border-divider"
                style={{ ["--enter-delay" as string]: `${40 + index * 45}ms` }}
              >
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={activePage === item.id ? "page" : undefined}
                  className={cx(
                    "flex w-full items-center justify-between gap-4 py-5 text-start transition-colors duration-quick",
                    activePage === item.id ? "text-accent" : "text-ink hover:text-accent"
                  )}
                >
                  <span className="font-display text-h2">{t(item.labelKey)}</span>
                  <span
                    aria-hidden="true"
                    className={cx(
                      "h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-opacity duration-settle",
                      activePage === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="enter mt-10 flex flex-col gap-3"
          style={{ ["--enter-delay" as string]: `${40 + items.length * 45}ms` }}
        >
          {currentUser ? (
            <Button variant="secondary" size="lg" block onClick={onLogout}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              {t("logout")}
            </Button>
          ) : (
            <>
              <Button size="lg" block onClick={onRegister}>
                {t("join_us")}
              </Button>
              <Button variant="secondary" size="lg" block onClick={onLogin}>
                <LogIn className="h-4 w-4" aria-hidden="true" />
                {t("login_btn")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
