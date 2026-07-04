import { ScanBarcode, Undo2, UserRound } from "lucide-react";
import { Surface } from "./Surface";

/**
 * POS billing composition (demonstration data): scanning, cart, discount,
 * GST, loyalty, payment methods, shift status and returns entry point.
 */
const items = [
  { name: "Basmati Rice 5kg", qty: 2, rate: "540.00", amount: "1,080.00" },
  { name: "Sunflower Oil 1L", qty: 3, rate: "142.00", amount: "426.00" },
  { name: "Green Tea 100g", qty: 1, rate: "185.00", amount: "185.00" },
  { name: "Detergent 2kg", qty: 1, rate: "310.00", amount: "310.00" },
];

export function PosBilling({ compact = false }: { compact?: boolean }) {
  return (
    <Surface
      title="POS · Counter 01 · Shift A (Priya)"
      status={{ label: "Online", tone: "ok" }}
      ariaLabel="Illustration of the RetailPOS billing screen with scanned items, loyalty customer, GST, discount, payment methods, shift status and a returns option"
    >
      <div className="grid sm:grid-cols-[1.6fr,1fr]">
        <div className="border-b border-line p-4 sm:border-b-0 sm:border-r">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-[11px] text-ink-muted">
              <UserRound aria-hidden="true" className="h-3.5 w-3.5" />
              Loyalty: <span className="font-medium text-ink">Customer #C-1042</span>
              <span className="rounded-full bg-ledger-500/10 px-2 py-0.5 text-[10px] font-medium text-ledger-600">
                320 pts
              </span>
            </p>
            <span className="flex items-center gap-1 text-[10px] text-ink-muted">
              <Undo2 aria-hidden="true" className="h-3 w-3" /> Returns · F4
            </span>
          </div>
          <div className="mb-2 grid grid-cols-[1fr,auto,auto,auto] gap-3 border-b border-line pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
            <span>Item</span>
            <span className="text-right">Qty</span>
            <span className="text-right">Rate</span>
            <span className="text-right">Amount</span>
          </div>
          <ul className="divide-y divide-line/70">
            {items.slice(0, compact ? 3 : 4).map((item) => (
              <li key={item.name} className="grid grid-cols-[1fr,auto,auto,auto] gap-3 py-2 text-xs">
                <span className="truncate text-ink">{item.name}</span>
                <span className="text-right font-mono tabular-nums text-ink-muted">{item.qty}</span>
                <span className="text-right font-mono tabular-nums text-ink-muted">{item.rate}</span>
                <span className="text-right font-mono tabular-nums font-medium text-ink">{item.amount}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-2 rounded border border-dashed border-brand-200 bg-brand-50/50 px-3 py-2">
            <ScanBarcode aria-hidden="true" className="h-4 w-4 text-brand-600" />
            <p className="text-[11px] text-brand-700">Scan barcode or search item…</p>
          </div>
        </div>

        <div className="flex flex-col justify-between p-4">
          <div className="space-y-1.5 text-xs">
            <p className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums">2,001.00</span>
            </p>
            <p className="flex justify-between text-ink-muted">
              <span>GST (5%)</span>
              <span className="font-mono tabular-nums">100.05</span>
            </p>
            <p className="flex justify-between text-ledger-600">
              <span>Loyalty discount</span>
              <span className="font-mono tabular-nums">−50.00</span>
            </p>
            <p className="mt-2 flex justify-between border-t border-line pt-2 text-sm font-semibold text-ink">
              <span>Total</span>
              <span className="font-mono tabular-nums">₹2,051.05</span>
            </p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-1.5 text-center text-[10px] font-medium">
            <span className="rounded bg-paper px-2 py-2 text-ink-soft">Cash</span>
            <span className="rounded bg-paper px-2 py-2 text-ink-soft">Card</span>
            <span className="rounded bg-brand-600 px-2 py-2 text-white">UPI</span>
          </div>
          <span className="mt-3 block rounded bg-accent-500 px-3 py-2.5 text-center text-xs font-semibold text-white">
            Complete Sale · Print Receipt
          </span>
        </div>
      </div>
    </Surface>
  );
}
