import type { Product } from "@/types/content";

export const products: Product[] = [
  {
    slug: "retail-erp",
    name: "Retail ERP",
    shortName: "ERP",
    tagline: "One system for the whole retail operation",
    description:
      "Procurement, inventory, sales, finance and people on a single retail-native ERP core.",
    icon: "Building2",
    featured: true,
  },
  {
    slug: "pos-software",
    name: "POS Software",
    shortName: "POS",
    tagline: "Fast, reliable billing at every counter",
    description:
      "Touch billing, barcode scanning, offline mode, returns, and shift management built for busy counters.",
    icon: "MonitorSmartphone",
    featured: true,
  },
  {
    slug: "inventory-management",
    name: "Inventory Management",
    shortName: "Inventory",
    tagline: "Know every unit, everywhere",
    description:
      "Real-time stock across stores and warehouses with reorder rules, batches, expiry and audits.",
    icon: "Boxes",
  },
  {
    slug: "billing-software",
    name: "Billing Software",
    shortName: "Billing",
    tagline: "GST-ready invoicing without friction",
    description:
      "Compliant invoices, credit notes, quotations and e-invoicing workflows for retail and wholesale.",
    icon: "ReceiptText",
  },
  {
    slug: "accounting",
    name: "Accounting",
    shortName: "Accounting",
    tagline: "Books that close themselves",
    description:
      "Ledgers, payables, receivables, taxes and reconciliation posted automatically from operations.",
    icon: "Calculator",
  },
  {
    slug: "crm",
    name: "Retail CRM",
    shortName: "CRM",
    tagline: "Turn walk-ins into repeat customers",
    description:
      "Customer profiles, purchase history, loyalty points, offers and WhatsApp engagement.",
    icon: "HeartHandshake",
  },
  {
    slug: "omnichannel-retail",
    name: "Omnichannel Retail",
    shortName: "Omnichannel",
    tagline: "Store, online and marketplace in sync",
    description:
      "Unified catalog, stock and orders across physical stores, webstore and marketplaces.",
    icon: "Store",
  },
  {
    slug: "retail-analytics",
    name: "Retail Analytics",
    shortName: "Analytics",
    tagline: "Decisions from data, not guesswork",
    description:
      "Sales, margin, stock-turn and staff dashboards with scheduled reports for owners and managers.",
    icon: "ChartColumnIncreasing",
  },
  {
    slug: "ai-retail",
    name: "AI Retail",
    shortName: "AI",
    tagline: "An analyst for every store",
    description:
      "Demand forecasting, smart reordering, dynamic pricing signals and anomaly alerts powered by AI.",
    icon: "Sparkles",
    featured: true,
  },
];
