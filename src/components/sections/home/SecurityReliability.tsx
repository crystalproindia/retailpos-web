import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const items = [
  { icon: "Lock", title: "Encrypted everywhere", description: "Data encrypted in transit and at rest, with role-based access to every record." },
  { icon: "DatabaseBackup", title: "Automatic backups", description: "Continuous cloud backups with point-in-time recovery for your business data." },
  { icon: "WifiOff", title: "Offline resilience", description: "Counters keep billing through outages and sync safely when back online." },
  { icon: "ScrollText", title: "Audit trails", description: "Every edit, void and discount is logged with user, time and terminal." },
];

export function SecurityReliability() {
  return (
    <Section tone="white" aria-labelledby="security-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="security-heading"
          eyebrow="Security & reliability"
          title="Built to be trusted with the day's takings"
          description="Your sales data is your business. We treat protecting it as a core product feature, not a checkbox."
        />
        <ButtonLink href="/security" variant="ghost" className="shrink-0">
          Read our security overview
        </ButtonLink>
      </div>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.title} className="rounded-lg border border-line p-5">
            <Icon name={item.icon} className="h-5 w-5 text-ledger-600" />
            <h3 className="mt-3 text-sm font-semibold text-ink">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
