import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Numbered because implementation genuinely is a sequence. */
const steps = [
  { title: "Discovery call", description: "We map your stores, items, hardware and current tools in a 30-minute call." },
  { title: "Data migration", description: "Items, customers, suppliers and opening stock imported from your existing system or sheets." },
  { title: "Setup & hardware", description: "Taxes, printers, scanners and outlet settings configured; billing tested at your counter." },
  { title: "Team training", description: "Cashiers, storekeepers and managers trained on their own screens, in their own language." },
  { title: "Go live & support", description: "We stay close through your first billing days, then hand over to ongoing support." },
];

export function Implementation() {
  return (
    <Section tone="paper" aria-labelledby="implementation-heading">
      <SectionHeading
        id="implementation-heading"
        eyebrow="Implementation"
        title="A go-live plan, not just a login"
        description="Single stores typically go live in about a day. Chains follow a phased rollout, one outlet cluster at a time."
      />
      <ol className="mt-12 grid gap-8 md:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <span className="font-mono text-sm font-medium tabular-nums text-brand-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-2 h-px w-full bg-line" aria-hidden="true" />
            <h3 className="mt-3 text-sm font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
