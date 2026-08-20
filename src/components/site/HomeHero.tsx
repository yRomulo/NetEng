"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { netengContact } from "@/data/companyData";

const rotatingWords = ["Automação", "Elétrica", "Telecom", "Conectividade"];
const ROTATION_MS = 2600;

export function HomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % rotatingWords.length);
    }, ROTATION_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-[var(--color-ink)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero/offshore.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-ink)] via-[var(--color-ink-a90)] to-[var(--color-ink-a40)]" />
      {/* Cunha diagonal da marca no canto esquerdo do hero. */}
      <div
        className="absolute inset-y-0 left-0 hidden w-[23%] bg-[var(--color-brand)] opacity-90 lg:block"
        style={{ clipPath: "polygon(0 0, 62% 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />

      <div className="container-site relative py-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
            Engenharia de Telecom e Automação
          </p>

          <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Engenharia integrada em
            <span className="mt-2 block text-[var(--color-brand-light)]" aria-live="polite">
              {rotatingWords[index]}
            </span>
          </h1>

          <span className="brand-rule my-7 !bg-white" />

          <p className="max-w-xl text-lg leading-8 text-white/80">
            Projetos, instalação e manutenção em Automação, Elétrica e Telecomunicações para operações que não podem
            parar. {netengContact.slogan}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/servicos" className="btn-ghost">
              Ver frentes de atuação
            </Link>
            <Link href="/contato" className="btn-primary">
              Solicite uma proposta
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
