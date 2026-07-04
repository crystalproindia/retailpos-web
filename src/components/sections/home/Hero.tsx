import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { primaryCtas } from "@/data/ctas";
import { HeroComposition } from "@/components/product-ui/HeroComposition";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden border-b border-line bg-paper">
      <Container className="grid items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1fr,1.1fr] lg:py-20">
        <div>
          <Badge tone="brand">Retail ERP · POS · AI — one platform</Badge>
          <h1
            id="hero-heading"
            className="mt-5 font-display text-display-lg font-bold text-ink sm:text-display-xl"
          >
            Run your entire retail business from the billing counter up
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            RetailPOS.biz combines fast POS billing with a complete retail ERP — inventory,
            purchasing, CRM, loyalty, accounting and analytics — and adds AI that forecasts
            demand and suggests reorders before you run out.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={primaryCtas.bookDemo.href} size="lg">
              {primaryCtas.bookDemo.label}
            </ButtonLink>
            <ButtonLink href={primaryCtas.requestPricing.href} variant="ghost" size="lg">
              {primaryCtas.requestPricing.label}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-ink-muted">
            Single store to enterprise chain · GST-ready · Works offline
          </p>
        </div>
        <div className="pb-6 sm:pb-8">
          <HeroComposition />
        </div>
      </Container>
    </section>
  );
}
