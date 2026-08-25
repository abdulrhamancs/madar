import React from "react";
import { useI18n } from "../lib/i18nContext";
import { CLUB_DATA } from "../lib/i18n";
import { MadarMark } from "../ui/MadarMark";
import { OrbitField } from "../ui/Orbit";
import { Container } from "../ui/Section";
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XIcon,
} from "../ui/BrandIcons";
import { PRIMARY_NAV, SECONDARY_NAV, type PageId } from "./Navbar";

const clean = (handle: string) => handle.replace("@", "");

/**
 * Footer: the club mark and motto against the espresso block, then a plain
 * two-column index. Every route the navbar leaves out is reachable from here,
 * which is what lets the top bar stay short.
 */
export function Footer({
  onNavigate,
  onLogin,
  currentUser,
  isAdmin,
}: {
  onNavigate: (page: PageId) => void;
  onLogin: () => void;
  currentUser: unknown;
  isAdmin: boolean;
}) {
  const { t, lang } = useI18n();
  const { contact } = CLUB_DATA;

  const socials = [
    {
      key: "instagram",
      href: `https://instagram.com/${clean(contact.instagram)}`,
      Icon: InstagramIcon,
      label: "Instagram",
    },
    {
      key: "x",
      href: `https://x.com/${clean(contact.x_platform)}`,
      Icon: XIcon,
      label: "X",
    },
    {
      key: "tiktok",
      href: `https://tiktok.com/@${clean(contact.tiktok)}`,
      Icon: TikTokIcon,
      label: "TikTok",
    },
    {
      key: "whatsapp",
      href: `https://wa.me/${contact.whatsapp.replace(/[^\d]/g, "")}`,
      Icon: WhatsAppIcon,
      label: "WhatsApp",
    },
  ];

  const secondary = SECONDARY_NAV.filter(
    (item) => (!item.authOnly || currentUser) && (!item.adminOnly || isAdmin)
  );

  return (
    // Same band treatment as the stats block — one pattern, one implementation.
    <footer className="surface-espresso espresso-band text-on-espresso">
      {/* The other two espresso surfaces (the stats band, the auth panel) each
          carry the orbital motif; the footer was the only one without it, which
          left the site's largest dark area reading as a plain slab. `end-` is
          logical, so it sits on the trailing edge in both directions. */}
      <OrbitField
        onDark
        className="end-[-14%] top-[-30%] h-[34rem] w-[34rem] opacity-[0.35]"
      />
      <Container className="relative">
        <div className="grid gap-14 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 md:py-20">
          {/* --- mark + motto --- */}
          <div>
            <div className="flex items-center gap-3.5">
              {/* the mark sits on the dark block, so it borrows the block's ink */}
              <MadarMark onDark className="h-11 w-11 text-on-espresso" />
              <span className="font-display text-h3">{t("madar_club")}</span>
            </div>
            <p className="mt-6 max-w-sm text-body text-on-espresso/70">
              {t("coming_soon_sub")}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {socials.map(({ key, href, Icon, label }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-on-espresso/20 text-on-espresso/80 transition-colors duration-quick hover:border-on-espresso/50 hover:text-on-espresso"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- index --- */}
          <FooterColumn
            title={t("menu")}
            items={PRIMARY_NAV.map((item) => ({
              key: item.id,
              label: t(item.labelKey),
              onClick: () => onNavigate(item.id),
            }))}
          />
          <FooterColumn
            title={t("more")}
            items={[
              ...secondary.map((item) => ({
                key: item.id,
                label: t(item.labelKey),
                onClick: () => onNavigate(item.id),
              })),
            ]}
            extra={
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  dir="ltr"
                  className="link-underline inline-block py-1.5 text-small text-on-espresso/70 transition-colors duration-quick hover:text-on-espresso"
                >
                  {contact.email}
                </a>
              </li>
            }
          />
        </div>

        {/* 13px normal text, so it needs 4.5:1 — /55 measured 4.3:1 on the
            block and failed AA. /65 clears it in both themes. */}
        <div className="flex flex-col gap-3 border-t border-on-espresso/15 py-8 text-micro text-on-espresso/65 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{t("made_in")}</span>
            {/* The only way into the app from the public site. Deliberately a
                footer link rather than a navbar action: the club is listed by
                an admin, so this is a staff door, not an invitation. */}
            {!currentUser && (
              <button
                type="button"
                onClick={onLogin}
                className="link-underline text-on-espresso/65 transition-colors duration-quick hover:text-on-espresso"
              >
                {t("login_btn")}
              </button>
            )}
          </p>
          {/* Only the year is guaranteed Latin — the club name switches with
              `lang` and must stay on the brand face in Arabic, so `latin` is
              scoped to the numeral instead of the whole line. */}
          <p>
            <span className="nums latin" dir="ltr">
              © {new Date().getFullYear()}
            </span>{" "}
            {lang === "ar" ? "مدار" : "Madar"}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
  extra,
}: {
  title: string;
  items: { key: string; label: string; onClick: () => void }[];
  extra?: React.ReactNode;
}) {
  return (
    <div>
      {/* /45 measured 3.4:1 dark and 3.9:1 light — below AA for 13px text. */}
      <h2 className="text-micro font-medium uppercase tracking-[0.14em] text-on-espresso/60">
        {title}
      </h2>
      <ul className="mt-5 space-y-1">
        {items.map(({ key, label, onClick }) => (
          <li key={key}>
            <button
              type="button"
              onClick={onClick}
              className="link-underline py-1.5 text-start text-small text-on-espresso/70 transition-colors duration-quick hover:text-on-espresso"
            >
              {label}
            </button>
          </li>
        ))}
        {extra}
      </ul>
    </div>
  );
}
