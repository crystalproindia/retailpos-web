import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { company } from "@/data/company";
import { Container } from "@/components/ui/Container";
import { getCmsSettings } from "@/lib/cms";
import { getSiteContactSettings } from "@/lib/contact-settings";
import { getSiteFooterContent } from "@/lib/cms-footer";
import { Logo } from "./Logo";
import { RegionalContacts } from "./RegionalContacts";

function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function FooterLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export async function Footer() {
  const [footer, settings] = await Promise.all([getSiteFooterContent(), getCmsSettings()]);
  const contactSettings = getSiteContactSettings(settings);

  return (
    <footer className="bg-ink text-white">
      {/* Link columns */}
      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
        {footer.columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-brand-200">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} className="text-sm text-white/70 transition-colors hover:text-white hover:underline">
                    {link.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Regional contacts */}
      <div className="border-t border-white/10">
        <Container className="py-8">
          <RegionalContacts
            invert
            offices={contactSettings.offices}
            infoEmail={contactSettings.infoEmail}
            globalEmail={contactSettings.globalEmail}
          />
          {footer.contactContent || footer.locationsContent ? (
            <div className="mt-5 grid gap-4 text-sm text-white/60 sm:grid-cols-2">
              {footer.locationsContent ? (
                <p className="leading-relaxed">
                  <MapPin aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5" />
                  {footer.locationsContent}
                </p>
              ) : null}
              {footer.contactContent ? (
                <p className="leading-relaxed">
                  <Mail aria-hidden="true" className="mr-1.5 inline h-3.5 w-3.5" />
                  {footer.contactContent}
                </p>
              ) : null}
            </div>
          ) : null}
        </Container>
      </div>

      {/* Company strip */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <Logo invert />
            <p className="max-w-md text-sm text-white/60">
              {footer.description}
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/60">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {company.headquarters}
              </span>
              <a href={`mailto:${contactSettings.infoEmail}`} className="inline-flex items-center gap-1.5 hover:text-white hover:underline">
                <Mail aria-hidden="true" className="h-3.5 w-3.5" /> {contactSettings.infoEmail}
              </a>
            </p>
          </div>
          <ul className="flex flex-wrap gap-4" aria-label="Social media">
            {footer.socialLinks.map((s) => (
              <li key={s.href}>
                <FooterLink href={s.href} className="text-sm text-white/70 hover:text-white hover:underline">
                  {s.label}
                </FooterLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* Legal */}
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-5 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
          <ul className="flex flex-wrap gap-4">
            {footer.legalLinks.map((link) => (
              <li key={link.href}>
                <FooterLink href={link.href} className="hover:text-white hover:underline">
                  {link.label}
                </FooterLink>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="barcode-divider hidden opacity-40 sm:block" />
        </Container>
      </div>
    </footer>
  );
}
