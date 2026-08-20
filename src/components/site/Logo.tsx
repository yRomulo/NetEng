/**
 * Ponto único da marca no site.
 *
 * `variant="dark"`  → arte escura (preto + vermelho), para fundo claro.
 * `variant="light"` → arte clara (branco + vermelho), para fundo escuro.
 *
 * Os SVGs vivem em /public/images/logo. O `logo.svg` é o arquivo oficial exportado
 * do Canva, com os retângulos brancos de fundo removidos e o viewBox recortado na
 * arte. O `logo-dark.svg` é derivado dele (preto → branco, vermelho preservado) até
 * a versão escura oficial ser exportada — ver docs/pendencias.md.
 */

const LOGO_RATIO = 345 / 116;

type LogoProps = {
  variant?: "light" | "dark";
  /** Altura renderizada em px. A largura acompanha pela proporção da arte. */
  height?: number;
  className?: string;
};

export function Logo({ variant = "dark", height = 40, className = "" }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={variant === "light" ? "/images/logo/logo-dark.svg" : "/images/logo/logo.svg"}
      alt="NETENG Engenharia"
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}

/** Marca reduzida — o "N" com o arco de sinal, usada nos pinos do mapa. */
export function LogoMark({ className = "", size = 24 }: { className?: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo/simbolo.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
    />
  );
}
