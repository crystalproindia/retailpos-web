import { Building2, Warehouse as WarehouseIcon, Store, ArrowRight } from "lucide-react";
import { Surface } from "./Surface";
import { cn } from "@/lib/utils";

const outlets = [
  { name: "Anna Nagar", state: "Open", tone: "ok" },
  { name: "RS Puram", state: "Open", tone: "ok" },
  { name: "Gandhipuram", state: "Open", tone: "ok" },
  { name: "Saravanampatti", state: "Stock count", tone: "info" },
] as const;

/** Head-office network control view (demonstration data). */
export function MultiStorePanel() {
  return (
    <Surface
      title="Network · Head office control"
      status={{ label: "4 outlets · 1 warehouse", tone: "info" }}
      ariaLabel="Illustration of the RetailPOS multi-store control screen showing head office, outlets, warehouse, a stock transfer in transit, price sync and a pending approval"
    >
      <div className="grid gap-3 p-4 sm:grid-cols-[1fr,1.3fr]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded border border-brand-200 bg-brand-50 px-3 py-2">
            <Building2 aria-hidden="true" className="h-4 w-4 text-brand-700" />
            <span className="text-xs font-semibold text-brand-800">Head office</span>
          </div>
          <ul className="space-y-1.5">
            {outlets.map((o) => (
              <li key={o.name} className="flex items-center justify-between rounded border border-line px-3 py-2">
                <span className="flex items-center gap-2 text-xs text-ink">
                  <Store aria-hidden="true" className="h-3.5 w-3.5 text-ink-muted" /> {o.name}
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-[10px] font-medium",
                    o.tone === "ok" ? "text-ledger-600" : "text-brand-600",
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", o.tone === "ok" ? "bg-ledger-500" : "bg-brand-500")} />
                  {o.state}
                </span>
              </li>
            ))}
            <li className="flex items-center justify-between rounded border border-line px-3 py-2">
              <span className="flex items-center gap-2 text-xs text-ink">
                <WarehouseIcon aria-hidden="true" className="h-3.5 w-3.5 text-ink-muted" /> Central warehouse
              </span>
              <span className="text-[10px] font-medium text-ledger-600">Dispatching</span>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="rounded border border-line p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Stock transfer · in transit</p>
            <p className="mt-1.5 flex items-center gap-2 text-xs text-ink">
              Central warehouse <ArrowRight aria-hidden="true" className="h-3 w-3 text-ink-muted" /> Anna Nagar
              <span className="ml-auto font-mono tabular-nums text-ink-muted">38 items</span>
            </p>
          </div>
          <div className="rounded border border-line p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Price sync</p>
            <p className="mt-1.5 text-xs text-ink">
              Festive price list pushed to all outlets
              <span className="ml-2 rounded-full bg-ledger-500/10 px-2 py-0.5 text-[10px] font-medium text-ledger-600">Applied</span>
            </p>
          </div>
          <div className="rounded border border-line p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Approval queue</p>
            <p className="mt-1.5 flex items-center justify-between text-xs text-ink">
              Discount above limit · RS Puram
              <span className="rounded border border-brand-200 px-2 py-0.5 text-[10px] font-medium text-brand-700">Review</span>
            </p>
          </div>
          <div className="rounded border border-line p-3">
            <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">Consolidated report</p>
            <p className="mt-1.5 text-xs text-ink-muted">Network daybook ready · sales, stock value and cash by outlet</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}
