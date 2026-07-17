/**
 * Centralized international contact configuration.
 * SINGLE SOURCE for phone/email/WhatsApp across Header, Footer, forms and
 * the future Contact page. The admin panel replaces this via API later.
 *
 * IMPORTANT: `verified: false` numbers are NEVER rendered. Keep all public
 * contact numbers here so WhatsApp, footer and contact pages stay in sync.
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

const infoEmail = "info@retailpos.biz";
const globalEmail = "global@retailpos.biz";

const indiaPhoneDisplay = "+91 8072682244";
const indiaPhoneE164 = "+918072682244";
const indiaWhatsAppNumber = "918072682244";

const singaporePhoneDisplay = "+65 92475024";
const singaporePhoneE164 = "+6592475024";
const singaporeWhatsAppNumber = "6592475024";

const malaysiaPhoneDisplay = "+60 104305163";
const malaysiaPhoneE164 = "+60104305163";
const malaysiaWhatsAppNumber = "60104305163";

export const contactConfig = {
  companyName: "RetailPOS.biz",
  infoEmail,
  globalEmail,
  primaryEmail: infoEmail,
  salesEmail: globalEmail,
  supportEmail: infoEmail,
  defaultWhatsAppMessage:
    "Hi RetailPOS.biz, I'm interested in AI-powered Retail POS. I'd like to book a free demo.",
  indiaWhatsAppNumber,
  singaporeWhatsAppNumber,
  malaysiaWhatsAppNumber,
  offices: [
    {
      country: "India",
      countryCode: "IN",
      city: "Coimbatore",
      address: "CrystalPro Technologies, Coimbatore, Tamil Nadu",
      phoneDisplay: indiaPhoneDisplay,
      phoneE164: indiaPhoneE164,
      whatsappDisplay: indiaPhoneDisplay,
      whatsappE164: indiaWhatsAppNumber,
      email: globalEmail,
      verified: true,
      isPrimary: true,
      displayOrder: 1,
    },
    {
      country: "Singapore",
      countryCode: "SG",
      city: "Singapore",
      phoneDisplay: singaporePhoneDisplay,
      phoneE164: singaporePhoneE164,
      whatsappDisplay: singaporePhoneDisplay,
      whatsappE164: singaporeWhatsAppNumber,
      email: globalEmail,
      verified: true,
      displayOrder: 2,
    },
    {
      country: "Malaysia",
      countryCode: "MY",
      city: "Kuala Lumpur",
      phoneDisplay: malaysiaPhoneDisplay,
      phoneE164: malaysiaPhoneE164,
      whatsappDisplay: malaysiaPhoneDisplay,
      whatsappE164: malaysiaWhatsAppNumber,
      email: globalEmail,
      verified: true,
      displayOrder: 3,
    },
  ] satisfies RegionalOffice[],
} as const;

export function getOfficesForDisplay(): RegionalOffice[] {
  return [...contactConfig.offices].sort((a, b) => a.displayOrder - b.displayOrder);
}
