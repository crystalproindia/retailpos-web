import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Numbered because implementation genuinely is a sequence. */
const steps = [
  { title: "Discovery", description: "We map your stores, items, hardware and current tools in a 30-minute call." },
  { title: "Data migration", description: "Items, customers, suppliers and opening stock imported from your existing system or sheets." },
  { title: "Setup & hardware", description: "Taxes, printers, scanners and outlet settings configured; billing tested at your counter." },
  { title: "Team training", description: "Cashiers, storekeepers and managers trained on their own screens, in their own language." },
  { title: "Go live & support", description: "We stay close through your first billing days, then hand over to ongoing support." },
];

export function Implementation() {
  return (
    <Section tone="paper" className="py-14 sm:py-16 lg:py-20" aria-labelledby="implementation-heading">
      <SectionHeading
        id="implementation-heading"
        eyebrow="Implementation"
        title="A go-live plan, not just a login"
        description="Implementation timelines depend on store count, data migration, integrations and deployment requirements — the plan below stays the same at every scale."
      />
      <ol className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-6">
        {/* connecting line */}
        <span
          aria-hidden="true"
          className="absolute left-4 top-3 hidden h-px w-[calc(100%-2rem)] bg-line md:block"
        />
        <span
          aria-hidden="true"
          className="absolute left-[0.8rem] top-4 h-[calc(100%-2rem)] w-px bg-line md:hidden"
        />
        {steps.map((step, i) => (
          <li key={step.title} className="relative pl-10 md:pl-0">
            <span className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 bg-white font-mono text-xs font-medium tabular-nums text-brand-700 md:relative md:mb-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-sm font-semibold text-ink">{step.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.description}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
