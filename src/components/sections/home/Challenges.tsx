import { ArrowRight, ArrowDown } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

const flows = [
  {
    icon: "PackageX",
    problem: "Stock never matches the system",
    capability: "Live inventory synchronisation",
    outcome: "One stock view across stores",
  },
  {
    icon: "Hourglass",
    problem: "Queues build up at billing",
    capability: "Fast offline-capable POS",
    outcome: "Continuous counter operations",
  },
  {
    icon: "FileSpreadsheet",
    problem: "Accounts live in spreadsheets",
    capability: "Automatic ledger posting",
    outcome: "Connected finance operations",
  },
  {
    icon: "TrendingDown",
    problem: "Ordering is guesswork",
    capability: "AI demand forecasting",
    outcome: "Suggested replenishment",
  },
  {
    icon: "EyeOff",
    problem: "No visibility across outlets",
    capability: "Central network dashboard",
    outcome: "Every store, one screen",
  },
  {
    icon: "UserX",
    problem: "Customers don't come back",
    capability: "Loyalty & WhatsApp follow-ups",
    outcome: "Repeat purchase workflows",
  },
];

export function Challenges() {
  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="challenges-heading">
      <SectionHeading
        id="challenges-heading"
        eyebrow="The problems we remove"
        title="Retail runs on small daily losses. RetailPOS closes them."
        description="Each capability exists because a real retail workflow breaks without it — here is how the problem becomes a working process."
      />
      <ol className="mt-10 grid gap-4 lg:grid-cols-2">
        {flows.map((f) => (
          <li
            key={f.problem}
            className="grid items-center gap-2 rounded-lg border border-line p-4 sm:grid-cols-[1.1fr,auto,1fr,auto,1fr] sm:gap-3"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded bg-paper text-ink-muted">
                <Icon name={f.icon} className="h-4 w-4" />
              </span>
              <p className="text-sm font-semibold text-ink">{f.problem}</p>
            </div>
            <ArrowRight aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-line sm:block" />
            <ArrowDown aria-hidden="true" className="ml-10 h-4 w-4 text-line sm:hidden" />
            <p className="rounded bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">{f.capability}</p>
            <ArrowRight aria-hidden="true" className="hidden h-4 w-4 shrink-0 text-line sm:block" />
            <ArrowDown aria-hidden="true" className="ml-10 h-4 w-4 text-line sm:hidden" />
            <p className="text-sm text-ledger-600">{f.outcome}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
