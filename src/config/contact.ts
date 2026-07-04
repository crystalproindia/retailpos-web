/**
 * Centralized international contact configuration.
 * SINGLE SOURCE for phone/email/WhatsApp across Header, Footer, forms and
 * the future Contact page. The admin panel replaces this via API later.
 *
 * IMPORTANT: `verified: false` numbers are NEVER rendered. Singapore and
 * Malaysia numbers were not provided and MUST NOT be invented — enter the
 * real values below and flip `verified` to true when available.
 */

export interface RegionalOffice {
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  city: string;
  address?: string;
  phoneDisplay?: string;
  phoneE164?: string; // e.g. +919876543210
  whatsappDisplay?: string;
  whatsappE164?: string; // digits only for wa.me
  email?: string;
  /** Only verified offices render phone/WhatsApp links in the UI. */
  verified: boolean;
  isPrimary?: boolean;
  displayOrder: number;
}

export const contactConfig = {
  companyName: "RetailPOS.biz",
  primaryEmail: "hello@retailpos.biz",
  salesEmail: "sales@retailpos.biz",
  supportEmail: "support@retailpos.biz",
  offices: [
    {
      country: "India",
      countryCode: "IN",
      city: "Coimbatore",
      address: "CrystalPro Technologies, Coimbatore, Tamil Nadu",
      // TODO(verified-data): enter the verified India sales number, then set verified: true
      phoneDisplay: undefined,
      phoneE164: undefined,
      whatsappDisplay: undefined,
      whatsappE164: undefined,
      email: "sales@retailpos.biz",
      verified: false,
      isPrimary: true,
      displayOrder: 1,
    },
    {
      country: "Singapore",
      countryCode: "SG",
      city: "Singapore",
      // TODO(verified-data): number not provided — do not invent
      email: "sales@retailpos.biz",
      verified: false,
      displayOrder: 2,
    },
    {
      country: "Malaysia",
      countryCode: "MY",
      city: "Kuala Lumpur",
      // TODO(verified-data): number not provided — do not invent
      email: "sales@retailpos.biz",
      verified: false,
      displayOrder: 3,
    },
  ] satisfies RegionalOffice[],
} as const;

export function getOfficesForDisplay(): RegionalOffice[] {
  return [...contactConfig.offices].sort((a, b) => a.displayOrder - b.displayOrder);
}
