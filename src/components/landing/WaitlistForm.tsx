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
          <form className="mx-auto max-w-2xl space-y-6">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
                  Nombre completo
                </span>
                <input
                  type="text"
                  placeholder="Ej: Juan Perez"
                  className="soft-outline w-full rounded-xl bg-[var(--surface-lowest)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
              <label className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="hola@ejemplo.com"
                  className="soft-outline w-full rounded-xl bg-[var(--surface-lowest)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
            </div>
            <fieldset>
              <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
                Como usaras MiParking?
              </legend>
              <div className="grid gap-3 md:grid-cols-3">
                {roleOptions.map((option) => (
                  <label key={option.value} className="group relative cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      className="peer sr-only"
                    />
                    <div className="relative min-h-28 overflow-hidden rounded-2xl">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 peer-focus-visible:opacity-100 peer-checked:opacity-100">
                        <div className="h-full w-full animate-[spin_3.4s_linear_infinite] bg-[conic-gradient(from_120deg,var(--primary),var(--tertiary),var(--primary-container),var(--primary))]" />
                      </div>
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
            </fieldset>
            <button
              type="submit"
              className="gradient-btn w-full rounded-xl px-6 py-4 text-lg font-bold transition hover:brightness-110"
            >
              Unirme a la lista de espera
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
