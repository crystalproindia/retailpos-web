import { contactConfig, getOfficesForDisplay, type RegionalOffice } from "@/config/contact";

export interface WhatsAppPageContext {
  pageTitle?: string;
  pageUrl?: string;
  route?: string;
}

export interface WhatsAppContactOption {
  country: string;
  countryCode: string;
  city: string;
  number?: string;
  numberDisplay?: string;
  available: boolean;
  status: string;
}

export function normalizeWhatsAppNumber(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : undefined;
}

export function getWhatsAppContacts(): WhatsAppContactOption[] {
  return whatsAppContactsFromOffices(getOfficesForDisplay());
}

export function whatsAppContactsFromOffices(offices: RegionalOffice[]): WhatsAppContactOption[] {
  return offices.map((office) => {
    const number = normalizeWhatsAppNumber(office.whatsappE164);
    const available = Boolean(office.verified && number);

    return {
      country: office.country,
      countryCode: office.countryCode,
      city: office.city,
      ...(number ? { number } : {}),
      ...(number ? { numberDisplay: office.whatsappDisplay ?? `+${number}` } : {}),
      available,
      status: available ? "Available for WhatsApp" : "WhatsApp number coming soon",
    };
  });
}

export function buildWhatsAppMessage(context: WhatsAppPageContext = {}, defaultMessage: string = contactConfig.defaultWhatsAppMessage): string {
  const lines: string[] = [defaultMessage];
  if (context.pageTitle) lines.push(`Page: ${context.pageTitle}`);
  if (context.route) lines.push(`Route: ${context.route}`);
  if (context.pageUrl) lines.push(`URL: ${context.pageUrl}`);
  return lines.join("\n");
}

export function buildWhatsAppHref(number: string | null | undefined, context: WhatsAppPageContext = {}, defaultMessage?: string): string | null {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(buildWhatsAppMessage(context, defaultMessage))}`;
}
