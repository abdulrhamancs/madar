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
  { badge: "رئيس مجلس النادي", icon: Crown },
  { badge: "نائب الرئيس", icon: Award },
  { badge: "رئيس القطاع الجوهري", icon: Star },
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
    id: "core",
    title: { ar: "القطاع الجوهري", en: "Core Sector" },
    icon: Star,
    committees: [
      { name: "لجنة الموارد البشرية", icon: Users },
      { name: "لجنة مدار", icon: Globe },
      { name: "لجنة التدريب وورش العمل", icon: BookOpen },
    ],
  },
  {
    id: "central",
    title: { ar: "القطاع الإبداعي", en: "Creative Sector" },
    icon: Palette,
    committees: [
      { name: "اللجنة الإعلامية", icon: Camera },
      { name: "اللجنة التعليمية والتثقيفية", icon: Lightbulb },
      { name: "لجنة البودكاست", icon: Mic },
    ],
  },
  {
    id: "operations",
    title: { ar: "القطاع التشغيلي", en: "Operations Sector" },
    icon: Activity,
    committees: [
      { name: "لجنة الخدمات", icon: Briefcase },
      { name: "لجنة تنظيم الفعاليات", icon: Calendar },
      { name: "لجنة العلاقات العامة والشراكات", icon: Handshake },
    ],
  },
];
