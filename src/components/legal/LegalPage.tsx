import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { contactConfig } from "@/config/contact";

export interface LegalSection {
  title: string;
  paragraphs: string[];
  items?: string[];
}

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ title, description, path, updated, sections }: LegalPageProps) {
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-12">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: title, path }]} />
          <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
            Legal
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {description}
          </p>
          <p className="mt-5 text-sm text-ink-muted">Last updated: {updated}</p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-lg border border-line bg-paper px-5 py-4 text-sm leading-relaxed text-ink-muted">
            These pages explain how the RetailPOS.biz website handles visitors, enquiries and
            demo requests. Commercial software use is governed by the proposal, order form or
            agreement signed with CrystalPro Technologies.
          </div>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <section key={section.title} aria-labelledby={section.title.toLowerCase().replaceAll(" ", "-")}>
                <h2
                  id={section.title.toLowerCase().replaceAll(" ", "-")}
                  className="font-display text-display-sm font-semibold text-ink"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-ink-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.items?.length ? (
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-relaxed text-ink-muted">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-lg border border-line bg-white p-5 shadow-card">
            <h2 className="font-display text-display-sm font-semibold text-ink">Contact</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              For privacy, terms or cookie questions, email{" "}
              <a href={`mailto:${contactConfig.primaryEmail}`} className="font-medium text-brand-700 underline">
                {contactConfig.primaryEmail}
              </a>
              . Sales enquiries can be sent to{" "}
              <a href={`mailto:${contactConfig.salesEmail}`} className="font-medium text-brand-700 underline">
                {contactConfig.salesEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
