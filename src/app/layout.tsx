import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { siteConfig, analyticsConfig } from "@/config/site";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/contact/WhatsAppContact";
import { TalkToSalesProvider } from "@/components/forms/TalkToSalesModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo/jsonld";
import { getCmsSettings } from "@/lib/cms";
import { getSiteNavigation } from "@/lib/cms-navigation";
import { getSiteContactSettings } from "@/lib/contact-settings";
import { whatsAppContactsFromOffices } from "@/lib/whatsapp";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Courier New", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
  ...(analyticsConfig.searchConsoleVerification
    ? { verification: { google: analyticsConfig.searchConsoleVerification } }
    : {}),
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, navigation] = await Promise.all([getCmsSettings(), getSiteNavigation()]);
  const contactSettings = getSiteContactSettings(settings);
  const whatsAppContacts = whatsAppContactsFromOffices(contactSettings.offices);

  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationJsonLd(settings), webSiteJsonLd(settings)]} />
        <TalkToSalesProvider
          whatsAppContacts={whatsAppContacts}
          defaultWhatsAppMessage={contactSettings.defaultWhatsAppMessage}
        >
          <AnnouncementBar />
          <Header
            navGroups={navigation.navGroups}
            topLevelLinks={navigation.topLevelLinks}
            quickLinks={navigation.quickLinks}
            whatsAppContacts={whatsAppContacts}
            defaultWhatsAppMessage={contactSettings.defaultWhatsAppMessage}
          />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp contacts={whatsAppContacts} defaultMessage={contactSettings.defaultWhatsAppMessage} />
        </TalkToSalesProvider>
      </body>
    </html>
  );
}
