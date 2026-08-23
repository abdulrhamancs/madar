import React from "react";
import { User } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { PageHeader, SectionHeading } from "../ui/PageHeader";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { TextField } from "../ui/Field";

export interface ProfileForm {
  fullName: string;
  username: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  linkedin: string;
  twitter: string;
}

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

      {/* Identity summary */}
      <section className="mb-10 flex flex-wrap items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <User className="h-6 w-6 text-accent" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-body font-medium text-ink">{user.fullName}</p>
          <p className="text-small text-muted" dir="ltr">
            @{user.username}
          </p>
        </div>
      </section>

      {(user.badges?.length > 0 || user.committees?.length > 0) && (
        <section className="mb-10 space-y-5">
          {user.badges?.length > 0 && (
            <div>
              <h2 className="mb-2 text-small font-medium text-muted">
                {t("my_badges")}
              </h2>
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
              <h2 className="mb-2 text-small font-medium text-muted">
                {t("team_members")}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {user.committees.map((committee) => (
                  <li key={committee}>
                    <Badge>{committee}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="border-t border-divider pt-8">
        <SectionHeading title={t("update_profile")} />

        {message.text && (
          <div
            role="alert"
            className={
              "mb-5 rounded-md border p-3.5 text-small font-medium " +
              (message.type === "error"
                ? "border-danger/40 bg-danger/[0.07] text-danger"
                : "border-success/40 bg-success/[0.07] text-success")
            }
          >
            {message.text}
          </div>
        )}

        <form onSubmit={onSubmit} className="max-w-lg space-y-4" noValidate>
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

          <fieldset className="space-y-4 border-t border-divider pt-5">
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

          <Button type="submit" size="lg" pending={pending}>
            {pending ? t("saving") : t("update_profile")}
          </Button>
        </form>
      </section>
    </div>
  );
}
