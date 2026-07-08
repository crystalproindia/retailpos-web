import { Surface } from "./Surface";
import { cn } from "@/lib/utils";

const rows = [
  { item: "Basmati Rice 5kg", anna: 46, rsp: 12, wh: 210, status: "OK" },
  { item: "Sunflower Oil 1L", anna: 8, rsp: 31, wh: 96, status: "Low" },
  { item: "Green Tea 100g", anna: 0, rsp: 14, wh: 40, status: "Out" },
  { item: "Detergent 2kg", anna: 22, rsp: 19, wh: 154, status: "OK" },
];

const statusStyle = {
  OK: "bg-ledger-500/10 text-ledger-600",
  Low: "bg-accent-500/10 text-accent-600",
  Out: "bg-red-50 text-red-600",
} as const;

/** Multi-location inventory view with a transfer suggestion (demonstration data). */
export function InventoryPanel() {
  return (
    <Surface
      title="Inventory · By location"
      status={{ label: "Synced", tone: "ok" }}
      ariaLabel="Illustration of the RetailPOS inventory screen showing stock per store and warehouse with low-stock statuses and a suggested transfer"
    >
      <div className="p-4">
        <div className="overflow-x-auto">
          <div className="min-w-[28rem]">
            <div className="grid grid-cols-[minmax(0,1.6fr),repeat(3,minmax(0,1fr)),auto] gap-2 border-b border-line pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
              <span>Item</span><span className="text-right">Anna Ngr</span><span className="text-right">RS Puram</span><span className="text-right">Warehouse</span><span className="text-right">Status</span>
            </div>
            <ul className="divide-y divide-line/70">
              {rows.map((r) => (
                <li key={r.item} className="grid grid-cols-[minmax(0,1.6fr),repeat(3,minmax(0,1fr)),auto] items-center gap-2 py-2 text-xs">
                  <span className="truncate text-ink">{r.item}</span>
                  <span className="text-right font-mono tabular-nums text-ink-muted">{r.anna}</span>
                  <span className="text-right font-mono tabular-nums text-ink-muted">{r.rsp}</span>
                  <span className="text-right font-mono tabular-nums text-ink-muted">{r.wh}</span>
                  <span className={cn("justify-self-end rounded-full px-2 py-0.5 text-[10px] font-medium", statusStyle[r.status as keyof typeof statusStyle])}>
                    {r.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded border border-dashed border-brand-200 bg-brand-50/50 px-3 py-2">
          <p className="text-[11px] text-brand-700">Suggested transfer: 24 × Green Tea 100g — Warehouse → Anna Nagar</p>
          <span className="rounded bg-brand-600 px-2.5 py-1 text-[10px] font-medium text-white">Create Transfer</span>
        </div>
      </div>
    </Surface>
  );
}
