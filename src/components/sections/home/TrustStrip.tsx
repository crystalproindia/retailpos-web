import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { company } from "@/data/company";

const indicators = [
  { icon: "ReceiptText", label: "GST-ready billing" },
  { icon: "WifiOff", label: "Offline-capable POS" },
  { icon: "Network", label: "Multi-store & franchise" },
  { icon: "Braces", label: "Open REST API" },
  { icon: "ShieldCheck", label: "Role-based access & audit logs" },
];

/** Product trust indicators: verifiable capability facts, no invented numbers. */
export function TrustStrip() {
  return (
    <div className="border-b border-line bg-white">
      <Container className="flex flex-col items-center gap-4 py-6 lg:flex-row lg:justify-between">
        <p className="text-sm text-ink-muted">
          Built by <span className="font-medium text-ink">{company.parent}</span>, delivering
          software solutions since {company.foundedYear}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {indicators.map((i) => (
            <li key={i.label} className="flex items-center gap-2 text-sm text-ink-soft">
              <Icon name={i.icon} className="h-4 w-4 text-ledger-600" />
              {i.label}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
