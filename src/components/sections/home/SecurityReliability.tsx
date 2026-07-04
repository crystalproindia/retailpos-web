import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Claims audit: wording describes the product's security architecture
 * without asserting unverified standards, certifications, backup
 * frequencies or uptime guarantees.
 */
const pillars = [
  { icon: "Lock", title: "Access control", description: "Role-based permissions decide who can bill, discount, edit stock or view reports." },
  { icon: "ScrollText", title: "Audit logs", description: "Edits, voids, discounts and price changes are recorded with user, time and terminal." },
  { icon: "DatabaseBackup", title: "Backup strategy", description: "Business data is backed up as part of the platform's cloud data-protection architecture." },
  { icon: "WifiOff", title: "Offline continuity", description: "Counters keep billing through connectivity drops and sync safely when back online." },
  { icon: "ShieldCheck", title: "Data protection", description: "Your business data belongs to you, with export access and account-level isolation." },
];

export function SecurityReliability() {
  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="security-heading">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          id="security-heading"
          eyebrow="Security & reliability"
          title="Built to be trusted with the day's takings"
          description="Your sales data is your business. Protecting it is part of the product's architecture, not an afterthought."
        />
        <ButtonLink href="/security" variant="ghost" className="shrink-0">
          Read our security overview
        </ButtonLink>
      </div>
      <div className="mt-10 overflow-hidden rounded-lg border border-line">
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-5 lg:divide-y-0">
          {pillars.map((p) => (
            <li key={p.title} className="p-5">
              <Icon name={p.icon} className="h-5 w-5 text-ledger-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
