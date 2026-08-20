import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[var(--color-ink)]">
      <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-6xl font-extrabold text-[var(--color-brand-light)]">404</p>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-white">Página não encontrada</h1>
        <p className="mt-3 max-w-md text-sm leading-7 text-white/65">
          O endereço acessado não existe ou foi movido.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Voltar para o início
        </Link>
      </div>
    </section>
  );
}
