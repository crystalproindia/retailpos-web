import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { getFamilyPages } from "@/lib/landing-pages/registry";
import { familyMeta, pagePath } from "@/lib/landing-pages/helpers";
import type { LandingFamily } from "@/lib/landing-pages/types";
import { LandingCTA } from "./LandingCTA";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";

interface DeferredItem {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

interface HubPageProps {
  family: LandingFamily;
  title: string;
  intro: string;
  /** Real suite items whose detailed pages ship in a later phase. */
  deferred?: DeferredItem[];
  deferredNote?: string;
  iconFor: (slug: string) => string;
}

/** Hub/index page: meaningful descriptions + crawlable links to every child page. */
export function HubPage({ family, title, intro, deferred, deferredNote, iconFor }: HubPageProps) {
  const fam = familyMeta[family];
  const pages = getFamilyPages(family);
  return (
    <>
      <div className="border-b border-line bg-paper">
        <Container className="pb-10 pt-2 sm:pb-14">
          <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: fam.label, path: fam.href }]} />
          <h1 className="mt-4 max-w-3xl font-display text-display-md font-bold text-ink sm:text-display-lg">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>
        </Container>
      </div>
      <Section tone="white" className="py-12 sm:py-16">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((p) => (
            <li key={p.slug}>
              <Link
                href={pagePath(p)}
                className="group flex h-full flex-col rounded-lg border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-raised"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-brand-50 text-brand-600">
                  <Icon name={iconFor(p.slug)} className="h-4 w-4" />
                </span>
                <span className="mt-3 font-display text-base font-semibold text-ink group-hover:text-brand-700">
                  {p.name}
                </span>
                <span className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">{p.metaDescription}</span>
                <span className="mt-3 text-sm font-medium text-brand-600 group-hover:underline">Learn more</span>
              </Link>
            </li>
          ))}
        </ul>
        {deferred?.length ? (
          <div className="mt-10 rounded-lg border border-dashed border-line bg-paper p-6">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-ink-muted">
              Also part of the suite
            </p>
            {deferredNote ? <p className="mt-2 max-w-2xl text-sm text-ink-muted">{deferredNote}</p> : null}
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {deferred.map((d) => (
                <li key={d.slug} id={d.slug} className="flex gap-3 scroll-mt-28">
                  <Icon name={d.icon} className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <div>
                    <span className="text-sm font-semibold text-ink">{d.name}</span>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-muted">{d.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>
      <CmsSeoEnhancements path={fam.href} />
      <LandingCTA />
    </>
  );
}
