import type { LandingPage } from "@/lib/landing-pages/types";
import { LandingHero } from "./LandingHero";
import { LandingFamilyStory } from "./LandingFamilyStory";
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
import { landingProfileFor, type LandingSectionKey } from "@/lib/landing-pages/variants";

/** Single shared page shell: sections render only when the page defines them. */
export function LandingPageTemplate({ page }: { page: LandingPage }) {
  const profile = landingProfileFor(page);

  const renderSection = (section: LandingSectionKey) => {
    switch (section) {
      case "problems":
        return page.problems?.length ? (
          <LandingProblemSolution
            key={section}
            items={page.problems}
            name={page.name}
            heading={profile.sections.problems}
          />
        ) : null;
      case "features":
        return page.features?.length ? (
          <LandingFeatureGrid
            key={section}
            items={page.features}
            name={page.name}
            heading={profile.sections.features}
          />
        ) : null;
      case "workflow":
        return page.workflow?.length ? (
          <LandingWorkflow
            key={section}
            items={page.workflow}
            heading={profile.sections.workflow}
            presentation={profile.workflowPresentation}
          />
        ) : null;
      case "benefits":
        return page.benefits?.length ? (
          <LandingBenefits key={section} items={page.benefits} heading={profile.sections.benefits} />
        ) : null;
      case "useCases":
        return page.useCases?.length ? (
          <LandingUseCases key={section} items={page.useCases} heading={profile.sections.useCases} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <LandingHero page={page} />
      <LandingFamilyStory page={page} />
      {profile.order.map(renderSection)}
      {page.faqs.length ? <LandingFAQ items={page.faqs} name={page.name} /> : null}
      <RelatedPages page={page} />
      <LandingCTA heading={page.ctaHeading} />
    </>
  );
}
