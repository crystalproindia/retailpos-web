import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { HubPage } from "@/components/landing/HubPage";
import { erpModules } from "@/data/modules";

export const metadata: Metadata = buildMetadata({
  title: "ERP Modules — Procurement, Inventory, Sales, Finance & More",
  description: "Twelve retail ERP modules on one data core: procurement, inventory, sales, finance, accounting, CRM, loyalty, warehouse, multi-store, franchise, HR and BI.",
  path: "/modules",
});

const iconFor = (slug: string) => erpModules.find((m) => m.slug === slug)?.icon ?? "CircleDot";
const deferred = erpModules
  .filter((m) => ["multi-store-management", "franchise-management", "hr-payroll", "business-intelligence"].includes(m.slug))
  .map((m) => ({ slug: m.slug, name: m.name, description: m.description, icon: m.icon }));

export default function ModulesIndex() {
  return (
    <HubPage
      family="modules"
      title="Twelve modules. One source of truth."
      intro="Every module reads and writes the same items, parties, stock and ledgers, so procurement, sales, warehouse and finance always agree. Enable modules as your operation needs them."
      deferred={deferred}
      deferredNote="These modules are part of the RetailPOS suite today; their detailed pages are being published next. Ask about them in a demo."
      iconFor={iconFor}
    />
  );
}
