import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowcaseTabs } from "./ShowcaseTabs";
import { PosBilling } from "@/components/product-ui/PosBilling";
import { ErpDashboard } from "@/components/product-ui/ErpDashboard";
import { InventoryPanel } from "@/components/product-ui/InventoryPanel";
import { AiCommandCenter } from "@/components/product-ui/AiInsight";
import {
  CrmWorkspacePanel,
  FinanceControlPanel,
  MobileAppPanel,
  PurchaseWorkflowPanel,
  ReportsAnalyticsPanel,
  WarehouseFulfillmentPanel,
} from "@/components/product-ui/SaasMockups";

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
              label: "Dashboard",
              summary: "Today's sales, store performance, inventory status, purchase orders and receivables in one view.",
              panel: <ErpDashboard />,
            },
            {
              label: "Inventory",
              summary: "Location-wise stock with statuses and suggested transfers between warehouse and outlets.",
              panel: <InventoryPanel />,
            },
            {
              label: "Purchase",
              summary: "Reorder signals, purchase orders, goods receipt and accounting updates connected in one flow.",
              panel: <PurchaseWorkflowPanel />,
            },
            {
              label: "Warehouse",
              summary: "Receiving, binning, picking and dispatch control for warehouse-to-store movement.",
              panel: <WarehouseFulfillmentPanel />,
            },
            {
              label: "CRM",
              summary: "Customer profiles, loyalty context and segments that follow shoppers across stores.",
              panel: <CrmWorkspacePanel />,
            },
            {
              label: "Reports",
              summary: "Margin, dead stock, store variance and owner questions tied back to real transactions.",
              panel: <ReportsAnalyticsPanel />,
            },
            {
              label: "Finance",
              summary: "Cash close, bank deposits, supplier payments and tax summaries with controlled approvals.",
              panel: <FinanceControlPanel />,
            },
            {
              label: "Mobile App",
              summary: "Store-floor stock checks, bill drafts and manager approvals synced to the same platform.",
              panel: <MobileAppPanel />,
            },
            {
              label: "AI Assistant",
              summary: "A recommendation inbox where every suggestion waits for human approval.",
              panel: <AiCommandCenter />,
            },
          ]}
        />
      </div>
    </Section>
  );
}
