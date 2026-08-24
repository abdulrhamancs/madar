// ==========================================
// 🌐 i18n — dictionaries, direction and locale formatting
// Strings are the club's own copy and are carried over verbatim.
// ==========================================

export type Lang = "ar" | "en";

export const CLUB_DATA = {
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


export const AVAILABLE_BADGES = [
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

export const translations = {
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
    points_msg: "لا توجد نقاط مسجلة بعد.",
    events_none: "لا توجد فعاليات مطابقة لبحثك.",
    events_search: "ابحث عن فعالية...",
    event_details: "التفاصيل",
    event_no_registrations: "لا يوجد مسجلين بعد.",
    status_canceled: "ملغاة",
    status_upcoming: "قادمة",
    status_current: "جارية",
    status_past: "سابقة",
    confirm_delete_member: "حذف العضو نهائياً؟",
    confirm_delete_title: "تأكيد الحذف",
    confirm: "تأكيد",
    close: "إغلاق",
    loading: "جاري التحميل...",
    error_generic: "تعذّر إتمام العملية. حاول مرة أخرى.",
    error_network: "تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.",
    retry: "إعادة المحاولة",
    saving: "جاري الحفظ...",
    saved: "تم الحفظ",
    skip_to_content: "تخطي إلى المحتوى",
    open_menu: "فتح القائمة",
    close_menu: "إغلاق القائمة",
    toggle_theme: "تبديل المظهر",
    more: "المزيد",
    empty_news: "لا توجد أخبار منشورة بعد.",
    empty_events: "لا توجد فعاليات مجدولة بعد.",
    members_count: "عضو",
    // --- redesign: section labels. Wording only; no new features implied. --
    nav_label: "التنقل",
    hero_kicker: "نادي طلابي · الطائف",
    scroll_hint: "تابع للأسفل",
    hero_sectors_label: "قطاعات النادي",
    hero_lead:
      "مساحة يلتقي فيها الطلاب حول فكرة واحدة، فتصير المهارة عملاً والفكرة أثراً.",
    what_is_madar: "ما هو مدار؟",
    read_about: "اقرأ نبذة عنا",
    sectors_lead:
      "ثلاثة قطاعات، وتسع لجان، تدور جميعها حول مركز واحد.",
    committees_count: "لجنة",
    sectors_count: "قطاعات",
    featured_event: "الفعالية القادمة",
    view_all: "عرض الكل",
    latest_news: "أحدث الأخبار",
    community_title: "أعضاء مدار",
    community_lead:
      "مجلس النادي واللجان — الوجوه التي يقوم عليها العمل.",
    impact_title: "مدار بالأرقام",
    join_cta_title: "مدارك يبدأ من هنا",
    join_cta_body:
      "أنشئ حسابك، اختر لجانك، وابدأ المشاركة في فعاليات النادي.",
    explore_events: "تصفح الفعاليات",
    back_home: "العودة للرئيسية",
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
      points_msg: "No points recorded yet.",
    events_none: "No events match your search.",
    events_search: "Search for an event...",
    event_details: "Details",
    event_no_registrations: "No registrations yet.",
    status_canceled: "Canceled",
    status_upcoming: "Upcoming",
    status_current: "Ongoing",
    status_past: "Past",
    confirm_delete_member: "Delete this member permanently?",
    confirm_delete_title: "Confirm deletion",
    confirm: "Confirm",
    close: "Close",
    loading: "Loading...",
    error_generic: "Something went wrong. Please try again.",
    error_network: "Could not reach the server. Check your connection.",
    retry: "Retry",
    saving: "Saving...",
    saved: "Saved",
    skip_to_content: "Skip to content",
    open_menu: "Open menu",
    close_menu: "Close menu",
    toggle_theme: "Toggle theme",
    more: "More",
    empty_news: "No news published yet.",
    empty_events: "No events scheduled yet.",
    members_count: "members",
    // --- redesign: section labels. Wording only; no new features implied. --
    nav_label: "Navigation",
    hero_kicker: "Student club · Taif",
    scroll_hint: "Scroll",
    hero_sectors_label: "Club sectors",
    hero_lead:
      "A place where students gather around one idea, and skill turns into work, and an idea into impact.",
    what_is_madar: "What is Madar?",
    read_about: "Read about us",
    sectors_lead: "Three sectors and nine committees, all orbiting one centre.",
    committees_count: "committees",
    sectors_count: "sectors",
    featured_event: "Next event",
    view_all: "View all",
    latest_news: "Latest news",
    community_title: "Madar members",
    community_lead: "The board and the committees — the people behind the work.",
    impact_title: "Madar in numbers",
    join_cta_title: "Your orbit starts here",
    join_cta_body:
      "Create your account, pick your committees, and start taking part in club events.",
    explore_events: "Browse events",
    back_home: "Back to home",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["ar"];

/** Look up a string for the active language, falling back to the key itself. */
export const createT =
  (lang: Lang) =>
  (key: TranslationKey): string =>
    (translations[lang] as Record<string, string>)[key] ?? key;

export const dirFor = (lang: Lang) => (lang === "ar" ? "rtl" : "ltr");

/**
 * Postgres `date` columns arrive as "YYYY-MM-DD". Parsing that with `new Date()`
 * treats it as UTC midnight, which can render as the previous day in negative
 * offsets — so the parts are split and rebuilt in local time instead.
 * Gregorian + Latin digits are pinned explicitly: `ar-SA` would otherwise
 * default to the Umm al-Qura calendar and render Hijri dates for events that
 * were entered as Gregorian.
 */
export function formatDate(value: string | null | undefined, lang: Lang): string {
  if (!value) return "";
  const [y, m, d] = value.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return String(value);
  return new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
    numberingSystem: "latn",
  }).format(new Date(y, m - 1, d));
}

/** "3 – 5 March 2026", collapsing to a single date when both ends match. */
export function formatDateRange(
  start: string | null | undefined,
  end: string | null | undefined,
  lang: Lang
): string {
  const a = formatDate(start, lang);
  const b = formatDate(end, lang);
  if (!a) return b;
  if (!b || a === b) return a;
  return `${a} – ${b}`;
}

/**
 * The same date split into parts, for the editorial date block on event cards
 * (a large day numeral above a month name). Uses the identical calendar and
 * numbering-system pinning as `formatDate`, so the two never disagree.
 */
export function formatDateParts(
  value: string | null | undefined,
  lang: Lang
): { day: string; month: string; year: string } {
  if (!value) return { day: "", month: "", year: "" };
  const [y, m, d] = value.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return { day: "", month: "", year: "" };
  const date = new Date(y, m - 1, d);
  const part = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(lang === "ar" ? "ar" : "en-GB", {
      ...options,
      calendar: "gregory",
      numberingSystem: "latn",
    }).format(date);
  return {
    day: part({ day: "2-digit" }),
    month: part({ month: "short" }),
    year: part({ year: "numeric" }),
  };
}

export function formatNumber(value: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "ar" ? "ar" : "en", {
    numberingSystem: "latn",
  }).format(value);
}
