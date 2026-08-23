import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { OrbitLogo } from "../ui/BrandIcons";
import { Button } from "../ui/Button";
import { TextField } from "../ui/Field";

export interface AuthForm {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export function AuthPage({
  mode,
  onModeChange,
  form,
  onFormChange,
  error,
  pending,
  onSubmit,
  onBack,
}: {
  mode: "login" | "register";
  onModeChange: (mode: "login" | "register") => void;
  form: AuthForm;
  onFormChange: (form: AuthForm) => void;
  error: string;
  pending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}) {
  const { t, lang } = useI18n();
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;
  const isRegister = mode === "register";
  const set = (patch: Partial<AuthForm>) => onFormChange({ ...form, ...patch });

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-12">
      <button
        type="button"
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 self-start text-small font-medium text-muted transition-colors duration-quick hover:text-ink"
      >
        <Back className="h-4 w-4" aria-hidden="true" />
        {t("home")}
      </button>

      <header className="mb-8">
        <OrbitLogo className="mb-5 h-12 w-12" />
        <h1 className="font-display text-h1 text-ink">
          {isRegister ? t("create_new") : t("login_portal")}
        </h1>
        <p className="mt-1.5 text-small text-muted">{t("madar_club")}</p>
      </header>

      {/* Error summary sits above the form and is announced on submit. */}
      {error && (
        <div
          role="alert"
          tabIndex={-1}
          className="mb-6 rounded-md border border-danger/40 bg-danger/[0.07] p-3.5 text-small font-medium text-danger"
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        {isRegister && (
          <>
            <TextField
              label={t("fullname")}
              required
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => set({ fullName: e.target.value })}
            />
            <TextField
              label={t("email_optional")}
              type="email"
              dir="ltr"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set({ email: e.target.value })}
            />
          </>
        )}

        <TextField
          label={t("username")}
          required
          dir="ltr"
          autoComplete="username"
          hint={isRegister ? t("invalid_username") : undefined}
          value={form.username}
          onChange={(e) => set({ username: e.target.value.replace(/\s/g, "") })}
        />

        <TextField
          label={t("password")}
          type="password"
          required
          dir="ltr"
          autoComplete={isRegister ? "new-password" : "current-password"}
          hint={isRegister ? t("invalid_password") : undefined}
          value={form.password}
          onChange={(e) => set({ password: e.target.value.replace(/\s/g, "") })}
        />

        {isRegister && (
          <TextField
            label={t("confirm_password")}
            type="password"
            required
            dir="ltr"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) =>
              set({ confirmPassword: e.target.value.replace(/\s/g, "") })
            }
          />
        )}

        <Button type="submit" size="lg" block pending={pending} className="!mt-6">
          {isRegister ? t("register_btn") : t("login_btn")}
        </Button>
      </form>

      <p className="mt-8 border-t border-divider pt-6 text-center text-small text-muted">
        {isRegister ? t("have_account") : t("new_member")}{" "}
        <button
          type="button"
          onClick={() => onModeChange(isRegister ? "login" : "register")}
          className="font-semibold text-accent hover:underline"
        >
          {isRegister ? t("login_here") : t("create_new")}
        </button>
      </p>
    </div>
  );
}
