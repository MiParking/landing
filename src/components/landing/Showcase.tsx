import Image from "next/image";
import { showcaseImages } from "@/content/landing";

export function Showcase() {
  return (
    <section className="bg-[var(--surface-lowest)] py-20">
      <div className="section-wrap grid gap-10 md:grid-cols-3">
        {showcaseImages.map((item, index) => (
          <figure
            key={item.label}
            className={`space-y-4 ${index === 1 ? "md:-translate-y-6" : ""}`}
          >
            <div className="phone-frame ambient-shadow">
              <span className="phone-camera" aria-hidden="true" />
              <Image
                src={item.src}
                alt={item.label}
                width={900}
                height={1600}
                className="phone-screen h-auto w-full object-cover"
              />
            </div>
            <figcaption
              className="text-center text-sm font-bold uppercase tracking-[0.08em]"
              style={{ color: index === 1 ? "var(--tertiary)" : "var(--primary)" }}
            >
              {item.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
