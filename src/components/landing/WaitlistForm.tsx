export function WaitlistForm() {
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
              <div className="flex flex-wrap gap-3">
                {[
                  "Anfitrion",
                  "Conductor",
                  "Ambos",
                ].map((option) => (
                  <label
                    key={option}
                    className="soft-outline flex cursor-pointer items-center gap-2 rounded-xl bg-[var(--surface-container)] px-4 py-3"
                  >
                    <input type="radio" name="role" value={option} className="accent-[var(--primary)]" />
                    <span>{option}</span>
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
