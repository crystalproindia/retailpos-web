import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { AiCommandCenter } from "@/components/product-ui/AiInsight";

const principles = [
  { title: "Reads your own data", text: "Forecasts and signals come from your sales, stock and store patterns — not generic benchmarks." },
  { title: "Works inside daily workflows", text: "Recommendations appear where the work happens: purchasing, pricing, stock and audit screens." },
  { title: "You stay in control", text: "Every suggestion requires human approval. RetailPOS AI never orders, reprices or posts on its own." },
];

export function AiRetail() {
  return (
    <Section tone="brand" className="py-14 sm:py-16 lg:py-20" aria-labelledby="ai-heading">
      <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-center">
        <div>
          <SectionHeading
            id="ai-heading"
            eyebrow="AI-powered retail"
            title="An analyst on duty in every store"
            description="RetailPOS AI turns your data into a daily recommendation inbox — forecasts, reorders, pricing signals and anomaly alerts, each one waiting for your approval."
            invert
          />
          <ul className="mt-8 space-y-4">
            {principles.map((p) => (
              <li key={p.title} className="border-l-2 border-accent-400 pl-4">
                <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-100">{p.text}</p>
              </li>
            ))}
          </ul>
          <ButtonLink href="/products/ai-retail" variant="inverted" className="mt-8">
            Explore AI Retail
          </ButtonLink>
        </div>
        <div>
          <AiCommandCenter />
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-brand-200">
            Product demonstration data
          </p>
        </div>
      </div>
    </Section>
  );
}
