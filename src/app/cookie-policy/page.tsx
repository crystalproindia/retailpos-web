import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/cookie-policy";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy - RetailPOS.biz",
  description:
    "How RetailPOS.biz uses essential cookies, analytics cookies and similar technologies on the website.",
  path,
});

const sections: LegalSection[] = [
  {
    title: "What cookies are",
    paragraphs: [
      "Cookies are small files stored by a browser. Similar technologies, such as local storage and pixels, can also remember settings, measure visits or help a website work reliably.",
      "This policy covers the public RetailPOS.biz website. Product-specific cookies or storage used inside the RetailPOS application may be governed by customer agreements and product documentation.",
    ],
  },
  {
    title: "Essential cookies",
    paragraphs: [
      "Essential cookies or storage may be used to keep the website secure, remember basic interaction state, protect forms from abuse and support normal operation. These are needed for the site to function correctly.",
    ],
  },
  {
    title: "Analytics and marketing cookies",
    paragraphs: [
      "RetailPOS.biz is built so analytics and marketing providers stay inactive unless their IDs are configured. When enabled, these tools may help us understand traffic, improve content, measure campaigns and diagnose website performance.",
      "Examples of providers that may be configured include analytics, tag management, advertising measurement, professional network measurement and website behaviour analytics tools. We do not use these tools to sell enquiry information.",
    ],
  },
  {
    title: "Managing cookies",
    paragraphs: [
      "Most browsers let you block, delete or limit cookies through browser settings. Blocking essential cookies may affect website behaviour. Analytics and marketing cookies can also be limited through browser privacy controls and supported provider opt-out settings.",
      "Because the current website does not expose a custom cookie preference centre, browser controls are the primary way to manage cookie choices.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy when website tooling, analytics providers or legal requirements change. The updated date on this page shows when the current version was published.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      description="How cookies and similar technologies are used on the RetailPOS.biz website."
      path={path}
      updated="July 2026"
      sections={sections}
    />
  );
}
