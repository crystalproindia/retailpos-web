import { Section } from "@/components/ui/Section";
import { LeadForm } from "@/components/forms/LeadForm";

export function FinalCta() {
  return (
    <Section tone="white" id="book-demo" aria-labelledby="cta-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr,1.3fr] lg:items-start">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
            Get started
          </p>
          <h2 id="cta-heading" className="mt-3 font-display text-display-md font-semibold text-ink sm:text-display-lg">
            See RetailPOS running on your own products
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
            Book a free 30-minute demo. We&apos;ll load a sample of your items, walk through your
            daily workflows and answer pricing questions on the spot — no obligation.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-ink-soft">
            <li>· Live walkthrough with a retail consultant</li>
            <li>· Your industry&apos;s workflows, not a generic tour</li>
            <li>· Clear pricing for your store count before you leave</li>
          </ul>
        </div>
        <div className="rounded-lg border border-line bg-paper p-6 sm:p-8">
          <LeadForm
            source="landing_page"
            submitLabel="Book a Free Demo"
            successMessage="Our retail consultants will review your enquiry and follow up with the right next step."
          />
        </div>
      </div>
    </Section>
  );
}
