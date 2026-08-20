type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  variant = "light",
  align = "left",
  as: Tag = "h2"
}: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p
          className={`mb-2 text-xs font-bold uppercase tracking-[0.14em] ${
            isDark ? "text-[var(--color-brand-light)]" : "text-[var(--color-brand-strong)]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={`font-display text-3xl font-extrabold md:text-4xl ${
          isDark ? "text-white" : "text-[var(--color-text-1)]"
        }`}
      >
        {title}
      </Tag>
      <span className={`brand-rule my-5 ${align === "center" ? "mx-auto" : ""}`} />
      {description && (
        <p className={`text-base leading-8 ${isDark ? "text-white/70" : "text-[var(--color-text-2)]"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
