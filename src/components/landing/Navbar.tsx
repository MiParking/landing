import { navLinks } from "@/content/landing";

export function Navbar() {
  return (
    <nav className="glass-nav fixed top-0 z-50 w-full shadow-[0_40px_40px_-20px_rgba(12,19,33,0.4)]">
      <div className="section-wrap flex items-center justify-between py-4">
        <a href="#inicio" className="text-2xl font-extrabold tracking-tight text-[var(--primary)]">
          Estaciona
        </a>
        <div className="hidden items-center gap-8 md:flex">
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
          className="gradient-btn rounded-xl px-5 py-2.5 text-sm font-bold transition hover:brightness-110"
        >
          Unirse a la espera
        </a>
      </div>
    </nav>
  );
}
