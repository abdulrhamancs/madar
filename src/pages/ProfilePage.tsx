import React from "react";
import { useI18n } from "../lib/i18nContext";
import { initialsOf } from "../lib/initials";
import { PageHeader, SubHeading, Eyebrow } from "../ui/Section";
import { Badge, Tag } from "../ui/Badge";
import { Button } from "../ui/Button";
import { TextField } from "../ui/Field";
import { Reveal } from "../ui/Reveal";

export interface ProfileForm {
  fullName: string;
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  linkedin: string;
  twitter: string;
}

/**
 * The member's own page: who they are in the club first, the edit form second.
 * The identity block reuses the same circular crop as the community cards, so
 * a member sees themselves presented the way others see them.
 */
export function ProfilePage({
  user,
  form,
  onFormChange,
  message,
  pending,
  onSubmit,
}: {
  user: { fullName: string; username: string; badges: string[]; committees: string[] };
  form: ProfileForm;
  onFormChange: (form: ProfileForm) => void;
  message: { text: string; type: string };
  pending: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const { t } = useI18n();
  const set = (patch: Partial<ProfileForm>) =>
    onFormChange({ ...form, ...patch });

  return (
    <div>
      <PageHeader eyebrow={t("profile")} title={user.fullName} />

      {/* --- identity --- */}
      <Reveal variant="up" className="mt-14 flex flex-wrap items-center gap-6">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/[0.07]">
          <span className="text-h2 font-medium text-accent">{initialsOf(user.fullName)}</span>
        </span>
        <div className="min-w-0">
          <p className="text-h3 text-ink">{user.fullName}</p>
          <p className="latin mt-1 text-small text-faint" dir="ltr">
            @{user.username}
          </p>
        </div>
      </Reveal>

      {(user.badges?.length > 0 || user.committees?.length > 0) && (
        <Reveal variant="up" delay={90} className="mt-12 space-y-9">
          {user.badges?.length > 0 && (
            <div>
              <Eyebrow className="mb-4">{t("my_badges")}</Eyebrow>
              <ul className="flex flex-wrap gap-2">
                {user.badges.map((badge) => (
                  <li key={badge}>
                    <Badge tone="accent">{badge}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {user.committees?.length > 0 && (
            <div>
              <Eyebrow className="mb-4">{t("team_members")}</Eyebrow>
              <ul className="flex flex-wrap gap-2">
                {user.committees.map((committee) => (
                  <li key={committee}>
                    <Tag>{committee}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      )}

      {/* --- edit --- */}
      <Reveal variant="up" delay={120} className="mt-20 border-t border-divider pt-14">
        <SubHeading title={t("update_profile")} />

        {message.text && (
          <div
            role="alert"
            className={
              "mb-7 rounded-lg border p-4 text-small font-medium " +
              (message.type === "error"
                ? "border-danger/35 bg-danger/[0.07] text-danger"
                : "border-success/35 bg-success/[0.07] text-success")
            }
          >
            {message.text}
          </div>
        )}

        <form onSubmit={onSubmit} className="max-w-xl space-y-5" noValidate>
          <TextField
            label={t("fullname")}
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(e) => set({ fullName: e.target.value })}
          />
          <TextField
            label={t("username")}
            required
            dir="ltr"
            autoComplete="username"
            value={form.username}
            onChange={(e) => set({ username: e.target.value.replace(/\s/g, "") })}
          />
          <TextField
            label={t("email_optional")}
            type="email"
            dir="ltr"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set({ email: e.target.value })}
          />

          <fieldset className="grid gap-5 sm:grid-cols-2">
            <legend className="sr-only">{t("social_links")}</legend>
            <TextField
              label={t("linkedin_optional")}
              type="url"
              dir="ltr"
              value={form.linkedin}
              onChange={(e) => set({ linkedin: e.target.value })}
            />
            <TextField
              label={t("x_optional")}
              type="url"
              dir="ltr"
              value={form.twitter}
              onChange={(e) => set({ twitter: e.target.value })}
            />
          </fieldset>

          <fieldset className="space-y-5 border-t border-divider pt-7">
            <legend className="sr-only">{t("new_password")}</legend>
            <TextField
              label={t("old_password")}
              type="password"
              dir="ltr"
              autoComplete="current-password"
              value={form.oldPassword}
              onChange={(e) => set({ oldPassword: e.target.value })}
            />
            <TextField
              label={t("new_password")}
              type="password"
              dir="ltr"
              autoComplete="new-password"
              hint={t("invalid_password")}
              value={form.newPassword}
              onChange={(e) => set({ newPassword: e.target.value })}
            />
          </fieldset>

          <Button type="submit" size="lg" pending={pending} className="!mt-8">
            {pending ? t("saving") : t("update_profile")}
          </Button>
        </form>
      </Reveal>
    </div>
  );
}
