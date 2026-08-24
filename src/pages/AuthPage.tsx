import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useI18n } from "../lib/i18nContext";
import { OrbitField } from "../ui/Orbit";
import { MadarMark } from "../ui/MadarMark";
import { Button } from "../ui/Button";
import { TextField } from "../ui/Field";
import { Enter } from "../ui/Reveal";

export interface AuthForm {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

/**
 * Auth is a two-panel composition on desktop: the brand block holds the
 * espresso surface and the orbit, the form sits on paper. On mobile the brand
 * panel drops away entirely rather than being squashed into a banner — the
 * form is the only thing that matters on a phone.
 */
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
    <div className="grid min-h-dvh lg:grid-cols-[0.9fr_1.1fr]">
      {/* --- brand panel --- */}
      <aside className="relative hidden overflow-hidden surface-espresso text-on-espresso lg:flex lg:flex-col lg:justify-between lg:p-14">
        <OrbitField onDark className="start-[-30%] top-[18%] h-[42rem] w-[42rem] opacity-45" />

        <div className="relative flex items-center gap-3.5">
          <MadarMark onDark className="h-10 w-10" />
          <span className="font-display text-h4">{t("madar_club")}</span>
        </div>

        <div className="relative">
          <p className="max-w-md font-display text-h1 leading-snug">
            {t("coming_soon_sub")}
          </p>
          <p className="mt-6 max-w-sm text-body text-on-espresso/65">
            {t("hero_lead")}
          </p>
        </div>

        <p className="relative text-micro text-on-espresso/45">{t("made_in")}</p>
      </aside>

      {/* --- form panel --- */}
      <main className="flex flex-col justify-center bg-canvas px-gutter py-14">
        <div className="mx-auto w-full max-w-md">
          <Enter delay={40}>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-[44px] items-center gap-2 text-small font-medium text-faint transition-colors duration-quick hover:text-ink"
            >
              <Back className="h-4 w-4" aria-hidden="true" />
              {t("back_home")}
            </button>
          </Enter>

          <Enter delay={120}>
            <header className="mt-8">
              <MadarMark className="mb-7 h-12 w-12 lg:hidden" animate />
              <h1 className="text-h1 text-ink">
                {isRegister ? t("create_new") : t("login_portal")}
              </h1>
              <p className="mt-2.5 text-small text-muted">
                {isRegister ? t("join_us") : t("madar_club")}
              </p>
            </header>
          </Enter>

          {/* Error summary sits above the form and is announced on submit. */}
          {error && (
            <div
              role="alert"
              tabIndex={-1}
              className="mt-7 rounded-lg border border-danger/35 bg-danger/[0.07] p-4 text-small font-medium text-danger"
            >
              {error}
            </div>
          )}

          <Enter delay={200}>
            <form onSubmit={onSubmit} className="mt-9 space-y-5" noValidate>
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

              <Button type="submit" size="lg" block pending={pending} className="!mt-8">
                {isRegister ? t("register_btn") : t("login_btn")}
              </Button>
            </form>
          </Enter>

          <Enter delay={280}>
            <p className="mt-9 border-t border-divider pt-7 text-center text-small text-muted">
              {isRegister ? t("have_account") : t("new_member")}{" "}
              <button
                type="button"
                onClick={() => onModeChange(isRegister ? "login" : "register")}
                className="link-underline font-medium text-accent transition-colors duration-quick hover:text-accent-strong"
              >
                {isRegister ? t("login_here") : t("create_new")}
              </button>
            </p>
          </Enter>
        </div>
      </main>
    </div>
  );
}
