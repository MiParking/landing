import { driverSteps, hostSteps } from "@/content/landing";

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
    </section>
  );
}
