import type { Metadata } from "next";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { HubPage } from "@/components/landing/HubPage";
import { solutions } from "@/data/solutions";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/solutions", {
    title: "Retail Solutions — Small Business to Enterprise, Cloud POS to AI",
    description:
      "Solutions matched to your stage and scale: small business, multi-store, enterprise, franchise, omnichannel, cloud POS, automation and AI-powered retail.",
    path: "/solutions",
  });
}

const iconFor = (slug: string) => solutions.find((s) => s.slug === slug)?.icon ?? "CircleDot";

export default function SolutionsIndex() {
  return (
    <HubPage
      family="solutions"
      title="Matched to your stage and scale"
      intro="The same platform, framed for your situation — whether that's a first store, a growing chain, a franchise network or an enterprise integration landscape."
      iconFor={iconFor}
    />
  );
}
