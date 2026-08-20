"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { buildCommercialContactLinks, contactServiceOptions, whatsappUrl } from "@/data/contactData";
import { netengContact } from "@/data/companyData";

type ContactFormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  /** Honeypot — bots preenchem, humanos não veem. */
  website: string;
};

type FieldName = keyof Omit<ContactFormState, "website">;

const initialFormState: ContactFormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  website: ""
};

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? ""
} as const;

function validate(form: ContactFormState): Partial<Record<FieldName, string>> {
  const errors: Partial<Record<FieldName, string>> = {};

  if (form.name.trim().length < 2) errors.name = "Informe seu nome.";
  if (form.company.trim().length < 2) errors.company = "Informe a empresa.";
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Informe um e-mail válido.";

  const phoneDigits = form.phone.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 13) errors.phone = "Informe um telefone com DDD.";

  if (!contactServiceOptions.includes(form.service as (typeof contactServiceOptions)[number])) {
    errors.service = "Selecione a frente de interesse.";
  }
  if (form.message.trim().length < 10) errors.message = "Descreva sua necessidade em ao menos uma linha.";

  return errors;
}

export function ContactSection() {
  const [form, setForm] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [fallback, setFallback] = useState<{ whatsappUrl: string; emailUrl: string } | null>(null);
  const [failureMessage, setFailureMessage] = useState("");

  const update = (field: keyof ContactFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (field !== "website" && errors[field as FieldName]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFailureMessage("");
    setFallback(null);

    if (form.website.trim()) return; // honeypot preenchido — descarta em silêncio

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    const directLinks = buildCommercialContactLinks(form);

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setFallback(directLinks);
      setFailureMessage("O envio automático ainda não está configurado neste ambiente. Use um dos canais diretos abaixo.");
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          message: form.message.trim(),
          reply_to: form.email.trim(),
          to_email: netengContact.email,
          site_name: "neteng.com.br"
        },
        { publicKey: emailJsConfig.publicKey }
      );

      setIsSent(true);
      setForm(initialFormState);
    } catch {
      setFallback(directLinks);
      setFailureMessage("Não conseguimos enviar sua mensagem agora. Use um dos canais diretos abaixo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: FieldName) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-[var(--color-text-1)] outline-none transition-colors placeholder:text-[var(--color-text-3)] focus:border-[var(--color-brand)] ${
      errors[field] ? "border-red-500" : "border-[var(--color-border)]"
    }`;

  const errorFor = (field: FieldName) =>
    errors[field] ? (
      <p id={`${field}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section className="bg-[var(--color-surface-alt)] py-20">
      <div className="container-site grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--color-brand-strong)]">Contato</p>
          <h2 className="font-display text-3xl font-extrabold text-[var(--color-text-1)] md:text-4xl">
            Solicite uma proposta
          </h2>
          <span className="brand-rule my-5" />
          <p className="max-w-lg text-base leading-8 text-[var(--color-text-2)]">
            Estamos prontos para entender suas necessidades específicas e construir a solução ideal que levará seu
            negócio ao próximo nível.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-[var(--color-brand-strong)]">
                <FiPhone aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-3)]">Telefone</p>
                <a
                  href={`tel:+${netengContact.phoneDigits}`}
                  className="text-sm font-semibold text-[var(--color-text-1)] hover:text-[var(--color-brand-strong)]"
                >
                  {netengContact.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-[var(--color-brand-strong)]">
                <FiMail aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-3)]">E-mail</p>
                <a
                  href={`mailto:${netengContact.email}`}
                  className="break-all text-sm font-semibold text-[var(--color-text-1)] hover:text-[var(--color-brand-strong)]"
                >
                  {netengContact.email}
                </a>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-tint)] text-[var(--color-brand-strong)]">
                <FiMapPin aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-3)]">Endereço</p>
                <p className="text-sm font-semibold text-[var(--color-text-1)]">{netengContact.address.full}</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10 text-[#128C7E]">
                <FaWhatsapp aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--color-text-3)]">WhatsApp</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[var(--color-text-1)] hover:text-[var(--color-brand-strong)]"
                >
                  Iniciar conversa
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-white p-7 shadow-sm md:p-9">
          {isSent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-tint)] text-2xl text-[var(--color-brand-strong)]">
                ✓
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-[var(--color-text-1)]">Mensagem enviada</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-text-2)]">
                Recebemos seu contato. O comercial da NETENG responde em até um dia útil.
              </p>
              <button type="button" onClick={() => setIsSent(false)} className="btn-outline mt-7">
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="relative space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-2)]">
                    Nome
                  </label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={fieldClass("name")}
                    placeholder="Seu nome"
                  />
                  {errorFor("name")}
                </div>

                <div>
                  <label htmlFor="company" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-2)]">
                    Empresa
                  </label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(event) => update("company", event.target.value)}
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                    className={fieldClass("company")}
                    placeholder="Nome da empresa"
                  />
                  {errorFor("company")}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-2)]">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={fieldClass("email")}
                    placeholder="nome@empresa.com.br"
                  />
                  {errorFor("email")}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-2)]">
                    Telefone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={fieldClass("phone")}
                    placeholder="(22) 99999-9999"
                  />
                  {errorFor("phone")}
                </div>
              </div>

              <div>
                <label htmlFor="service" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-2)]">
                  Frente de interesse
                </label>
                <select
                  id="service"
                  value={form.service}
                  onChange={(event) => update("service", event.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "service-error" : undefined}
                  className={fieldClass("service")}
                >
                  <option value="">Selecione</option>
                  {contactServiceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errorFor("service")}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-text-2)]">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${fieldClass("message")} resize-y`}
                  placeholder="Conte o escopo, o prazo e o local da operação."
                />
                {errorFor("message")}
              </div>

              <div aria-hidden="true" className="absolute -left-[9999px]">
                <label htmlFor="website">Não preencher</label>
                <input
                  id="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => update("website", event.target.value)}
                />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">
                {isSubmitting ? "Enviando…" : "Enviar mensagem"}
              </button>

              {failureMessage && (
                <div role="alert" className="rounded-lg border border-[var(--color-brand-soft)] bg-[var(--color-brand-tint)] p-4">
                  <p className="text-sm leading-6 text-[var(--color-text-2)]">{failureMessage}</p>
                  {fallback && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      <a
                        href={fallback.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-[var(--color-brand-strong)] underline"
                      >
                        Enviar por WhatsApp
                      </a>
                      <a href={fallback.emailUrl} className="text-sm font-semibold text-[var(--color-brand-strong)] underline">
                        Enviar por e-mail
                      </a>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs leading-6 text-[var(--color-text-3)]">
                Ao enviar, você concorda com o tratamento dos seus dados conforme a nossa{" "}
                <a href="/politica-de-privacidade/" className="underline hover:text-[var(--color-brand-strong)]">
                  Política de Privacidade
                </a>
                . Não utilizamos seus dados para envio de SPAM.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
