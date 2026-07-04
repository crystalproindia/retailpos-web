import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

const challenges = [
  {
    icon: "PackageX",
    problem: "Stock never matches the system",
    fix: "Live, location-wise inventory updated by every bill, GRN and transfer.",
  },
  {
    icon: "Hourglass",
    problem: "Queues build up at billing",
    fix: "Barcode-first POS tuned for 3-second item billing, even offline.",
  },
  {
    icon: "FileSpreadsheet",
    problem: "Accounts live in spreadsheets",
    fix: "Every sale and purchase posts to ledgers automatically, GST-ready.",
  },
  {
    icon: "EyeOff",
    problem: "No visibility across outlets",
    fix: "One dashboard for sales, stock and cash across every store.",
  },
  {
    icon: "UserX",
    problem: "Customers don't come back",
    fix: "Loyalty points, offers and WhatsApp follow-ups built into billing.",
  },
  {
    icon: "TrendingDown",
    problem: "Ordering is guesswork",
    fix: "AI demand forecasts and reorder suggestions per item, per store.",
  },
];

export function Challenges() {
  return (
    <Section tone="white" aria-labelledby="challenges-heading">
      <SectionHeading
        id="challenges-heading"
        eyebrow="The problems we remove"
        title="Retail runs on small daily losses. RetailPOS closes them."
        description="Each capability below exists because a real retail workflow breaks without it."
      />
      <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((c) => (
          <li key={c.problem} className="flex gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded bg-paper text-brand-600">
              <Icon name={c.icon} className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">{c.problem}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.fix}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
