import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const channels = [
  { icon: "Store", label: "In-store POS", note: "Bills reserve stock instantly" },
  { icon: "Globe", label: "Webstore", note: "Same catalog, live availability" },
  { icon: "ShoppingBag", label: "Marketplaces", note: "Orders pull from shared stock" },
  { icon: "MessageCircle", label: "WhatsApp orders", note: "Confirmed against real stock" },
  { icon: "Truck", label: "Home delivery", note: "Picked, packed, dispatched" },
];

export function Omnichannel() {
  return (
    <Section tone="white" className="py-14 sm:py-16 lg:py-20" aria-labelledby="omnichannel-heading">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 min-w-0 lg:order-1">
          {/* Hub-and-spoke sync diagram */}
          <div className="rounded-lg border border-line bg-paper p-5">
            <div className="rounded-lg border border-brand-200 bg-brand-800 px-4 py-3 text-center">
              <p className="font-display text-sm font-semibold text-white">Central inventory</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-200">
                One catalog · one stock pool
              </p>
            </div>
            <div aria-hidden="true" className="mx-auto grid w-5/6 grid-cols-5 justify-items-center">
              {channels.map((c) => (
                <span key={c.label} className="h-4 w-px bg-line" />
              ))}
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {channels.map((c, i) => (
                <li
                  key={c.label}
                  className={i === channels.length - 1 ? "sm:col-span-2" : undefined}
                >
                  <div className="flex items-center justify-between gap-2 rounded border border-line bg-white px-3.5 py-2.5">
                    <span className="flex items-center gap-2.5 text-sm font-medium text-ink">
                      <Icon name={c.icon} className="h-4 w-4 text-brand-600" />
                      {c.label}
                    </span>
                    <span className="hidden text-[11px] text-ink-muted sm:block">{c.note}</span>
                    <span className="font-mono text-[10px] tabular-nums text-ledger-600">synced</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-1 min-w-0 lg:order-2">
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
