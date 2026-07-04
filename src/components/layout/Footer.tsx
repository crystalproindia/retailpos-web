import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footerColumns, legalLinks } from "@/data/navigation";
import { company, socialLinks } from "@/data/company";
import { primaryCtas } from "@/data/ctas";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { RegionalContacts } from "./RegionalContacts";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      {/* Pre-footer CTA band */}
      <div className="border-b border-white/10">
        <Container className="flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-display-sm font-semibold sm:text-display-md">
              See RetailPOS on your own products
            </h2>
            <p className="mt-2 max-w-xl text-sm text-brand-100">
              A 30-minute walkthrough with your items, your prices and your questions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={primaryCtas.bookDemo.href}>{primaryCtas.bookDemo.label}</ButtonLink>
            <ButtonLink href={primaryCtas.requestPricing.href} variant="inverted">
              {primaryCtas.requestPricing.label}
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* Link columns */}
      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-6">
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-200">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-white hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Regional contacts */}
      <div className="border-t border-white/10">
        <Container className="py-8">
          <RegionalContacts invert />
        </Container>
      </div>

      {/* Company strip */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Logo invert />
            <p className="max-w-md text-sm text-white/60">
              Retail ERP, POS and AI-powered retail management by {company.parent}, delivering
              software solutions since {company.foundedYear}.
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {company.headquarters}
              </span>
              <a href={`mailto:${company.email}`} className="inline-flex items-center gap-1.5 hover:text-white hover:underline">
                <Mail aria-hidden="true" className="h-3.5 w-3.5" /> {company.email}
              </a>
            </p>
          </div>
          <ul className="flex flex-wrap gap-4" aria-label="Social media">
            {socialLinks.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 hover:text-white hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {company.parent}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="barcode-divider hidden opacity-40 sm:block" />
        </Container>
      </div>
    </footer>
  );
}
