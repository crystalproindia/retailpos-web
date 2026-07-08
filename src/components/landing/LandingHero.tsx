import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Icon } from "@/components/ui/Icon";
import { primaryCtas } from "@/data/ctas";
import { breadcrumbsFor, familyMeta } from "@/lib/landing-pages/helpers";
import type { LandingPage } from "@/lib/landing-pages/types";
import { heroPanelStats, landingProfileFor } from "@/lib/landing-pages/variants";

/** Landing hero: breadcrumbs (+ BreadcrumbList JSON-LD), single H1, CTAs. */
export function LandingHero({ page }: { page: LandingPage }) {
  const profile = landingProfileFor(page);
  const stats = heroPanelStats(page);

  return (
    <div className="border-b border-line bg-paper">
      <Container className="pb-12 pt-2 sm:pb-16">
        <Breadcrumbs items={breadcrumbsFor(page)} />
        <div className="grid gap-8 lg:grid-cols-[1fr,0.74fr] lg:items-end">
          <div>
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
          </div>
          <aside className="rounded-lg border border-line bg-white p-5 shadow-card">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand-600">
              {profile.heroPanel.eyebrow}
            </p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink">
              {profile.heroPanel.title}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{profile.heroPanel.description}</p>
            <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{stat.label}</dt>
                  <dd className="mt-1 truncate text-sm font-semibold capitalize text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Container>
    </div>
  );
}
