import { Store } from "lucide-react";
import { PosBilling } from "./PosBilling";
import { ErpDashboard } from "./ErpDashboard";
import { AiInsightCard } from "./AiInsight";

/**
 * Layered hero composition: ERP dashboard (back), POS billing (front),
 * AI insight card (overlay), multi-store status chip. Pure CSS layering,
 * subtle depth, no animation beyond what the page already uses.
 */
export function HeroComposition() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-xl lg:max-w-none">
      {/* Secondary layer: ERP dashboard */}
      <div className="hidden min-w-0 sm:block sm:pl-14 lg:pl-20" aria-hidden={false}>
        <ErpDashboard compact />
      </div>

      {/* Primary layer: POS billing */}
      <div className="min-w-0 sm:-mt-16 sm:max-w-[86%] lg:-mt-20">
        <PosBilling compact />
      </div>

      {/* Tertiary layer: AI insight */}
      <AiInsightCard className="mt-3 sm:absolute sm:-right-2 sm:top-1/2 sm:mt-0 sm:w-60 lg:-right-4" />

      {/* Small layer: multi-store indicator */}
      <div className="mt-3 flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 shadow-card sm:absolute sm:-bottom-4 sm:left-4 sm:mt-0">
        <Store aria-hidden="true" className="h-3.5 w-3.5 text-brand-600" />
        <span className="text-[11px] font-medium text-ink">4 stores</span>
        <span className="flex items-center gap-1" aria-label="3 stores online, 1 store counting stock">
          <span className="h-1.5 w-1.5 rounded-full bg-ledger-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-ledger-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-ledger-500" />
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
        </span>
        <span className="text-[10px] text-ink-muted">all synced</span>
      </div>
    </div>
  );
}
