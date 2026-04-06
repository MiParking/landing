import { trustItems } from "@/content/landing";

export function Trust() {
  return (
    <section id="confianza" className="section-wrap py-20">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item) => (
          <article key={item.title} className="rounded-2xl bg-[var(--surface-container)] p-6 text-center">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)]">
              <span className="material-symbols-outlined block leading-none text-[22px]">{item.icon}</span>
            </div>
            <h5 className="mb-1 text-base font-bold text-white">{item.title}</h5>
            <p className="text-sm text-[var(--on-surface-variant)]">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
