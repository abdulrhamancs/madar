import React from "react";
import { Mail } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_DATA } from "../lib/i18n";
import { PageHeader } from "../ui/PageHeader";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
  OrbitLogo,
} from "../ui/BrandIcons";

export function AboutPage() {
  const { t } = useI18n();
  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("about_title")} />
      <div className="max-w-prose space-y-4">
        <p className="text-body text-muted">{t("about_p1")}</p>
        <p className="text-body text-muted">{t("about_p2")}</p>
      </div>

      <div className="mt-12 flex flex-col items-start gap-6 border-t border-divider pt-8 sm:flex-row sm:items-center">
        <OrbitLogo className="h-14 w-14 shrink-0" />
        <p className="max-w-prose text-small leading-relaxed text-muted">
          <b className="font-semibold text-ink">{t("about_footer_p1")}</b>
          {t("about_footer_p2")}
          <b className="font-semibold text-ink">{t("about_footer_p3")}</b>
          {t("about_footer_p4")}
          <b className="font-semibold text-ink">{t("about_footer_p5")}</b>
          {t("about_footer_p6")}
          <b className="font-semibold text-ink">{t("about_footer_p7")}</b>
          {t("about_footer_p8")}
        </p>
      </div>
    </div>
  );
}

const clean = (handle: string) => handle.replace("@", "");

export function ContactPage() {
  const { t } = useI18n();
  const { contact } = CLUB_DATA;

  const channels = [
    {
      key: "email",
      label: contact.email,
      href: `mailto:${contact.email}`,
      Icon: Mail,
      ltr: true,
    },
    {
      key: "whatsapp",
      label: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`,
      Icon: WhatsAppIcon,
      ltr: true,
    },
    {
      key: "instagram",
      label: contact.instagram,
      href: `https://instagram.com/${clean(contact.instagram)}`,
      Icon: InstagramIcon,
      ltr: true,
    },
    {
      key: "x",
      label: contact.x_platform,
      href: `https://x.com/${clean(contact.x_platform)}`,
      Icon: XIcon,
      ltr: true,
    },
    {
      key: "tiktok",
      label: contact.tiktok,
      href: `https://tiktok.com/@${clean(contact.tiktok)}`,
      Icon: TikTokIcon,
      ltr: true,
    },
  ];

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("contact_title")} />
      <ul className="divide-y divide-divider border-y border-divider">
        {channels.map(({ key, label, href, Icon, ltr }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[56px] items-center gap-4 py-3 transition-colors duration-quick hover:bg-ink/[0.02]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-divider bg-raised text-accent">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <span
                className="min-w-0 flex-1 truncate text-body text-ink"
                dir={ltr ? "ltr" : undefined}
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-small text-faint">{t("made_in")}</p>
    </div>
  );
}
