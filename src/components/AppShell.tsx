import React, { useEffect, useRef, useState } from "react";
import {
  Home,
  Network,
  CalendarDays,
  Newspaper,
  Trophy,
  Phone,
  Info,
  Settings,
  User,
  Shield,
  MoreHorizontal,
  LogIn,
  LogOut,
  UserPlus,
  Sun,
  Moon,
  Languages,
} from "lucide-react";
import { cx } from "../lib/cx";
import { useI18n } from "../lib/i18nContext";
import type { TranslationKey } from "../lib/i18n";
import { OrbitLogo } from "../ui/BrandIcons";
import { Button, IconButton } from "../ui/Button";
import { Modal } from "../ui/Modal";

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

interface NavItem {
  id: PageId;
  labelKey: TranslationKey;
  icon: React.ComponentType<{ className?: string }>;
  authOnly?: boolean;
  adminOnly?: boolean;
}

const NAV: NavItem[] = [
  { id: "home", labelKey: "home", icon: Home },
  { id: "structure", labelKey: "structure", icon: Network },
  { id: "events", labelKey: "events", icon: CalendarDays },
  { id: "news", labelKey: "news", icon: Newspaper },
  { id: "points", labelKey: "points", icon: Trophy },
  { id: "about", labelKey: "about", icon: Info },
  { id: "contact", labelKey: "contact", icon: Phone },
  { id: "profile", labelKey: "profile", icon: User, authOnly: true },
  { id: "settings", labelKey: "settings", icon: Settings },
  { id: "admin", labelKey: "admin_panel", icon: Shield, adminOnly: true },
];

// Bottom bar is capped at five targets; everything else lives behind "more".
const BOTTOM_IDS: PageId[] = ["home", "structure", "events", "news"];

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
  const { t, lang } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  const visible = NAV.filter(
    (item) =>
      (!item.authOnly || currentUser) && (!item.adminOnly || isAdmin)
  );
  const bottom = visible.filter((i) => BOTTOM_IDS.includes(i.id));
  const overflow = visible.filter((i) => !BOTTOM_IDS.includes(i.id));

  // Screen-reader users need focus to land in the new page after navigating;
  // skipped on first paint so the app doesn't steal focus on load.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [activePage]);

  const go = (page: PageId) => {
    setMoreOpen(false);
    onNavigate(page);
  };

  return (
    <div className="min-h-dvh bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-toast focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:shadow-overlay"
      >
        {t("skip_to_content")}
      </a>

      {/* ---------- Desktop sidebar (lg+) ---------- */}
      <aside className="fixed inset-y-0 start-0 z-nav hidden w-64 flex-col border-e border-divider bg-surface lg:flex">
        <button
          type="button"
          onClick={() => go("home")}
          className="flex items-center gap-3 px-5 py-6 text-start transition-colors duration-quick hover:bg-ink/[0.03]"
        >
          <OrbitLogo className="h-9 w-9 shrink-0" />
          <span className="font-display text-h3 text-ink">{t("madar_club")}</span>
        </button>

        <nav aria-label={t("menu")} className="flex-1 overflow-y-auto px-3 py-2">
          <ul className="space-y-0.5">
            {visible.map((item) => (
              <li key={item.id}>
                <NavLink
                  item={item}
                  active={activePage === item.id}
                  label={t(item.labelKey)}
                  onClick={() => go(item.id)}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-divider p-3">
          <div className="mb-2 flex gap-1">
            <IconButton label={t("toggle_theme")} onClick={onToggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </IconButton>
            <IconButton label={t("language")} onClick={onToggleLang}>
              <Languages className="h-5 w-5" />
            </IconButton>
          </div>
          {currentUser ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => go("profile")}
                className="flex w-full items-center gap-2.5 rounded-md p-2 text-start transition-colors duration-quick hover:bg-ink/[0.04]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                  <User className="h-4 w-4 text-accent" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-small font-medium text-ink">
                    {currentUser.fullName?.split(" ")[0]}
                  </span>
                  <span className="block truncate text-micro text-muted" dir="ltr">
                    @{currentUser.username}
                  </span>
                </span>
              </button>
              <Button variant="ghost" size="sm" block onClick={onLogout}>
                <LogOut className="h-4 w-4" />
                {t("logout")}
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button size="sm" block onClick={onRegister}>
                <UserPlus className="h-4 w-4" />
                {t("join_us")}
              </Button>
              <Button variant="secondary" size="sm" block onClick={onLogin}>
                <LogIn className="h-4 w-4" />
                {t("login_btn")}
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* ---------- Mobile / tablet top bar ---------- */}
      <header className="sticky top-0 z-nav flex h-14 items-center justify-between gap-2 border-b border-divider bg-surface/90 px-3 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => go("home")}
          className="flex h-11 items-center gap-2 rounded-md px-1"
        >
          <OrbitLogo className="h-7 w-7" />
          <span className="font-display text-body font-semibold text-ink">
            {t("madar_club")}
          </span>
        </button>
        <div className="flex items-center gap-0.5">
          <IconButton label={t("toggle_theme")} onClick={onToggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </IconButton>
          <IconButton label={t("language")} onClick={onToggleLang}>
            <Languages className="h-5 w-5" />
          </IconButton>
          {!currentUser && (
            <Button onClick={onLogin} className="ms-1">
              {t("login_btn")}
            </Button>
          )}
        </div>
      </header>

      {/* ---------- Content ---------- */}
      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className={cx(
          "mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12",
          // clears the fixed bottom bar on small screens
          "pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-16 lg:ms-64 lg:max-w-4xl xl:max-w-5xl"
        )}
      >
        {children}
      </main>

      {/* ---------- Mobile bottom navigation ---------- */}
      <nav
        aria-label={t("menu")}
        className="fixed inset-x-0 bottom-0 z-nav border-t border-divider bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        <ul className="mx-auto flex max-w-lg">
          {bottom.map((item) => (
            <li key={item.id} className="flex-1">
              <BottomLink
                item={item}
                active={activePage === item.id}
                label={t(item.labelKey)}
                onClick={() => go(item.id)}
              />
            </li>
          ))}
          <li className="flex-1">
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              aria-haspopup="dialog"
              className={cx(
                "flex h-14 w-full flex-col items-center justify-center gap-1 text-micro transition-colors duration-quick",
                overflow.some((i) => i.id === activePage)
                  ? "text-accent"
                  : "text-muted hover:text-ink"
              )}
            >
              <MoreHorizontal className="h-5 w-5" />
              <span>{t("more")}</span>
            </button>
          </li>
        </ul>
      </nav>

      <Modal
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        title={t("menu")}
        closeLabel={t("close")}
        size="sm"
      >
        <ul className="space-y-0.5">
          {overflow.map((item) => (
            <li key={item.id}>
              <NavLink
                item={item}
                active={activePage === item.id}
                label={t(item.labelKey)}
                onClick={() => go(item.id)}
              />
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-divider pt-4">
          {currentUser ? (
            <Button
              variant="ghost"
              block
              onClick={() => {
                setMoreOpen(false);
                onLogout();
              }}
            >
              <LogOut className="h-4 w-4" />
              {t("logout")}
            </Button>
          ) : (
            <Button
              block
              onClick={() => {
                setMoreOpen(false);
                onRegister();
              }}
            >
              <UserPlus className="h-4 w-4" />
              {t("join_us")}
            </Button>
          )}
        </div>
      </Modal>

      <footer
        className={cx(
          "border-t border-divider py-8 text-center text-micro text-faint lg:ms-64",
          "pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-8"
        )}
      >
        {t("made_in")}
        {lang === "ar" ? " · " : " · "}
        <span className="nums">{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

function NavLink({
  item,
  active,
  label,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cx(
        "relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-start text-small transition-colors duration-quick",
        active
          ? "bg-accent/10 font-semibold text-ink"
          : "font-medium text-muted hover:bg-ink/[0.04] hover:text-ink"
      )}
    >
      {/* the orbit arc, reused as the active marker */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 start-0 w-0.5 rounded-full bg-accent"
        />
      )}
      <Icon className={cx("h-5 w-5 shrink-0", active ? "text-accent" : "")} />
      {label}
    </button>
  );
}

function BottomLink({
  item,
  active,
  label,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cx(
        "relative flex h-14 w-full flex-col items-center justify-center gap-1 text-micro transition-colors duration-quick",
        active ? "font-semibold text-accent" : "text-muted hover:text-ink"
      )}
    >
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-x-4 top-0 h-0.5 rounded-full bg-accent"
        />
      )}
      <Icon className="h-5 w-5" />
      <span className="max-w-full truncate px-1">{label}</span>
    </button>
  );
}
