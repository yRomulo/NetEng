import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { netengContact } from "@/data/companyData";
import { footerLegalLinks, primaryNavigation } from "@/data/siteNavigation";
import { servicesCatalog } from "@/data/servicesCatalog";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">
            Soluções integradas de engenharia em Automação, Elétrica e Telecomunicações.
          </p>
          <p className="mt-4 font-display text-sm font-semibold text-[var(--color-brand-light)]">{netengContact.slogan}</p>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Navegação</h2>
          <ul className="mt-5 space-y-3">
            {primaryNavigation.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/75 transition-colors hover:text-[var(--color-brand-light)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Frentes de atuação</h2>
          <ul className="mt-5 space-y-3">
            {servicesCatalog.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicos/${service.slug}`}
                  className="text-sm text-white/75 transition-colors hover:text-[var(--color-brand-light)]"
                >
                  {service.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-white/50">Contato</h2>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex gap-3">
              <FiPhone className="mt-0.5 shrink-0 text-[var(--color-brand-light)]" aria-hidden="true" />
              <a href={`tel:+${netengContact.phoneDigits}`} className="transition-colors hover:text-[var(--color-brand-light)]">
                {netengContact.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <FiMail className="mt-0.5 shrink-0 text-[var(--color-brand-light)]" aria-hidden="true" />
              <a href={`mailto:${netengContact.email}`} className="break-all transition-colors hover:text-[var(--color-brand-light)]">
                {netengContact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <FiMapPin className="mt-0.5 shrink-0 text-[var(--color-brand-light)]" aria-hidden="true" />
              <span>{netengContact.address.full}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {netengContact.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            {footerLegalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-[var(--color-brand-light)]">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
