import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { MultiStorePanel } from "@/components/product-ui/MultiStorePanel";

export function EnterpriseScale() {
  return (
    <Section tone="paper" className="py-14 sm:py-16 lg:py-20" aria-labelledby="enterprise-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr,1.3fr] lg:items-center">
        <div>
          <SectionHeading
            id="enterprise-heading"
            eyebrow="Multi-store & enterprise"
            title="From your second store to your two-hundredth"
            description="Head office sets the rules — pricing, item masters, approval limits. Outlets execute. Transfers, replenishment and consolidated reporting run through one system, so the network stays consistent while every counter keeps moving."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/solutions/multi-store-retail" variant="secondary">
              Multi-store solution
            </ButtonLink>
            <ButtonLink href="/solutions/enterprise-retail" variant="ghost">
              Enterprise retail
            </ButtonLink>
          </div>
        </div>
        <MultiStorePanel />
      </div>
    </Section>
  );
}
