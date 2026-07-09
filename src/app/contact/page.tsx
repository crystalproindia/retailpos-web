import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/forms/LeadForm";
import { contactConfig } from "@/config/contact";

export const metadata: Metadata = buildMetadata({
  title: "Contact RetailPOS — Sales, Support & Regional Offices",
  description: "Talk to the RetailPOS team: sales and general enquiries by email, with regional contacts for India, Singapore and Malaysia.",
  path: "/contact",
});

const salesProcess = [
  { icon: "MessageCircle", title: "Route the enquiry", text: "Sales, support or regional office context is separated before the team responds." },
  { icon: "CalendarCheck", title: "Book the right session", text: "New evaluations move toward a demo or pricing conversation with operational context." },
  { icon: "Route", title: "Scope implementation", text: "Store count, modules, data migration, hardware and training expectations are discussed before proposal." },
  { icon: "LifeBuoy", title: "Support responsibly", text: "Existing customers are directed to support channels so commercial enquiries do not slow issue handling." },
];

const expectations = [
  "Tell us your store count and current billing or ERP setup if you can.",
  "Share whether the enquiry is sales, implementation or support related.",
  "Use the regional office list for country context; unverified phone numbers are intentionally not published.",
];

export default function ContactPage() {
  const offices = [...contactConfig.offices].sort((a, b) => a.displayOrder - b.displayOrder);
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          <div className="grid gap-8 lg:grid-cols-[1fr,0.72fr] lg:items-end">
            <div>
              <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                Sales and support
              </p>
              <h1 className="mt-3 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
                Talk to the RetailPOS team
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Whether you&apos;re comparing options, planning a rollout or already a customer — write to us
                or send the form and the right person will reply.
              </p>
            </div>
            <aside className="rounded-lg border border-line bg-white p-5 shadow-card">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
                Best next step
              </p>
              <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
                Include your business context, not just a callback request.
              </p>
              <ul className="mt-4 space-y-2">
                {expectations.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-ink-muted">
                    <Icon name="PackageCheck" className="mt-0.5 h-4 w-4 shrink-0 text-ledger-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16" aria-labelledby="contact-process">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="contact-process"
            eyebrow="What happens next"
            title="A clear path for sales, implementation and support"
            description="The contact experience is intentionally practical: understand the enquiry, route it correctly, then move toward a demo, scope discussion or support response."
          />
        </div>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {salesProcess.map((step, index) => (
            <li key={step.title} className="rounded-lg border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-raised">
              <div className="flex items-center justify-between gap-3">
                <Icon name={step.icon} className="h-5 w-5 text-brand-600" />
                <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="paper" className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr,1.3fr] lg:items-start">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-display-sm font-semibold text-ink">Email us</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <Icon name="Tag" className="h-4 w-4 text-brand-600" />
                  <span className="text-ink-muted">Sales:</span>
                  <a href={`mailto:${contactConfig.salesEmail}`} className="font-medium text-brand-700 hover:underline">
                    {contactConfig.salesEmail}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="LifeBuoy" className="h-4 w-4 text-brand-600" />
                  <span className="text-ink-muted">Support:</span>
                  <a href={`mailto:${contactConfig.supportEmail}`} className="font-medium text-brand-700 hover:underline">
                    {contactConfig.supportEmail}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Icon name="MessageCircle" className="h-4 w-4 text-brand-600" />
                  <span className="text-ink-muted">General:</span>
                  <a href={`mailto:${contactConfig.primaryEmail}`} className="font-medium text-brand-700 hover:underline">
                    {contactConfig.primaryEmail}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-display text-display-sm font-semibold text-ink">Regional offices</h2>
              <ul className="mt-4 space-y-4">
                {offices.map((office) => (
                  <li key={office.country} className="rounded-lg border border-line bg-white p-4">
                    <p className="text-sm font-semibold text-ink">
                      {office.country}
                      {office.isPrimary ? (
                        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-700">
                          Headquarters
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted">{office.city}</p>
                    <p className="mt-2 space-x-4 text-sm">
                      <a href={`mailto:${office.email}`} aria-label={`Email RetailPOS ${office.country} sales`} className="font-medium text-brand-700 hover:underline">
                        {office.email}
                      </a>
                      {office.verified && office.phoneE164 ? (
                        <a href={`tel:${office.phoneE164}`} aria-label={`Call RetailPOS ${office.country} sales`} className="font-medium text-brand-700 hover:underline">
                          {office.phoneDisplay}
                        </a>
                      ) : (
                        <span className="text-ink-muted">Phone line publishing soon</span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-6 shadow-card sm:p-8">
            <h2 className="mb-5 font-display text-display-sm font-semibold text-ink">Send an enquiry</h2>
            <LeadForm />
          </div>
        </div>
      </Section>
    </>
  );
}
