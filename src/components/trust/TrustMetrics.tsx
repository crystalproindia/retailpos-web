import { trustMetrics, type TrustMetric } from "@/data/trust";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";

interface TrustMetricsProps {
  metrics?: TrustMetric[];
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "white" | "paper";
  compact?: boolean;
  className?: string;
}

export function TrustMetrics({
  metrics = trustMetrics,
  eyebrow = "Proven delivery",
  title = "Trust signals for serious retail operations",
  description = "RetailPOS.biz is backed by long-running software delivery experience, real business implementations and support for daily operating work.",
  tone = "white",
  compact = false,
  className,
}: TrustMetricsProps) {
  return (
    <Section
      tone={tone}
      aria-labelledby="trust-metrics-heading"
      className={cn("border-b border-line/70", compact ? "py-8 sm:py-10" : "py-10 sm:py-12", className)}
    >
      <div className="grid gap-7 lg:grid-cols-[0.78fr,1.22fr] lg:items-center">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">{eyebrow}</p>
          <h2 id="trust-metrics-heading" className="mt-3 max-w-xl font-display text-display-sm font-semibold text-ink">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">{description}</p>
        </div>
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={`${metric.value}-${metric.label}`}
              className="group rounded-lg border border-line bg-white p-4 shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-raised motion-reduce:transition-none"
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{metric.label}</dt>
              <dd className="mt-2 font-display text-display-md font-bold text-ink">{metric.value}</dd>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{metric.detail}</p>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
