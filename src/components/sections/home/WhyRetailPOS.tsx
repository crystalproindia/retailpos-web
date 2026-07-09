import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PurchaseWorkflowPanel, ReportsAnalyticsPanel } from "@/components/product-ui/SaasMockups";

const reasons = [
  {
    icon: "MonitorSmartphone",
    title: "Counter-first software",
    text: "The POS is fast, offline-capable and connected to stock, customers and accounts from the first bill.",
  },
  {
    icon: "DatabaseBackup",
    title: "One shared data core",
    text: "Items, customers, inventory movements and ledger entries live once instead of being copied between tools.",
  },
  {
    icon: "Sparkles",
    title: "AI with approval built in",
    text: "Forecasts, reorder suggestions and anomaly alerts support decisions without taking control away from people.",
  },
  {
    icon: "Route",
    title: "Growth without migration",
    text: "A single store can enable more modules, outlets and workflows without moving to a different platform later.",
  },
];

const operatingLayers = [
  "Billing writes stock and revenue immediately",
  "Procurement reads demand and supplier rules",
  "Accounting receives posted entries from operations",
  "Analytics reads the same live business events",
];

export function WhyRetailPOS() {
  return (
    <Section tone="ink" className="py-14 sm:py-16 lg:py-20" aria-labelledby="why-heading">
      <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] lg:items-center">
        <div>
          <SectionHeading
            id="why-heading"
            eyebrow="Why RetailPOS"
            title="A retail platform, not a bundle of retail tools"
            description="RetailPOS is designed like modern SaaS: one operating system for the counter, stockroom, accounts desk and head office, with each module improving the same shared workflow."
            invert
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {reasons.map((reason) => (
              <li key={reason.title} className="rounded-lg border border-white/10 bg-white/5 p-4 transition hover:-translate-y-0.5 hover:bg-white/10">
                <Icon name={reason.icon} className="h-5 w-5 text-accent-400" />
                <h3 className="mt-3 text-sm font-semibold text-white">{reason.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{reason.text}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/products/retail-erp" variant="inverted" className="mt-8">
            Explore the platform
          </ButtonLink>
        </div>
        <div className="min-w-0">
          <div className="space-y-4">
            <ReportsAnalyticsPanel />
            <div className="rounded-lg border border-white/10 bg-white/10 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-200">
                Same event, every module
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {operatingLayers.map((layer) => (
                  <li key={layer} className="flex gap-2 text-sm text-white">
                    <Icon name="PackageCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-500" />
                    <span>{layer}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4">
            <PurchaseWorkflowPanel />
          </div>
        </div>
      </div>
    </Section>
  );
}
