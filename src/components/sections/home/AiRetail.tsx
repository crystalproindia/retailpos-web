import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const aiFeatures = [
  { icon: "TrendingUp", title: "Demand forecasting", description: "Item-level forecasts per store, learning from seasonality, festivals and local patterns." },
  { icon: "PackageCheck", title: "Smart reordering", description: "Suggested purchase orders sized by forecast, lead time and supplier minimums." },
  { icon: "Tags", title: "Pricing signals", description: "Flags slow movers for markdown and fast movers priced below potential." },
  { icon: "BellRing", title: "Anomaly alerts", description: "Unusual voids, discounts, shrinkage patterns and cash gaps surfaced daily." },
];

export function AiRetail() {
  return (
    <Section tone="brand" aria-labelledby="ai-heading">
      <SectionHeading
        id="ai-heading"
        eyebrow="AI-powered retail"
        title="An analyst on duty in every store"
        description="RetailPOS AI works inside your daily workflows — not a separate tool. It reads your own sales and stock data and turns it into actions you can approve in one tap."
        invert
        align="center"
      />
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {aiFeatures.map((f) => (
          <li key={f.title} className="rounded-lg border border-white/15 bg-white/5 p-5">
            <Icon name={f.icon} className="h-5 w-5 text-accent-400" />
            <h3 className="mt-3 text-sm font-semibold text-white">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-100">{f.description}</p>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-center">
        <ButtonLink href="/products/ai-retail" variant="inverted">
          Explore AI Retail
        </ButtonLink>
      </div>
    </Section>
  );
}
