import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const capabilities = [
  { icon: "Network", title: "Central control", description: "Set prices, offers and item masters once; push to every outlet instantly." },
  { icon: "ArrowLeftRight", title: "Stock transfers", description: "Request, approve and track inter-store and warehouse transfers with in-transit visibility." },
  { icon: "ShieldCheck", title: "Roles & approvals", description: "Outlet-level permissions, discount limits and approval workflows with full audit trails." },
  { icon: "GitBranch", title: "Franchise ready", description: "Franchisee billing, royalty computation and replenishment for brand networks." },
];

export function EnterpriseScale() {
  return (
    <Section tone="paper" aria-labelledby="enterprise-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            id="enterprise-heading"
            eyebrow="Multi-store & enterprise"
            title="From your second store to your two-hundredth"
            description="Multi-store retail fails on inconsistency. RetailPOS keeps pricing, stock policy and reporting identical across the network while each outlet keeps moving."
          />
          <div className="mt-8 flex gap-3">
            <ButtonLink href="/solutions/multi-store-retail" variant="secondary">
              Multi-store solution
            </ButtonLink>
            <ButtonLink href="/solutions/enterprise-retail" variant="ghost">
              Enterprise retail
            </ButtonLink>
          </div>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((c) => (
            <li key={c.title} className="rounded-lg border border-line bg-white p-5 shadow-card">
              <Icon name={c.icon} className="h-5 w-5 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink">{c.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
