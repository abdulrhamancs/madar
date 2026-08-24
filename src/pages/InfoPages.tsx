import React from "react";
import { Mail } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_DATA } from "../lib/i18n";
import { PageHeader, Eyebrow } from "../ui/Section";
import { Reveal, RevealGroup } from "../ui/Reveal";
import { OrbitField } from "../ui/Orbit";
import { MadarMark } from "../ui/MadarMark";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from "../ui/BrandIcons";

export function AboutPage() {
  const { t } = useI18n();

  return (
    <div>
      <PageHeader eyebrow={t("madar_club")} title={t("about_title")} />

      <div className="grid gap-14 pt-16 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="up" className="lg:col-span-7">
          {/* The opening paragraph is set at lead size and full ink — it is the
              club's own statement, not supporting copy. */}
          <p className="text-lead text-ink">{t("about_p1")}</p>
          <p className="mt-7 max-w-measure text-body text-muted">
            {t("about_p2")}
          </p>
        </Reveal>

        <Reveal
          variant="scale"
          delay={140}
          className="relative flex items-start justify-center lg:col-span-5"
        >
          <div className="relative flex h-64 w-64 items-center justify-center">
            <OrbitField className="inset-0 h-full w-full" />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-divider"
            />
            <MadarMark className="h-24 w-24" spin />
          </div>
        </Reveal>
      </div>

      <Reveal
        variant="up"
        className="mt-20 border-t border-divider pt-14"
      >
        <Eyebrow className="mb-7">{t("made_in")}</Eyebrow>
        <p className="max-w-measure text-body leading-loose text-muted">
          <b className="font-medium text-ink">{t("about_footer_p1")}</b>
          {t("about_footer_p2")}
          <b className="font-medium text-ink">{t("about_footer_p3")}</b>
          {t("about_footer_p4")}
          <b className="font-medium text-ink">{t("about_footer_p5")}</b>
          {t("about_footer_p6")}
          <b className="font-medium text-ink">{t("about_footer_p7")}</b>
          {t("about_footer_p8")}
        </p>
      </Reveal>
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
      name: "Email",
      label: contact.email,
      href: `mailto:${contact.email}`,
      Icon: Mail,
    },
    {
      key: "whatsapp",
      name: "WhatsApp",
      label: contact.whatsapp,
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`,
      Icon: WhatsAppIcon,
    },
    {
      key: "instagram",
      name: "Instagram",
      label: contact.instagram,
      href: `https://instagram.com/${clean(contact.instagram)}`,
      Icon: InstagramIcon,
    },
    {
      key: "x",
      name: "X",
      label: contact.x_platform,
      href: `https://x.com/${clean(contact.x_platform)}`,
      Icon: XIcon,
    },
    {
      key: "tiktok",
      name: "TikTok",
      label: contact.tiktok,
      href: `https://tiktok.com/@${clean(contact.tiktok)}`,
      Icon: TikTokIcon,
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t("madar_club")}
        title={t("contact_title")}
        description={t("hero_lead")}
      />

      {/* Channels are an index, not a card grid: the channel name is the
          Latin-set label and the handle is the value beside it. */}
      <RevealGroup
        variant="up"
        step={70}
        as="ul"
        className="mt-16 divide-y divide-divider border-y border-divider"
      >
        {channels.map(({ key, name, label, href, Icon }) => (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group -mx-4 flex min-h-[5.5rem] items-center gap-5 px-4 transition-colors duration-settle hover:bg-raised/40 sm:gap-8"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-divider text-accent transition-colors duration-settle group-hover:border-accent/50">
                <Icon className="h-4 w-4" />
              </span>
              <span className="latin w-28 shrink-0 text-micro uppercase tracking-[0.14em] text-faint">
                {name}
              </span>
              <span
                className="min-w-0 flex-1 truncate text-body text-ink transition-colors duration-quick group-hover:text-accent"
                dir="ltr"
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </RevealGroup>
    </div>
  );
}
