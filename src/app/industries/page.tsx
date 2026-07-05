import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { HubPage } from "@/components/landing/HubPage";
import { industries } from "@/data/industries";

export const metadata: Metadata = buildMetadata({
  title: "Retail Industries — Supermarket, Fashion, Pharmacy, Electronics & More",
  description: "Industry-specific retail software: supermarkets, grocery, fashion, footwear, electronics, pharmacy, restaurants and jewellery — with vertical workflows built in.",
  path: "/industries",
});

const iconFor = (slug: string) => industries.find((i) => i.slug === slug)?.icon ?? "CircleDot";
const deferred = industries
  .filter((i) => ["furniture", "beauty-cosmetics", "sports-fitness", "wholesale-distribution", "franchise-retail"].includes(i.slug))
  .map((i) => ({ slug: i.slug, name: i.name, description: i.description, icon: i.icon }));

export default function IndustriesIndex() {
  return (
    <HubPage
      family="industries"
      title="Your vertical's workflows are already built in"
      intro="Batch and expiry for pharmacy, size-colour matrix for fashion, IMEI for electronics, karat billing for jewellery — industry behaviour is a default in RetailPOS, not an add-on."
      deferred={deferred}
      deferredNote="RetailPOS serves these verticals today; their detailed pages are being published next. Ask about your industry in a demo."
      iconFor={iconFor}
    />
  );
}
