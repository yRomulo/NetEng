"use client";

import { useState } from "react";
import { brazilStates, brazilViewBox, netengPresence } from "@/data/brazilMap";

const presenceIds = new Set(netengPresence.map((presence) => presence.id));

const segments = [
  "Óleo & Gás · onshore e offshore",
  "Indústria e plantas de processo",
  "Edifícios comerciais e condomínios",
  "Data centers e salas técnicas",
  "Órgãos públicos"
];

export function BrazilMapSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const hoveredName = brazilStates.find((state) => state.id === hoveredId)?.name ?? null;

  return (
    <section className="relative w-full overflow-hidden bg-[linear-gradient(108deg,#101317_55%,#2a1113_100%)] py-20">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px"
        }}
        aria-hidden="true"
      />

      <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1fr_0.92fr]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand-light)]">Onde atuamos</p>
          <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
            Presença que acompanha sua operação
          </h2>
          <span className="brand-rule my-5" />

          <div className="space-y-4 text-[0.95rem] leading-8 text-white/70">
            <p>
              Com base operacional em <strong className="text-white">Rio das Ostras (RJ)</strong>, no centro da cadeia
              de Óleo &amp; Gás da Bacia de Campos, atendemos o Rio de Janeiro e o Espírito Santo — e mobilizamos equipe
              conforme a necessidade do cliente.
            </p>
            <p>Atuamos nos segmentos:</p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {segments.map((segment) => (
              <li
                key={segment}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.8rem] font-medium text-white/85"
              >
                {segment}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <p className="mb-3 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/45">
            {hoveredName ? <span className="text-[var(--color-brand-light)]">{hoveredName}</span> : "em constante crescimento"}
          </p>

          <svg
            viewBox={brazilViewBox}
            className="mx-auto h-auto w-full max-w-[440px]"
            role="img"
            aria-label="Mapa do Brasil com os estados de atuação da NETENG: Rio de Janeiro e Espírito Santo"
          >
            {brazilStates.map((state) => {
              const isPresent = presenceIds.has(state.id);
              const isHovered = hoveredId === state.id;
              const fill = isHovered ? "var(--color-brand)" : isPresent ? "#5a2f31" : "#1f252d";

              return (
                <path
                  key={state.id}
                  d={state.path}
                  fill={fill}
                  stroke="#101317"
                  strokeWidth={0.8}
                  className="cursor-default transition-colors duration-200"
                  onMouseEnter={() => setHoveredId(state.id)}
                  onMouseLeave={() => setHoveredId((current) => (current === state.id ? null : current))}
                >
                  <title>{state.name}</title>
                </path>
              );
            })}

            {netengPresence.map((presence) => (
              <g key={presence.id} className="pointer-events-none">
                <circle
                  cx={presence.x}
                  cy={presence.y}
                  r={12}
                  fill="#ffffff"
                  stroke="rgba(216,63,64,.55)"
                  strokeWidth={1.5}
                />
                <image
                  href="/images/logo/simbolo.svg"
                  x={presence.x - 8}
                  y={presence.y - 8}
                  width={16}
                  height={16}
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
