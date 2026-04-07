import { driverSteps, hostSteps, paymentBreakdown, weeklyPayout } from "@/content/landing";

type Step = {
  title: string;
  description: string;
};

function StepColumn({
  id,
  title,
  accent,
  steps,
}: {
  id: string;
  title: string;
  accent: string;
  steps: Step[];
}) {
  return (
    <article id={id} className="rounded-3xl bg-[var(--surface-container)] p-8 md:p-10">
      <h3 className="mb-8 text-3xl font-bold" style={{ color: accent }}>
        {title}
      </h3>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-5">
            <div
              className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black"
              style={{ color: accent, background: `${accent}22` }}
            >
              {index + 1}
            </div>
            <div>
              <h4 className="mb-1 text-xl font-bold text-white">{step.title}</h4>
              <p className="text-[var(--on-surface-variant)]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section-wrap py-24">
      <div className="grid gap-8 lg:grid-cols-2">
        <StepColumn id="conductores" title="Para Conductores" accent="var(--primary)" steps={driverSteps} />
        <StepColumn id="anfitriones" title="Para Anfitriones" accent="var(--tertiary)" steps={hostSteps} />
      </div>

      <article id="pagos" className="mt-10 rounded-3xl bg-[var(--surface-container)] p-8 md:p-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--tertiary)]">
            Pagos
          </p>
          <h3 className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Como se reparte cada reserva
          </h3>
          <p className="text-[var(--on-surface-variant)]">
            Te pediremos una cuenta bancaria a tu nombre durante la activacion. Usamos esos datos
            unicamente para procesar pagos de forma segura.
          </p>
        </div>


        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-[var(--surface-high)] p-5 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
              Paga el conductor
            </p>
            <p className="mt-2 text-3xl font-black text-white">{paymentBreakdown.reservationAmount}</p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-high)] p-5 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
              {paymentBreakdown.commissionLabel}
            </p>
            <p className="mt-2 text-3xl font-black text-[var(--primary)]">{paymentBreakdown.commissionAmount}</p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-high)] p-5 text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--on-surface-variant)]">
              Recibe el anfitrion
            </p>
            <p className="mt-2 text-3xl font-black text-[var(--tertiary)]">{paymentBreakdown.hostPayoutAmount}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-[var(--surface-high)] p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--tertiary)]">
            {weeklyPayout.title}
          </p>
          <p className="mt-2 text-sm text-[var(--on-surface-variant)]">{weeklyPayout.description}</p>
        </div>
        <p className="mt-5 text-center text-sm text-[var(--on-surface-variant)]">{paymentBreakdown.note}</p>
      </article>
    </section>
  );
}
