import Link from "next/link";

import { HeroRealtimeStats } from "@/components/landing/HeroRealtimeStats";
import type { WaitlistStats } from "@/lib/waitlist";

type HeroProps = {
  stats: WaitlistStats;
};

export function Hero({ stats }: HeroProps) {
  return (
    <header id="inicio" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=80')",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(17,92,175,0.25),transparent_45%),linear-gradient(120deg,rgba(4,14,34,0.94)_20%,rgba(4,14,34,0.72)_55%,rgba(4,14,34,0.86)_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-[var(--primary)]/10 blur-[100px]" />
        <div className="absolute right-12 bottom-6 h-80 w-80 rounded-full bg-[var(--tertiary)]/10 blur-[120px]" />
      </div>
      <div className="section-wrap grid items-center gap-14 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <h1 className="mb-5 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-6xl">
            Arrienda o encuentra <span className="text-gradient">estacionamiento</span> en segundos
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-[var(--on-surface-variant)] lg:mx-0">
            Convierte tu estacionamiento en ingresos o reserva un lugar seguro cerca de tu destino sin
            vueltas innecesarias.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              href={{ pathname: "/", query: { source: "hero_driver" }, hash: "waitlist" }}
              className="gradient-btn rounded-xl px-8 py-4 text-lg font-bold transition hover:shadow-[0_0_22px_rgba(180,197,255,0.28)]"
            >
              Quiero estacionar
            </Link>
            <Link
              href={{ pathname: "/", query: { source: "hero_host" }, hash: "waitlist" }}
              className="rounded-xl bg-[var(--surface-high)] px-8 py-4 text-lg font-bold transition hover:bg-[var(--surface-highest)]"
            >
              Quiero arrendar mi espacio
            </Link>
          </div>
        </div>

        <HeroRealtimeStats initialStats={stats} />
      </div>
    </header>
  );
}
