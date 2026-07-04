import type { Faq } from "@/types/content";

export const homepageFaqs: Faq[] = [
  {
    question: "What is RetailPOS.biz?",
    answer:
      "RetailPOS.biz is a retail management platform that combines POS billing, inventory, purchasing, CRM, loyalty, accounting and analytics in one system. It is built for single stores, multi-store chains, franchises and enterprise retail, with AI features for forecasting and reordering.",
  },
  {
    question: "Is RetailPOS.biz a POS or a full ERP?",
    answer:
      "Both. The POS handles fast counter billing, while the ERP layer runs procurement, inventory, finance, HR and multi-store control behind it. You can start with POS and enable ERP modules as you grow.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. Billing continues if your internet connection drops, and transactions sync automatically once you are back online, so counters never stop.",
  },
  {
    question: "Which businesses is it suitable for?",
    answer:
      "Supermarkets, grocery, fashion, footwear, electronics, pharmacy, restaurants, jewellery, furniture, beauty, sports, wholesale distribution and franchise networks. Industry-specific workflows such as batch/expiry, size-colour matrix and IMEI tracking are built in.",
  },
  {
    question: "Can I manage multiple stores and franchises?",
    answer:
      "Yes. Multi-store management gives you central pricing, stock transfers, consolidated reporting and outlet-level permissions. Franchise management adds royalty, replenishment and franchisee billing on top.",
  },
  {
    question: "Is billing GST-compliant?",
    answer:
      "Yes. Invoices, credit notes and reports follow Indian GST requirements, and the platform is designed to support e-invoicing workflows and export-ready data for filing.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "A single store can typically go live in about a day: import items, connect hardware, train the team and start billing. Multi-store and enterprise rollouts follow a phased plan with data migration and on-site or remote training.",
  },
  {
    question: "Can it integrate with my webstore and other software?",
    answer:
      "Yes. Integrations cover e-commerce platforms, marketplaces, payment gateways, WhatsApp and accounting software, plus an open REST API and webhooks for custom connections.",
  },
];
