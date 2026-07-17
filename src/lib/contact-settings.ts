import { contactConfig, getOfficesForDisplay, type RegionalOffice } from "@/config/contact";
import type { CmsSettings } from "@/lib/cms";
import { cmsText, isRecord } from "@/lib/cms-content";

export interface SiteContactSettings {
  infoEmail: string;
  globalEmail: string;
  defaultWhatsAppMessage: string;
  offices: RegionalOffice[];
}

function text(value: unknown, maxLength = 160): string | undefined {
  return cmsText(value, maxLength);
}

function settingRecord(settings: CmsSettings | null | undefined): Record<string, unknown> {
  return isRecord(settings?.website_settings) ? settings.website_settings : {};
}

function mergeOffice(office: RegionalOffice, overrides: Partial<RegionalOffice>): RegionalOffice {
  const phoneDisplay = overrides.phoneDisplay ?? office.phoneDisplay;
  const phoneE164 = overrides.phoneE164 ?? office.phoneE164;
  const whatsappDisplay = overrides.whatsappDisplay ?? phoneDisplay ?? office.whatsappDisplay;
  const whatsappE164 = overrides.whatsappE164 ?? office.whatsappE164;

  return {
    ...office,
    ...overrides,
    ...(phoneDisplay ? { phoneDisplay } : {}),
    ...(phoneE164 ? { phoneE164 } : {}),
    ...(whatsappDisplay ? { whatsappDisplay } : {}),
    ...(whatsappE164 ? { whatsappE164 } : {}),
    verified: Boolean(overrides.verified ?? office.verified ?? whatsappE164 ?? phoneE164),
  };
}

export function getSiteContactSettings(settings?: CmsSettings | null): SiteContactSettings {
  const websiteSettings = settingRecord(settings);
  const infoEmail = text(settings?.contact_email, 180) ?? text(websiteSettings.email, 180) ?? contactConfig.infoEmail;
  const globalEmail = text(websiteSettings.sales_email, 180) ?? text(websiteSettings.support_email, 180) ?? contactConfig.globalEmail;
  const defaultWhatsAppMessage =
    text(websiteSettings.whatsapp_default_message, 500) ?? contactConfig.defaultWhatsAppMessage;

  const offices = getOfficesForDisplay().map((office) => {
    if (office.countryCode === "IN") {
      const phone = text(settings?.contact_phone_india, 80) ?? text(websiteSettings.primary_phone, 80);
      const whatsapp = text(websiteSettings.whatsapp_number, 80);
      return mergeOffice(office, {
        email: globalEmail,
        ...(phone ? { phoneDisplay: phone, phoneE164: phone } : {}),
        ...(whatsapp ? { whatsappDisplay: phone ?? whatsapp, whatsappE164: whatsapp } : {}),
      });
    }

    if (office.countryCode === "SG") {
      const phone = text(settings?.contact_phone_singapore, 80);
      return mergeOffice(office, {
        email: globalEmail,
        ...(phone ? { phoneDisplay: phone, phoneE164: phone, whatsappDisplay: phone, whatsappE164: phone } : {}),
      });
    }

    if (office.countryCode === "MY") {
      const phone = text(settings?.contact_phone_malaysia, 80) ?? text(websiteSettings.secondary_phone, 80);
      return mergeOffice(office, {
        email: globalEmail,
        ...(phone ? { phoneDisplay: phone, phoneE164: phone, whatsappDisplay: phone, whatsappE164: phone } : {}),
      });
    }

    return mergeOffice(office, { email: globalEmail });
  });

  return {
    infoEmail,
    globalEmail,
    defaultWhatsAppMessage,
    offices,
  };
}
