import type { LandingPage } from "@/lib/landing-pages/types";
import { LandingHero } from "./LandingHero";
import { LandingFAQ } from "./LandingFAQ";
import { LandingCTA } from "./LandingCTA";
import { RelatedPages } from "./RelatedPages";
import {
  LandingBenefits,
  LandingFeatureGrid,
  LandingProblemSolution,
  LandingUseCases,
  LandingWorkflow,
} from "./LandingSections";

/** Single shared page shell: sections render only when the page defines them. */
export function LandingPageTemplate({ page }: { page: LandingPage }) {
  return (
    <>
      <LandingHero page={page} />
      {page.problems?.length ? <LandingProblemSolution items={page.problems} name={page.name} /> : null}
      {page.features?.length ? <LandingFeatureGrid items={page.features} name={page.name} /> : null}
      {page.workflow?.length ? <LandingWorkflow items={page.workflow} /> : null}
      {page.benefits?.length ? <LandingBenefits items={page.benefits} /> : null}
      {page.useCases?.length ? <LandingUseCases items={page.useCases} /> : null}
      {page.faqs.length ? <LandingFAQ items={page.faqs} name={page.name} /> : null}
      <RelatedPages page={page} />
      <LandingCTA heading={page.ctaHeading} />
    </>
  );
}
