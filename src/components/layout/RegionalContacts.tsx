import { Mail, MapPin, Phone } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { contactConfig, getOfficesForDisplay } from "@/config/contact";

/**
 * Regional sales contacts, driven entirely by src/config/contact.ts.
 * Offices with verified: false render email + location only — tel: and
 * wa.me links appear automatically once verified numbers are configured.
 * Compact grid on desktop, stacked on mobile.
 */
export function RegionalContacts({ invert = false }: { invert?: boolean }) {
  const offices = getOfficesForDisplay();
  const heading = invert ? "text-brand-200" : "text-brand-600";
  const label = invert ? "text-white" : "text-ink";
  const muted = invert ? "text-white/60" : "text-ink-muted";
  const link = invert ? "text-white/80 hover:text-white" : "text-ink-soft hover:text-brand-700";

  return (
    <div>
      <p className={`font-mono text-xs font-medium uppercase tracking-widest ${heading}`}>
        Regional sales contacts
      </p>
      <ul className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-3">
        {offices.map((office) => (
          <li key={office.country}>
            <p className={`flex items-center gap-1.5 text-sm font-semibold ${label}`}>
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 opacity-60" />
              {office.country} Sales
            </p>
            <div className="mt-1.5 space-y-1 text-sm">
              {office.verified && office.phoneE164 && office.phoneDisplay ? (
                <a
                  href={`tel:${office.phoneE164}`}
                  aria-label={`Call RetailPOS ${office.country} Sales`}
                  className={`flex items-center gap-1.5 hover:underline ${link}`}
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" />
                  {office.phoneDisplay}
                </a>
              ) : (
                <p className={`text-xs ${muted}`}>{office.city} · phone line publishing soon</p>
              )}
              {office.verified && office.whatsappE164 && office.whatsappDisplay ? (
                <a
                  href={`https://wa.me/${office.whatsappE164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp RetailPOS ${office.country} Sales`}
                  className={`flex items-center gap-1.5 hover:underline ${link}`}
                >
                  <MessageCircle aria-hidden="true" className="h-3.5 w-3.5" />
                  {office.whatsappDisplay}
                </a>
              ) : null}
              {office.email ? (
                <a
                  href={`mailto:${office.email}`}
                  aria-label={`Email RetailPOS ${office.country} Sales`}
                  className={`flex items-center gap-1.5 hover:underline ${link}`}
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                  {office.email}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <p className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs ${muted}`}>
        <span>
          Email: <a href={`mailto:${contactConfig.infoEmail}`} className="hover:underline">{contactConfig.infoEmail}</a>
        </span>
        <span>
          Global enquiries: <a href={`mailto:${contactConfig.globalEmail}`} className="hover:underline">{contactConfig.globalEmail}</a>
        </span>
      </p>
    </div>
  );
}
