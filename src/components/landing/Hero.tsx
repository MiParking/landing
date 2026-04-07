const interestStats = [
  { label: "Total interesados", value: "1,248", tone: "total" },
  { label: "Conductores", value: "812", tone: "driver" },
  { label: "Anfitriones", value: "436", tone: "tertiary" },
];

export function Hero() {
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

        <div className="relative mx-auto w-full max-w-md">
          <div className="ambient-shadow relative rounded-[2rem] bg-[rgba(9,18,34,0.22)] p-6 backdrop-blur-xl md:p-7">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-base leading-tight font-extrabold uppercase tracking-[0.08em] text-white md:text-lg">
                Interesados hasta hoy
              </p>
              <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold text-white">
                En tiempo real
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-2">
              {interestStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/8 p-4 text-center backdrop-blur-sm sm:text-left"
                >
                  <p
                    className={`text-3xl font-extrabold tracking-tight ${
                      stat.tone === "driver"
                        ? "text-[#8b7dff]"
                        : stat.tone === "tertiary"
                          ? "text-[var(--tertiary)]"
                          : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-white/8 p-4 backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.08em]">
                <span className="text-[var(--primary)]">Conductores 65%</span>
                <span className="text-[var(--tertiary)]">Anfitriones 35%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div className="flex h-full w-full">
                  <div className="h-full w-[65%] bg-[#8b7dff]" />
                  <div className="h-full w-[35%] bg-[var(--tertiary)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
