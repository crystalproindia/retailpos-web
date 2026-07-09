import Image from "next/image";
import { clientLogos, type ClientLogo } from "@/data/trust";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";

interface ClientLogoWallProps {
  logos?: ClientLogo[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "white" | "paper";
  compact?: boolean;
  className?: string;
}

export function ClientLogoWall({
  logos = clientLogos,
  eyebrow = "Client proof",
  title = "Trusted by retailers, institutions and growing business teams",
  description = "RetailPOS.biz is used across practical operating environments where billing, inventory, accounting and support quality matter every day.",
  tone = "white",
  compact = false,
  className,
}: ClientLogoWallProps) {
  return (
    <Section
      tone={tone}
      aria-labelledby="client-logo-wall-heading"
      className={cn("border-b border-line/70", compact ? "py-8 sm:py-10" : "py-10 sm:py-12", className)}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
        <h2 id="client-logo-wall-heading" className="mt-3 font-display text-display-sm font-semibold text-ink">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{description}</p>
      </div>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {logos.map((logo, index) => (
          <li key={logo.name}>
            <div
              className="group flex h-24 flex-col items-center justify-center gap-2 rounded-lg border border-line/80 bg-white px-3 py-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-raised motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 18}ms` }}
            >
              {logo.logoSrc ? (
                <span className="relative block h-10 w-28">
                  <Image
                    src={logo.logoSrc}
                    alt={logo.alt}
                    fill
                    sizes="112px"
                    className="object-contain opacity-70 grayscale transition duration-200 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
                    loading="lazy"
                  />
                </span>
              ) : (
                <span className="flex h-10 items-center text-center text-sm font-semibold leading-tight text-ink-soft">
                  {logo.name}
                </span>
              )}
              <span className="line-clamp-1 text-center text-xs font-medium text-ink-muted transition-colors group-hover:text-ink">
                {logo.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
