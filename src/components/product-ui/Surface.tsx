import { cn } from "@/lib/utils";

interface SurfaceProps {
  title: string;
  status?: { label: string; tone: "ok" | "info" };
  className?: string;
  children: React.ReactNode;
  ariaLabel: string;
}

/** Window chrome shared by every product-UI composition. */
export function Surface({ title, status, className, children, ariaLabel }: SurfaceProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn("overflow-hidden rounded-lg border border-line bg-white shadow-raised", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line bg-paper px-4 py-2">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
        </div>
        <p className="truncate font-mono text-[10px] uppercase tracking-widest text-ink-muted">{title}</p>
        {status ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium",
              status.tone === "ok" ? "bg-ledger-500/10 text-ledger-600" : "bg-brand-50 text-brand-700",
            )}
          >
            <span className={cn("h-1.5 w-1.5 rounded-full", status.tone === "ok" ? "bg-ledger-500" : "bg-brand-500")} />
            {status.label}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

/** Tiny inline bar chart built from divs — no chart library. */
export function MiniBars({ values, className }: { values: number[]; className?: string }) {
  const max = Math.max(...values);
  return (
    <div aria-hidden="true" className={cn("flex h-12 items-end gap-1", className)}>
      {values.map((v, i) => (
        <span
          key={i}
          className={cn("w-full rounded-t-xs", i === values.length - 1 ? "bg-brand-500" : "bg-brand-200")}
          style={{ height: `${Math.max(12, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}
