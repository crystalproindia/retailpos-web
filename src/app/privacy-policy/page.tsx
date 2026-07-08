import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/privacy-policy";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy - RetailPOS.biz",
  description:
    "How RetailPOS.biz handles website visitors, demo requests, sales enquiries, analytics data and privacy choices.",
  path,
});

const sections: LegalSection[] = [
  {
    title: "Information we collect",
    paragraphs: [
      "RetailPOS.biz collects information you choose to provide when you contact us, request pricing or book a demo. This may include your name, business name, email, phone number, country, business type, store count, solution interest and any message you send.",
      "The website may also collect basic technical information such as browser type, device information, referring page, pages visited and approximate location derived from network information. This helps us keep the website reliable and understand which content is useful.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: [
      "We use enquiry information to respond to requests, schedule demos, discuss product fit, prepare scoped proposals and support sales conversations. We use technical and analytics information to improve page performance, navigation, content quality and website security.",
      "We do not sell personal information. We do not use enquiry details to make automated decisions that affect access to the RetailPOS product.",
    ],
  },
  {
    title: "Sharing and service providers",
    paragraphs: [
      "Information may be handled by RetailPOS.biz, CrystalPro Technologies and trusted service providers that help operate the website, email, analytics, hosting, CRM or scheduling workflows. These providers are expected to use the information only for the service they provide to us.",
      "If a commercial agreement is signed, the privacy and data-processing terms in that agreement may add product-specific obligations beyond this website policy.",
    ],
  },
  {
    title: "Cookies and analytics",
    paragraphs: [
      "The website uses cookies and similar technologies where needed for operation, measurement and improvement. Optional analytics providers are inactive unless configured by RetailPOS.biz.",
      "More detail is available in the Cookie Policy, including the difference between essential and optional cookies.",
    ],
  },
  {
    title: "Retention and choices",
    paragraphs: [
      "We keep enquiry records for as long as needed to respond, maintain business records, prevent abuse and support legitimate sales follow-up. If you want to update, correct or request deletion of enquiry information, contact us using the email at the bottom of this page.",
      "Some records may need to be retained where required for legal, accounting, security or dispute-resolution reasons.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect website and enquiry data. No website or email workflow can be guaranteed to be perfectly secure, so please avoid sending highly sensitive information through open text fields.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How we handle website visitors, enquiries, demo requests and related communications."
      path={path}
      updated="July 2026"
      sections={sections}
    />
  );
}
