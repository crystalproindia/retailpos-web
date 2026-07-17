import "server-only";

import { getCmsFooter, type CmsFooterBlock } from "@/lib/cms";
import { cmsParagraphs, cmsText, isRecord, safeUrl } from "@/lib/cms-content";
import { footerColumns, legalLinks } from "@/data/navigation";
import { caseStudiesNavLink } from "@/data/case-studies";
import { company, socialLinks } from "@/data/company";
import type { NavLink } from "@/types/content";

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SiteFooterContent {
  columns: FooterColumn[];
  description: string;
  contactContent?: string;
  locationsContent?: string;
  socialLinks: NavLink[];
  legalLinks: NavLink[];
  copyright: string;
}

function blockByKey(blocks: CmsFooterBlock[], key: string): CmsFooterBlock | undefined {
  return blocks.find((block) => block.block_key === key);
}

function linksFromBlock(block?: CmsFooterBlock): NavLink[] {
  if (!block || !Array.isArray(block.links)) return [];
  return block.links
    .filter(isRecord)
    .map((link) => {
      const label = cmsText(link.label, 120);
      const href = safeUrl(link.url, { allowHttp: false });
      return label && href ? { label, href } : null;
    })
    .filter((link): link is NavLink => Boolean(link));
}

function firstParagraph(value: unknown): string | undefined {
  return cmsParagraphs(value, 1)[0];
}

function columnFromBlock(block: CmsFooterBlock | undefined, fallbackTitle: string): FooterColumn | null {
  const links = linksFromBlock(block);
  if (!links.length) return null;
  return { title: cmsText(block?.title, 120) ?? fallbackTitle, links };
}

function withRequiredFooterLinks(columns: FooterColumn[]): FooterColumn[] {
  const caseStudyFooterLink = { label: caseStudiesNavLink.label, href: caseStudiesNavLink.href };
  const hasCaseStudies = columns.some((column) => column.links.some((link) => link.href === caseStudiesNavLink.href));
  if (hasCaseStudies) return columns;

  const companyColumn = columns.find((column) => column.title.toLowerCase() === "company");
  if (!companyColumn) {
    return [...columns, { title: "Company", links: [caseStudyFooterLink] }];
  }

  return columns.map((column) =>
    column === companyColumn
      ? {
          ...column,
          links: [...column.links, caseStudyFooterLink],
        }
      : column,
  );
}

export async function getSiteFooterContent(): Promise<SiteFooterContent> {
  const blocks = await getCmsFooter();
  const productLinks = columnFromBlock(blockByKey(blocks, "product_links"), "Products");
  const solutionLinks = columnFromBlock(blockByKey(blocks, "solution_links"), "Solutions");
  const legalBlockLinks = linksFromBlock(blockByKey(blocks, "legal_links"));
  const socialBlockLinks = linksFromBlock(blockByKey(blocks, "social_links"));
  const companyBlock = blockByKey(blocks, "company_description");
  const contactBlock = blockByKey(blocks, "contact");
  const locationsBlock = blockByKey(blocks, "locations");
  const copyrightBlock = blockByKey(blocks, "copyright");
  const cmsColumns = [productLinks, solutionLinks].filter((column): column is FooterColumn => Boolean(column));

  return {
    columns: cmsColumns.length ? withRequiredFooterLinks(cmsColumns) : footerColumns,
    description:
      firstParagraph(companyBlock?.content) ??
      `Retail ERP, POS and AI-powered retail management by ${company.parent}, delivering software solutions since ${company.foundedYear}.`,
    contactContent: firstParagraph(contactBlock?.content),
    locationsContent: firstParagraph(locationsBlock?.content),
    socialLinks: socialBlockLinks.length ? socialBlockLinks : socialLinks.map((link) => ({ label: link.label, href: link.href })),
    legalLinks: legalBlockLinks.length ? legalBlockLinks : legalLinks,
    copyright: cmsText(copyrightBlock?.content, 220) ?? `\u00a9 ${new Date().getFullYear()} ${company.parent}. All rights reserved.`,
  };
}
