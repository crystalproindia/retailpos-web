import { Sparkles, TrendingUp, PackageCheck, BellRing, Tags, Network } from "lucide-react";
import { Surface } from "./Surface";
import { cn } from "@/lib/utils";

/** Compact AI insight card used as the hero overlay layer. */
export function AiInsightCard({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustration of a RetailPOS AI insight: demand spike detected, 12 items likely to stock out, with a Review Recommendation action"
      className={cn("rounded-lg border border-brand-200 bg-white p-4 shadow-raised", className)}
    >
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-brand-600">
        <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> RetailPOS AI
      </p>
      <p className="mt-2 text-sm font-semibold text-ink">Demand spike detected</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
        12 items likely to stock out within 6 days. Suggested purchase order drafted for review.
      </p>
      <span className="mt-3 inline-block rounded bg-brand-600 px-3 py-1.5 text-xs font-medium text-white">
        Review Recommendation
      </span>
    </div>
  );
}

const insights = [
  {
    icon: TrendingUp,
    kind: "Demand forecasting",
    message: "Demand for Beverages is expected to rise across 3 stores this week.",
    action: "View Forecast",
    tone: "brand",
  },
  {
    icon: PackageCheck,
    kind: "Reorder recommendation",
    message: "12 items may reach minimum stock levels within 6 days.",
    action: "Review Suggested Purchase Order",
    tone: "ledger",
  },
  {
    icon: BellRing,
    kind: "Anomaly detection",
    message: "Unusual discount activity detected at Store 04 during evening shift.",
    action: "Review Activity",
    tone: "accent",
  },
  {
    icon: Tags,
    kind: "Pricing signal",
    message: "8 slow-moving items identified in Home Care.",
    action: "Review Markdown Suggestions",
    tone: "brand",
  },
  {
    icon: Network,
    kind: "Multi-store insight",
    message: "Anna Nagar Store inventory turnover is below network average.",
    action: "Compare Stores",
    tone: "ledger",
  },
] as const;

const toneStyles = {
  brand: "bg-brand-50 text-brand-700",
  ledger: "bg-ledger-500/10 text-ledger-600",
  accent: "bg-accent-500/10 text-accent-600",
} as const;

/**
 * AI Command Center — recommendation inbox. Every insight ends in a
 * human-approval action; nothing is executed autonomously.
 * Demonstration data, labelled in the surrounding section.
 */
export function AiCommandCenter() {
  return (
    <Surface
      title="AI Command Center · All stores"
      status={{ label: "5 recommendations", tone: "info" }}
      ariaLabel="Illustration of the RetailPOS AI Command Center listing demand forecasts, reorder recommendations, anomaly alerts, pricing signals and multi-store insights, each with a review action"
    >
      <ul className="divide-y divide-line">
        {insights.map((item) => (
          <li key={item.kind} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
            <span className={cn("inline-flex h-8 w-8 shrink-0 items-center justify-center rounded", toneStyles[item.tone])}>
              <item.icon aria-hidden="true" className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{item.kind}</p>
              <p className="mt-0.5 text-sm text-ink">{item.message}</p>
            </div>
            <span className="shrink-0 rounded border border-brand-200 px-3 py-1.5 text-xs font-medium text-brand-700">
              {item.action}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-line bg-paper px-4 py-2 text-[10px] text-ink-muted">
        Recommendations always require human approval before any order, price or stock change is made.
      </p>
    </Surface>
  );
}
