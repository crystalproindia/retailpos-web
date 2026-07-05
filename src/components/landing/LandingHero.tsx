import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { primaryCtas } from "@/data/ctas";
import { breadcrumbsFor, familyMeta } from "@/lib/landing-pages/helpers";
import type { LandingPage } from "@/lib/landing-pages/types";

/** Landing hero: breadcrumbs (+ BreadcrumbList JSON-LD), single H1, CTAs. */
export function LandingHero({ page }: { page: LandingPage }) {
  return (
    <div className="border-b border-line bg-paper">
      <Container className="pb-12 pt-2 sm:pb-16">
        <Breadcrumbs items={breadcrumbsFor(page)} />
        <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
          {familyMeta[page.family].eyebrow}
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
          {page.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{page.intro}</p>
        {page.heroBullets ? (
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {page.heroBullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-ink-soft">
                <Icon name="PackageCheck" className="h-4 w-4 text-ledger-600" />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={primaryCtas.bookDemo.href} size="lg">
            {primaryCtas.bookDemo.label}
          </ButtonLink>
          <ButtonLink href={primaryCtas.requestPricing.href} variant="ghost" size="lg">
            {primaryCtas.requestPricing.label}
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
