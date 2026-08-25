import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  Camera,
  Crown,
  Globe,
  Handshake,
  Lightbulb,
  Mic,
  Palette,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Lang } from "./i18n";

/**
 * Club structure — carried over unchanged from the original App.tsx.
 * Badge strings are the join key against `profiles.badges`, so they must match
 * AVAILABLE_BADGES exactly and must never be translated.
 */
export interface BoardSeat {
  badge: string;
  icon: LucideIcon;
}

export const CLUB_BOARD: BoardSeat[] = [
  { badge: "رئيس النادي", icon: Crown },
  { badge: "نائب الرئيس", icon: Award },
  { badge: "رئيس القطاع التطويري", icon: Star },
  { badge: "رئيس القطاع الإبداعي", icon: Palette },
  { badge: "رئيس القطاع التشغيلي", icon: Activity },
];

export interface Committee {
  name: string;
  icon: LucideIcon;
}

export interface Sector {
  id: string;
  title: Record<Lang, string>;
  icon: LucideIcon;
  committees: Committee[];
}

export const CLUB_SECTORS: Sector[] = [
  {
    // Identified by its committees (الموارد البشرية / مدار), which match the
    // club's org chart. Was labelled "القطاع الجوهري" / "Core Sector"; the
    // chart names it التطويري. `id` is a React key only — no database meaning.
    id: "development",
    title: { ar: "القطاع التطويري", en: "Development Sector" },
    icon: Star,
    committees: [
      { name: "لجنة الموارد البشرية", icon: Users },
      { name: "لجنة مدار", icon: Globe },
      { name: "لجنة واعد", icon: BookOpen },
    ],
  },
  {
    id: "central",
    title: { ar: "القطاع الإبداعي", en: "Creative Sector" },
    icon: Palette,
    committees: [
      { name: "اللجنة الإعلامية", icon: Camera },
      { name: "لجنة المحتوى العلمي", icon: Lightbulb },
      { name: "لجنة صناعة المحتوى", icon: Mic },
    ],
  },
  {
    id: "operations",
    title: { ar: "القطاع التشغيلي", en: "Operations Sector" },
    icon: Activity,
    committees: [
      { name: "لجنة الخدمات اللوجستية", icon: Briefcase },
      { name: "لجنة تنظيم الفعاليات", icon: Calendar },
      { name: "لجنة العلاقات العامة والشراكات", icon: Handshake },
    ],
  },
];
