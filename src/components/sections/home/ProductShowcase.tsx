import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowcaseTabs } from "./ShowcaseTabs";
import { PosBilling } from "@/components/product-ui/PosBilling";
import { ErpDashboard } from "@/components/product-ui/ErpDashboard";
import { InventoryPanel } from "@/components/product-ui/InventoryPanel";
import { AiCommandCenter } from "@/components/product-ui/AiInsight";
import { MultiStorePanel } from "@/components/product-ui/MultiStorePanel";

export function ProductShowcase() {
  return (
    <Section tone="paper" className="py-14 sm:py-16 lg:py-20" aria-labelledby="showcase-heading">
      <SectionHeading
        id="showcase-heading"
        eyebrow="Inside the product"
        title="Software your team learns in a morning"
        description="Screens are organised the way store work actually happens: bill, receive, count, order, close. Illustrative interfaces shown — a live demo with your data is a click away."
        align="center"
      />
      <div className="mt-10">
        <ShowcaseTabs
          tabs={[
            {
              label: "POS Billing",
              summary: "Barcode-first billing with loyalty, GST, discounts, payments and offline continuity.",
              panel: <PosBilling />,
            },
            {
              label: "ERP Dashboard",
              summary: "Today's sales, store performance, inventory status, purchase orders and receivables in one view.",
              panel: <ErpDashboard />,
            },
            {
              label: "Inventory",
              summary: "Location-wise stock with statuses and suggested transfers between warehouse and outlets.",
              panel: <InventoryPanel />,
            },
            {
              label: "AI Insights",
              summary: "A recommendation inbox — every suggestion waits for your approval.",
              panel: <AiCommandCenter />,
            },
            {
              label: "Multi-Store",
              summary: "Head-office control: transfers, price sync, approvals and consolidated reporting.",
              panel: <MultiStorePanel />,
            },
          ]}
        />
      </div>
    </Section>
  );
}
