import type { LandingFamily, LandingPage, LandingVariant } from "./types";

export type LandingSectionKey = "problems" | "features" | "workflow" | "benefits" | "useCases";

export interface LandingSectionCopy {
  eyebrow: string;
  title: string;
  description?: string;
}

interface LandingProfile {
  variant: LandingVariant;
  heroPanel: {
    eyebrow: string;
    title: string;
    description: string;
  };
  order: LandingSectionKey[];
  sections: Record<LandingSectionKey, LandingSectionCopy>;
  workflowPresentation: "steps" | "cards";
}

const familyVariant: Record<LandingFamily, LandingVariant> = {
  products: "product",
  modules: "module",
  industries: "industry",
  solutions: "solution",
};

export const landingProfiles: Record<LandingVariant, LandingProfile> = {
  product: {
    variant: "product",
    heroPanel: {
      eyebrow: "Product view",
      title: "Capability your team can adopt without changing systems later",
      description:
        "Each product page explains what the capability does, how it fits the shared platform and which connected pages matter next.",
    },
    order: ["problems", "features", "workflow", "benefits", "useCases"],
    workflowPresentation: "steps",
    sections: {
      problems: { eyebrow: "Problems solved", title: "What this product removes from daily retail" },
      features: { eyebrow: "Capabilities", title: "What the product includes" },
      workflow: { eyebrow: "How it works", title: "The product workflow, end to end" },
      benefits: { eyebrow: "Outcomes", title: "What changes after adoption" },
      useCases: { eyebrow: "In practice", title: "Where the product earns its keep" },
    },
  },
  module: {
    variant: "module",
    heroPanel: {
      eyebrow: "Operational view",
      title: "A module that reads and writes the same retail data core",
      description:
        "Module pages lead with workflow because the value is operational: handoffs, approvals, postings and control.",
    },
    order: ["workflow", "features", "problems", "benefits", "useCases"],
    workflowPresentation: "cards",
    sections: {
      problems: { eyebrow: "Operational gaps", title: "Where this module tightens the process" },
      features: { eyebrow: "Controls", title: "What the module gives your team" },
      workflow: { eyebrow: "Workflow", title: "How work moves through the module" },
      benefits: { eyebrow: "Operating outcomes", title: "What becomes easier to control" },
      useCases: { eyebrow: "Day to day", title: "Common situations this module handles" },
    },
  },
  industry: {
    variant: "industry",
    heroPanel: {
      eyebrow: "Industry view",
      title: "Retail workflows shaped around the way this vertical operates",
      description:
        "Industry pages put context first: the operating problems, counter behaviour, stock rules and practical scenarios that matter in that vertical.",
    },
    order: ["problems", "useCases", "features", "workflow", "benefits"],
    workflowPresentation: "steps",
    sections: {
      problems: { eyebrow: "Industry problems", title: "What breaks in this vertical and how RetailPOS handles it" },
      features: { eyebrow: "Built-in workflows", title: "Capabilities matched to the category" },
      workflow: { eyebrow: "Store workflow", title: "How the day runs in RetailPOS" },
      benefits: { eyebrow: "Business outcomes", title: "What improves for owners and teams" },
      useCases: { eyebrow: "In the store", title: "Where it shows up in real work" },
    },
  },
  solution: {
    variant: "solution",
    heroPanel: {
      eyebrow: "Executive view",
      title: "A rollout lens for business stage, scale and decision-making",
      description:
        "Solution pages frame the same platform around goals: scope, rollout risk, operating control and measurable outcomes.",
    },
    order: ["benefits", "problems", "workflow", "features", "useCases"],
    workflowPresentation: "cards",
    sections: {
      problems: { eyebrow: "Business risks", title: "What this solution brings under control" },
      features: { eyebrow: "Solution components", title: "Capabilities included in the rollout" },
      workflow: { eyebrow: "Rollout path", title: "How the solution takes shape" },
      benefits: { eyebrow: "Executive outcomes", title: "What leadership can expect to improve" },
      useCases: { eyebrow: "Operating model", title: "Where the solution applies" },
    },
  },
};

export function landingProfileFor(page: LandingPage): LandingProfile {
  return landingProfiles[page.variant ?? familyVariant[page.family]];
}

export function heroPanelStats(page: LandingPage): { label: string; value: string }[] {
  return [
    { label: "Page type", value: landingProfileFor(page).variant },
    { label: "Capabilities", value: String(page.features?.length ?? page.benefits?.length ?? 0) },
    { label: "FAQ answers", value: String(page.faqs.length) },
  ];
}
