import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/LegalPage";
import { buildMetadata } from "@/lib/seo/metadata";

const path = "/terms";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service - RetailPOS.biz",
  description:
    "Website terms for using RetailPOS.biz, requesting demos, reviewing product information and contacting the RetailPOS team.",
  path,
});

const sections: LegalSection[] = [
  {
    title: "Scope of these terms",
    paragraphs: [
      "These terms apply to the RetailPOS.biz website, including product information, contact forms, demo requests, pricing enquiries and other public website content.",
      "They do not replace a signed proposal, order form, subscription agreement, implementation statement of work or support agreement. If you become a customer, the signed commercial documents govern the product and service relationship.",
    ],
  },
  {
    title: "Website content",
    paragraphs: [
      "We aim to keep product descriptions, capabilities and contact information accurate and current. Website content is provided for evaluation and information, not as a guaranteed implementation scope.",
      "Retail workflows, integrations, pricing and deployment needs vary by business. Final scope, commercials and timelines are confirmed through a written proposal or agreement.",
    ],
  },
  {
    title: "Enquiries and demos",
    paragraphs: [
      "Submitting a form or requesting a demo does not create a purchase commitment from you or an obligation for RetailPOS.biz to provide software access. It starts a sales conversation so we can understand your requirements.",
      "Please provide accurate contact and business information. Do not submit unlawful, misleading, confidential third-party or highly sensitive personal information through website forms.",
    ],
  },
  {
    title: "Acceptable use",
    paragraphs: [
      "You may use the website for legitimate evaluation, contact and informational purposes. You may not attempt to disrupt the website, probe systems without permission, scrape content at abusive volumes, impersonate others or use forms to send spam.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "RetailPOS.biz website copy, interface illustrations, visual identity, logos and page designs belong to CrystalPro Technologies or its licensors. You may reference the website for evaluation, but you may not copy, resell or republish substantial parts of it as your own product or service.",
    ],
  },
  {
    title: "Third-party links and integrations",
    paragraphs: [
      "The website may mention third-party tools, marketplaces, payment providers, accounting systems or communication channels. Mentions describe integration categories or possible workflows and do not imply endorsement, certification or availability for every customer scenario.",
    ],
  },
  {
    title: "Liability and governing documents",
    paragraphs: [
      "The public website is provided as-is for evaluation. To the extent permitted by law, RetailPOS.biz is not liable for decisions made solely from website content without a scoped discussion or written agreement.",
      "Any signed commercial agreement may define its own warranties, support obligations, limitations, governing law and dispute process.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      description="Terms for using the RetailPOS.biz website, requesting demos and reviewing product information."
      path={path}
      updated="July 2026"
      sections={sections}
    />
  );
}
