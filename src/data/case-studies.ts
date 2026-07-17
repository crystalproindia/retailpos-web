import type { NavLink } from "@/types/content";

export interface CaseStudy {
  slug: string;
  title: string;
  clientName?: string;
  location?: string;
  publishedAt?: string;
  businessType: string;
  icon: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  modules: string[];
  rolloutFocus: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImageUrl?: string;
}

export const caseStudiesNavLink: NavLink = {
  label: "Case Studies",
  href: "/case-studies",
  icon: "FileBarChart",
  description: "Anonymous retail scenarios by business type",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "supermarket-grocery-retail",
    title: "Supermarket & Grocery Retail",
    businessType: "Supermarket and grocery retail",
    icon: "ShoppingBasket",
    summary:
      "A grocery retail setup needs fast billing, accurate item movement, expiry awareness and purchasing controls across daily operations.",
    challenge:
      "High item volume, frequent price changes, stock variance and supplier-led replenishment make it difficult to keep billing, inventory and purchasing aligned.",
    solution:
      "RetailPOS connects POS billing, item master, stock movement, purchase orders, supplier records and reporting so the store team and back office work from one operating view.",
    result:
      "Billing, inventory review and replenishment decisions become easier to manage without relying on disconnected spreadsheets or manual stock notes.",
    modules: ["POS Billing", "Inventory", "Purchasing", "Supplier Management", "Reporting"],
    rolloutFocus: ["Barcode-ready billing flow", "Stock visibility by item and store", "Purchase planning and supplier follow-up"],
  },
  {
    slug: "fashion-apparel-store",
    title: "Fashion & Apparel Store",
    businessType: "Fashion and apparel retail",
    icon: "Shirt",
    summary:
      "An apparel store needs size, color and style-level stock control while keeping billing and exchanges simple for the sales team.",
    challenge:
      "Variant-heavy inventory makes it hard to understand what is available, what is moving and which styles need replenishment or transfer.",
    solution:
      "RetailPOS structures items by variant, connects counter billing with inventory movement, and supports customer records for loyalty, exchanges and repeat purchase context.",
    result:
      "Store teams can work with clearer variant availability while owners get better visibility into product movement and customer activity.",
    modules: ["POS Billing", "Variant Inventory", "CRM", "Loyalty", "Analytics"],
    rolloutFocus: ["Size and color item structure", "Exchange-aware counter workflows", "Customer purchase history"],
  },
  {
    slug: "multi-store-retail-chain",
    title: "Multi-Store Retail Chain",
    businessType: "Multi-store retail chain",
    icon: "Network",
    summary:
      "A growing retail chain needs central control without slowing local store billing, stock transfers or daily closing.",
    challenge:
      "Separate store systems make pricing, stock transfers, reporting and user permissions harder to control as the business adds more locations.",
    solution:
      "RetailPOS supports centralized master data, role-based access, store-wise billing, inventory movement, transfer workflows and consolidated reporting.",
    result:
      "Head office gains a clearer operating picture while each store continues to run day-to-day billing and stock tasks in a familiar flow.",
    modules: ["Multi-Store", "Inventory", "Transfers", "User Roles", "Management Reports"],
    rolloutFocus: ["Central item and pricing control", "Store-wise access and activity", "Inter-store stock movement"],
  },
  {
    slug: "pharmacy-healthcare-retail",
    title: "Pharmacy / Healthcare Retail",
    businessType: "Pharmacy and healthcare retail",
    icon: "Pill",
    summary:
      "A pharmacy retail operation needs reliable billing, batch-aware stock control, expiry visibility and controlled purchasing.",
    challenge:
      "Batch, expiry and supplier details can become difficult to manage when counter billing and stock review happen in separate tools.",
    solution:
      "RetailPOS combines billing, batch-aware inventory workflows, supplier purchasing and reporting so operational checks remain visible to the business.",
    result:
      "Stock review, expiry follow-up and purchasing become easier to coordinate while keeping the counter workflow straightforward.",
    modules: ["POS Billing", "Batch Inventory", "Purchasing", "Supplier Management", "Reports"],
    rolloutFocus: ["Batch and expiry visibility", "Supplier-led purchasing", "Controlled stock review"],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
