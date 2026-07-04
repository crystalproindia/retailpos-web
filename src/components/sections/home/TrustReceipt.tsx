import { outcomeStats } from "@/data/stats";
import { Container } from "@/components/ui/Container";

/**
 * Signature element: outcome metrics printed on a POS receipt tape with
 * perforated edges and tabular mono numerals. Values are placeholders
 * flagged for replacement by the admin panel.
 */
export function TrustReceipt() {
  return (
    <div className="bg-white py-10" style={{ "--tape-bg": "#ffffff" } as React.CSSProperties}>
      <Container>
        <div className="receipt-tape rounded-sm border-x border-line px-4 py-8 shadow-card sm:px-8">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {outcomeStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="order-2 mt-2 block text-xs leading-relaxed text-ink-muted sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="font-mono text-3xl font-medium tabular-nums tracking-tight text-ink sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 border-t border-dashed border-line pt-4 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            ***&nbsp; Illustrative targets — customer-verified figures coming with launch data &nbsp;***
          </p>
        </div>
      </Container>
    </div>
  );
}
