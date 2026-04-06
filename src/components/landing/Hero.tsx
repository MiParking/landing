import Image from "next/image";

const mockupImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-elwNYlXM7QFiiB-wmIkSzsDrZ5_ViU5hNVvFs0pj8bxi3T0_9VMFFTXZoJr3MNxb11iObIPJ5_AXSmjJy_Uw0TKkefghF2LasjYns34bMWbLYZEs4d1J1TSBh117SlsU178GmhEG2ATKusRoA7y__BhjEUvEpSWw-58ZITY1Lj-D8PmkNWL78Bt0yq13KHlFBe9150plJ6W8YwSmdw7uOfZqxJbKxdnAlBEUDt_A45qgfqbzQBfroVW2pL7oRt_RVEPyFOQcT56";

export function Hero() {
  return (
    <header id="inicio" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
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
            <a
              href="#waitlist"
              className="gradient-btn rounded-xl px-8 py-4 text-lg font-bold transition hover:shadow-[0_0_22px_rgba(180,197,255,0.28)]"
            >
              Quiero estacionar
            </a>
            <a
              href="#waitlist"
              className="rounded-xl bg-[var(--surface-high)] px-8 py-4 text-lg font-bold transition hover:bg-[var(--surface-highest)]"
            >
              Quiero arrendar mi espacio
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-r from-[var(--primary)] to-[var(--tertiary)] opacity-20 blur" />
          <div className="ambient-shadow relative overflow-hidden rounded-[2.25rem] bg-[var(--surface-lowest)] p-3">
            <div className="relative overflow-hidden rounded-[1.5rem]">
              <Image
                src={mockupImage}
                alt="Vista de app Estaciona mostrando mapa y pines"
                width={900}
                height={1600}
                className="h-auto w-full"
                priority
              />
              <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-[var(--surface-highest)]/90 p-4 backdrop-blur">
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.08em]">
                  <span className="text-[var(--primary)]">Cerca de ti</span>
                  <span className="text-[var(--tertiary)]">Disponible</span>
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-low)]" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-[var(--surface-low)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
