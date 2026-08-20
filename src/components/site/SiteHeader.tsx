"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNavigation } from "@/data/siteNavigation";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-[var(--color-surface)] transition-shadow duration-300 ${
        isScrolled || isMenuOpen ? "border-[var(--color-border)] shadow-md shadow-black/5" : "border-transparent"
      }`}
    >
      <div className="container-site flex h-[80px] items-center justify-between gap-6">
        <Link href="/" aria-label="NETENG — página inicial" className="flex items-center">
          <Logo height={38} />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {primaryNavigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
                isActive(link.href)
                  ? "text-[var(--color-brand-strong)]"
                  : "text-[var(--color-text-1)] hover:text-[var(--color-brand-strong)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contato" className="btn-primary !px-5 !py-2.5 !text-xs">
            Solicite uma proposta
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg border border-[var(--color-border)] lg:hidden"
        >
          <span
            className={`h-0.5 w-5 bg-[var(--color-text-1)] transition-transform ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span className={`h-0.5 w-5 bg-[var(--color-text-1)] transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-5 bg-[var(--color-text-1)] transition-transform ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="menu-mobile"
          className="border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden"
          aria-label="Navegação principal (mobile)"
        >
          <div className="container-site flex flex-col gap-1 py-4">
            {primaryNavigation.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-[0.08em] ${
                  isActive(link.href)
                    ? "bg-[var(--color-brand-tint)] text-[var(--color-brand-strong)]"
                    : "text-[var(--color-text-1)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contato" className="btn-primary mt-2">
              Solicite uma proposta
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
