import React, { useCallback, useEffect, useRef, useState } from "react";
import { supabase, usernameToAuthEmail } from "./lib/supabaseClient";
import { createT, type Lang } from "./lib/i18n";
import { initialsOf } from "./lib/initials";
import { I18nProvider, useI18n } from "./lib/i18nContext";
import { ToastProvider, useToast } from "./ui/Toast";
import { AppShell, type PageId } from "./components/AppShell";
import { Intro } from "./components/Intro";
import { ConfirmDialog, Modal } from "./ui/Modal";
import { Badge, Tag } from "./ui/Badge";
import { ErrorState } from "./ui/States";
import { HomePage } from "./pages/HomePage";
import { StructurePage } from "./pages/StructurePage";
import { EventsPage } from "./pages/EventsPage";
import { NewsPage } from "./pages/NewsPage";
import { PointsPage } from "./pages/PointsPage";
import { AboutPage, ContactPage } from "./pages/InfoPages";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminPage } from "./pages/AdminPage";
import { AuthPage } from "./pages/AuthPage";
import { CommitteesPage } from "./pages/CommitteesPage";
import { LinkedinIcon, XIcon } from "./ui/BrandIcons";

// ==========================================
// 🔌 Supabase row <-> app-shape mappers  (unchanged)
// ==========================================
const mapProfile = (row: any) => ({
  id: row.id,
  fullName: row.full_name,
  username: row.username,
  email: row.email || "",
  linkedin: row.linkedin || "",
  twitter: row.x_handle || "",
  role: row.role,
  committees: row.committees || [],
  badges: row.badges || [],
  hasSelectedCommittees: row.has_selected_committees,
});

const mapNews = (row: any) => ({
  id: row.id,
  title: row.title,
  content: row.content,
  mediaUrl: row.media_url || "",
  mediaType: row.media_type,
  date: new Date(row.created_at).toLocaleDateString("en-GB"),
});

const mapPoints = (row: any) => ({
  id: row.id,
  name: row.name,
  points: row.points,
});

const mapEvent = (row: any, registeredUsers?: string[]) => ({
  id: row.id,
  title: row.title,
  desc: row.description || "",
  link: row.link || "",
  startDate: row.start_date,
  endDate: row.end_date,
  isCanceled: row.is_canceled,
  registeredUsers: registeredUsers || [],
});

// ==========================================
// 🧭 URL <-> activePage routing  (unchanged)
// ==========================================
const VALID_PAGES: PageId[] = [
  "home",
  "profile",
  "structure",
  "events",
  "news",
  "points",
  "settings",
  "contact",
  "about",
  "admin",
];

const pathToPage = (pathname: string): PageId => {
  const page = pathname.replace(/^\/+/, "") as PageId;
  return VALID_PAGES.includes(page) ? page : "home";
};

const pageToPath = (page: PageId) => (page === "home" ? "/" : `/${page}`);

// ==========================================
// Root: owns the preferences that drive <html lang/dir/class>
// ==========================================
const PREFS_KEY = "madar-preferences";

/**
 * Stored preferences, read once before the first render.
 *
 * This has to be a lazy `useState` initialiser rather than a `useEffect`.
 * Reading in an effect meant the *write* effect below ran in the same commit
 * with the initial defaults still in scope, overwriting the stored value with
 * `{ isDarkMode: false }` before the read's state update had landed. Under
 * StrictMode's double-invoked effects the second read then picked up the
 * clobbered value, so a chosen theme or language never survived a reload.
 * Seeding state directly also avoids a flash of the wrong theme on load.
 */
function readPrefs(): { isDarkMode: boolean; lang: Lang } {
  const fallback = { isDarkMode: false, lang: "ar" as Lang };
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return fallback;
    const prefs = JSON.parse(raw);
    return {
      isDarkMode:
        typeof prefs?.isDarkMode === "boolean"
          ? prefs.isDarkMode
          : fallback.isDarkMode,
      lang: prefs?.lang === "en" || prefs?.lang === "ar" ? prefs.lang : fallback.lang,
    };
  } catch (e) {
    console.error("Error parsing prefs", e);
    return fallback;
  }
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => readPrefs().isDarkMode);
  const [lang, setLang] = useState<Lang>(() => readPrefs().lang);

  useEffect(() => {
    localStorage.setItem(PREFS_KEY, JSON.stringify({ isDarkMode, lang }));
  }, [isDarkMode, lang]);

  return (
    <I18nProvider lang={lang} isDark={isDarkMode}>
      <ToastProvider>
        <MadarApp
          lang={lang}
          setLang={setLang}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      </ToastProvider>
    </I18nProvider>
  );
}

function MadarApp({
  lang,
  setLang,
  isDarkMode,
  setIsDarkMode,
}: {
  lang: Lang;
  // `Dispatch<SetStateAction<…>>`, not `(v: T) => void`. The narrower signature
  // made the functional update form a type error at every call site, which is
  // what pushed the toggles below into computing from a captured value.
  setLang: React.Dispatch<React.SetStateAction<Lang>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useI18n();
  const notify = useToast();

  // ---------- view / routing ----------
  const [appView, setAppView] = useState<
    "main" | "auth" | "intro1" | "committees" | "intro2"
  >("main");
  const [introText, setIntroText] = useState("");
  const [activePage, setActivePage] = useState<PageId>(() =>
    pathToPage(window.location.pathname)
  );
  const isPopNavigation = useRef(false);

  // ---------- data ----------
  const [usersDb, setUsersDb] = useState<any[]>([]);
  const [newsDb, setNewsDb] = useState<any[]>([]);
  const [pointsDb, setPointsDb] = useState<any[]>([]);
  const [eventsDb, setEventsDb] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // ---------- forms ----------
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authForm, setAuthForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [authError, setAuthError] = useState("");
  const [authPending, setAuthPending] = useState(false);

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    username: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    linkedin: "",
    twitter: "",
  });
  const [profileMsg, setProfileMsg] = useState({ text: "", type: "" });
  const [profilePending, setProfilePending] = useState(false);

  // ---------- admin ----------
  const [adminTab, setAdminTab] = useState<
    "members" | "news" | "points" | "events"
  >("members");
  const [adminNewsForm, setAdminNewsForm] = useState({
    title: "",
    content: "",
    mediaUrl: "",
    mediaType: "none",
  });
  const [adminPointsForm, setAdminPointsForm] = useState({
    name: "",
    points: "",
  });
  const [adminEventForm, setAdminEventForm] = useState({
    title: "",
    desc: "",
    link: "",
    startDate: "",
    endDate: "",
  });
  const [badgeSelect, setBadgeSelect] = useState<Record<string, string>>({});
  const [adminPending, setAdminPending] = useState(false);
  const [viewEventUsers, setViewEventUsers] = useState<any>(null);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<string | null>(null);

  // ---------- misc ui ----------
  const [selectedUserCommittees, setSelectedUserCommittees] = useState<string[]>(
    []
  );
  const [committeesPending, setCommitteesPending] = useState(false);
  const [viewUserModal, setViewUserModal] = useState<any>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [eventFilter, setEventFilter] = useState("all");
  const [eventSearch, setEventSearch] = useState("");
  const [registerPendingId, setRegisterPendingId] = useState<number | null>(null);

  const isAdmin = currentUser?.role === "admin";

  // ==========================================
  // 🟡 Data loading  (queries unchanged)
  // ==========================================
  const fetchAllData = useCallback(async () => {
    setLoadError(false);
    try {
      const [profilesRes, newsRes, pointsRes, eventsRes, regsRes] =
        await Promise.all([
          supabase.from("profiles").select("*"),
          supabase
            .from("news")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase.from("points").select("*"),
          supabase
            .from("events")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("event_registrations")
            .select("event_id, profiles(username)"),
        ]);

      if (profilesRes.error || newsRes.error || eventsRes.error) {
        setLoadError(true);
        return [];
      }

      const usersList = (profilesRes.data || []).map(mapProfile);
      setUsersDb(usersList);
      setNewsDb((newsRes.data || []).map(mapNews));
      setPointsDb((pointsRes.data || []).map(mapPoints));

      const registeredByEvent: Record<string, string[]> = {};
      (regsRes.data || []).forEach((r: any) => {
        if (!registeredByEvent[r.event_id]) registeredByEvent[r.event_id] = [];
        if (r.profiles?.username)
          registeredByEvent[r.event_id].push(r.profiles.username);
      });
      setEventsDb(
        (eventsRes.data || []).map((row: any) =>
          mapEvent(row, registeredByEvent[row.id])
        )
      );
      return usersList;
    } catch (e) {
      console.error(e);
      setLoadError(true);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const loadSessionUser = useCallback(async (usersList: any[]) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setAppView("main");
      return;
    }
    const profileRow = usersList?.find((u) => u.id === session.user.id);
    if (!profileRow) {
      setAppView("main");
      return;
    }
    setCurrentUser(profileRow);
    if (profileRow.hasSelectedCommittees || profileRow.role === "admin") {
      setAppView("main");
    } else {
      setAppView("committees");
    }
  }, []);

  useEffect(() => {
    fetchAllData().then((usersList) => loadSessionUser(usersList));
  }, [fetchAllData, loadSessionUser]);

  // Keep the URL in sync so browser back/forward work like a normal site.
  useEffect(() => {
    if (isPopNavigation.current) {
      isPopNavigation.current = false;
      return;
    }
    const path = pageToPath(activePage);
    if (window.location.pathname !== path) {
      window.history.pushState({ activePage }, "", path);
    }
  }, [activePage]);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      isPopNavigation.current = true;
      setActivePage(e.state?.activePage || pathToPage(window.location.pathname));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // ==========================================
  // 🟣 Auth & profile  (validation and queries unchanged)
  // ==========================================
  const goToAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthError("");
    setAppView("auth");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (
      !authForm.fullName ||
      !authForm.username ||
      !authForm.password ||
      !authForm.confirmPassword
    ) {
      setAuthError(t("fill_all"));
      return;
    }
    if (authForm.password !== authForm.confirmPassword) {
      setAuthError(t("passwords_not_match"));
      return;
    }
    if (!/^[A-Za-z0-9_.-]+$/.test(authForm.username)) {
      setAuthError(t("invalid_username"));
      return;
    }
    if (authForm.password.length < 8) {
      setAuthError(t("invalid_password"));
      return;
    }
    const username = authForm.username.toLowerCase();
    if (usersDb.some((u) => u.username.toLowerCase() === username)) {
      setAuthError(t("username_taken"));
      return;
    }

    setAuthPending(true);
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: usernameToAuthEmail(username),
          password: authForm.password,
        });
      if (signUpError || !signUpData.user) {
        setAuthError(signUpError?.message || t("wrong_creds"));
        return;
      }

      const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: signUpData.user.id,
          username,
          full_name: authForm.fullName,
          email: authForm.email || null,
        })
        .select()
        .single();
      if (profileError || !profileRow) {
        setAuthError(profileError?.message || t("wrong_creds"));
        return;
      }

      const newUser = mapProfile(profileRow);
      setUsersDb([...usersDb, newUser]);
      setCurrentUser(newUser);
      setAuthForm({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });

      setIntroText(t("intro_preparing"));
      setAppView("intro1");
    } finally {
      setAuthPending(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthPending(true);
    try {
      const username = authForm.username.toLowerCase();
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: usernameToAuthEmail(username),
          password: authForm.password,
        });
      if (signInError || !signInData.user) {
        setAuthError(t("wrong_creds"));
        return;
      }

      const { data: profileRow } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", signInData.user.id)
        .single();
      if (!profileRow) {
        setAuthError(t("wrong_creds"));
        return;
      }

      const safeUser = mapProfile(profileRow);
      setCurrentUser(safeUser);
      setAuthForm({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });

      if (safeUser.hasSelectedCommittees || safeUser.role === "admin") {
        setIntroText(`${t("intro_welcome")} ${safeUser.fullName.split(" ")[0]}`);
        setAppView("intro2");
      } else {
        setIntroText(t("intro_preparing"));
        setAppView("intro1");
      }
    } finally {
      setAuthPending(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setActivePage("home");
    setShowLogoutConfirm(false);
    setAppView("main");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg({ text: "", type: "" });
    if (!profileForm.fullName || !profileForm.username) {
      setProfileMsg({ text: t("fill_all"), type: "error" });
      return;
    }
    if (!/^[A-Za-z0-9_.-]+$/.test(profileForm.username)) {
      setProfileMsg({ text: t("invalid_username"), type: "error" });
      return;
    }
    const newUsername = profileForm.username.toLowerCase();
    if (
      newUsername !== currentUser?.username?.toLowerCase() &&
      usersDb.some((u) => u.username.toLowerCase() === newUsername)
    ) {
      setProfileMsg({ text: t("username_taken"), type: "error" });
      return;
    }

    setProfilePending(true);
    try {
      if (profileForm.newPassword || profileForm.oldPassword) {
        const { error: reauthError } = await supabase.auth.signInWithPassword({
          email: usernameToAuthEmail(currentUser.username),
          password: profileForm.oldPassword,
        });
        if (reauthError) {
          setProfileMsg({ text: t("wrong_old_password"), type: "error" });
          return;
        }
        if (profileForm.newPassword.length < 8) {
          setProfileMsg({ text: t("invalid_password"), type: "error" });
          return;
        }
        const { error: pwError } = await supabase.auth.updateUser({
          password: profileForm.newPassword,
        });
        if (pwError) {
          setProfileMsg({ text: pwError.message, type: "error" });
          return;
        }
      }

      if (newUsername !== currentUser.username) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: usernameToAuthEmail(newUsername),
        });
        if (emailError) {
          setProfileMsg({ text: emailError.message, type: "error" });
          return;
        }
      }

      const { data: updatedRow, error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: profileForm.fullName,
          username: newUsername,
          email: profileForm.email || null,
          linkedin: profileForm.linkedin || null,
          x_handle: profileForm.twitter || null,
        })
        .eq("id", currentUser.id)
        .select()
        .single();
      if (updateError || !updatedRow) {
        setProfileMsg({
          text: updateError?.message || t("error_generic"),
          type: "error",
        });
        return;
      }

      const updatedUser = mapProfile(updatedRow);
      setCurrentUser(updatedUser);
      setUsersDb(usersDb.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setProfileMsg({ text: t("profile_updated"), type: "success" });
      setProfileForm({ ...profileForm, oldPassword: "", newPassword: "" });
      notify(t("profile_updated"));
    } finally {
      setProfilePending(false);
    }
  };

  // ==========================================
  // 🟠 Admin  (queries unchanged; failures now surface a toast)
  // ==========================================
  const fail = (error: unknown) => {
    console.error(error);
    notify(t("error_generic"), "danger");
  };

  const handleAssignBadge = async (username: string) => {
    const badge = badgeSelect[username];
    if (!badge) return;
    const targetUser = usersDb.find((u) => u.username === username);
    if (!targetUser || targetUser.badges.includes(badge)) return;
    const updatedBadges = [...targetUser.badges, badge];
    const { error } = await supabase
      .from("profiles")
      .update({ badges: updatedBadges })
      .eq("id", targetUser.id);
    if (error) return fail(error);
    setUsersDb(
      usersDb.map((u) =>
        u.id === targetUser.id ? { ...u, badges: updatedBadges } : u
      )
    );
    if (currentUser?.id === targetUser.id)
      setCurrentUser({ ...currentUser, badges: updatedBadges });
    setBadgeSelect({ ...badgeSelect, [username]: "" });
    notify(t("saved"));
  };

  const handleRemoveBadge = async (username: string, badge: string) => {
    const targetUser = usersDb.find((u) => u.username === username);
    if (!targetUser) return;
    const updatedBadges = targetUser.badges.filter((b: string) => b !== badge);
    const { error } = await supabase
      .from("profiles")
      .update({ badges: updatedBadges })
      .eq("id", targetUser.id);
    if (error) return fail(error);
    setUsersDb(
      usersDb.map((u) =>
        u.id === targetUser.id ? { ...u, badges: updatedBadges } : u
      )
    );
    if (currentUser?.id === targetUser.id)
      setCurrentUser({ ...currentUser, badges: updatedBadges });
  };

  const handleDeleteUser = async (username: string) => {
    const targetUser = usersDb.find((u) => u.username === username);
    if (!targetUser || targetUser.role === "admin") return;
    setAdminPending(true);
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", targetUser.id);
    setAdminPending(false);
    setConfirmDeleteUser(null);
    if (error) return fail(error);
    setUsersDb(usersDb.filter((u) => u.id !== targetUser.id));
    notify(t("saved"));
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNewsForm.title || !adminNewsForm.content) return;
    setAdminPending(true);
    const { data, error } = await supabase
      .from("news")
      .insert({
        title: adminNewsForm.title,
        content: adminNewsForm.content,
        media_url: adminNewsForm.mediaUrl || null,
        media_type: adminNewsForm.mediaType,
      })
      .select()
      .single();
    setAdminPending(false);
    if (error || !data) return fail(error);
    setNewsDb([mapNews(data), ...newsDb]);
    setAdminNewsForm({
      title: "",
      content: "",
      mediaUrl: "",
      mediaType: "none",
    });
    notify(t("saved"));
  };

  const handleDeleteNews = async (id: number) => {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) return fail(error);
    setNewsDb(newsDb.filter((n) => n.id !== id));
  };

  const handleAddPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminPointsForm.name || !adminPointsForm.points) return;
    const pointsNum = parseInt(adminPointsForm.points, 10) || 0;
    setAdminPending(true);
    const { data, error } = await supabase
      .from("points")
      .upsert(
        { name: adminPointsForm.name, points: pointsNum },
        { onConflict: "name" }
      )
      .select()
      .single();
    setAdminPending(false);
    if (error || !data) return fail(error);
    const existing = pointsDb.find((p) => p.name === adminPointsForm.name);
    setPointsDb(
      existing
        ? pointsDb.map((p) =>
            p.name === adminPointsForm.name ? mapPoints(data) : p
          )
        : [...pointsDb, mapPoints(data)]
    );
    setAdminPointsForm({ name: "", points: "" });
    notify(t("saved"));
  };

  const handleDeletePoints = async (id: number) => {
    const { error } = await supabase.from("points").delete().eq("id", id);
    if (error) return fail(error);
    setPointsDb(pointsDb.filter((p) => p.id !== id));
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !adminEventForm.title ||
      !adminEventForm.startDate ||
      !adminEventForm.endDate
    )
      return;
    setAdminPending(true);
    const { data, error } = await supabase
      .from("events")
      .insert({
        title: adminEventForm.title,
        description: adminEventForm.desc || null,
        link: adminEventForm.link || null,
        start_date: adminEventForm.startDate,
        end_date: adminEventForm.endDate,
      })
      .select()
      .single();
    setAdminPending(false);
    if (error || !data) return fail(error);
    setEventsDb([mapEvent(data, []), ...eventsDb]);
    setAdminEventForm({
      title: "",
      desc: "",
      link: "",
      startDate: "",
      endDate: "",
    });
    notify(t("saved"));
  };

  const handleCancelEvent = async (id: number) => {
    const { error } = await supabase
      .from("events")
      .update({ is_canceled: true })
      .eq("id", id);
    if (error) return fail(error);
    setEventsDb(
      eventsDb.map((ev) => (ev.id === id ? { ...ev, isCanceled: true } : ev))
    );
    notify(t("saved"));
  };

  const handleDeleteEvent = async (id: number) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return fail(error);
    setEventsDb(eventsDb.filter((ev) => ev.id !== id));
  };

  const handleRegisterEvent = async (id: number) => {
    if (!currentUser) return;
    setRegisterPendingId(id);
    const { error } = await supabase
      .from("event_registrations")
      .insert({ event_id: id, user_id: currentUser.id });
    setRegisterPendingId(null);
    if (error) return fail(error);
    setEventsDb(
      eventsDb.map((ev) =>
        ev.id === id &&
        !(ev.registeredUsers || []).includes(currentUser.username)
          ? {
              ...ev,
              registeredUsers: [
                ...(ev.registeredUsers || []),
                currentUser.username,
              ],
            }
          : ev
      )
    );
    notify(t("already_registered"));
  };

  // ==========================================
  // 🛠 Utilities  (unchanged)
  // ==========================================
  const getEventStatus = (evt: any) => {
    if (evt.isCanceled) return "canceled";
    const now = new Date();
    const start = new Date(evt.startDate);
    const end = new Date(evt.endDate);
    end.setHours(23, 59, 59, 999);
    if (now < start) return "upcoming";
    if (now > end) return "past";
    return "current";
  };

  const saveCommittees = async (isSkipped = false) => {
    const committees = isSkipped ? [] : selectedUserCommittees;
    setCommitteesPending(true);
    const { data, error } = await supabase
      .from("profiles")
      .update({ committees, has_selected_committees: true })
      .eq("id", currentUser.id)
      .select()
      .single();
    setCommitteesPending(false);
    if (error || !data) return fail(error);
    const updatedUser = mapProfile(data);
    setCurrentUser(updatedUser);
    setUsersDb(usersDb.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIntroText(`${t("intro_welcome")} ${updatedUser.fullName.split(" ")[0]}`);
    setAppView("intro2");
  };

  const toggleCommitteeSelection = (name: string) => {
    if (selectedUserCommittees.includes(name))
      setSelectedUserCommittees(
        selectedUserCommittees.filter((c) => c !== name)
      );
    else if (selectedUserCommittees.length < 3)
      setSelectedUserCommittees([...selectedUserCommittees, name]);
    else notify(t("max_reached"), "info");
  };

  const openProfile = () => {
    setProfileForm({
      fullName: currentUser?.fullName || "",
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      linkedin: currentUser?.linkedin || "",
      twitter: currentUser?.twitter || "",
      oldPassword: "",
      newPassword: "",
    });
    setProfileMsg({ text: "", type: "" });
  };

  const navigate = (page: PageId) => {
    if (page === "profile") openProfile();
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  // ==========================================
  // 🖥 Views
  // ==========================================
  if (appView === "intro1" || appView === "intro2") {
    return (
      <Intro
        message={introText}
        onDone={() => {
          if (appView === "intro1") {
            setAppView("committees");
          } else {
            setActivePage("home");
            setAppView("main");
          }
        }}
      />
    );
  }

  if (appView === "auth") {
    return (
      <AuthPage
        mode={authMode}
        onModeChange={(mode) => {
          setAuthMode(mode);
          setAuthError("");
        }}
        form={authForm}
        onFormChange={setAuthForm}
        error={authError}
        pending={authPending}
        onSubmit={authMode === "login" ? handleLogin : handleRegister}
        onBack={() => {
          setAuthError("");
          setAppView("main");
        }}
      />
    );
  }

  if (appView === "committees") {
    return (
      <CommitteesPage
        selected={selectedUserCommittees}
        onToggle={toggleCommitteeSelection}
        onSave={() => saveCommittees(false)}
        onSkip={() => saveCommittees(true)}
        pending={committeesPending}
      />
    );
  }

  /**
   * Both toggles derive the next value inside the updater rather than from the
   * render that created the handler. Written as `setIsDarkMode(!isDarkMode)`
   * the handler closed over the value it was built with, so two presses landing
   * in one batch both computed the same result and React collapsed them into a
   * single flip — the control visibly "missing" a press.
   */
  const toggleTheme = () => setIsDarkMode((dark) => !dark);
  const toggleLang = () => setLang((current) => (current === "ar" ? "en" : "ar"));

  return (
    <AppShell
      activePage={activePage}
      onNavigate={navigate}
      currentUser={currentUser}
      isAdmin={isAdmin}
      isDark={isDarkMode}
      onToggleTheme={toggleTheme}
      onToggleLang={toggleLang}
      onLogin={() => goToAuth("login")}
      onRegister={() => goToAuth("register")}
      onLogout={() => setShowLogoutConfirm(true)}
    >
      {loadError && activePage === "home" ? (
        <ErrorState
          title={t("error_generic")}
          message={t("error_network")}
          retryLabel={t("retry")}
          onRetry={() => {
            setLoading(true);
            fetchAllData();
          }}
        />
      ) : (
        <>
          {activePage === "home" && (
            <HomePage
              loading={loading}
              news={newsDb}
              events={eventsDb}
              memberCount={usersDb.length}
              currentUser={currentUser}
              onNavigate={navigate}
              onRegister={() => goToAuth("register")}
              getEventStatus={getEventStatus as any}
            />
          )}

          {activePage === "structure" && (
            <StructurePage
              members={usersDb}
              loading={loading}
              onViewMember={setViewUserModal}
            />
          )}

          {activePage === "events" && (
            <EventsPage
              events={eventsDb}
              loading={loading}
              error={loadError}
              onRetry={() => {
                setLoading(true);
                fetchAllData();
              }}
              currentUser={currentUser}
              filter={eventFilter}
              onFilterChange={setEventFilter}
              search={eventSearch}
              onSearchChange={setEventSearch}
              getEventStatus={getEventStatus as any}
              onRegister={handleRegisterEvent}
              pendingId={registerPendingId}
            />
          )}

          {activePage === "news" && (
            <NewsPage
              news={newsDb}
              loading={loading}
              error={loadError}
              onRetry={() => {
                setLoading(true);
                fetchAllData();
              }}
            />
          )}

          {activePage === "points" && (
            <PointsPage
              points={pointsDb}
              loading={loading}
              error={loadError}
              onRetry={() => {
                setLoading(true);
                fetchAllData();
              }}
            />
          )}

          {activePage === "about" && <AboutPage />}
          {activePage === "contact" && <ContactPage />}

          {activePage === "settings" && (
            <SettingsPage
              isDark={isDarkMode}
              onThemeChange={setIsDarkMode}
              lang={lang}
              onLangChange={setLang}
            />
          )}

          {activePage === "profile" && currentUser && (
            <ProfilePage
              user={currentUser}
              form={profileForm}
              onFormChange={setProfileForm}
              message={profileMsg}
              pending={profilePending}
              onSubmit={handleProfileUpdate}
            />
          )}

          {activePage === "admin" && isAdmin && (
            <AdminPage
              tab={adminTab}
              onTabChange={setAdminTab}
              members={usersDb}
              news={newsDb}
              points={pointsDb}
              events={eventsDb}
              badgeSelect={badgeSelect}
              onBadgeSelect={(username, badge) =>
                setBadgeSelect({ ...badgeSelect, [username]: badge })
              }
              onAssignBadge={handleAssignBadge}
              onRemoveBadge={handleRemoveBadge}
              onDeleteUser={setConfirmDeleteUser}
              newsForm={adminNewsForm}
              onNewsFormChange={setAdminNewsForm}
              onAddNews={handleAddNews}
              onDeleteNews={handleDeleteNews}
              pointsForm={adminPointsForm}
              onPointsFormChange={setAdminPointsForm}
              onAddPoints={handleAddPoints}
              onDeletePoints={handleDeletePoints}
              eventForm={adminEventForm}
              onEventFormChange={setAdminEventForm}
              onAddEvent={handleAddEvent}
              onCancelEvent={handleCancelEvent}
              onDeleteEvent={handleDeleteEvent}
              onViewRegistrations={setViewEventUsers}
              pending={adminPending}
            />
          )}
        </>
      )}

      {/* ---------- Dialogs ---------- */}
      <Modal
        open={Boolean(viewUserModal)}
        onClose={() => setViewUserModal(null)}
        title={viewUserModal?.fullName || ""}
        closeLabel={t("close")}
        size="sm"
      >
        {viewUserModal && (
          <div className="flex flex-col items-center text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/35 bg-accent/[0.07]">
              <span className="text-h2 font-medium text-accent">
                {initialsOf(viewUserModal.fullName)}
              </span>
            </span>
            <p className="latin mt-4 text-small text-faint" dir="ltr">
              @{viewUserModal.username}
            </p>
            {viewUserModal.badges?.length > 0 && (
              <ul className="mt-5 flex flex-wrap justify-center gap-2">
                {viewUserModal.badges.map((badge: string) => (
                  <li key={badge}>
                    <Badge tone="accent">{badge}</Badge>
                  </li>
                ))}
              </ul>
            )}
            {viewUserModal.committees?.length > 0 && (
              <ul className="mt-3 flex flex-wrap justify-center gap-2">
                {viewUserModal.committees.map((committee: string) => (
                  <li key={committee}>
                    <Tag>{committee}</Tag>
                  </li>
                ))}
              </ul>
            )}
            {(viewUserModal.linkedin || viewUserModal.twitter) && (
              <div className="mt-7 flex gap-2 border-t border-divider pt-6">
                {viewUserModal.linkedin && (
                  <a
                    href={viewUserModal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-divider text-accent transition-colors duration-quick hover:border-accent/50 hover:bg-accent/[0.06]"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                )}
                {viewUserModal.twitter && (
                  <a
                    href={viewUserModal.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-divider text-accent transition-colors duration-quick hover:border-accent/50 hover:bg-accent/[0.06]"
                  >
                    <XIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(viewEventUsers)}
        onClose={() => setViewEventUsers(null)}
        title={viewEventUsers?.title || ""}
        description={t("view_registered")}
        closeLabel={t("close")}
        size="sm"
      >
        {(viewEventUsers?.registeredUsers || []).length === 0 ? (
          <p className="text-small text-muted">{t("event_no_registrations")}</p>
        ) : (
          <ul className="divide-y divide-divider border-y border-divider">
            {viewEventUsers?.registeredUsers.map((username: string) => (
              <li
                key={username}
                className="latin py-2.5 text-small text-ink"
                dir="ltr"
              >
                @{username}
              </li>
            ))}
          </ul>
        )}
      </Modal>

      <ConfirmDialog
        open={Boolean(confirmDeleteUser)}
        title={t("confirm_delete_title")}
        message={t("confirm_delete_member")}
        confirmLabel={t("delete_btn")}
        cancelLabel={t("cancel")}
        closeLabel={t("close")}
        destructive
        pending={adminPending}
        onConfirm={() =>
          confirmDeleteUser && handleDeleteUser(confirmDeleteUser)
        }
        onCancel={() => setConfirmDeleteUser(null)}
      />

      <ConfirmDialog
        open={showLogoutConfirm}
        title={t("logout")}
        message={t("are_you_sure")}
        confirmLabel={t("yes_logout")}
        cancelLabel={t("cancel")}
        closeLabel={t("close")}
        destructive
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </AppShell>
  );
}
