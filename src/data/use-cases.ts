/**
 * Operational use cases — replaces illustrative testimonials. These
 * describe product workflows, not customers, and are labelled as such.
 */
export interface UseCase {
  icon: string;
  segment: string;
  challenge: string;
  workflow: string[];
}

export const useCases: UseCase[] = [
  {
    icon: "ShoppingBasket",
    segment: "Multi-store grocery chain",
    challenge: "Keep stock, pricing and purchasing consistent across outlets.",
    workflow: [
      "Central item master",
      "Outlet-wise inventory",
      "Stock transfers",
      "Purchase planning",
      "Consolidated reporting",
    ],
  },
  {
    icon: "Shirt",
    segment: "Fashion retailer",
    challenge: "Manage size, colour, season, discounts and outlet-level stock.",
    workflow: [
      "Size-colour variant inventory",
      "Season & markdown workflows",
      "Customer profiles & loyalty",
      "Multi-store stock visibility",
    ],
  },
  {
    icon: "Smartphone",
    segment: "Electronics retailer",
    challenge: "Track serial numbers, warranties, service history and high-value inventory.",
    workflow: [
      "Serial / IMEI tracking",
      "Warranty records",
      "Purchase history per unit",
      "Outlet-level controls",
    ],
  },
];
