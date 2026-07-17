import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { primaryCtas } from "@/data/ctas";
import { HeroComposition } from "@/components/product-ui/HeroComposition";
import type { CmsHeroContent } from "@/lib/cms-content-editor";

export function Hero({ content }: { content?: CmsHeroContent | null }) {
  return (
    <section aria-labelledby="hero-heading" className="overflow-hidden border-b border-line bg-paper">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr),minmax(0,1.1fr)] lg:py-20">
        <div className="min-w-0">
          <Badge tone="brand">{content?.eyebrow ?? "Retail ERP · POS · AI — one platform"}</Badge>
          <h1
            id="hero-heading"
            className="mt-5 font-display text-display-md font-bold text-ink sm:text-display-lg lg:text-display-xl"
          >
            {content?.title ?? "Run your entire retail business from the billing counter up"}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            {content?.subtitle ??
              "RetailPOS.biz combines fast POS billing with a complete retail ERP — inventory, purchasing, CRM, loyalty, accounting and analytics — and adds AI that forecasts demand and suggests reorders before you run out."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={content?.primaryCta?.href ?? primaryCtas.bookDemo.href} size="lg">
              {content?.primaryCta?.label ?? primaryCtas.bookDemo.label}
            </ButtonLink>
            <ButtonLink href={content?.secondaryCta?.href ?? primaryCtas.requestPricing.href} variant="ghost" size="lg">
              {content?.secondaryCta?.label ?? primaryCtas.requestPricing.label}
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm text-ink-muted">
            Single store to enterprise chain · GST-ready · Works offline
          </p>
        </div>
        <div className="min-w-0 pb-6 sm:pb-8">
          <HeroComposition />
        </div>
      </Container>
    </section>
  );
}
