"use client";

import { useEffect, useId, useRef, useState } from "react";
import { navLinks } from "@/content/landing";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const hadMenuOpenRef = useRef(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      firstLinkRef.current?.focus();
      hadMenuOpenRef.current = true;
      return;
    }

    if (hadMenuOpenRef.current) {
      menuButtonRef.current?.focus();
      hadMenuOpenRef.current = false;
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="glass-nav fixed top-0 z-50 w-full shadow-[0_40px_40px_-20px_rgba(12,19,33,0.4)]">
        <div className="section-wrap flex items-center justify-between py-4">
          <a href="#inicio" aria-label="MiParking" className="inline-flex shrink-0 items-center md:mr-3 lg:mr-6">
            <img src="/Logo-texto-dark.svg" alt="MiParking" className="h-12 w-auto" />
          </a>
          <div className="hidden items-center gap-8 md:mx-3 md:flex md:gap-5 lg:mx-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.09em] text-[var(--on-surface-variant)] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#waitlist"
            className="gradient-btn hidden shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold transition hover:brightness-110 md:ml-3 md:inline-flex md:px-4 lg:ml-6 lg:px-5"
          >
            Unirse a la espera
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-grid h-11 w-11 place-items-center rounded-xl bg-[var(--surface-high)] text-white transition hover:bg-[var(--surface-highest)] md:hidden"
          >
            <span className="material-symbols-outlined text-[24px] leading-none">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Cerrar menu movil"
            onClick={closeMenu}
            className="absolute inset-0 bg-[rgba(7,14,28,0.72)] backdrop-blur-sm"
          />
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Navegacion movil"
            className="absolute inset-y-0 right-0 flex w-[min(88vw,22rem)] flex-col bg-[var(--surface-lowest)] p-6"
          >
            <div className="mb-8 flex items-center justify-between">
              <p className="text-lg font-bold text-[var(--primary)]">Menu</p>
              <button
                type="button"
                aria-label="Cerrar menu"
                onClick={closeMenu}
                className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[var(--surface-high)] text-white"
              >
                <span className="material-symbols-outlined text-[22px] leading-none">close</span>
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-2">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <a
              href="#waitlist"
              onClick={closeMenu}
              className="gradient-btn mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-base font-bold"
            >
              Unirse a la espera
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
