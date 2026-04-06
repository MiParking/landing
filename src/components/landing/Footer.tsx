const legalLinks = ["Privacidad", "Terminos", "Soporte"];

export function Footer() {
  return (
    <footer className="bg-[var(--surface-lowest)] pt-16 pb-10">
      <div className="section-wrap grid gap-10 md:grid-cols-3">
        <div>
          <p className="text-xl font-bold text-[var(--primary)]">MiParking</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--on-surface-variant)]">
            Redefiniendo el estacionamiento urbano a traves de la economia colaborativa.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-white">Legal y Soporte</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--on-surface-variant)]">
            {legalLinks.map((item) => (
              <li key={item}>
                <a href="#" className="transition hover:text-[var(--tertiary)]">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-white">Contacto</p>
          <div className="mt-4 space-y-2 text-sm text-[var(--on-surface-variant)]">
            <p>contacto@miparking.cl</p>
            <p>Santiago, Chile</p>
          </div>
        </div>
      </div>
      <div className="section-wrap mt-14 border-t border-[rgba(67,70,85,0.18)] pt-6 text-center text-xs text-[var(--on-surface-variant)]">
        <p>© 2026 MiParking. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
