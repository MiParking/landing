"use client";

import type { FormEvent } from "react";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

import { submitWaitlist, type WaitlistActionState } from "@/app/actions/waitlist";
import {
  WAITLIST_EMAIL_MAX,
  WAITLIST_FULL_NAME_MAX,
  waitlistSchema,
} from "@/lib/waitlist-validation";
import { envs } from "@/lib/envs";

const initialWaitlistState: WaitlistActionState = {
  status: "idle",
  message: "",
};

type WaitlistFieldErrors = {
  fullName?: string;
  email?: string;
  role?: string;
  captcha?: string;
};

type TurnstileInstance = {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      callback?: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

export function WaitlistForm() {
  const roleOptions = [
    {
      label: "Anfitrion",
      value: "host",
      icon: "home",
      description: "Publica tu espacio",
    },
    {
      label: "Conductor",
      value: "driver",
      icon: "directions_car",
      description: "Encuentra cupos rapidos",
    },
    {
      label: "Ambos",
      value: "both",
      icon: "swap_horiz",
      description: "Arrienda y estaciona",
    },
  ];

  const [state, formAction, isPending] = useActionState(submitWaitlist, initialWaitlistState);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<WaitlistFieldErrors>({});
  const [shakeNonce, setShakeNonce] = useState(0);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);
  const [lastSource] = useState(() => {
    if (typeof window === "undefined") {
      return "waitlist_section_form";
    }

    const source = new URL(window.location.href).searchParams.get("source");
    return source ? source.slice(0, 80) : "waitlist_section_form";
  });

  const successFeedbackStyle = useMemo(
    () => "border-emerald-300/40 bg-emerald-500/10 text-emerald-100",
    [],
  );

  useEffect(() => {
    if (!turnstileReady || !turnstileContainerRef.current || !window.turnstile || turnstileWidgetIdRef.current) {
      return;
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: envs.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      theme: "dark",
      callback: (token) => {
        setTurnstileToken(token);
        setFieldErrors((prev) => ({ ...prev, captcha: undefined }));
      },
      "expired-callback": () => {
        setTurnstileToken("");
        setFieldErrors((prev) => ({ ...prev, captcha: "La verificacion expiro. Intenta nuevamente." }));
      },
      "error-callback": () => {
        setTurnstileToken("");
        setFieldErrors((prev) => ({ ...prev, captcha: "No pudimos validar el captcha. Intenta nuevamente." }));
      },
    });
  }, [turnstileReady]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setFieldErrors({});

    const data = new FormData(event.currentTarget);
    const parsedInput = waitlistSchema.safeParse({
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? "").trim(),
      role: data.get("role"),
      lastSource: String(data.get("lastSource") ?? "").trim() || null,
    });

    if (!parsedInput.success) {
      event.preventDefault();
      const nextFieldErrors: WaitlistFieldErrors = {};

      for (const issue of parsedInput.error.issues) {
        const field = issue.path[0];

        if (field === "fullName" && !nextFieldErrors.fullName) {
          nextFieldErrors.fullName = issue.message;
        }

        if (field === "email" && !nextFieldErrors.email) {
          nextFieldErrors.email = issue.message;
        }

        if (field === "role" && !nextFieldErrors.role) {
          nextFieldErrors.role = "Selecciona como usaras MiParking.";
        }
      }

      setFieldErrors(nextFieldErrors);
      setShakeNonce((value) => value + 1);
      return;
    }

    if (!turnstileToken) {
      event.preventDefault();
      setFieldErrors((prev) => ({ ...prev, captcha: "Completa la verificacion de seguridad." }));
      setShakeNonce((value) => value + 1);
    }
  }

  return (
    <section id="waitlist" className="py-24">
      <div className="section-wrap">
        <div className="ambient-shadow relative overflow-hidden rounded-[2rem] bg-[var(--surface-high)] p-8 md:p-12">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[var(--primary)] via-[var(--tertiary)] to-[var(--primary)]" />
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Se parte del lanzamiento
            </h2>
            <p className="text-[var(--on-surface-variant)]">
              Dejanos tu correo y se de los primeros en usar la app con beneficios exclusivos.
            </p>
          </div>
          <form
            action={formAction}
            noValidate
            onSubmit={handleSubmit}
            className="mx-auto max-w-2xl space-y-6"
          >
            <input type="hidden" name="lastSource" value={lastSource} />
            <input type="hidden" name="cf-turnstile-response" value={turnstileToken} readOnly />
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
                    Nombre completo
                  </span>
                  <span className="text-xs text-[var(--on-surface-variant)]">
                    {fullName.length}/{WAITLIST_FULL_NAME_MAX}
                  </span>
                </div>
                <input
                  key={`fullName-${shakeNonce}-${fieldErrors.fullName ? "error" : "ok"}`}
                  type="text"
                  name="fullName"
                  placeholder="Ej: Juan Perez"
                  maxLength={WAITLIST_FULL_NAME_MAX}
                  required
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  className={`soft-outline w-full rounded-xl bg-[var(--surface-lowest)] px-4 py-3 outline-none transition focus:border-[var(--primary)] ${fieldErrors.fullName ? "field-error-border field-shake" : ""}`}
                />
                {fieldErrors.fullName ? <p className="text-xs text-red-200">{fieldErrors.fullName}</p> : null}
              </label>
              <label className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
                    Email
                  </span>
                  <span className="text-xs text-[var(--on-surface-variant)]">
                    {email.length}/{WAITLIST_EMAIL_MAX}
                  </span>
                </div>
                <input
                  key={`email-${shakeNonce}-${fieldErrors.email ? "error" : "ok"}`}
                  type="email"
                  name="email"
                  placeholder="hola@ejemplo.com"
                  maxLength={WAITLIST_EMAIL_MAX}
                  required
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  className={`soft-outline w-full rounded-xl bg-[var(--surface-lowest)] px-4 py-3 outline-none transition focus:border-[var(--primary)] ${fieldErrors.email ? "field-error-border field-shake" : ""}`}
                />
                {fieldErrors.email ? <p className="text-xs text-red-200">{fieldErrors.email}</p> : null}
              </label>
            </div>
            <fieldset
              key={`role-${shakeNonce}-${fieldErrors.role ? "error" : "ok"}`}
              className={fieldErrors.role ? "field-shake" : ""}
            >
              <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
                Como usaras MiParking?
              </legend>
              <div
                className={`grid gap-3 rounded-2xl ${fieldErrors.role ? "field-error-border p-2" : ""} md:grid-cols-3`}
              >
                {roleOptions.map((option) => (
                  <label key={option.value} className="group relative cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                       value={option.value}
                       required
                       onChange={() => setFieldErrors((prev) => ({ ...prev, role: undefined }))}
                        className="peer sr-only"
                      />
                    <div className="relative min-h-28 overflow-hidden rounded-2xl">
                      <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100 peer-checked:opacity-100"
                      >
                        <defs>
                          <linearGradient id={`${option.value}-stroke-a`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--tertiary)" />
                          </linearGradient>
                          <linearGradient id={`${option.value}-stroke-b`} x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="var(--tertiary)" />
                            <stop offset="100%" stopColor="var(--primary-container)" />
                          </linearGradient>
                        </defs>
                        <rect
                          className="role-card-border"
                          pathLength={100}
                          x="1"
                          y="1"
                          rx="15"
                          ry="15"
                          style={{
                            width: "calc(100% - 2px)",
                            height: "calc(100% - 2px)",
                            stroke: `url(#${option.value}-stroke-a)`,
                          }}
                        />
                        <rect
                          className="role-card-border role-card-border--offset"
                          pathLength={100}
                          x="1"
                          y="1"
                          rx="15"
                          ry="15"
                          style={{
                            width: "calc(100% - 2px)",
                            height: "calc(100% - 2px)",
                            stroke: `url(#${option.value}-stroke-b)`,
                          }}
                        />
                      </svg>
                      <div className="absolute inset-px rounded-[15px] bg-[var(--surface-container)]" />
                      <div className="relative z-10 flex min-h-28 items-center gap-3 px-4 py-4 transition-transform duration-200 group-hover:-translate-y-0.5">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--surface-highest)] text-[var(--primary)]">
                          <span className="material-symbols-outlined text-[22px] leading-none">{option.icon}</span>
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-sm font-semibold tracking-wide text-white">{option.label}</p>
                          <p className="mt-1 text-xs text-[var(--on-surface-variant)]">{option.description}</p>
                        </div>
                      </div>
                    </div>
                    <span className="pointer-events-none absolute top-3 right-3 inline-flex h-6 w-6 scale-75 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--surface)] opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100">
                      <span className="material-symbols-outlined text-[16px] leading-none">check</span>
                    </span>
                  </label>
                ))}
              </div>
              {fieldErrors.role ? <p className="mt-2 text-xs text-red-200">{fieldErrors.role}</p> : null}
            </fieldset>
            <div
              key={`captcha-${shakeNonce}-${fieldErrors.captcha ? "error" : "ok"}`}
              className={`space-y-2 ${fieldErrors.captcha ? "field-shake" : ""}`}
            >
              <div className="flex justify-center">
                <div
                  className={`inline-flex rounded-xl bg-[var(--surface-lowest)] p-2 ${fieldErrors.captcha ? "field-error-border" : "soft-outline"}`}
                >
                  <div ref={turnstileContainerRef} className="flex items-center justify-center" />
                </div>
              </div>
              {fieldErrors.captcha ? <p className="text-xs text-red-200">{fieldErrors.captcha}</p> : null}
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="gradient-btn w-full rounded-xl px-6 py-4 text-lg font-bold transition hover:cursor-pointer hover:brightness-110"
            >
              {isPending ? "Guardando..." : "Unirme a la lista de espera"}
            </button>
            {state.status === "success" ? (
              <p className={`rounded-xl border px-4 py-3 text-sm ${successFeedbackStyle}`}>{state.message}</p>
            ) : null}
          </form>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={() => setTurnstileReady(true)}
          />
        </div>
      </div>
    </section>
  );
}
