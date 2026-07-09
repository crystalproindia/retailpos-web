import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { AiCommandCenter } from "./AiInsight";
import { ErpDashboard } from "./ErpDashboard";
import { InventoryPanel } from "./InventoryPanel";
import { MultiStorePanel } from "./MultiStorePanel";
import { PosBilling } from "./PosBilling";
import { MiniBars, Surface } from "./Surface";

const ledgerRows = [
  { account: "Counter sales", type: "Revenue", amount: "2,051.05", tone: "ledger" },
  { account: "GST output", type: "Tax", amount: "100.05", tone: "brand" },
  { account: "Inventory value", type: "Stock", amount: "-1,426.00", tone: "accent" },
  { account: "Cash / UPI", type: "Receipt", amount: "2,051.05", tone: "ledger" },
];

const crmSegments = [
  { name: "Recent high-value buyers", count: "142", action: "Offer ready" },
  { name: "Lapsed loyalty members", count: "86", action: "Follow-up" },
  { name: "Birthday month", count: "34", action: "Voucher draft" },
];

const reportRows = [
  { label: "Category margin", value: "Review", pct: 72 },
  { label: "Dead stock", value: "Flagged", pct: 38 },
  { label: "Store variance", value: "Compare", pct: 58 },
];

const channelRows = [
  { channel: "Counter", state: "Live", orders: "142 bills" },
  { channel: "Webstore", state: "Synced", orders: "18 orders" },
  { channel: "Marketplace", state: "Queued", orders: "9 orders" },
  { channel: "WhatsApp", state: "Reserved", orders: "6 carts" },
];

const purchaseSteps = [
  { icon: "TrendingUp", label: "Reorder signal", note: "Minimum level or AI forecast" },
  { icon: "ShoppingCart", label: "Purchase order", note: "Supplier, rates and approvals" },
  { icon: "PackageCheck", label: "Goods receipt", note: "Variance and landed cost" },
  { icon: "Boxes", label: "Inventory", note: "Stock ledger updates" },
  { icon: "Calculator", label: "Accounting", note: "Supplier liability posts" },
];

const warehouseSteps = [
  { icon: "Truck", label: "Receive", note: "PO matched", pct: 84 },
  { icon: "Warehouse", label: "Bin", note: "Aisle assigned", pct: 62 },
  { icon: "PackageCheck", label: "Pick", note: "Wave ready", pct: 76 },
  { icon: "Route", label: "Dispatch", note: "Outlet transfer", pct: 48 },
];

const financeControls = [
  { icon: "CreditCard", label: "Counter cash", value: "Reconciled", tone: "ok" },
  { icon: "Landmark", label: "Bank deposit", value: "Queued", tone: "info" },
  { icon: "ShoppingCart", label: "Supplier payment", value: "Approval", tone: "warn" },
  { icon: "Calculator", label: "GST summary", value: "Draft", tone: "info" },
];

const mobileActions = [
  { icon: "Boxes", label: "Stock check", note: "Scan item or shelf" },
  { icon: "ReceiptText", label: "Bill draft", note: "Hand off to counter" },
  { icon: "ShieldCheck", label: "Manager approval", note: "Discount or return" },
];

export function AccountingLedgerPanel() {
  return (
    <Surface
      title="Accounting · Auto-posted entries"
      status={{ label: "Balanced", tone: "ok" }}
      ariaLabel="Illustration of RetailPOS accounting entries posted from a retail bill"
    >
      <div className="p-4">
        <div className="grid grid-cols-[1fr,auto,auto] gap-3 border-b border-line pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
          <span>Ledger</span>
          <span>Type</span>
          <span className="text-right">Amount</span>
        </div>
        <ul className="divide-y divide-line/70">
          {ledgerRows.map((row) => (
            <li key={row.account} className="grid grid-cols-[minmax(0,1fr),auto,auto] gap-3 py-2 text-xs">
              <span className="truncate text-ink">{row.account}</span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium",
                  row.tone === "ledger" && "bg-ledger-500/10 text-ledger-600",
                  row.tone === "brand" && "bg-brand-50 text-brand-700",
                  row.tone === "accent" && "bg-accent-500/10 text-accent-600",
                )}
              >
                {row.type}
              </span>
              <span className="text-right font-mono tabular-nums text-ink">{row.amount}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded border border-dashed border-line bg-paper px-3 py-2 text-[11px] text-ink-muted">
          Sales, taxes, stock value and receipts stay connected to the same source document.
        </p>
      </div>
    </Surface>
  );
}

export function CrmWorkspacePanel() {
  return (
    <Surface
      title="CRM · Customer workspace"
      status={{ label: "Segments", tone: "info" }}
      ariaLabel="Illustration of RetailPOS CRM showing customer segments and follow-up actions"
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[1fr,1.2fr]">
        <div className="rounded border border-line bg-paper/70 p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Customer profile</p>
          <p className="mt-2 text-sm font-semibold text-ink">Customer #C-1042</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Purchase history, loyalty points and channel preferences follow the customer across stores.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-[10px]">
            <span className="rounded bg-white px-2 py-2 text-ink-soft">320 points</span>
            <span className="rounded bg-white px-2 py-2 text-ink-soft">4 visits</span>
          </div>
        </div>
        <ul className="space-y-2">
          {crmSegments.map((segment) => (
            <li key={segment.name} className="rounded border border-line px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-ink">{segment.name}</p>
                <span className="font-mono text-[10px] tabular-nums text-ink-muted">{segment.count}</span>
              </div>
              <p className="mt-1 text-[11px] text-brand-700">{segment.action}</p>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

export function ReportsAnalyticsPanel() {
  return (
    <Surface
      title="Analytics · Owner questions"
      status={{ label: "Live data", tone: "ok" }}
      ariaLabel="Illustration of RetailPOS analytics showing category margin, dead stock and store variance"
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[1.1fr,1fr]">
        <div className="rounded border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Sales pattern</p>
          <MiniBars values={[48, 62, 54, 72, 68, 84, 91]} className="mt-4" />
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            Trend views stay tied to bills, returns and inventory movements.
          </p>
        </div>
        <ul className="space-y-2">
          {reportRows.map((row) => (
            <li key={row.label} className="rounded border border-line px-3 py-2">
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-ink">{row.label}</span>
                <span className="text-brand-700">{row.value}</span>
              </div>
              <div aria-hidden="true" className="mt-2 h-1.5 rounded-full bg-paper-deep">
                <div className="h-1.5 rounded-full bg-brand-500" style={{ width: `${row.pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

export function ChannelOperationsPanel() {
  return (
    <Surface
      title="Omnichannel · Shared stock"
      status={{ label: "One pool", tone: "info" }}
      ariaLabel="Illustration of RetailPOS omnichannel operations with counter, webstore, marketplace and WhatsApp orders"
    >
      <div className="p-4">
        <div className="rounded border border-brand-200 bg-brand-50 px-4 py-3 text-center">
          <p className="font-display text-sm font-semibold text-brand-800">Central item and stock pool</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-brand-600">
            Every channel reserves from the same availability
          </p>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {channelRows.map((row) => (
            <li key={row.channel} className="rounded border border-line bg-white px-3 py-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-ink">{row.channel}</span>
                <span className="rounded-full bg-ledger-500/10 px-2 py-0.5 text-[10px] font-medium text-ledger-600">
                  {row.state}
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-ink-muted">{row.orders}</p>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

export function PurchaseWorkflowPanel() {
  return (
    <Surface
      title="Procurement · Connected flow"
      status={{ label: "Controlled", tone: "ok" }}
      ariaLabel="Illustration of RetailPOS procurement flow from reorder signal to accounting"
    >
      <ol className="grid gap-2 p-4 sm:grid-cols-5">
        {purchaseSteps.map((step, index) => (
          <li key={step.label} className="rounded border border-line bg-paper/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <Icon name={step.icon} className="h-4 w-4 text-brand-600" />
              <span className="font-mono text-[10px] tabular-nums text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 text-xs font-semibold text-ink">{step.label}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">{step.note}</p>
          </li>
        ))}
      </ol>
    </Surface>
  );
}

export function WarehouseFulfillmentPanel() {
  return (
    <Surface
      title="Warehouse · Fulfillment control"
      status={{ label: "In flow", tone: "ok" }}
      ariaLabel="Illustration of RetailPOS warehouse operations with receiving, binning, picking and dispatch"
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[1fr,1.1fr]">
        <div className="rounded border border-line bg-paper/70 p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Transfer wave</p>
          <p className="mt-2 text-sm font-semibold text-ink">Warehouse to outlet replenishment</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Pick lists, packing status and dispatch notes stay tied to the same item ledger.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
            <span className="rounded bg-white px-2 py-2 text-ink-soft">42 lines</span>
            <span className="rounded bg-white px-2 py-2 text-ink-soft">8 bins</span>
            <span className="rounded bg-white px-2 py-2 text-ink-soft">3 stores</span>
          </div>
        </div>
        <ol className="space-y-2">
          {warehouseSteps.map((step) => (
            <li key={step.label} className="rounded border border-line bg-white px-3 py-2">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <Icon name={step.icon} className="h-4 w-4 text-brand-600" />
                  {step.label}
                </span>
                <span className="font-mono text-[10px] text-ink-muted">{step.note}</span>
              </div>
              <div aria-hidden="true" className="mt-2 h-1.5 rounded-full bg-paper-deep">
                <div className="h-1.5 rounded-full bg-ledger-500" style={{ width: `${step.pct}%` }} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Surface>
  );
}

export function FinanceControlPanel() {
  return (
    <Surface
      title="Finance · Cash and approvals"
      status={{ label: "Controlled", tone: "info" }}
      ariaLabel="Illustration of RetailPOS finance controls showing cash, bank, supplier payment and GST status"
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[1.05fr,0.95fr]">
        <div className="rounded border border-line p-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Daily close</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded bg-brand-50 px-3 py-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-brand-700">Receipts</p>
              <p className="mt-1 font-mono text-sm font-semibold text-brand-800">Matched</p>
            </div>
            <div className="rounded bg-ledger-500/10 px-3 py-3">
              <p className="text-[10px] font-medium uppercase tracking-wider text-ledger-600">Variance</p>
              <p className="mt-1 font-mono text-sm font-semibold text-ledger-600">Review</p>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-muted">
            Cash, bank and supplier movements stay connected to store activity and approval rules.
          </p>
        </div>
        <ul className="space-y-2">
          {financeControls.map((row) => (
            <li key={row.label} className="flex items-center justify-between gap-3 rounded border border-line bg-white px-3 py-2">
              <span className="flex min-w-0 items-center gap-2 text-xs font-semibold text-ink">
                <Icon name={row.icon} className="h-4 w-4 shrink-0 text-brand-600" />
                <span className="truncate">{row.label}</span>
              </span>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                  row.tone === "ok" && "bg-ledger-500/10 text-ledger-600",
                  row.tone === "info" && "bg-brand-50 text-brand-700",
                  row.tone === "warn" && "bg-accent-500/10 text-accent-600",
                )}
              >
                {row.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

export function MobileAppPanel() {
  return (
    <Surface
      title="Mobile App · Floor actions"
      status={{ label: "Synced", tone: "ok" }}
      ariaLabel="Illustration of the RetailPOS mobile app for stock checks, bill drafts and manager approvals"
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[0.8fr,1.2fr] sm:items-center">
        <div className="mx-auto w-full max-w-[13rem] rounded-[1.35rem] border-4 border-ink bg-ink p-2 shadow-card">
          <div className="rounded-[1rem] bg-white p-3">
            <div className="mx-auto h-1 w-10 rounded-full bg-line" />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-brand-600">Store floor</p>
            <p className="mt-1 text-sm font-semibold text-ink">Item #SKU-4821</p>
            <div className="mt-3 rounded bg-paper p-3">
              <p className="text-[10px] text-ink-muted">Available stock</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">18</p>
              <p className="mt-1 text-[10px] text-ledger-600">3 stores with stock</p>
            </div>
            <div className="mt-3 flex h-8 w-full items-center justify-center rounded bg-brand-600 text-xs font-semibold text-white">
              Reserve for bill
            </div>
          </div>
        </div>
        <ul className="space-y-2">
          {mobileActions.map((action) => (
            <li key={action.label} className="rounded border border-line bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <Icon name={action.icon} className="h-4 w-4 text-brand-600" />
                <p className="text-xs font-semibold text-ink">{action.label}</p>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-ink-muted">{action.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Surface>
  );
}

export function ProductWorkspaceMockup({ slug }: { slug: string }) {
  if (slug === "pos-software" || slug === "billing-software") return <PosBilling />;
  if (slug === "inventory-management") return <InventoryPanel />;
  if (slug === "accounting") return <AccountingLedgerPanel />;
  if (slug === "retail-crm") return <CrmWorkspacePanel />;
  if (slug === "omnichannel-retail") return <ChannelOperationsPanel />;
  if (slug === "retail-analytics") return <ReportsAnalyticsPanel />;
  if (slug === "ai-retail") return <AiCommandCenter />;
  return <ErpDashboard />;
}

export function ModuleWorkflowMockup({ slug }: { slug: string }) {
  if (slug === "procurement") return <PurchaseWorkflowPanel />;
  if (slug === "inventory") return <InventoryPanel />;
  if (slug === "warehouse-management") return <WarehouseFulfillmentPanel />;
  if (slug === "finance") return <FinanceControlPanel />;
  if (slug === "accounting") return <AccountingLedgerPanel />;
  if (slug === "crm" || slug === "customer-loyalty") return <CrmWorkspacePanel />;
  if (slug === "sales") return <PosBilling />;
  if (slug === "business-intelligence") return <ReportsAnalyticsPanel />;
  if (slug === "multi-store-management") return <MultiStorePanel />;
  return <ErpDashboard />;
}

export function ExecutiveControlMockup({ slug }: { slug: string }) {
  if (slug === "multi-store-retail" || slug === "franchise-management") return <MultiStorePanel />;
  if (slug === "omnichannel" || slug === "cloud-pos") return <ChannelOperationsPanel />;
  if (slug === "ai-powered-retail" || slug === "retail-automation") return <AiCommandCenter />;
  return <ErpDashboard />;
}
