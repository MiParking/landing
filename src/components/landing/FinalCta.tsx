export function FinalCta() {
  return (
    <section className="relative py-24 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(175deg,transparent_0%,rgba(180,197,255,0.09)_100%)]" />
      <div className="section-wrap">
        <h2 className="mx-auto mb-8 max-w-4xl text-4xl leading-tight font-black text-white md:text-6xl">
          Empieza a aprovechar mejor cada espacio disponible
        </h2>
        <a
          href="#waitlist"
          className="inline-flex items-center justify-center rounded-full bg-[var(--on-surface)] px-10 py-5 text-xl font-black text-[var(--surface)] transition hover:bg-[var(--primary)]"
        >
          Comenzar ahora
        </a>
      </div>
    </section>
  );
}
