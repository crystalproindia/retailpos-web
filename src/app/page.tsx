import type { Metadata } from "next";
import { buildMetadataWithCms } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { CmsContentSections } from "@/components/cms/CmsContentSections";
import { CmsSeoEnhancements } from "@/components/seo/CmsSeoEnhancements";
import { softwareApplicationJsonLd } from "@/lib/seo/jsonld";
import { getCmsContentPageForRoute } from "@/lib/cms-content-loader";
import {
  cmsContentSections,
  cmsFaqItems,
  cmsHeroContent,
  cmsSectionsExcept,
  firstCmsSection,
} from "@/lib/cms-content-editor";
import { Hero } from "@/components/sections/home/Hero";
import { TrustMetrics } from "@/components/trust/TrustMetrics";
import { ClientLogoWall } from "@/components/trust/ClientLogoWall";
import { TrustStrip } from "@/components/sections/home/TrustStrip";
import { TrustReceipt } from "@/components/sections/home/TrustReceipt";
import { Challenges } from "@/components/sections/home/Challenges";
import { WhyRetailPOS } from "@/components/sections/home/WhyRetailPOS";
import { PlatformOverview } from "@/components/sections/home/PlatformOverview";
import { PosCapabilities } from "@/components/sections/home/PosCapabilities";
import { ModuleEcosystem } from "@/components/sections/home/ModuleEcosystem";
import { IndustryCoverage } from "@/components/sections/home/IndustryCoverage";
import { EnterpriseScale } from "@/components/sections/home/EnterpriseScale";
import { Omnichannel } from "@/components/sections/home/Omnichannel";
import { AiRetail } from "@/components/sections/home/AiRetail";
import { ProductShowcase } from "@/components/sections/home/ProductShowcase";
import { IntegrationsStrip } from "@/components/sections/home/IntegrationsStrip";
import { Implementation } from "@/components/sections/home/Implementation";
import { SecurityReliability } from "@/components/sections/home/SecurityReliability";
import { UseCases } from "@/components/sections/home/UseCases";
import { ResourcesPreview } from "@/components/sections/home/ResourcesPreview";
import { HomeFaq } from "@/components/sections/home/HomeFaq";
import { FinalCta } from "@/components/sections/home/FinalCta";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadataWithCms("/", {
  title: "RetailPOS.biz — Retail ERP, POS & AI Retail Management Platform",
  description:
    "Run billing, inventory, purchasing, CRM, loyalty, accounting and analytics on one retail platform. GST-ready POS with offline mode, multi-store control and AI demand forecasting.",
  path: "/",
  });
}

export default async function HomePage() {
  const contentPage = await getCmsContentPageForRoute("/", "home");
  const cmsSections = cmsContentSections(contentPage);
  const hero = cmsHeroContent(firstCmsSection(cmsSections, "hero"));
  const statsSection = firstCmsSection(cmsSections, "stats");
  const faqSection = firstCmsSection(cmsSections, "faq");
  const ctaSection = firstCmsSection(cmsSections, "cta");
  const faqItems = faqSection ? cmsFaqItems(faqSection) : [];
  const bodySections = cmsSectionsExcept(cmsSections, ["hero", "stats", "faq", "cta"]);

  return (
    <>
      <JsonLd data={softwareApplicationJsonLd()} />
      <Hero content={hero} />
      {statsSection ? <CmsContentSections sections={[statsSection]} /> : <TrustMetrics compact />}
      <ClientLogoWall compact tone="paper" />
      <TrustStrip />
      <Challenges />
      <WhyRetailPOS />
      <PlatformOverview />
      <PosCapabilities />
      <ModuleEcosystem />
      <IndustryCoverage />
      <EnterpriseScale />
      <Omnichannel />
      <AiRetail />
      <ProductShowcase />
      <IntegrationsStrip />
      <Implementation />
      <SecurityReliability />
      <TrustReceipt />
      <UseCases />
      <ResourcesPreview />
      {faqItems.length ? <CmsContentSections sections={[faqSection!]} /> : <HomeFaq />}
      <CmsContentSections sections={bodySections} />
      <CmsSeoEnhancements path="/" />
      <FinalCta section={ctaSection} />
    </>
  );
}
