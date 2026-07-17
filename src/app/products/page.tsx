import type { Metadata } from "next";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { HubPage } from "@/components/landing/HubPage";
import { products } from "@/data/products";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/products", {
    title: "Retail Software Products — POS, ERP, Inventory, CRM & AI",
    description:
      "Explore the RetailPOS.biz product suite: POS billing, retail ERP, inventory, GST billing, accounting, CRM, omnichannel, analytics and AI retail.",
    path: "/products",
  });
}

const iconFor = (slug: string) => products.find((p) => p.slug === slug)?.icon ?? "CircleDot";

export default function ProductsIndex() {
  return (
    <HubPage
      family="products"
      title="One retail platform, nine connected products"
      intro="Every product shares the same items, customers and accounts. Start with the POS, switch on ERP, CRM, analytics and AI as the business grows — no migrations between tools."
      iconFor={iconFor}
    />
  );
}
