import React, { useState, useEffect } from "react";
import {
  Users,
  Settings,
  Lightbulb,
  Handshake,
  Mic,
  Palette,
  BookOpen,
  Calendar,
  Truck,
  UserCheck,
  Briefcase,
  X,
  Share2,
  ShieldCheck,
  VolumeX,
  LogIn,
  UserPlus,
  LogOut,
  AlertCircle,
  Menu,
  Home,
  Info,
  Newspaper,
  Trophy,
  Phone,
  Mail,
  Network,
  Globe,
  CheckCircle2,
  ChevronRight,
  Save,
  Activity,
  Heart,
  Sparkles,
  Rocket,
  ChevronDown,
  User,
  SkipForward,
  Lock,
  Edit3,
  MessageCircle,
  Shield,
  Crown,
  Medal,
  Plus,
  Trash2,
  Star,
  Award,
  Image as ImageIcon,
  Link,
  CalendarDays,
  Search,
  Filter,
  UserMinus,
  Eye,
  Camera,
} from "lucide-react";

// ==========================================
// ⭐️ منطقة الإعدادات الثابتة ⭐️
// ==========================================
const CLUB_DATA = {
  logoUrlLight:
    "https://i.postimg.cc/9Mr0S2VV/Gemini-Generated-Image-kw9607kw9607kw96-1-removebg-preview.png",
  logoUrlDark:
    "https://i.postimg.cc/rs2TJ2p6/Gemini-Generated-Image-wqmn48wqmn48wqmn-removebg-preview.png",
  contact: {
    email: "info@madarclub.com",
    phone: "+966 5X XXX XXXX",
    whatsapp: "+966 5X XXX XXXX",
    instagram: "@MadarClub",
    tiktok: "@MadarClub",
    x_platform: "@MadarClub_SA",
  },
};

// أيقونات مخصصة
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);
const WhatsAppIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.48-1.459-1.653-1.756-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);
const InstagramIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const AVAILABLE_BADGES = [
  "رئيس مجلس النادي",
  "نائب الرئيس",
  "رئيس القطاع الجوهري",
  "رئيس القطاع الإبداعي",
  "رئيس القطاع التشغيلي",
  "لجنة الموارد البشرية - رئيس",
  "لجنة الموارد البشرية - نائب",
  "لجنة مدار - رئيس",
  "لجنة مدار - نائب",
  "لجنة التدريب وورش العمل - رئيس",
  "لجنة التدريب وورش العمل - نائب",
  "اللجنة الإعلامية - رئيس",
  "اللجنة الإعلامية - نائب",
  "اللجنة التعليمية والتثقيفية - رئيس",
  "اللجنة التعليمية والتثقيفية - نائب",
  "لجنة البودكاست - رئيس",
  "لجنة البودكاست - نائب",
  "لجنة الخدمات - رئيس",
  "لجنة الخدمات - نائب",
  "لجنة تنظيم الفعاليات - رئيس",
  "لجنة تنظيم الفعاليات - نائب",
  "لجنة العلاقات العامة والشراكات - رئيس",
  "لجنة العلاقات العامة والشراكات - نائب",
  "عضو متميز",
  "نجم الشهر",
];

// ==========================================
// 🌐 قاموس الترجمة
// ==========================================
const translations = {
  ar: {
    login_portal: "بوابة الدخول",
    fullname: "الاسم الكامل",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    confirm_password: "تأكيد كلمة المرور",
    email_optional: "البريد الإلكتروني (اختياري)",
    linkedin_optional: "رابط LinkedIn (اختياري)",
    x_optional: "حساب منصة X (اختياري)",
    login_btn: "تسجيل الدخول",
    join_us: "إنضم معنا",
    register_btn: "إنشاء حساب",
    new_member: "عضو جديد في النادي؟",
    have_account: "لديك حساب مسبقاً؟",
    create_new: "إنشاء حساب جديد",
    login_here: "تسجيل الدخول هنا",
    welcome: "مرحباً يا",
    logout: "خروج",
    are_you_sure: "هل أنت متأكد من الخروج؟",
    yes_logout: "نعم، خروج",
    cancel: "إلغاء",
    menu: "القائمة",
    home: "الرئيسية",
    structure: "هيكلة النادي",
    about: "نبذة عنا",
    news: "الاخبار",
    points: "جدول النقاط",
    events: "الفعاليات",
    contact: "التواصل",
    settings: "الإعدادات",
    profile: "الملف الشخصي",
    admin_panel: "لوحة الإدارة",
    madar_club: "نادي مـدار",
    coming_soon: "انتظرونا قريباً ..",
    coming_soon_sub: "في مدار بصمةٌ تـبقى، وفـكرٌ يُـدار",
    melody: "لحن مـدار",
    music_soon: "بتوصل قريب 😉",
    board_directors: "مجلس النادي",
    sectors: "القطاعات واللجان",
    click_to_reveal: "انقر للتفاصيل",
    team_members: "أعضاء اللجنة",
    made_in: "صنع في الطائف",
    about_title: "نبذة عن نادي مدار",
    about_p1:
      "نادي مدار هو بيئة إبداعية وتفاعلية تهدف إلى صقل مهارات الطلاب وتنمية مواهبهم من خلال برامج وفعاليات نوعية تُدار بعقول شابة وطموحة.",
    about_p2:
      "نسعى في مدار لأن نكون الوجهة الأولى للمبدعين، حيث نجمع بين متعة التعلم واحترافية العمل في مختلف القطاعات واللجان المتخصصة.",
    about_footer_p1: "مهند",
    about_footer_p2: " زرع الفكرة، و",
    about_footer_p3: "محمد",
    about_footer_p4: " سقى الحلم، و",
    about_footer_p5: "علي",
    about_footer_p6: " رتّب الخطوة، و",
    about_footer_p7: "سعود",
    about_footer_p8:
      " ثبّت الأساس.. ولكن أنتم الأعضاء اللي بتكبرون هالحلم وبكم ومعكم يمتد الأثر",
    choose_committees: "اختيار اللجان",
    choose_committees_sub: "لتكتمل رحلتك، اختر اللجان التي تود الإبداع فيها",
    save_committees: "تأكيد الانضمام",
    no_members_yet: "لا يوجد أعضاء مسجلين هنا بعد.",
    max_reached: "لقد وصلت للحد الأقصى (3 لجان)",
    skip: "تخطي",
    intro_preparing: "جاري تجهيز مساحتك الإبداعية...",
    intro_welcome: "أهلاً بك في عالمك يا",
    news_title: "أخبار النادي",
    coming_soon_msg: "لا توجد بيانات حالياً.",
    points_title: "جدول النقاط والتنافس",
    contact_title: "تواصل معنا",
    theme_title: "مظهر الموقع (Theme)",
    language: "لغة العرض (Language)",
    light_mode: "الوضع الساطع",
    dark_mode: "الوضع الداكن",
    fill_all: "الرجاء تعبئة الحقول الأساسية",
    passwords_not_match: "كلمتا المرور غير متطابقتين",
    username_taken: "اسم المستخدم هذا محجوز مسبقاً.",
    wrong_creds: "اسم المستخدم أو كلمة المرور غير صحيحة.",
    invalid_username:
      "اسم المستخدم يجب أن يكون باللغة الإنجليزية والأرقام فقط.",
    invalid_password:
      "كلمة المرور يجب أن تكون ٨ أحرف إنجليزية/أرقام على الأقل.",
    update_profile: "تحديث البيانات",
    old_password: "كلمة المرور القديمة",
    new_password: "كلمة المرور الجديدة (اختياري)",
    profile_updated: "تم تحديث البيانات بنجاح!",
    wrong_old_password: "كلمة المرور القديمة غير صحيحة.",
    admin_members: "الأعضاء",
    admin_news: "الأخبار",
    admin_points: "النقاط",
    admin_events: "الفعاليات",
    add_btn: "إضافة / نشر",
    delete_btn: "حذف",
    cancel_btn: "إلغاء الفعالية",
    events_all: "الكل",
    events_current: "الحالية",
    events_upcoming: "القادمة",
    events_past: "السابقة",
    events_registered: "مسجل بها",
    events_canceled: "ملغاة",
    register_event: "التسجيل في الفعالية",
    already_registered: "تم التسجيل",
    view_registered: "عرض المسجلين",
    my_badges: "أوسمتي ومناصبي",
    vacant: "شاغر",
    assign_badge: "منح وسام/منصب",
    social_links: "حسابات التواصل",
    news_title_input: "عنوان الخبر",
    news_content_input: "التفاصيل (المحتوى)",
    news_media_url: "رابط الوسائط (صورة أو فيديو - اختياري)",
    news_media_type: "نوع الوسائط",
    media_none: "بدون وسائط",
    media_image: "صورة",
    media_video: "فيديو (مباشر أو يوتيوب)",
  },
  en: {
    login_portal: "Login Portal",
    fullname: "Full Name",
    username: "Username",
    password: "Password",
    confirm_password: "Confirm Password",
    email_optional: "Email (Optional)",
    linkedin_optional: "LinkedIn URL (Optional)",
    x_optional: "X Username (Optional)",
    login_btn: "Login",
    join_us: "Join Us",
    register_btn: "Create Account",
    new_member: "New member?",
    have_account: "Already have an account?",
    create_new: "Create new account",
    login_here: "Login here",
    welcome: "Welcome",
    logout: "Logout",
    are_you_sure: "Are you sure you want to log out?",
    yes_logout: "Yes, Logout",
    cancel: "Cancel",
    menu: "Menu",
    home: "Home",
    structure: "Club Structure",
    about: "About Us",
    news: "News",
    points: "Leaderboard",
    events: "Events",
    contact: "Contact",
    settings: "Settings",
    profile: "Profile",
    admin_panel: "Admin Panel",
    madar_club: "Madar Club",
    coming_soon: "COMING SOON ..",
    coming_soon_sub: "In Madar, a lasting mark, a managed thought",
    melody: "Madar Melody",
    music_soon: "Coming soon 😉",
    board_directors: "Club Board",
    sectors: "Sectors & Committees",
    click_to_reveal: "Click for details",
    team_members: "Committee Members",
    made_in: "Made in TAIF",
    about_title: "About Madar Club",
    about_p1:
      "Madar Club is an interactive creative environment aimed at refining students' skills.",
    about_p2: "We strive to be the premier destination for creators.",
    about_footer_p1: "Mohannad",
    about_footer_p2: " planted the idea, ",
    about_footer_p3: "Mohammed",
    about_footer_p4: " watered the dream, ",
    about_footer_p5: "Ali",
    about_footer_p6: " organized the steps, and ",
    about_footer_p7: "Saud",
    about_footer_p8:
      " fixed the foundation.. But you, the members, grow this dream.",
    choose_committees: "Choose Committees",
    choose_committees_sub: "Choose up to 3 committees to join",
    save_committees: "Confirm Joining",
    no_members_yet: "No members registered yet.",
    max_reached: "Max 3 committees reached",
    skip: "Skip",
    intro_preparing: "Preparing your creative space...",
    intro_welcome: "Welcome to your world,",
    news_title: "Club News",
    coming_soon_msg: "No news available right now.",
    points_title: "Leaderboard",
    contact_title: "Contact Us",
    theme_title: "Website Theme",
    language: "Language",
    light_mode: "Light Mode",
    dark_mode: "Dark Mode",
    fill_all: "Please fill required fields",
    passwords_not_match: "Passwords do not match",
    username_taken: "This username is taken.",
    wrong_creds: "Invalid credentials.",
    invalid_username: "English letters/numbers only.",
    invalid_password: "Password must be at least 8 characters.",
    update_profile: "Update Profile",
    old_password: "Old Password",
    new_password: "New Password (Optional)",
    profile_updated: "Profile updated successfully!",
    wrong_old_password: "Incorrect old password.",
    admin_members: "Members",
    admin_news: "News",
    admin_points: "Points",
    admin_events: "Events",
    add_btn: "Add / Publish",
    delete_btn: "Delete",
    cancel_btn: "Cancel Event",
    events_all: "All",
    events_current: "Current",
    events_upcoming: "Upcoming",
    events_past: "Past",
    events_registered: "Registered",
    events_canceled: "Canceled",
    register_event: "Register for Event",
    already_registered: "Registered",
    view_registered: "View Registrations",
    my_badges: "My Badges & Roles",
    vacant: "Vacant",
    assign_badge: "Assign Badge/Role",
    social_links: "Social Links",
    news_title_input: "News Title",
    news_content_input: "Content",
    news_media_url: "Media URL (Optional)",
    news_media_type: "Media Type",
    media_none: "None",
    media_image: "Image",
    media_video: "Video",
  },
};

export default function App() {
  // ==========================================
  // 🟢 States (حالات التطبيق)
  // ==========================================
  const [appView, setAppView] = useState("main"); // ['main', 'auth', 'intro1', 'committees', 'intro2']
  const [introText, setIntroText] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMusicToast, setShowMusicToast] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lang, setLang] = useState("ar");

  const [currentUser, setCurrentUser] = useState(null);

  // Safe DB States
  const [usersDb, setUsersDb] = useState([]);
  const [newsDb, setNewsDb] = useState([]);
  const [pointsDb, setPointsDb] = useState([]);
  const [eventsDb, setEventsDb] = useState([]);

  // Forms
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [authError, setAuthError] = useState("");

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

  // Admin States
  const [adminTab, setAdminTab] = useState("members");
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
  const [badgeSelect, setBadgeSelect] = useState({});
  const [viewEventUsers, setViewEventUsers] = useState(null);

  // General Components States
  const [selectedUserCommittees, setSelectedUserCommittees] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [viewUserModal, setViewUserModal] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [eventFilter, setEventFilter] = useState("all");
  const [eventSearch, setEventSearch] = useState("");

  // ==========================================
  // 🔵 Helpers (دوال مساعدة)
  // ==========================================
  const t = (key) => translations[lang][key] || key;
  const currentLogo = isDarkMode
    ? CLUB_DATA.logoUrlDark
    : CLUB_DATA.logoUrlLight;
  const isAdmin = currentUser?.username?.toLowerCase() === "admin";

  const dir = lang === "ar" ? "rtl" : "ltr";
  const appFont =
    lang === "ar" ? "Tajawal, sans-serif" : "system-ui, sans-serif";
  const titleFont =
    lang === "ar" ? "Cairo, sans-serif" : "system-ui, sans-serif";

  // الثيم الأساسي المسطح السادة
  const theme = {
    bg: isDarkMode ? "bg-[#0B132B]" : "bg-[#FDF5E6]",
    textPrimary: isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]",
    textSecondary: isDarkMode ? "text-[#D4AF37]/80" : "text-[#8B4513]",
    cardBg: isDarkMode ? "bg-[#1C2541]" : "bg-white",
    cardBorder: isDarkMode ? "border-[#D4AF37]/30" : "border-[#D2B48C]/20",
    accent: isDarkMode ? "text-[#D4AF37]" : "text-[#E2725B]",
    buttonBg: isDarkMode ? "bg-[#D4AF37]" : "bg-[#3E2723]",
    buttonText: isDarkMode ? "text-[#0B132B]" : "text-white",
    iconBg: isDarkMode ? "bg-[#0B132B]" : "bg-[#FDF5E6]",
    inputBg: isDarkMode ? "bg-[#0B132B]/50" : "bg-[#FDF5E6]/50",
    inputBorder: isDarkMode ? "border-[#D4AF37]/50" : "border-[#D2B48C]/40",
    glow: isDarkMode ? "shadow-[0_0_20px_rgba(212,175,55,0.2)]" : "shadow-xl",
  };

  // ==========================================
  // 🟡 UseEffects
  // ==========================================
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
    if (!document.getElementById("arabic-fonts")) {
      const link = document.createElement("link");
      link.id = "arabic-fonts";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Tajawal:wght@300;400;500;700;800&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const safeParse = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key)) || [];
      } catch (e) {
        return [];
      }
    };

    setUsersDb(safeParse("madar-users-db"));
    setNewsDb(safeParse("madar-news-db"));
    setPointsDb(safeParse("madar-points-db"));
    setEventsDb(safeParse("madar-events-db"));

    try {
      const activeStr = sessionStorage.getItem("madar-active-user");
      if (activeStr) {
        const activeUser = JSON.parse(activeStr);
        if (activeUser) {
          const safeUser = {
            ...activeUser,
            committees: activeUser.committees || [],
            badges: activeUser.badges || [],
          };
          setCurrentUser(safeUser);

          if (
            safeUser.hasSelectedCommittees ||
            safeUser.username.toLowerCase() === "admin"
          ) {
            setAppView("main");
          } else {
            setAppView("committees");
          }
        }
      }
    } catch (e) {
      console.error("Error parsing session user", e);
      setAppView("main");
    }

    try {
      const prefsStr = localStorage.getItem("madar-preferences");
      if (prefsStr) {
        const prefs = JSON.parse(prefsStr);
        if (prefs?.isDarkMode !== undefined) setIsDarkMode(prefs.isDarkMode);
        if (prefs?.lang) setLang(prefs.lang);
      }
    } catch (e) {
      console.error("Error parsing prefs", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "madar-preferences",
      JSON.stringify({ isDarkMode, lang })
    );
  }, [isDarkMode, lang]);

  // ==========================================
  // 🟣 Auth & Profile Handlers
  // ==========================================
  const goToAuth = (mode) => {
    setIsMenuOpen(false);
    setAuthMode(mode);
    setAuthError("");
    setAppView("auth");
  };

  const handleRegister = (e) => {
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
    if (
      usersDb.some(
        (u) => u.username.toLowerCase() === authForm.username.toLowerCase()
      )
    ) {
      setAuthError(t("username_taken"));
      return;
    }

    const newUser = {
      fullName: authForm.fullName,
      username: authForm.username.toLowerCase(),
      password: authForm.password,
      email: authForm.email,
      linkedin: "",
      twitter: "",
      committees: [],
      badges: [],
      hasSelectedCommittees: false,
    };

    const updatedDb = [...usersDb, newUser];
    setUsersDb(updatedDb);
    localStorage.setItem("madar-users-db", JSON.stringify(updatedDb));

    setCurrentUser(newUser);
    sessionStorage.setItem("madar-active-user", JSON.stringify(newUser));
    setAuthForm({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    });

    setIntroText(t("intro_preparing"));
    setAppView("intro1");
    setTimeout(() => setAppView("committees"), 4000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError("");
    const foundUser = usersDb.find(
      (u) =>
        u.username.toLowerCase() === authForm.username.toLowerCase() &&
        u.password === authForm.password
    );
    if (foundUser) {
      const safeUser = {
        ...foundUser,
        committees: foundUser.committees || [],
        badges: foundUser.badges || [],
      };
      setCurrentUser(safeUser);
      sessionStorage.setItem("madar-active-user", JSON.stringify(safeUser));
      setAuthForm({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });

      if (
        safeUser.hasSelectedCommittees ||
        safeUser.username.toLowerCase() === "admin"
      ) {
        setIntroText(
          `${t("intro_welcome")} ${safeUser.fullName.split(" ")[0]}`
        );
        setAppView("intro2");
        setTimeout(() => {
          setActivePage("home");
          setAppView("main");
        }, 4000);
      } else {
        setIntroText(t("intro_preparing"));
        setAppView("intro1");
        setTimeout(() => setAppView("committees"), 4000);
      }
    } else {
      setAuthError(t("wrong_creds"));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("madar-active-user");
    setActivePage("home");
    setIsMenuOpen(false);
    setShowLogoutConfirm(false);
    setAppView("main");
  };

  const handleProfileUpdate = (e) => {
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
    if (
      profileForm.username.toLowerCase() !==
        currentUser?.username?.toLowerCase() &&
      usersDb.some(
        (u) => u.username.toLowerCase() === profileForm.username.toLowerCase()
      )
    ) {
      setProfileMsg({ text: t("username_taken"), type: "error" });
      return;
    }

    let updatedPassword = currentUser?.password || "";
    if (profileForm.newPassword || profileForm.oldPassword) {
      if (profileForm.oldPassword !== currentUser?.password) {
        setProfileMsg({ text: t("wrong_old_password"), type: "error" });
        return;
      }
      if (profileForm.newPassword.length < 8) {
        setProfileMsg({ text: t("invalid_password"), type: "error" });
        return;
      }
      updatedPassword = profileForm.newPassword;
    }

    const updatedUser = {
      ...currentUser,
      fullName: profileForm.fullName,
      username: profileForm.username.toLowerCase(),
      email: profileForm.email,
      linkedin: profileForm.linkedin,
      twitter: profileForm.twitter,
      password: updatedPassword,
    };

    setCurrentUser(updatedUser);
    sessionStorage.setItem("madar-active-user", JSON.stringify(updatedUser));

    const updatedDb = usersDb.map((u) =>
      u.username === currentUser?.username ? updatedUser : u
    );
    setUsersDb(updatedDb);
    localStorage.setItem("madar-users-db", JSON.stringify(updatedDb));

    setProfileMsg({ text: t("profile_updated"), type: "success" });
    setProfileForm({ ...profileForm, oldPassword: "", newPassword: "" });
  };

  // ==========================================
  // 🟠 Admin Handlers
  // ==========================================
  const handleAssignBadge = (username) => {
    const badge = badgeSelect[username];
    if (!badge) return;
    const updatedDb = usersDb.map((u) => {
      if (u.username === username) {
        const userBadges = u.badges || [];
        if (!userBadges.includes(badge))
          return { ...u, badges: [...userBadges, badge] };
      }
      return u;
    });
    setUsersDb(updatedDb);
    localStorage.setItem("madar-users-db", JSON.stringify(updatedDb));
    if (currentUser?.username === username) {
      const updatedCurr = updatedDb.find((u) => u.username === username);
      if (updatedCurr) {
        setCurrentUser(updatedCurr);
        sessionStorage.setItem(
          "madar-active-user",
          JSON.stringify(updatedCurr)
        );
      }
    }
  };

  const handleRemoveBadge = (username, badge) => {
    const updatedDb = usersDb.map((u) => {
      if (u.username === username) {
        return { ...u, badges: (u.badges || []).filter((b) => b !== badge) };
      }
      return u;
    });
    setUsersDb(updatedDb);
    localStorage.setItem("madar-users-db", JSON.stringify(updatedDb));
    if (currentUser?.username === username) {
      const updatedCurr = updatedDb.find((u) => u.username === username);
      if (updatedCurr) {
        setCurrentUser(updatedCurr);
        sessionStorage.setItem(
          "madar-active-user",
          JSON.stringify(updatedCurr)
        );
      }
    }
  };

  const handleDeleteUser = (username) => {
    if (username.toLowerCase() === "admin") return;
    if (window.confirm("حذف العضو نهائياً؟")) {
      const updated = usersDb.filter((u) => u.username !== username);
      setUsersDb(updated);
      localStorage.setItem("madar-users-db", JSON.stringify(updated));
    }
  };

  const handleAddNews = (e) => {
    e.preventDefault();
    if (!adminNewsForm.title || !adminNewsForm.content) return;
    const newNews = {
      id: Date.now(),
      title: adminNewsForm.title,
      content: adminNewsForm.content,
      mediaUrl: adminNewsForm.mediaUrl,
      mediaType: adminNewsForm.mediaType,
      date: new Date().toLocaleDateString("en-GB"),
    };
    const updated = [newNews, ...newsDb];
    setNewsDb(updated);
    localStorage.setItem("madar-news-db", JSON.stringify(updated));
    setAdminNewsForm({
      title: "",
      content: "",
      mediaUrl: "",
      mediaType: "none",
    });
  };

  const handleDeleteNews = (id) => {
    const updated = newsDb.filter((n) => n.id !== id);
    setNewsDb(updated);
    localStorage.setItem("madar-news-db", JSON.stringify(updated));
  };

  const handleAddPoints = (e) => {
    e.preventDefault();
    if (!adminPointsForm.name || !adminPointsForm.points) return;
    let updated;
    const pointsNum = parseInt(adminPointsForm.points, 10) || 0;
    const existing = pointsDb.find((p) => p.name === adminPointsForm.name);
    if (existing) {
      updated = pointsDb.map((p) =>
        p.name === adminPointsForm.name ? { ...p, points: pointsNum } : p
      );
    } else {
      updated = [
        ...pointsDb,
        { id: Date.now(), name: adminPointsForm.name, points: pointsNum },
      ];
    }
    setPointsDb(updated);
    localStorage.setItem("madar-points-db", JSON.stringify(updated));
    setAdminPointsForm({ name: "", points: "" });
  };

  const handleDeletePoints = (id) => {
    const updated = pointsDb.filter((p) => p.id !== id);
    setPointsDb(updated);
    localStorage.setItem("madar-points-db", JSON.stringify(updated));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (
      !adminEventForm.title ||
      !adminEventForm.startDate ||
      !adminEventForm.endDate
    )
      return;
    const newEvent = {
      id: Date.now(),
      ...adminEventForm,
      isCanceled: false,
      registeredUsers: [],
    };
    const updated = [newEvent, ...eventsDb];
    setEventsDb(updated);
    localStorage.setItem("madar-events-db", JSON.stringify(updated));
    setAdminEventForm({
      title: "",
      desc: "",
      link: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleCancelEvent = (id) => {
    const updated = eventsDb.map((ev) =>
      ev.id === id ? { ...ev, isCanceled: true } : ev
    );
    setEventsDb(updated);
    localStorage.setItem("madar-events-db", JSON.stringify(updated));
  };

  const handleDeleteEvent = (id) => {
    const updated = eventsDb.filter((ev) => ev.id !== id);
    setEventsDb(updated);
    localStorage.setItem("madar-events-db", JSON.stringify(updated));
  };

  const handleRegisterEvent = (id) => {
    if (!currentUser) return;
    const updated = eventsDb.map((ev) => {
      if (
        ev.id === id &&
        !(ev.registeredUsers || []).includes(currentUser.username)
      ) {
        return {
          ...ev,
          registeredUsers: [
            ...(ev.registeredUsers || []),
            currentUser.username,
          ],
        };
      }
      return ev;
    });
    setEventsDb(updated);
    localStorage.setItem("madar-events-db", JSON.stringify(updated));
  };

  // ==========================================
  // 🛠 Utility Functions
  // ==========================================
  const getEventStatus = (evt) => {
    if (evt.isCanceled) return "canceled";
    const now = new Date();
    const start = new Date(evt.startDate);
    const end = new Date(evt.endDate);
    end.setHours(23, 59, 59, 999);
    if (now < start) return "upcoming";
    if (now > end) return "past";
    return "current";
  };

  const getUserByBadge = (badgeName) => {
    return usersDb.find((u) => (u.badges || []).includes(badgeName));
  };

  const saveCommittees = (isSkipped = false) => {
    const updatedUser = {
      ...currentUser,
      committees: isSkipped ? [] : selectedUserCommittees,
      hasSelectedCommittees: true,
    };
    setCurrentUser(updatedUser);
    sessionStorage.setItem("madar-active-user", JSON.stringify(updatedUser));
    const updatedDb = usersDb.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );
    setUsersDb(updatedDb);
    localStorage.setItem("madar-users-db", JSON.stringify(updatedDb));
    setIntroText(`${t("intro_welcome")} ${updatedUser.fullName.split(" ")[0]}`);
    setAppView("intro2");
    setTimeout(() => {
      setActivePage("home");
      setAppView("main");
    }, 4000);
  };

  const toggleCommitteeSelection = (name) => {
    if (selectedUserCommittees.includes(name))
      setSelectedUserCommittees(
        selectedUserCommittees.filter((c) => c !== name)
      );
    else if (selectedUserCommittees.length < 3)
      setSelectedUserCommittees([...selectedUserCommittees, name]);
    else alert(t("max_reached"));
  };

  const renderNewsMedia = (news) => {
    if (!news.mediaUrl || news.mediaType === "none") return null;
    if (news.mediaType === "image")
      return (
        <img
          src={news.mediaUrl}
          alt={news.title}
          className={`w-full h-48 md:h-80 object-cover rounded-2xl mb-6 shadow-md border ${theme.cardBorder}`}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      );
    if (news.mediaType === "video") {
      const ytMatch = news.mediaUrl.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/
      );
      if (ytMatch && ytMatch[1])
        return (
          <div className="relative w-full h-48 md:h-80 mb-6 rounded-2xl overflow-hidden shadow-md">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${ytMatch[1]}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        );
      return (
        <video
          src={news.mediaUrl}
          controls
          className={`w-full h-48 md:h-80 object-cover rounded-2xl mb-6 shadow-md bg-black border ${theme.cardBorder}`}
        />
      );
    }
    return null;
  };

  const renderUserModal = () => {
    if (!viewUserModal) return null;
    return (
      <div
        className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={() => setViewUserModal(null)}
      >
        <div
          className={`${theme.cardBg} w-full max-w-sm rounded-[3rem] shadow-2xl border ${theme.cardBorder} p-8 relative flex flex-col items-center text-center`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setViewUserModal(null)}
            className={`absolute top-6 ${
              lang === "ar" ? "right-6" : "left-6"
            } p-2 ${theme.textSecondary} hover:opacity-70 rounded-full`}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className={`w-20 h-20 ${theme.iconBg} rounded-full flex items-center justify-center mb-4 border ${theme.cardBorder}`}
          >
            <User className={`w-8 h-8 ${theme.accent}`} />
          </div>
          <h3 className={`text-2xl font-black mb-1 ${theme.textPrimary}`}>
            {viewUserModal.fullName}
          </h3>
          <p className={`text-sm mb-4 ${theme.textSecondary}`}>
            @{viewUserModal.username}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {(viewUserModal.badges || []).map((b, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 ${theme.textPrimary} font-bold`}
              >
                {b}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            {viewUserModal.linkedin && (
              <a
                href={viewUserModal.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-xl ${theme.iconBg} hover:scale-110 transition-transform`}
              >
                <LinkedinIcon className={`w-5 h-5 ${theme.accent}`} />
              </a>
            )}
            {viewUserModal.twitter && (
              <a
                href={viewUserModal.twitter}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-xl ${theme.iconBg} hover:scale-110 transition-transform`}
              >
                <XIcon className={`w-5 h-5 ${theme.accent}`} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 📚 Data & Nav Mappings
  // ==========================================
  const navItems = [
    { id: "home", label: t("home"), icon: <Home className="w-5 h-5" /> },
    {
      id: "profile",
      label: t("profile"),
      icon: <User className="w-5 h-5" />,
      authOnly: true,
    },
    {
      id: "structure",
      label: t("structure"),
      icon: <Network className="w-5 h-5" />,
    },
    {
      id: "events",
      label: t("events"),
      icon: <CalendarDays className="w-5 h-5" />,
    },
    { id: "news", label: t("news"), icon: <Newspaper className="w-5 h-5" /> },
    { id: "points", label: t("points"), icon: <Trophy className="w-5 h-5" /> },
    {
      id: "settings",
      label: t("settings"),
      icon: <Settings className="w-5 h-5" />,
    },
    { id: "contact", label: t("contact"), icon: <Phone className="w-5 h-5" /> },
    { id: "about", label: t("about"), icon: <Info className="w-5 h-5" /> },
  ];
  if (isAdmin)
    navItems.push({
      id: "admin",
      label: t("admin_panel"),
      icon: <Shield className="w-5 h-5" />,
      authOnly: true,
    });
  const visibleNavItems = navItems.filter(
    (item) => !item.authOnly || currentUser
  );

  const clubBoard = [
    { badge: "رئيس مجلس النادي", icon: <Crown className="w-8 h-8" /> },
    { badge: "نائب الرئيس", icon: <Award className="w-6 h-6" /> },
    { badge: "رئيس القطاع الجوهري", icon: <Star className="w-6 h-6" /> },
    { badge: "رئيس القطاع الإبداعي", icon: <Palette className="w-6 h-6" /> },
    { badge: "رئيس القطاع التشغيلي", icon: <Activity className="w-6 h-6" /> },
  ];

  const clubSectors = [
    {
      id: "core",
      title: lang === "ar" ? "القطاع الجوهري" : "Core Sector",
      icon: <Star className="w-5 h-5" />,
      committees: [
        { name: "لجنة الموارد البشرية", icon: <Users /> },
        { name: "لجنة مدار", icon: <Globe /> },
        { name: "لجنة التدريب وورش العمل", icon: <BookOpen /> },
      ],
    },
    {
      id: "central",
      title: lang === "ar" ? "القطاع الإبداعي" : "Creative Sector",
      icon: <Palette className="w-5 h-5" />,
      committees: [
        { name: "اللجنة الإعلامية", icon: <Camera /> },
        { name: "اللجنة التعليمية والتثقيفية", icon: <Lightbulb /> },
        { name: "لجنة البودكاست", icon: <Mic /> },
      ],
    },
    {
      id: "operations",
      title: lang === "ar" ? "القطاع التشغيلي" : "Operations Sector",
      icon: <Activity className="w-5 h-5" />,
      committees: [
        { name: "لجنة الخدمات", icon: <Briefcase /> },
        { name: "لجنة تنظيم الفعاليات", icon: <Calendar /> },
        { name: "لجنة العلاقات العامة والشراكات", icon: <Handshake /> },
      ],
    },
  ];

  // ==========================================
  // 🖥 UI Render Methods
  // ==========================================

  // --- Auth Render ---
  const renderAuthForms = () => (
    <div
      className={`min-h-screen flex items-center justify-center p-6 ${theme.textPrimary} transition-colors duration-500 w-full relative z-10`}
    >
      <div
        className={`absolute top-6 ${
          lang === "ar" ? "right-6" : "left-6"
        } z-50`}
      >
        <button
          onClick={() => {
            setAppView("main");
            setAuthError("");
          }}
          className={`p-3 ${theme.cardBg} shadow-lg border ${theme.cardBorder} rounded-full hover:scale-105 transition-transform flex items-center gap-2`}
        >
          <Home className={`w-5 h-5 ${theme.accent}`} />
        </button>
      </div>
      <div
        className={`${theme.cardBg} p-8 md:p-12 rounded-[3rem] ${theme.glow} max-w-md w-full ${theme.cardBorder} border relative overflow-hidden transition-colors duration-500`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
            isDarkMode
              ? "from-[#D4AF37] to-[#FDE047]"
              : "from-[#D2B48C] to-[#E2725B]"
          }`}
        ></div>
        <div className="flex flex-col items-center mb-8">
          <h1
            className={`text-4xl font-black ${theme.textPrimary} mb-2 text-center drop-shadow-md`}
            style={{ fontFamily: titleFont }}
          >
            {t("madar_club")}
          </h1>
          <p
            className={`text-sm ${theme.textSecondary} font-bold tracking-widest uppercase`}
          >
            {authMode === "login" ? t("login_portal") : t("create_new")}
          </p>
        </div>
        {authError && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-xl text-sm mb-6 flex items-center gap-2 border border-red-500/20">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p className="flex-1">{authError}</p>
          </div>
        )}

        <form
          onSubmit={authMode === "login" ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {authMode === "register" && (
            <>
              <div className="space-y-1 text-start">
                <label className={`text-xs font-bold ${theme.textSecondary}`}>
                  {t("fullname")}
                </label>
                <input
                  type="text"
                  required
                  value={authForm.fullName}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, fullName: e.target.value })
                  }
                  className={`w-full p-3 ${theme.inputBg} border ${
                    theme.inputBorder
                  } rounded-xl outline-none transition-all ${
                    isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                  }`}
                />
              </div>
              <div className="space-y-1 text-start">
                <label className={`text-xs font-bold ${theme.textSecondary}`}>
                  {t("email_optional")}
                </label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) =>
                    setAuthForm({ ...authForm, email: e.target.value })
                  }
                  className={`w-full p-3 ${theme.inputBg} border ${
                    theme.inputBorder
                  } rounded-xl outline-none transition-all ${
                    isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                  }`}
                  dir="ltr"
                />
              </div>
            </>
          )}
          <div className="space-y-1 text-start">
            <label className={`text-xs font-bold ${theme.textSecondary}`}>
              {t("username")}
            </label>
            <input
              type="text"
              required
              value={authForm.username}
              onChange={(e) =>
                setAuthForm({
                  ...authForm,
                  username: e.target.value.replace(/\s/g, ""),
                })
              }
              className={`w-full p-3 ${theme.inputBg} border ${
                theme.inputBorder
              } rounded-xl outline-none transition-all ${
                isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
              }`}
              dir="ltr"
            />
          </div>
          <div className="space-y-1 text-start">
            <label className={`text-xs font-bold ${theme.textSecondary}`}>
              {t("password")}
            </label>
            <input
              type="password"
              required
              value={authForm.password}
              onChange={(e) =>
                setAuthForm({
                  ...authForm,
                  password: e.target.value.replace(/\s/g, ""),
                })
              }
              className={`w-full p-3 ${theme.inputBg} border ${
                theme.inputBorder
              } rounded-xl outline-none transition-all ${
                isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
              }`}
              dir="ltr"
            />
          </div>
          {authMode === "register" && (
            <div className="space-y-1 text-start">
              <label className={`text-xs font-bold ${theme.textSecondary}`}>
                {t("confirm_password")}
              </label>
              <input
                type="password"
                required
                value={authForm.confirmPassword}
                onChange={(e) =>
                  setAuthForm({
                    ...authForm,
                    confirmPassword: e.target.value.replace(/\s/g, ""),
                  })
                }
                className={`w-full p-3 ${theme.inputBg} border ${
                  theme.inputBorder
                } rounded-xl outline-none transition-all ${
                  isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                }`}
                dir="ltr"
              />
            </div>
          )}
          <button
            type="submit"
            className={`w-full py-4 mt-4 ${theme.buttonBg} ${theme.buttonText} rounded-2xl font-bold text-lg shadow-lg flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform`}
          >
            {authMode === "login" ? t("login_btn") : t("register_btn")}
          </button>
        </form>

        <div className={`mt-8 text-center border-t ${theme.cardBorder} pt-6`}>
          <p className={`text-sm ${theme.textSecondary}`}>
            {authMode === "login" ? t("new_member") : t("have_account")}
          </p>
          <button
            onClick={() => {
              setAuthMode(authMode === "login" ? "register" : "login");
              setAuthError("");
              setAuthForm({
                fullName: "",
                username: "",
                password: "",
                confirmPassword: "",
                email: "",
              });
            }}
            className={`mt-2 ${theme.accent} font-bold hover:underline`}
          >
            {authMode === "login" ? t("create_new") : t("login_here")}
          </button>
        </div>
      </div>
    </div>
  );

  // --- Animations Render ---
  const renderIntro = () => (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
        isDarkMode ? "bg-[#050A1A]" : "bg-[#271813]"
      } animate-in fade-in duration-500 w-full h-full`}
    >
      <div className="relative animate-rocket-cinematic flex flex-col items-center">
        <Rocket
          className={`${
            isDarkMode
              ? "text-[#D4AF37] fill-[#D4AF37]"
              : "text-white fill-white"
          } w-24 h-24 transform -rotate-45 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]`}
        />
        <div
          className={`absolute top-[80%] left-1/2 -translate-x-1/2 w-8 h-28 bg-gradient-to-t from-transparent ${
            isDarkMode ? "via-[#D4AF37]" : "via-[#E2725B]"
          } to-white blur-lg rounded-full animate-fire-smooth z-0 opacity-80`}
        ></div>
      </div>
      <h1
        className={`mt-16 mb-8 text-5xl md:text-7xl font-black tracking-widest leading-normal animate-fade-in-up text-center ${
          isDarkMode ? "text-[#D4AF37]" : "text-white"
        }`}
        style={{ fontFamily: titleFont }}
      >
        {t("madar_club")}
      </h1>
      <p
        className={`text-lg md:text-xl tracking-[0.3em] font-bold animate-pulse-elegant ${
          isDarkMode ? "text-[#D4AF37]" : "text-[#D2B48C]"
        } text-center px-4`}
      >
        {introText}
      </p>
    </div>
  );

  // --- Committees Render ---
  const renderCommittees = () => (
    <div
      className={`min-h-screen w-full flex items-center justify-center p-6 md:p-12 animate-in fade-in ${theme.textPrimary} relative z-10`}
    >
      <div
        className={`absolute top-6 ${
          lang === "ar" ? "left-6" : "right-6"
        } z-50`}
      >
        <button
          onClick={() => saveCommittees(true)}
          className={`px-6 py-2.5 ${theme.cardBg} shadow-sm border ${theme.cardBorder} rounded-full hover:scale-105 transition-transform flex items-center gap-2 font-bold text-sm`}
        >
          {t("skip")} <SkipForward className={`w-4 h-4 ${theme.accent}`} />
        </button>
      </div>
      <div
        className={`max-w-4xl w-full mx-auto ${theme.cardBg} p-8 md:p-12 rounded-[3rem] ${theme.glow} border ${theme.cardBorder} mt-12 md:mt-0`}
      >
        <div className="text-center mb-10">
          <h2
            className={`text-3xl md:text-5xl font-black mb-4 uppercase ${theme.textPrimary}`}
            style={{ fontFamily: titleFont }}
          >
            {t("choose_committees")}
          </h2>
          <p className={`text-lg ${theme.textSecondary}`}>
            {t("choose_committees_sub")} ( {selectedUserCommittees.length} / 3 )
          </p>
        </div>
        <div className="space-y-8">
          {clubSectors.map((sector) => (
            <div
              key={sector.id}
              className={`p-6 ${theme.iconBg} rounded-3xl border ${theme.cardBorder}`}
            >
              <h3
                className={`text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 ${theme.textPrimary}`}
              >
                <ChevronRight className={theme.accent} /> {sector.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sector.committees.map((comm) => (
                  <button
                    key={comm.name}
                    onClick={() => toggleCommitteeSelection(comm.name)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-start ${
                      selectedUserCommittees.includes(comm.name)
                        ? theme.buttonBg +
                          " " +
                          theme.buttonText +
                          " scale-[1.03] shadow-md"
                        : theme.cardBg + " " + theme.cardBorder
                    }`}
                  >
                    <div
                      className={`${
                        selectedUserCommittees.includes(comm.name)
                          ? theme.buttonText
                          : theme.accent
                      }`}
                    >
                      {selectedUserCommittees.includes(comm.name) ? (
                        <CheckCircle2 />
                      ) : (
                        comm.icon
                      )}
                    </div>
                    <span
                      className={`font-bold flex-1 text-sm md:text-base ${
                        selectedUserCommittees.includes(comm.name)
                          ? theme.buttonText
                          : theme.textPrimary
                      }`}
                    >
                      {comm.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => saveCommittees(false)}
            className={`px-12 py-4 ${theme.buttonBg} ${theme.buttonText} rounded-full font-black text-xl flex items-center gap-3 shadow-xl transition-transform hover:scale-105`}
          >
            <Save /> {t("save_committees")}
          </button>
        </div>
      </div>
    </div>
  );

  // --- Main App Content ---
  const renderMainApp = () => {
    // Sort Points Array Safely
    const sortedPoints = [...pointsDb].sort((a, b) => b.points - a.points);
    const top1 = sortedPoints[0] || null;
    const top2 = sortedPoints[1] || null;
    const top3 = sortedPoints[2] || null;
    const restPoints = sortedPoints.slice(3, 20);

    // Filter Events Safely
    const filteredEvents = eventsDb
      .filter((ev) => {
        if (eventFilter === "all") return true;
        if (eventFilter === "registered")
          return (
            currentUser &&
            (ev.registeredUsers || []).includes(currentUser.username)
          );
        return getEventStatus(ev) === eventFilter;
      })
      .filter((ev) =>
        (ev.title || "").toLowerCase().includes(eventSearch.toLowerCase())
      );

    return (
      <div
        className={`flex-1 flex flex-col w-full animate-in fade-in duration-700 relative z-10 ${theme.textPrimary}`}
      >
        {/* Navbar (الشريط العلوي - زجاجي من اليمين إلى اليسار) */}
        <div
          className={`fixed top-0 left-0 right-0 w-full ${
            isDarkMode ? "bg-[#0B132B]/80" : "bg-white/80"
          } backdrop-blur-xl border-b ${
            theme.cardBorder
          } py-3 px-4 md:px-8 flex justify-between items-center z-[150] shadow-sm transition-colors duration-500`}
        >
          <div className="flex-1 flex justify-start">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(true);
                setShowLogoutConfirm(false);
              }}
              className={`p-2 ${theme.iconBg} ${theme.textSecondary} rounded-xl shadow-sm hover:scale-105 transition-all`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div
            className="flex-1 flex justify-center items-center gap-2 cursor-pointer group"
            onClick={() => {
              setActivePage("home");
              window.scrollTo(0, 0);
            }}
          >
            {currentLogo && (
              <img
                src={currentLogo}
                className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-sm group-hover:scale-110 transition-all duration-300"
                alt="logo"
              />
            )}
            <h2
              className={`font-black text-lg md:text-xl tracking-wider ${theme.textPrimary} group-hover:opacity-80 transition-opacity whitespace-nowrap`}
              style={{ fontFamily: titleFont }}
            >
              {t("madar_club")}
            </h2>
          </div>

          <div className="flex-1 flex justify-end items-center gap-2 md:gap-4">
            {!currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToAuth("register")}
                  className={`hidden sm:flex px-4 py-1.5 rounded-full font-bold text-xs md:text-sm shadow-sm transition-transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText}`}
                >
                  {t("join_us")}
                </button>
                <button
                  onClick={() => goToAuth("login")}
                  className={`px-3 py-1.5 md:px-4 md:py-1.5 rounded-full font-bold text-xs md:text-sm border-2 transition-transform hover:scale-105 ${theme.cardBg} ${theme.cardBorder} ${theme.textPrimary}`}
                >
                  {t("login_btn")}
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setActivePage("settings");
                    window.scrollTo(0, 0);
                  }}
                  className={`p-2 ${theme.iconBg} ${theme.textSecondary} rounded-xl shadow-sm hover:scale-105 transition-all hidden sm:block`}
                >
                  <Settings className="w-5 h-5" />
                </button>
                <div
                  onClick={() => {
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
                    setActivePage("profile");
                    window.scrollTo(0, 0);
                  }}
                  className={`flex items-center gap-2 font-bold text-sm ${theme.textPrimary} cursor-pointer hover:opacity-70 transition-colors bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-full`}
                >
                  <span className="hidden sm:inline">
                    {t("welcome")} {currentUser?.fullName?.split(" ")[0]}
                  </span>
                  <User className={`w-4 h-4 ${theme.accent}`} />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Sidebar Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] animate-in fade-in"
            onClick={() => {
              setIsMenuOpen(false);
              setShowLogoutConfirm(false);
            }}
          />
        )}

        {/* Sidebar Menu */}
        <div
          className={`fixed top-0 ${
            lang === "ar" ? "right-0" : "left-0"
          } h-full w-72 ${
            theme.cardBg
          } z-[201] shadow-2xl transition-transform duration-500 ease-in-out ${
            isMenuOpen
              ? "translate-x-0"
              : lang === "ar"
              ? "translate-x-full"
              : "-translate-x-full"
          } flex flex-col`}
        >
          <div
            className={`p-6 border-b ${theme.cardBorder} flex items-center justify-between ${theme.iconBg}`}
          >
            <h2
              className={`font-black text-2xl ${theme.textPrimary}`}
              style={{ fontFamily: titleFont }}
            >
              {t("menu")}
            </h2>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setShowLogoutConfirm(false);
              }}
              className={theme.textPrimary}
            >
              <X />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {visibleNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "profile" && currentUser) {
                    setProfileForm({
                      fullName: currentUser.fullName,
                      username: currentUser.username,
                      email: currentUser.email || "",
                      linkedin: currentUser.linkedin || "",
                      twitter: currentUser.twitter || "",
                      oldPassword: "",
                      newPassword: "",
                    });
                    setProfileMsg({ text: "", type: "" });
                  }
                  setActivePage(item.id);
                  setIsMenuOpen(false);
                  setShowLogoutConfirm(false);
                  window.scrollTo(0, 0);
                }}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activePage === item.id
                    ? theme.buttonBg + " " + theme.buttonText + " shadow-lg"
                    : theme.textSecondary
                }`}
              >
                <div
                  className={`${
                    activePage === item.id ? theme.buttonText : theme.accent
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-lg">{item.label}</span>
              </button>
            ))}
          </div>

          <div
            className={`p-6 border-t ${theme.cardBorder} ${theme.iconBg} text-center`}
          >
            {!currentUser ? (
              <button
                onClick={() => goToAuth("login")}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText}`}
              >
                <LogIn className="w-5 h-5" /> {t("login_btn")}
              </button>
            ) : !showLogoutConfirm ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                <LogOut className="w-5 h-5" /> {t("logout")}
              </button>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-200 border-2 border-red-500/30 p-3 rounded-2xl">
                <p
                  className={`text-sm font-bold mb-3 ${
                    isDarkMode ? "text-red-400" : "text-red-600"
                  }`}
                >
                  {t("are_you_sure")}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2 bg-red-600 text-white rounded-lg font-bold text-sm"
                  >
                    {t("yes_logout")}
                  </button>
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-colors ${
                      isDarkMode
                        ? "bg-gray-800 text-gray-300"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className={`fixed z-50 transition-all duration-500 top-20 ${
            lang === "ar" ? "left-6 md:left-8" : "right-6 md:right-8"
          }`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowMusicToast(true);
              setTimeout(() => setShowMusicToast(false), 3000);
            }}
            className={`flex items-center gap-3 px-6 py-3 ${theme.cardBg} backdrop-blur-md ${theme.glow} border ${theme.cardBorder} rounded-full hover:scale-105 transition-transform group`}
          >
            <VolumeX className={`w-5 h-5 ${theme.accent}`} />
            <span
              className={`text-xs font-bold hidden sm:block ${theme.textPrimary}`}
            >
              {t("melody")}
            </span>
          </button>
        </div>

        {/* Main Content Wrapper */}
        <div className="pt-24 pb-10 flex-1 relative z-10">
          {activePage === "home" && (
            <div className="flex flex-col items-center justify-center min-h-[75vh] animate-in fade-in zoom-in px-6 text-center">
              {currentLogo && (
                <img
                  src={currentLogo}
                  alt="Logo"
                  className="w-48 h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl mb-12 hover:scale-105 transition-transform"
                />
              )}
              <h2
                className={`text-5xl md:text-8xl font-black ${theme.textPrimary} mb-4 text-center uppercase`}
                style={{ fontFamily: titleFont }}
              >
                {t("coming_soon")}
              </h2>
              <div className="flex items-center gap-4 justify-center mt-2">
                <Sparkles
                  className={`w-6 h-6 ${theme.accent} opacity-60 hidden md:block`}
                />
                <p
                  className={`text-xl md:text-3xl font-medium italic opacity-90 ${theme.textSecondary}`}
                >
                  {t("coming_soon_sub")}
                </p>
                <Sparkles
                  className={`w-6 h-6 ${theme.accent} opacity-60 hidden md:block`}
                />
              </div>
              {!currentUser && (
                <div className="flex flex-col sm:flex-row gap-4 mt-16 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5">
                  <button
                    onClick={() => goToAuth("register")}
                    className={`px-10 py-4 rounded-full font-black text-xl shadow-xl transition-transform hover:scale-105 ${theme.buttonBg} ${theme.buttonText} flex items-center justify-center gap-3 w-full sm:w-auto`}
                  >
                    <UserPlus className="w-6 h-6" /> {t("join_us")}
                  </button>
                  <button
                    onClick={() => goToAuth("login")}
                    className={`px-10 py-4 rounded-full font-black text-xl shadow-lg transition-transform hover:scale-105 border-2 ${theme.cardBorder} ${theme.cardBg} ${theme.textPrimary} flex items-center justify-center gap-3 w-full sm:w-auto`}
                  >
                    <LogIn className="w-6 h-6" /> {t("login_btn")}
                  </button>
                </div>
              )}
            </div>
          )}

          {activePage === "admin" && isAdmin && (
            <div className="max-w-6xl mx-auto px-4 md:px-6 animate-in fade-in">
              <div
                className={`${theme.cardBg} p-6 md:p-12 rounded-[4rem] ${theme.glow} border ${theme.cardBorder} text-center relative overflow-hidden`}
              >
                <Shield
                  className={`w-16 h-16 mx-auto mb-6 ${theme.accent} relative z-10`}
                />
                <h2
                  className={`text-4xl font-black mb-10 ${theme.textPrimary} relative z-10`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("admin_panel")}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 border-b border-[#D4AF37]/20 pb-6 relative z-10">
                  <button
                    onClick={() => setAdminTab("members")}
                    className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition-all ${
                      adminTab === "members"
                        ? theme.buttonBg + " " + theme.buttonText
                        : theme.iconBg + " " + theme.textSecondary
                    }`}
                  >
                    {t("admin_members")}
                  </button>
                  <button
                    onClick={() => setAdminTab("news")}
                    className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition-all ${
                      adminTab === "news"
                        ? theme.buttonBg + " " + theme.buttonText
                        : theme.iconBg + " " + theme.textSecondary
                    }`}
                  >
                    {t("admin_news")}
                  </button>
                  <button
                    onClick={() => setAdminTab("points")}
                    className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition-all ${
                      adminTab === "points"
                        ? theme.buttonBg + " " + theme.buttonText
                        : theme.iconBg + " " + theme.textSecondary
                    }`}
                  >
                    {t("admin_points")}
                  </button>
                  <button
                    onClick={() => setAdminTab("events")}
                    className={`px-4 py-2 rounded-full font-bold text-sm md:text-base transition-all ${
                      adminTab === "events"
                        ? theme.buttonBg + " " + theme.buttonText
                        : theme.iconBg + " " + theme.textSecondary
                    }`}
                  >
                    {t("admin_events")}
                  </button>
                </div>

                {adminTab === "members" && (
                  <div className="space-y-6 text-start relative z-10">
                    <h3
                      className={`font-bold text-xl mb-4 ${theme.textPrimary}`}
                    >
                      الأعضاء المسجلين ({usersDb.length})
                    </h3>
                    {usersDb.length === 0 ? (
                      <p className="opacity-60">{t("no_members_yet")}</p>
                    ) : (
                      usersDb.map((u, i) => (
                        <div
                          key={i}
                          className={`p-6 rounded-3xl border ${theme.cardBorder} ${theme.iconBg} flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6`}
                        >
                          <div className="flex-1">
                            <p
                              className={`font-bold text-xl mb-1 ${theme.textPrimary}`}
                            >
                              {u.fullName}
                            </p>
                            <p
                              className={`text-sm mb-3 ${theme.textSecondary}`}
                            >
                              @{u.username} {u.email && ` | ${u.email}`}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {(u.committees || []).map((c, j) => (
                                <span
                                  key={j}
                                  className={`text-xs px-3 py-1 rounded-full border ${theme.cardBorder} ${theme.cardBg} ${theme.accent} font-bold`}
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(u.badges || []).map((b, j) => (
                                <span
                                  key={j}
                                  className={`text-xs px-3 py-1 rounded-full border border-[#D4AF37] bg-[#D4AF37]/10 ${theme.textPrimary} font-bold flex items-center gap-1`}
                                >
                                  <Award className="w-3 h-3" /> {b}
                                  <button
                                    onClick={() =>
                                      handleRemoveBadge(u.username, b)
                                    }
                                    className="hover:text-red-500 ml-1 mr-1 transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-3 border-t lg:border-t-0 lg:border-r border-[#D4AF37]/20 pt-4 lg:pt-0 lg:pr-6">
                            <select
                              value={badgeSelect[u.username] || ""}
                              onChange={(e) =>
                                setBadgeSelect({
                                  ...badgeSelect,
                                  [u.username]: e.target.value,
                                })
                              }
                              className={`p-2 rounded-xl border ${theme.cardBorder} ${theme.cardBg} ${theme.textPrimary} text-sm outline-none w-full sm:w-48`}
                            >
                              <option value="">{t("assign_badge")}</option>
                              {AVAILABLE_BADGES.map((badgeOption, idx) => (
                                <option key={idx} value={badgeOption}>
                                  {badgeOption}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssignBadge(u.username)}
                              className={`p-2 rounded-xl ${theme.buttonBg} ${theme.buttonText} hover:scale-105 transition-transform`}
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.username)}
                              className={`p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors ml-auto sm:ml-0`}
                            >
                              <UserMinus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
                {adminTab === "news" && (
                  <div className="text-start relative z-10">
                    <form
                      onSubmit={handleAddNews}
                      className={`p-6 rounded-3xl border ${theme.cardBorder} ${theme.iconBg} mb-8 space-y-4`}
                    >
                      <div>
                        <label
                          className={`text-sm font-bold ${theme.textSecondary}`}
                        >
                          {t("news_title_input")}
                        </label>
                        <input
                          type="text"
                          required
                          value={adminNewsForm.title}
                          onChange={(e) =>
                            setAdminNewsForm({
                              ...adminNewsForm,
                              title: e.target.value,
                            })
                          }
                          className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                            theme.inputBorder
                          } rounded-xl outline-none transition-all ${
                            isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-sm font-bold ${theme.textSecondary}`}
                        >
                          {t("news_content_input")}
                        </label>
                        <textarea
                          required
                          value={adminNewsForm.content}
                          onChange={(e) =>
                            setAdminNewsForm({
                              ...adminNewsForm,
                              content: e.target.value,
                            })
                          }
                          rows={3}
                          className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                            theme.inputBorder
                          } rounded-xl outline-none transition-all ${
                            isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                          }`}
                        ></textarea>
                      </div>
                      <div
                        className={`p-4 rounded-xl border border-dashed ${theme.cardBorder} space-y-4`}
                      >
                        <div>
                          <label
                            className={`text-sm font-bold flex items-center gap-2 ${theme.textSecondary}`}
                          >
                            <Link className="w-4 h-4" /> {t("news_media_url")}
                          </label>
                          <input
                            type="url"
                            value={adminNewsForm.mediaUrl}
                            onChange={(e) =>
                              setAdminNewsForm({
                                ...adminNewsForm,
                                mediaUrl: e.target.value,
                              })
                            }
                            className={`w-full p-3 mt-1 ${
                              theme.inputBg
                            } border ${
                              theme.inputBorder
                            } rounded-xl outline-none transition-all ${
                              isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                            }`}
                            dir="ltr"
                            placeholder="https://"
                          />
                        </div>
                        <div>
                          <label
                            className={`text-sm font-bold flex items-center gap-2 ${theme.textSecondary}`}
                          >
                            <ImageIcon className="w-4 h-4" />{" "}
                            {t("news_media_type")}
                          </label>
                          <select
                            value={adminNewsForm.mediaType}
                            onChange={(e) =>
                              setAdminNewsForm({
                                ...adminNewsForm,
                                mediaType: e.target.value,
                              })
                            }
                            className={`w-full p-3 mt-1 ${
                              theme.inputBg
                            } border ${
                              theme.inputBorder
                            } rounded-xl outline-none transition-all cursor-pointer ${
                              isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                            }`}
                          >
                            <option value="none">{t("media_none")}</option>
                            <option value="image">{t("media_image")}</option>
                            <option value="video">{t("media_video")}</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`w-full py-3 mt-2 ${theme.buttonBg} ${theme.buttonText} rounded-xl font-bold flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform`}
                      >
                        <Plus className="w-5 h-5" /> {t("add_btn")}
                      </button>
                    </form>
                    <div className="space-y-4">
                      {newsDb.map((n) => (
                        <div
                          key={n.id}
                          className={`p-5 rounded-2xl border ${theme.cardBorder} ${theme.cardBg} flex justify-between items-center`}
                        >
                          <div>
                            <h4
                              className={`font-bold text-lg ${theme.textPrimary}`}
                            >
                              {n.title}
                            </h4>
                            <p className={`text-sm ${theme.textSecondary}`}>
                              {n.date}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteNews(n.id)}
                            className="text-red-500 hover:bg-red-500/10 p-2.5 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {adminTab === "points" && (
                  <div className="text-start relative z-10">
                    <form
                      onSubmit={handleAddPoints}
                      className={`p-6 rounded-3xl border ${theme.cardBorder} ${theme.iconBg} mb-8 space-y-4`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className={`text-sm font-bold ${theme.textSecondary}`}
                          >
                            الاسم أو الفريق
                          </label>
                          <input
                            type="text"
                            required
                            value={adminPointsForm.name}
                            onChange={(e) =>
                              setAdminPointsForm({
                                ...adminPointsForm,
                                name: e.target.value,
                              })
                            }
                            className={`w-full p-3 mt-1 ${
                              theme.inputBg
                            } border ${
                              theme.inputBorder
                            } rounded-xl outline-none transition-all ${
                              isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                            }`}
                          />
                        </div>
                        <div>
                          <label
                            className={`text-sm font-bold ${theme.textSecondary}`}
                          >
                            عدد النقاط
                          </label>
                          <input
                            type="number"
                            required
                            value={adminPointsForm.points}
                            onChange={(e) =>
                              setAdminPointsForm({
                                ...adminPointsForm,
                                points: e.target.value,
                              })
                            }
                            className={`w-full p-3 mt-1 ${
                              theme.inputBg
                            } border ${
                              theme.inputBorder
                            } rounded-xl outline-none transition-all ${
                              isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                            }`}
                            dir="ltr"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`w-full py-3 ${theme.buttonBg} ${theme.buttonText} rounded-xl font-bold flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform`}
                      >
                        <Plus className="w-5 h-5" /> {t("add_btn")}
                      </button>
                    </form>
                    <div className="space-y-3">
                      {[...pointsDb]
                        .sort((a, b) => b.points - a.points)
                        .map((p, i) => (
                          <div
                            key={p.id}
                            className={`p-4 md:p-5 rounded-xl border ${theme.cardBorder} ${theme.cardBg} flex justify-between items-center hover:scale-[1.01] transition-transform`}
                          >
                            <div className="flex items-center gap-4 md:gap-6">
                              <span
                                className={`w-8 font-black text-xl md:text-2xl ${
                                  i === 0
                                    ? "text-yellow-500"
                                    : i === 1
                                    ? "text-gray-400"
                                    : i === 2
                                    ? "text-orange-700"
                                    : theme.textSecondary
                                }`}
                              >
                                #{i + 1}
                              </span>
                              <span
                                className={`font-bold text-lg ${theme.textPrimary}`}
                              >
                                {p.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-6">
                              <span
                                className={`font-black text-lg ${theme.accent}`}
                              >
                                {p.points} نقطة
                              </span>
                              <button
                                onClick={() => handleDeletePoints(p.id)}
                                className="text-red-500 hover:bg-red-500/10 p-2.5 rounded-xl transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {adminTab === "events" && (
                  <div className="text-start relative z-10">
                    <form
                      onSubmit={handleAddEvent}
                      className={`p-6 rounded-3xl border ${theme.cardBorder} ${theme.iconBg} mb-8 space-y-4`}
                    >
                      <div>
                        <label
                          className={`text-sm font-bold ${theme.textSecondary}`}
                        >
                          عنوان الفعالية
                        </label>
                        <input
                          type="text"
                          required
                          value={adminEventForm.title}
                          onChange={(e) =>
                            setAdminEventForm({
                              ...adminEventForm,
                              title: e.target.value,
                            })
                          }
                          className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                            theme.inputBorder
                          } rounded-xl outline-none transition-all ${
                            isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                          }`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-sm font-bold ${theme.textSecondary}`}
                        >
                          وصف الفعالية
                        </label>
                        <textarea
                          required
                          value={adminEventForm.desc}
                          onChange={(e) =>
                            setAdminEventForm({
                              ...adminEventForm,
                              desc: e.target.value,
                            })
                          }
                          rows={2}
                          className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                            theme.inputBorder
                          } rounded-xl outline-none transition-all ${
                            isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                          }`}
                        ></textarea>
                      </div>
                      <div>
                        <label
                          className={`text-sm font-bold flex items-center gap-2 ${theme.textSecondary}`}
                        >
                          <Link className="w-4 h-4" /> رابط تفاصيل/موقع الفعالية
                          (اختياري)
                        </label>
                        <input
                          type="url"
                          value={adminEventForm.link}
                          onChange={(e) =>
                            setAdminEventForm({
                              ...adminEventForm,
                              link: e.target.value,
                            })
                          }
                          className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                            theme.inputBorder
                          } rounded-xl outline-none transition-all ${
                            isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                          }`}
                          dir="ltr"
                          placeholder="https://"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className={`text-sm font-bold ${theme.textSecondary}`}
                          >
                            تاريخ البدء
                          </label>
                          <input
                            type="date"
                            required
                            value={adminEventForm.startDate}
                            onChange={(e) =>
                              setAdminEventForm({
                                ...adminEventForm,
                                startDate: e.target.value,
                              })
                            }
                            className={`w-full p-3 mt-1 ${
                              theme.inputBg
                            } border ${
                              theme.inputBorder
                            } rounded-xl outline-none transition-all ${
                              isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                            }`}
                            dir="ltr"
                          />
                        </div>
                        <div>
                          <label
                            className={`text-sm font-bold ${theme.textSecondary}`}
                          >
                            تاريخ الانتهاء
                          </label>
                          <input
                            type="date"
                            required
                            value={adminEventForm.endDate}
                            onChange={(e) =>
                              setAdminEventForm({
                                ...adminEventForm,
                                endDate: e.target.value,
                              })
                            }
                            className={`w-full p-3 mt-1 ${
                              theme.inputBg
                            } border ${
                              theme.inputBorder
                            } rounded-xl outline-none transition-all ${
                              isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                            }`}
                            dir="ltr"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className={`w-full py-3 mt-2 ${theme.buttonBg} ${theme.buttonText} rounded-xl font-bold flex justify-center items-center gap-2 hover:scale-[1.02] transition-transform`}
                      >
                        <Plus className="w-5 h-5" /> نشر الفعالية
                      </button>
                    </form>
                    <div className="space-y-4">
                      {eventsDb.map((ev) => {
                        const status = getEventStatus(ev);
                        return (
                          <div
                            key={ev.id}
                            className={`p-6 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}`}
                          >
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                              <div>
                                <h4
                                  className={`font-bold text-xl mb-1 ${theme.textPrimary}`}
                                >
                                  {ev.title}
                                </h4>
                                <p
                                  className={`text-sm font-bold mb-2 ${
                                    status === "canceled"
                                      ? "text-red-500"
                                      : status === "upcoming"
                                      ? "text-blue-500"
                                      : status === "current"
                                      ? "text-green-500"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {status === "canceled"
                                    ? "ملغاة"
                                    : status === "upcoming"
                                    ? "قادمة"
                                    : status === "current"
                                    ? "جارية"
                                    : "منتهية"}{" "}
                                  ({ev.startDate} - {ev.endDate})
                                </p>
                                <p className={`text-sm ${theme.textSecondary}`}>
                                  {t("events_registered")}:{" "}
                                  {(ev.registeredUsers || []).length}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                                <button
                                  onClick={() => setViewEventUsers(ev)}
                                  className={`flex-1 md:flex-none p-2 rounded-xl bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-white transition-colors flex justify-center items-center gap-1`}
                                >
                                  <Eye className="w-4 h-4" />{" "}
                                  {t("view_registered")}
                                </button>
                                {!ev.isCanceled && (
                                  <button
                                    onClick={() => handleCancelEvent(ev.id)}
                                    className={`flex-1 md:flex-none p-2 rounded-xl bg-orange-500/10 text-orange-600 hover:bg-orange-500 hover:text-white transition-colors flex justify-center items-center gap-1`}
                                  >
                                    <X className="w-4 h-4" /> {t("cancel_btn")}
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteEvent(ev.id)}
                                  className={`flex-1 md:flex-none p-2 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500 hover:text-white transition-colors flex justify-center items-center gap-1`}
                                >
                                  <Trash2 className="w-4 h-4" />{" "}
                                  {t("delete_btn")}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activePage === "profile" && currentUser && (
            <div className="max-w-4xl mx-auto px-6 animate-in fade-in">
              <div
                className={`${theme.cardBg} p-10 md:p-16 rounded-[4rem] ${theme.glow} border ${theme.cardBorder} text-center relative overflow-hidden`}
              >
                <div
                  className={`w-24 h-24 ${theme.iconBg} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border ${theme.cardBorder}`}
                >
                  <User className={`w-10 h-10 ${theme.accent}`} />
                </div>
                <h2
                  className={`text-4xl md:text-5xl font-black mb-12 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("profile")}
                </h2>

                {currentUser.badges && currentUser.badges.length > 0 && (
                  <div
                    className={`mb-10 p-6 rounded-3xl ${theme.iconBg} border ${theme.cardBorder}`}
                  >
                    <h3
                      className={`font-bold mb-4 flex items-center justify-center gap-2 ${theme.textPrimary}`}
                    >
                      <Award className="w-5 h-5" /> {t("my_badges")}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {currentUser.badges.map((b, i) => (
                        <span
                          key={i}
                          className={`px-4 py-2 rounded-full font-black text-sm border border-[#D4AF37] bg-[#D4AF37]/10 ${theme.textPrimary} shadow-[0_0_15px_rgba(212,175,55,0.2)]`}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profileMsg.text && (
                  <div
                    className={`mb-8 p-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${
                      profileMsg.type === "error"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-green-500/10 text-green-600 dark:text-green-400"
                    }`}
                  >
                    {profileMsg.type === "error" ? (
                      <AlertCircle className="w-5 h-5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                    {profileMsg.text}
                  </div>
                )}

                <form
                  onSubmit={handleProfileUpdate}
                  className="max-w-md mx-auto space-y-6 text-start"
                  dir={dir}
                >
                  <div
                    className={`p-6 rounded-3xl ${theme.iconBg} border ${theme.cardBorder} space-y-4`}
                  >
                    <h3
                      className={`font-bold ${theme.textPrimary} border-b ${theme.cardBorder} pb-2 mb-4`}
                    >
                      <Edit3 className="w-5 h-5 inline-block mx-1" /> البيانات
                      الشخصية
                    </h3>
                    <div>
                      <label
                        className={`text-xs font-bold ${theme.textSecondary}`}
                      >
                        {t("fullname")}
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.fullName}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            fullName: e.target.value,
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs font-bold ${theme.textSecondary}`}
                      >
                        {t("username")}
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.username}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            username: e.target.value.replace(/\s/g, ""),
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs font-bold ${theme.textSecondary}`}
                      >
                        {t("email_optional")}
                      </label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            email: e.target.value.replace(/\s/g, ""),
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-3xl ${theme.iconBg} border ${theme.cardBorder} space-y-4`}
                  >
                    <h3
                      className={`font-bold ${theme.textPrimary} border-b ${theme.cardBorder} pb-2 mb-4`}
                    >
                      <Network className="w-5 h-5 inline-block mx-1" />{" "}
                      {t("social_links")}
                    </h3>
                    <div>
                      <label
                        className={`text-xs font-bold flex items-center gap-1 ${theme.textSecondary}`}
                      >
                        <LinkedinIcon className="w-3 h-3" />{" "}
                        {t("linkedin_optional")}
                      </label>
                      <input
                        type="url"
                        value={profileForm.linkedin}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            linkedin: e.target.value,
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                        dir="ltr"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs font-bold flex items-center gap-1 ${theme.textSecondary}`}
                      >
                        <XIcon className="w-3 h-3" /> {t("x_optional")}
                      </label>
                      <input
                        type="url"
                        value={profileForm.twitter}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            twitter: e.target.value,
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                        dir="ltr"
                        placeholder="https://x.com/username"
                      />
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-3xl ${theme.iconBg} border ${theme.cardBorder} space-y-4`}
                  >
                    <h3
                      className={`font-bold ${theme.textPrimary} border-b ${theme.cardBorder} pb-2 mb-4`}
                    >
                      <Lock className="w-5 h-5 inline-block mx-1" /> تغيير كلمة
                      المرور
                    </h3>
                    <div>
                      <label
                        className={`text-xs font-bold ${theme.textSecondary}`}
                      >
                        {t("old_password")}
                      </label>
                      <input
                        type="password"
                        value={profileForm.oldPassword}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            oldPassword: e.target.value,
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs font-bold ${theme.textSecondary}`}
                      >
                        {t("new_password")}
                      </label>
                      <input
                        type="password"
                        value={profileForm.newPassword}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            newPassword: e.target.value.replace(/\s/g, ""),
                          })
                        }
                        className={`w-full p-3 mt-1 ${theme.inputBg} border ${
                          theme.inputBorder
                        } rounded-xl outline-none transition-all ${
                          isDarkMode ? "text-[#D4AF37]" : "text-[#3E2723]"
                        }`}
                        dir="ltr"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`w-full py-4 mt-4 ${theme.buttonBg} ${theme.buttonText} rounded-2xl font-bold text-lg shadow-lg flex justify-center items-center gap-2 hover:scale-105 transition-transform`}
                  >
                    <Save className="w-5 h-5" /> {t("update_profile")}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activePage === "settings" && (
            <div className="max-w-4xl mx-auto px-6 animate-in fade-in">
              <div
                className={`${theme.cardBg} p-10 md:p-16 rounded-[4rem] ${theme.glow} border ${theme.cardBorder} text-center`}
              >
                <div
                  className={`w-24 h-24 ${theme.iconBg} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border ${theme.cardBorder}`}
                >
                  <Settings className={`w-10 h-10 ${theme.accent}`} />
                </div>
                <h2
                  className={`text-5xl font-black mb-12 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("settings")}
                </h2>
                <div
                  className="max-w-md mx-auto space-y-6 text-start"
                  dir={dir}
                >
                  <div
                    className={`p-6 rounded-3xl ${theme.iconBg} border ${theme.cardBorder}`}
                  >
                    <h3
                      className={`font-bold mb-4 flex items-center gap-2 ${theme.textPrimary}`}
                    >
                      <Lightbulb className={theme.accent} /> {t("theme_title")}
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setIsDarkMode(false)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          !isDarkMode
                            ? theme.buttonBg + " " + theme.buttonText
                            : theme.cardBg + " " + theme.textSecondary
                        }`}
                      >
                        {t("light_mode")}
                      </button>
                      <button
                        onClick={() => setIsDarkMode(true)}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          isDarkMode
                            ? theme.buttonBg + " " + theme.buttonText
                            : theme.cardBg + " " + theme.textSecondary
                        }`}
                      >
                        {t("dark_mode")}
                      </button>
                    </div>
                  </div>
                  <div
                    className={`p-6 rounded-3xl ${theme.iconBg} border ${theme.cardBorder}`}
                  >
                    <h3
                      className={`font-bold mb-4 flex items-center gap-2 ${theme.textPrimary}`}
                    >
                      <Globe className={theme.accent} /> {t("language")}
                    </h3>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setLang("ar")}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          lang === "ar"
                            ? theme.buttonBg + " " + theme.buttonText
                            : theme.cardBg + " " + theme.textSecondary
                        }`}
                      >
                        العربية
                      </button>
                      <button
                        onClick={() => setLang("en")}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                          lang === "en"
                            ? theme.buttonBg + " " + theme.buttonText
                            : theme.cardBg + " " + theme.textSecondary
                        }`}
                      >
                        English
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "events" && (
            <div className="max-w-6xl mx-auto px-4 md:px-6 animate-in fade-in">
              <div
                className={`${theme.cardBg} p-6 md:p-12 rounded-[4rem] border ${theme.cardBorder} text-center min-h-[50vh]`}
              >
                <div
                  className={`w-24 h-24 ${theme.iconBg} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border ${theme.cardBorder}`}
                >
                  <CalendarDays className={`w-10 h-10 ${theme.accent}`} />
                </div>
                <h2
                  className={`text-4xl md:text-5xl font-black mb-12 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("events")}
                </h2>
                <div className="flex flex-col md:flex-row gap-4 mb-10 w-full max-w-4xl mx-auto">
                  <div
                    className={`flex-1 flex items-center px-4 rounded-2xl border ${theme.cardBorder} ${theme.iconBg}`}
                  >
                    <Search className={`w-5 h-5 ${theme.textSecondary}`} />
                    <input
                      type="text"
                      placeholder="بحث عن فعالية..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className={`w-full p-3 bg-transparent outline-none ${theme.textPrimary}`}
                    />
                  </div>
                  <div
                    className={`flex items-center px-4 rounded-2xl border ${theme.cardBorder} ${theme.iconBg}`}
                  >
                    <Filter
                      className={`w-5 h-5 ${theme.textSecondary} mr-2 ml-2`}
                    />
                    <select
                      value={eventFilter}
                      onChange={(e) => setEventFilter(e.target.value)}
                      className={`p-3 bg-transparent outline-none cursor-pointer font-bold ${theme.textPrimary}`}
                    >
                      <option value="all">{t("events_all")}</option>
                      <option value="current">{t("events_current")}</option>
                      <option value="upcoming">{t("events_upcoming")}</option>
                      <option value="past">{t("events_past")}</option>
                      <option value="registered">
                        {t("events_registered")}
                      </option>
                      <option value="canceled">{t("events_canceled")}</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-start">
                  {filteredEvents.length === 0 ? (
                    <div className="col-span-full text-center p-10">
                      <p
                        className={`text-xl opacity-60 ${theme.textSecondary}`}
                      >
                        لا توجد فعاليات مطابقة لبحثك.
                      </p>
                    </div>
                  ) : (
                    filteredEvents.map((ev) => {
                      const status = getEventStatus(ev);
                      const isRegistered =
                        currentUser &&
                        (ev.registeredUsers || []).includes(
                          currentUser.username
                        );
                      return (
                        <div
                          key={ev.id}
                          className={`p-6 md:p-8 rounded-3xl ${theme.iconBg} border ${theme.cardBorder} hover:scale-[1.02] transition-transform shadow-md relative overflow-hidden flex flex-col h-full`}
                        >
                          <div
                            className={`absolute top-0 left-0 w-full h-1 ${
                              status === "canceled"
                                ? "bg-red-500"
                                : status === "upcoming"
                                ? "bg-blue-500"
                                : status === "current"
                                ? "bg-green-500"
                                : "bg-gray-500"
                            }`}
                          ></div>
                          <div className="flex justify-between items-start mb-4">
                            <h3
                              className={`text-2xl font-bold ${theme.textPrimary}`}
                            >
                              {ev.title}
                            </h3>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full border ${
                                status === "canceled"
                                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                                  : status === "upcoming"
                                  ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                  : status === "current"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                              }`}
                            >
                              {status === "canceled"
                                ? "ملغاة"
                                : status === "upcoming"
                                ? "قادمة"
                                : status === "current"
                                ? "جارية"
                                : "سابقة"}
                            </span>
                          </div>
                          <p
                            className={`text-sm mb-4 opacity-70 font-bold flex items-center gap-2 ${theme.textSecondary}`}
                          >
                            <Calendar className="w-4 h-4" /> {ev.startDate} ➝{" "}
                            {ev.endDate}
                          </p>
                          <p
                            className={`text-base leading-relaxed mb-6 flex-1 ${theme.textPrimary}`}
                          >
                            {ev.desc}
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-6 border-t border-[#D4AF37]/20">
                            {ev.link && (
                              <a
                                href={ev.link}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex-1 py-3 rounded-xl border-2 font-bold flex justify-center items-center gap-2 transition-transform hover:scale-105 ${theme.cardBorder} ${theme.textPrimary}`}
                              >
                                <Link className="w-4 h-4" /> التفاصيل
                              </a>
                            )}
                            {currentUser &&
                              status !== "canceled" &&
                              status !== "past" &&
                              (isRegistered ? (
                                <div className="flex-1 py-3 rounded-xl bg-green-500/10 text-green-600 font-bold flex justify-center items-center gap-2 cursor-default">
                                  <CheckCircle2 className="w-5 h-5" />{" "}
                                  {t("already_registered")}
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleRegisterEvent(ev.id)}
                                  className={`flex-1 py-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-transform hover:scale-105 shadow-md ${theme.buttonBg} ${theme.buttonText}`}
                                >
                                  <UserPlus className="w-5 h-5" />{" "}
                                  {t("register_event")}
                                </button>
                              ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {activePage === "structure" && (
            <div className="animate-in fade-in px-4 md:px-6 relative z-10">
              <header className="flex flex-col items-center pt-6 pb-16 text-center">
                {currentLogo && (
                  <img
                    src={currentLogo}
                    alt="Logo"
                    className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-xl mb-10 hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => {
                      setActivePage("home");
                      window.scrollTo(0, 0);
                    }}
                  />
                )}
                <h1
                  className={`text-5xl md:text-7xl font-black mb-6 uppercase ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("structure")}
                </h1>
                <div
                  className={`w-24 h-1 ${theme.accent} opacity-50 rounded-full mx-auto`}
                ></div>
              </header>
              <div className="max-w-7xl mx-auto">
                <section className="flex flex-col items-center mb-24">
                  <div
                    className={`${theme.cardBg} border ${theme.cardBorder} p-8 md:p-12 rounded-[3.5rem] w-full text-center ${theme.glow}`}
                  >
                    <h2
                      className={`font-black text-3xl md:text-4xl mb-12 ${theme.textPrimary}`}
                      style={{ fontFamily: titleFont }}
                    >
                      {t("board_directors")}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                      {clubBoard.map((roleObj, i) => {
                        const user = getUserByBadge(roleObj.badge);
                        return (
                          <div
                            key={i}
                            onClick={() =>
                              user ? setViewUserModal(user) : null
                            }
                            className={`cursor-pointer p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center justify-center w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] min-h-[160px] text-center shadow-md hover:scale-105 ${
                              user
                                ? theme.buttonBg + " " + theme.buttonText
                                : theme.iconBg + " " + theme.cardBorder
                            }`}
                          >
                            <div
                              className={`p-3 rounded-2xl mb-4 ${
                                user
                                  ? "bg-white/20"
                                  : theme.cardBg + " " + theme.accent
                              } shadow-sm`}
                            >
                              {roleObj.icon}
                            </div>
                            <h3
                              className={`font-black text-xl mb-2 ${
                                user ? theme.buttonText : theme.textPrimary
                              }`}
                            >
                              {roleObj.badge}
                            </h3>
                            <p
                              className={`font-bold text-sm ${
                                user ? "opacity-90" : theme.textSecondary
                              }`}
                            >
                              {user ? user.fullName : t("vacant")}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
                <section className="flex flex-col items-center mb-28">
                  <h2
                    className={`font-black text-4xl mb-12 text-center ${theme.textPrimary}`}
                    style={{ fontFamily: titleFont }}
                  >
                    {t("sectors")}
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                    {clubSectors.map((sector) => (
                      <div key={sector.id} className="flex flex-col group">
                        <div
                          className={`w-full p-8 rounded-t-[3rem] rounded-b-xl flex flex-col items-center gap-4 shadow-lg border-2 border-b-0 ${theme.buttonBg} ${theme.buttonText} ${theme.cardBorder}`}
                        >
                          <div className="p-4 rounded-3xl bg-white/20 shadow-inner text-white">
                            {sector.icon}
                          </div>
                          <h3
                            className="font-black text-2xl"
                            style={{ fontFamily: titleFont }}
                          >
                            {sector.title}
                          </h3>
                        </div>
                        <div
                          className={`w-full flex flex-col gap-3 p-4 rounded-b-[3rem] border-2 border-t-0 shadow-md ${theme.cardBg} ${theme.cardBorder}`}
                        >
                          {sector.committees.map((comm, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedCommittee(comm.name)}
                              className={`w-full flex items-center justify-between p-5 ${theme.iconBg} border ${theme.cardBorder} rounded-[2rem] transition-all hover:scale-[1.02] shadow-sm`}
                            >
                              <span
                                className={`text-base font-bold ${theme.textPrimary}`}
                              >
                                {comm.name}
                              </span>
                              <ChevronRight
                                className={`w-5 h-5 ${theme.accent}`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {selectedCommittee && (
                <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 text-center animate-in fade-in">
                  <div
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={() => setSelectedCommittee(null)}
                  />
                  <div
                    className={`relative w-full max-w-2xl ${theme.iconBg} border ${theme.cardBorder} rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]`}
                  >
                    <div
                      className={`p-8 md:p-10 ${theme.cardBg} border-b ${theme.cardBorder} shrink-0`}
                    >
                      <button
                        onClick={() => setSelectedCommittee(null)}
                        className={`absolute top-6 ${
                          lang === "ar" ? "right-6" : "left-6"
                        } p-2 ${
                          theme.textSecondary
                        } hover:opacity-70 rounded-full bg-black/5 dark:bg-white/5`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <h2
                        className={`text-3xl font-black mt-2 ${theme.textPrimary}`}
                        style={{ fontFamily: titleFont }}
                      >
                        {selectedCommittee}
                      </h2>
                    </div>
                    <div className="p-6 md:p-10 space-y-8 overflow-y-auto flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["رئيس", "نائب"].map((roleType) => {
                          const roleName = `${selectedCommittee} - ${roleType}`;
                          const user = getUserByBadge(roleName);
                          return (
                            <div
                              key={roleType}
                              onClick={() =>
                                user ? setViewUserModal(user) : null
                              }
                              className={`cursor-pointer p-6 rounded-[2rem] border transition-all flex flex-col items-center justify-center min-h-[120px] shadow-sm hover:scale-105 ${
                                user
                                  ? theme.buttonBg + " " + theme.buttonText
                                  : theme.cardBg + " " + theme.cardBorder
                              }`}
                            >
                              <span
                                className={`text-sm font-bold opacity-80 mb-2`}
                              >
                                {roleType} اللجنة
                              </span>
                              <span className={`font-black text-xl`}>
                                {user ? user.fullName : t("vacant")}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="space-y-3">
                        <p
                          className={`text-xs font-bold uppercase tracking-widest text-start px-4 ${theme.textSecondary}`}
                        >
                          {t("team_members")}
                        </p>
                        {(() => {
                          const members = usersDb.filter((u) =>
                            (u.committees || []).includes(selectedCommittee)
                          );
                          if (members.length === 0)
                            return (
                              <div
                                className={`p-8 rounded-2xl border ${theme.cardBorder} ${theme.cardBg}`}
                              >
                                <p
                                  className={`text-sm font-bold opacity-60 ${theme.textSecondary}`}
                                >
                                  {t("no_members_yet")}
                                </p>
                              </div>
                            );
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {members.map((m, i) => (
                                <div
                                  key={i}
                                  onClick={() => setViewUserModal(m)}
                                  className={`flex items-center justify-between p-4 ${theme.cardBg} rounded-2xl border ${theme.cardBorder} cursor-pointer hover:scale-105 transition-transform shadow-sm`}
                                >
                                  <span
                                    className={`font-bold text-sm truncate pr-2 ${theme.textPrimary}`}
                                  >
                                    {m.fullName}
                                  </span>
                                  <User
                                    className={`w-4 h-4 shrink-0 ${theme.accent}`}
                                  />
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activePage === "about" && (
            <div className="max-w-4xl mx-auto px-6 py-8 animate-in fade-in relative z-10">
              <div
                className={`${theme.cardBg} p-8 md:p-16 rounded-[4rem] border ${theme.cardBorder} text-center relative shadow-2xl`}
              >
                <h2
                  className={`text-5xl font-black mb-16 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("about_title")}
                </h2>

                {/* ⭐️ الحاوية التفاعلية المذهلة للشعار ومعناه (بناءً على طلبك السابق) ⭐️ */}
                <div className="relative group mx-auto mb-20 flex flex-col items-center justify-center w-full max-w-2xl cursor-pointer">
                  {/* الشعار والحلقات التفاعلية */}
                  <div className="relative z-20 transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-translate-y-4">
                    {currentLogo && (
                      <img
                        src={currentLogo}
                        alt="Logo"
                        className="w-48 h-48 md:w-56 md:h-56 object-contain relative z-10"
                      />
                    )}

                    {/* حلقة مدار كوكب زحل (تظهر عند التمرير) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[35%] border-[3px] border-[#D4AF37]/60 rounded-[100%] rotate-[20deg] scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000 ease-out z-0"></div>

                    {/* مسار الـ DNA (يظهر بعد حلقة الكوكب بقليل) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[45%] border-[3px] border-blue-400/60 rounded-[100%] -rotate-[15deg] scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-1000 ease-out delay-[200ms] z-0"></div>
                  </div>

                  {/* تلميح صغير يختفي عند التمرير */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-60 group-hover:opacity-0 transition-opacity duration-500 flex items-center gap-2 w-max text-sm font-bold ${theme.textSecondary}`}
                  >
                    <Sparkles className={`w-4 h-4 ${theme.accent}`} />{" "}
                    {lang === "ar"
                      ? "مرر للتفاعل مع الشعار"
                      : "Hover to interact"}{" "}
                    <Sparkles className={`w-4 h-4 ${theme.accent}`} />
                  </div>

                  {/* 📜 العبارة التي تنسدل بسلاسة فائقة */}
                  <div className="w-full overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-h-0 group-hover:max-h-[500px] opacity-0 group-hover:opacity-100 mt-0 group-hover:mt-10">
                    <div
                      className={`p-8 md:p-12 rounded-[3rem] border ${theme.cardBorder} shadow-2xl ${theme.iconBg} relative`}
                    >
                      <p
                        className={`text-xl md:text-2xl font-bold leading-[2.5] text-center ${theme.textPrimary}`}
                      >
                        {lang === "ar"
                          ? "استلهمنا شعارنا من تناغم الكون ودقة الخلية؛ حيث يمثل"
                          : "Our logo is inspired by the harmony of the universe and the precision of the cell; where"}

                        {/* تأثير ظهور كلمة "زحل" */}
                        <span
                          className={`inline-block font-black text-[#D4AF37] mx-2 transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 delay-[400ms]`}
                        >
                          {lang === "ar" ? "(زحل)" : "(Saturn)"}
                        </span>

                        {lang === "ar"
                          ? "طموحنا السامي، ويحيطه مدار من الـ"
                          : "represents our lofty ambition, surrounded by an orbit of"}

                        {/* تأثير ظهور كلمة "DNA" */}
                        <span
                          className={`inline-block font-black text-blue-500 mx-2 transform scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 delay-[800ms]`}
                        >
                          DNA
                        </span>

                        {lang === "ar"
                          ? "ليعبر عن هويتنا الصحية،"
                          : "to express our health identity,"}

                        {/* تأثير ظهور الخاتمة */}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-[1200ms] block mt-6 text-[#E2725B] font-black text-2xl md:text-3xl">
                          {lang === "ar"
                            ? "في مزيج يجسد اسمنا (مدار) كحلقة وصل بين العلم والإبداع."
                            : "in a blend that embodies our name (Madar) as a link between science and creativity."}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                {/* ⭐️ نهاية الحاوية التفاعلية ⭐️ */}

                <div
                  className={`space-y-8 text-xl text-start ${theme.textSecondary}`}
                  dir={dir}
                >
                  <p
                    className={`${theme.iconBg} p-8 rounded-3xl border ${theme.cardBorder}`}
                  >
                    {t("about_p1")}
                  </p>
                  <p
                    className={`${theme.iconBg} p-8 rounded-3xl border ${theme.cardBorder}`}
                  >
                    {t("about_p2")}
                  </p>
                </div>

                {/* قسم الفوتر النبذة */}
                <div
                  className={`mt-16 inline-block bg-gradient-to-r ${
                    isDarkMode
                      ? "from-[#D4AF37] to-[#1C2541]"
                      : "from-[#3E2723] to-[#5D4037]"
                  } p-[2px] rounded-3xl shadow-2xl transition-transform hover:scale-105`}
                >
                  <div
                    className={`${theme.cardBg} px-6 py-6 md:px-10 md:py-8 rounded-[22px] flex items-center justify-center gap-4`}
                  >
                    <p
                      className={`text-base md:text-xl font-bold leading-relaxed ${theme.textPrimary}`}
                    >
                      <span
                        className={`px-2 py-1 rounded-lg ${
                          isDarkMode
                            ? "text-[#FDE047] bg-[#FDE047]/10"
                            : "text-[#D2691E] bg-[#D2691E]/10"
                        } font-black mx-1 inline-block`}
                      >
                        {t("about_footer_p1")}
                      </span>
                      {t("about_footer_p2")}
                      <span
                        className={`px-2 py-1 rounded-lg ${
                          isDarkMode
                            ? "text-[#FDE047] bg-[#FDE047]/10"
                            : "text-[#D2691E] bg-[#D2691E]/10"
                        } font-black mx-1 inline-block`}
                      >
                        {t("about_footer_p3")}
                      </span>
                      {t("about_footer_p4")}
                      <span
                        className={`px-2 py-1 rounded-lg ${
                          isDarkMode
                            ? "text-[#FDE047] bg-[#FDE047]/10"
                            : "text-[#D2691E] bg-[#D2691E]/10"
                        } font-black mx-1 inline-block`}
                      >
                        {t("about_footer_p5")}
                      </span>
                      {t("about_footer_p6")}
                      <span
                        className={`px-2 py-1 rounded-lg ${
                          isDarkMode
                            ? "text-[#FDE047] bg-[#FDE047]/10"
                            : "text-[#D2691E] bg-[#D2691E]/10"
                        } font-black mx-1 inline-block`}
                      >
                        {t("about_footer_p7")}
                      </span>
                      {t("about_footer_p8")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === "news" && (
            <div className="max-w-4xl mx-auto px-6 animate-in fade-in relative z-10">
              <div
                className={`${theme.cardBg} p-10 md:p-16 rounded-[4rem] border ${theme.cardBorder} text-center min-h-[50vh]`}
              >
                <div
                  className={`w-24 h-24 ${theme.iconBg} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border ${theme.cardBorder}`}
                >
                  <Newspaper className={`w-10 h-10 ${theme.accent}`} />
                </div>
                <h2
                  className={`text-5xl font-black mb-12 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("news_title")}
                </h2>
                {(newsDb || []).length === 0 ? (
                  <p className={`text-xl opacity-60 ${theme.textSecondary}`}>
                    {t("coming_soon_msg")}
                  </p>
                ) : (
                  <div className="space-y-10 text-start">
                    {newsDb.map((news) => (
                      <div
                        key={news.id}
                        className={`p-8 rounded-3xl ${theme.iconBg} border ${theme.cardBorder} hover:scale-[1.01] transition-transform shadow-md`}
                      >
                        <div className="flex justify-between items-start mb-6 border-b border-[#D4AF37]/20 pb-4">
                          <h3
                            className={`text-2xl font-bold ${theme.textPrimary}`}
                          >
                            {news.title}
                          </h3>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${theme.cardBg} ${theme.textSecondary}`}
                          >
                            {news.date}
                          </span>
                        </div>
                        {renderNewsMedia(news)}
                        <p
                          className={`text-lg leading-relaxed ${theme.textPrimary} whitespace-pre-wrap`}
                        >
                          {news.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activePage === "points" && (
            <div className="max-w-5xl mx-auto px-4 md:px-6 animate-in fade-in relative z-10">
              <div
                className={`${theme.cardBg} p-8 md:p-16 rounded-[4rem] border ${theme.cardBorder} text-center min-h-[50vh]`}
              >
                <div
                  className={`w-24 h-24 ${theme.iconBg} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border ${theme.cardBorder}`}
                >
                  <Trophy className={`w-10 h-10 ${theme.accent}`} />
                </div>
                <h2
                  className={`text-4xl md:text-5xl font-black mb-16 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("points_title")}
                </h2>
                {(pointsDb || []).length === 0 ? (
                  <p className={`text-xl opacity-60 ${theme.textSecondary}`}>
                    {t("points_msg")}
                  </p>
                ) : (
                  <div className="w-full max-w-3xl mx-auto">
                    <div className="flex justify-center items-end gap-2 md:gap-6 mb-16 h-48 md:h-64">
                      {top2 && (
                        <div
                          className={`w-24 md:w-36 h-36 md:h-48 ${theme.iconBg} border-t-4 border-gray-400 rounded-t-3xl shadow-lg flex flex-col items-center justify-end pb-6 relative animate-in slide-in-from-bottom`}
                        >
                          <div
                            className={`absolute -top-8 w-16 h-16 bg-gray-400 text-white rounded-full flex items-center justify-center border-4 ${theme.cardBg} shadow-md`}
                          >
                            <Medal className="w-8 h-8" />
                          </div>
                          <h4
                            className={`font-bold text-sm md:text-base px-2 truncate w-full ${theme.textPrimary}`}
                          >
                            {top2.name}
                          </h4>
                          <p className="font-black text-gray-400">
                            {top2.points}
                          </p>
                        </div>
                      )}
                      {top1 && (
                        <div
                          className={`w-28 md:w-44 h-48 md:h-64 ${theme.iconBg} border-t-4 border-yellow-500 rounded-t-3xl shadow-2xl flex flex-col items-center justify-end pb-8 relative z-10 animate-in slide-in-from-bottom`}
                        >
                          <div
                            className={`absolute -top-10 w-20 h-20 bg-yellow-500 text-white rounded-full flex items-center justify-center border-4 ${theme.cardBg} shadow-lg`}
                          >
                            <Crown className="w-10 h-10" />
                          </div>
                          <h4
                            className={`font-black text-base md:text-lg px-2 truncate w-full ${theme.textPrimary}`}
                          >
                            {top1.name}
                          </h4>
                          <p className="font-black text-yellow-500 text-lg md:text-xl">
                            {top1.points}
                          </p>
                        </div>
                      )}
                      {top3 && (
                        <div
                          className={`w-24 md:w-36 h-32 md:h-40 ${theme.iconBg} border-t-4 border-orange-700 rounded-t-3xl shadow-lg flex flex-col items-center justify-end pb-4 relative animate-in slide-in-from-bottom`}
                        >
                          <div
                            className={`absolute -top-8 w-16 h-16 bg-orange-700 text-white rounded-full flex items-center justify-center border-4 ${theme.cardBg} shadow-md`}
                          >
                            <Award className="w-8 h-8" />
                          </div>
                          <h4
                            className={`font-bold text-sm md:text-base px-2 truncate w-full ${theme.textPrimary}`}
                          >
                            {top3.name}
                          </h4>
                          <p className="font-black text-orange-700">
                            {top3.points}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      {restPoints.map((p, i) => (
                        <div
                          key={p.id}
                          className={`flex justify-between items-center p-4 md:p-5 rounded-2xl border ${theme.cardBorder} ${theme.iconBg} hover:scale-[1.02] transition-transform`}
                        >
                          <div className="flex items-center gap-4 md:gap-6">
                            <span
                              className={`w-8 font-black text-xl md:text-2xl ${theme.textSecondary}`}
                            >
                              #{i + 4}
                            </span>
                            <span
                              className={`font-bold text-lg ${theme.textPrimary}`}
                            >
                              {p.name}
                            </span>
                          </div>
                          <div className={`font-black text-lg ${theme.accent}`}>
                            {p.points}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activePage === "contact" && (
            <div className="max-w-6xl mx-auto px-6 animate-in fade-in relative z-10">
              <div
                className={`${theme.cardBg} p-10 md:p-16 rounded-[4rem] border ${theme.cardBorder} text-center`}
              >
                <div
                  className={`w-24 h-24 ${theme.iconBg} rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border ${theme.cardBorder}`}
                >
                  <Phone className={theme.accent} />
                </div>
                <h2
                  className={`text-5xl font-black mb-12 ${theme.textPrimary}`}
                  style={{ fontFamily: titleFont }}
                >
                  {t("contact_title")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
                  <a
                    href={`mailto:${CLUB_DATA.contact.email}`}
                    className={`${theme.iconBg} p-4 md:p-6 rounded-3xl border ${theme.cardBorder} flex flex-col items-center justify-center gap-3 w-full h-32 md:h-40 hover:scale-105 transition-transform cursor-pointer shadow-sm text-center group`}
                  >
                    <Mail className={`w-6 h-6 md:w-7 md:h-7 ${theme.accent}`} />
                    <span
                      className={`font-bold text-xs md:text-sm ${theme.textPrimary} w-full truncate px-2`}
                      dir="ltr"
                    >
                      {CLUB_DATA.contact.email}
                    </span>
                  </a>
                  <a
                    href={`tel:${CLUB_DATA.contact.phone.replace(/\s/g, "")}`}
                    className={`${theme.iconBg} p-4 md:p-6 rounded-3xl border ${theme.cardBorder} flex flex-col items-center justify-center gap-3 w-full h-32 md:h-40 hover:scale-105 transition-transform cursor-pointer shadow-sm text-center group`}
                  >
                    <Phone
                      className={`w-6 h-6 md:w-7 md:h-7 ${theme.accent}`}
                    />
                    <span
                      className={`font-bold text-xs md:text-sm ${theme.textPrimary} w-full truncate px-2`}
                      dir="ltr"
                    >
                      {CLUB_DATA.contact.phone}
                    </span>
                  </a>
                  <a
                    href={`https://wa.me/${CLUB_DATA.contact.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`${theme.iconBg} p-4 md:p-6 rounded-3xl border ${theme.cardBorder} flex flex-col items-center justify-center gap-3 w-full h-32 md:h-40 hover:scale-105 transition-transform cursor-pointer shadow-sm text-center group`}
                  >
                    <WhatsAppIcon
                      className={`w-6 h-6 md:w-7 md:h-7 ${theme.accent}`}
                    />
                    <span
                      className={`font-bold text-xs md:text-sm ${theme.textPrimary} w-full truncate px-2`}
                      dir="ltr"
                    >
                      {CLUB_DATA.contact.whatsapp}
                    </span>
                  </a>
                  <a
                    href={`https://instagram.com/${CLUB_DATA.contact.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`${theme.iconBg} p-4 md:p-6 rounded-3xl border ${theme.cardBorder} flex flex-col items-center justify-center gap-3 w-full h-32 md:h-40 hover:scale-105 transition-transform cursor-pointer shadow-sm text-center group`}
                  >
                    <InstagramIcon
                      className={`w-6 h-6 md:w-7 md:h-7 ${theme.accent}`}
                    />
                    <span
                      className={`font-bold text-xs md:text-sm ${theme.textPrimary} w-full truncate px-2`}
                      dir="ltr"
                    >
                      {CLUB_DATA.contact.instagram}
                    </span>
                  </a>
                  <a
                    href={`https://tiktok.com/${CLUB_DATA.contact.tiktok}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`${theme.iconBg} p-4 md:p-6 rounded-3xl border ${theme.cardBorder} flex flex-col items-center justify-center gap-3 w-full h-32 md:h-40 hover:scale-105 transition-transform cursor-pointer shadow-sm text-center group`}
                  >
                    <TikTokIcon
                      className={`w-6 h-6 md:w-7 md:h-7 ${theme.accent}`}
                    />
                    <span
                      className={`font-bold text-xs md:text-sm ${theme.textPrimary} w-full truncate px-2`}
                      dir="ltr"
                    >
                      {CLUB_DATA.contact.tiktok}
                    </span>
                  </a>
                  <a
                    href={`https://twitter.com/${CLUB_DATA.contact.x_platform.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`${theme.iconBg} p-4 md:p-6 rounded-3xl border ${theme.cardBorder} flex flex-col items-center justify-center gap-3 w-full h-32 md:h-40 hover:scale-105 transition-transform cursor-pointer shadow-sm text-center group`}
                  >
                    <XIcon
                      className={`w-6 h-6 md:w-7 md:h-7 ${theme.accent}`}
                    />
                    <span
                      className={`font-bold text-xs md:text-sm ${theme.textPrimary} w-full truncate px-2`}
                      dir="ltr"
                    >
                      {CLUB_DATA.contact.x_platform}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* عرض نافذة المستخدم (المنبثقة) */}
        {renderUserModal()}

        {/* عرض مسجلي الفعاليات للادمن */}
        {viewEventUsers && (
          <div
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in"
            onClick={() => setViewEventUsers(null)}
          >
            <div
              className={`${theme.cardBg} w-full max-w-lg rounded-[3rem] shadow-2xl border ${theme.cardBorder} p-8 relative flex flex-col max-h-[80vh]`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setViewEventUsers(null)}
                className={`absolute top-6 ${
                  lang === "ar" ? "right-6" : "left-6"
                } p-2 ${theme.textSecondary} hover:opacity-70 rounded-full`}
              >
                <X className="w-5 h-5" />
              </button>
              <h3
                className={`text-2xl font-black mb-6 ${theme.textPrimary}`}
                style={{ fontFamily: titleFont }}
              >
                المسجلين: {viewEventUsers.title}
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {(viewEventUsers.registeredUsers || []).length === 0 ? (
                  <p className="text-center opacity-60">لا يوجد مسجلين.</p>
                ) : (
                  viewEventUsers.registeredUsers.map((uname, idx) => {
                    const u = (usersDb || []).find(
                      (user) => user.username === uname
                    );
                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border ${theme.cardBorder} ${theme.iconBg} flex justify-between items-center`}
                      >
                        <span className="font-bold">
                          {u ? u.fullName : uname}
                        </span>
                        <span className="text-sm opacity-60">@{uname}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        <footer
          className={`mt-auto py-8 text-center border-t ${theme.cardBorder}`}
        >
          <div
            className={`inline-flex items-center justify-center gap-2 opacity-40 text-sm font-bold tracking-widest uppercase ${theme.textSecondary}`}
          >
            <span>{t("made_in")}</span>
            <Heart className={`w-4 h-4 fill-current ${theme.accent}`} />
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${theme.bg} transition-colors duration-500 relative`}
      dir={dir}
      style={{ fontFamily: appFont }}
    >
      {appView === "auth" && renderAuthForms()}
      {(appView === "intro1" || appView === "intro2") && renderIntro()}
      {appView === "committees" && renderCommittees()}
      {appView === "main" && renderMainApp()}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes rocket-cinematic { 0% { transform: translateY(40px) scale(0.8); opacity: 0; } 20% { transform: translateY(0) scale(1); opacity: 1; } 50% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-150vh) scale(1.1); opacity: 1; } }
        .animate-rocket-cinematic { animation: rocket-cinematic 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes fire-smooth { 0%, 100% { opacity: 0.7; transform: scaleY(1) translateX(-50%); } 50% { opacity: 1; transform: scaleY(1.1) translateX(-50%); } }
        .animate-fire-smooth { animation: fire-smooth 0.5s ease-in-out infinite; }
        @keyframes fade-in-up { 0% { transform: translateY(20px); opacity: 0; } 20% { transform: translateY(0); opacity: 1; } 70% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-30px); opacity: 0; } }
        .animate-fade-in-up { animation: fade-in-up 3.5s ease-in-out forwards; }
        @keyframes pulse-elegant { 0%, 100% { opacity: 0.8; } 50% { opacity: 1; } }
        .animate-pulse-elegant { animation: pulse-elegant 2s ease-in-out infinite; }
        .animate-in { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes slideUp { from { opacity: 0; transform: scale(0.9) translateY(40px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      `,
        }}
      />
    </div>
  );
}
