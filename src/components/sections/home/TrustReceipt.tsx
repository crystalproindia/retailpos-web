import { coverageFacts } from "@/data/stats";
import { Container } from "@/components/ui/Container";

/**
 * Signature receipt-tape element, now printing operational coverage —
 * verified product capabilities only. The earlier illustrative statistics
 * were removed and intentionally not replaced with invented numbers.
 */
export function TrustReceipt() {
  return (
    <div className="bg-white py-10" style={{ "--tape-bg": "#ffffff" } as React.CSSProperties}>
      <Container>
        <div className="receipt-tape rounded-sm border-x border-line px-4 py-7 shadow-card sm:px-8">
          <p className="text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            *** Operational coverage ***
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {coverageFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <dt className="font-mono text-sm font-medium uppercase tracking-tight text-ink sm:text-base">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-xs text-ink-muted sm:text-sm">{fact.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-7 border-t border-dashed border-line pt-3 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
            *** One platform · every capability above included ***
          </p>
        </div>
      </Container>
    </div>
  );
}
