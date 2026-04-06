import Image from "next/image";
import { useCases } from "@/content/landing";

export function UseCases() {
  return (
    <section id="casos-de-uso" className="section-wrap py-24">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold tracking-[0.12em] text-[var(--tertiary)] uppercase">
          Casos de uso
        </p>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
          Cuando arrendar tu estacionamiento tiene mas sentido
        </h2>
        <p className="text-lg text-[var(--on-surface-variant)]">
          Si vives cerca de zonas con alta afluencia, tu espacio puede transformarse en un ingreso extra
          frecuente y predecible.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((useCase) => (
          <article
            key={useCase.title}
            className="group overflow-hidden rounded-2xl bg-[var(--surface-container)] soft-outline transition hover:-translate-y-1 hover:bg-[var(--surface-high)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={useCase.imageSrc}
                alt={useCase.imageAlt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(12,19,33,0.72)] via-[rgba(12,19,33,0.24)] to-transparent" />
              <div className="absolute right-4 bottom-4 inline-grid h-10 w-10 place-items-center rounded-xl bg-[var(--tertiary)]/85 text-[var(--surface-lowest)]">
                <span className="material-symbols-outlined text-[20px] leading-none">{useCase.icon}</span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="mb-2 text-xl font-bold text-white">{useCase.title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-[var(--on-surface-variant)]">
                {useCase.description}
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--primary)]">
                {useCase.signal}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
