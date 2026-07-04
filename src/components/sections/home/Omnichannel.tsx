import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const channels = [
  { icon: "Store", label: "In-store POS" },
  { icon: "Globe", label: "Webstore" },
  { icon: "ShoppingBag", label: "Marketplaces" },
  { icon: "MessageCircle", label: "WhatsApp orders" },
  { icon: "Truck", label: "Home delivery" },
];

export function Omnichannel() {
  return (
    <Section tone="white" aria-labelledby="omnichannel-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="rounded-lg border border-line bg-paper p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-muted">One stock pool</p>
            <ul className="mt-4 space-y-2.5">
              {channels.map((c) => (
                <li key={c.label} className="flex items-center justify-between rounded border border-line bg-white px-4 py-3">
                  <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                    <Icon name={c.icon} className="h-4 w-4 text-brand-600" />
                    {c.label}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-ledger-600">synced</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            id="omnichannel-heading"
            eyebrow="Omnichannel"
            title="Sell everywhere. Count stock once."
            description="A single catalog and stock pool serves your counters, webstore and marketplaces. Orders from any channel reserve stock instantly, so you never sell what you don't have."
          />
          <ButtonLink href="/products/omnichannel-retail" variant="secondary" className="mt-8">
            Explore omnichannel retail
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
