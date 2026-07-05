import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { LeadForm } from "@/components/forms/LeadForm";
import { contactConfig } from "@/config/contact";

export const metadata: Metadata = buildMetadata({
  title: "Contact RetailPOS — Sales, Support & Regional Offices",
  description: "Talk to the RetailPOS team: sales and general enquiries by email, with regional contacts for India, Singapore and Malaysia.",
  path: "/contact",
});

export default function ContactPage() {
  const offices = [...contactConfig.offices].sort((a, b) => a.displayOrder - b.displayOrder);
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            Talk to the RetailPOS team
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            Whether you&apos;re comparing options, planning a rollout or already a customer — write to us
            or send the form and the right person will reply.
          </p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
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
                  <li key={office.country} className="rounded-lg border border-line bg-paper p-4">
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
          <div className="rounded-lg border border-line bg-paper p-6 sm:p-8">
            <h2 className="mb-5 font-display text-display-sm font-semibold text-ink">Send an enquiry</h2>
            <LeadForm />
          </div>
        </div>
      </Section>
    </>
  );
}
