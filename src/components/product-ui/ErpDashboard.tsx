import { Surface, MiniBars } from "./Surface";

const kpis = [
  { label: "Today's sales", value: "₹4,82,310", sub: "142 bills" },
  { label: "Inventory status", value: "18 low", sub: "3 stockouts" },
  { label: "Purchase orders", value: "6 open", sub: "2 arriving" },
  { label: "Receivables", value: "₹1,26,400", sub: "9 parties" },
];

const stores = [
  { name: "Anna Nagar", value: "₹1,64,020", pct: 92 },
  { name: "RS Puram", value: "₹1,38,660", pct: 78 },
  { name: "Gandhipuram", value: "₹1,05,480", pct: 60 },
  { name: "Saravanampatti", value: "₹74,150", pct: 42 },
];

/** ERP business-overview dashboard (demonstration data). */
export function ErpDashboard({ compact = false }: { compact?: boolean }) {
  return (
    <Surface
      title="Business overview · All stores"
      status={{ label: "Live", tone: "ok" }}
      ariaLabel="Illustration of the RetailPOS ERP dashboard showing today's sales, store performance, inventory status, purchase orders and receivables"
    >
      <div className="p-4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded border border-line bg-paper/60 px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">{k.label}</p>
              <p className="mt-1 font-mono text-sm font-medium tabular-nums text-ink">{k.value}</p>
              <p className="text-[10px] text-ink-muted">{k.sub}</p>
            </div>
          ))}
        </div>
        {!compact ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr,1fr]">
            <div className="rounded border border-line p-3">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">Sales · last 7 days</p>
              <MiniBars values={[52, 61, 48, 70, 66, 84, 91]} className="mt-2" />
            </div>
            <div className="rounded border border-line p-3">
              <p className="text-[10px] uppercase tracking-wider text-ink-muted">Store performance</p>
              <ul className="mt-2 space-y-1.5">
                {stores.map((s) => (
                  <li key={s.name} className="text-[11px]">
                    <div className="flex justify-between text-ink">
                      <span>{s.name}</span>
                      <span className="font-mono tabular-nums text-ink-muted">{s.value}</span>
                    </div>
                    <div aria-hidden="true" className="mt-0.5 h-1 rounded-full bg-paper-deep">
                      <div className="h-1 rounded-full bg-brand-500" style={{ width: `${s.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </Surface>
  );
}
