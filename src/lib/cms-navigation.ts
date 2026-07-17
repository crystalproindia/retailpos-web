import "server-only";

import { getCmsNavigation, type CmsNavigationItem } from "@/lib/cms";
import { cmsText, safeUrl } from "@/lib/cms-content";
import { navGroups, quickLinks, topLevelLinks } from "@/data/navigation";
import { caseStudiesNavLink } from "@/data/case-studies";
import type { NavGroup, NavLink } from "@/types/content";

export interface SiteNavigation {
  navGroups: NavGroup[];
  topLevelLinks: NavLink[];
  quickLinks: NavLink[];
}

function isEnabled(item: CmsNavigationItem): boolean {
  return item.is_enabled !== false && item.is_enabled !== 0;
}

function toNavLink(item: CmsNavigationItem): NavLink | null {
  const label = cmsText(item.label, 120);
  const href = safeUrl(item.url, { allowHttp: false });
  return label && href ? { label, href, icon: "CircleDot" } : null;
}

function groupedNavGroups(items: CmsNavigationItem[]): NavGroup[] {
  const groups = new Map<string, NavLink[]>();

  for (const item of items) {
    const parent = cmsText(item.parent_label, 120);
    const link = toNavLink(item);
    if (!parent || !link) continue;
    groups.set(parent, [...(groups.get(parent) ?? []), link]);
  }

  return Array.from(groups.entries()).map(([label, links]) => ({
    label,
    href: links[0]?.href ?? "/",
    tagline: "CMS managed links",
    links,
  }));
}

function flatLinks(items: CmsNavigationItem[]): NavLink[] {
  return items
    .filter((item) => !cmsText(item.parent_label, 120))
    .map(toNavLink)
    .filter((item): item is NavLink => Boolean(item));
}

function mergeLinks(requiredLinks: NavLink[], cmsLinks: NavLink[]): NavLink[] {
  const seen = new Set<string>();
  const merged: NavLink[] = [];

  for (const link of [...requiredLinks, ...cmsLinks]) {
    const key = link.href || link.label.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(link);
  }

  return merged;
}

function mergeGroups(requiredGroups: NavGroup[], cmsGroups: NavGroup[]): NavGroup[] {
  const groups: NavGroup[] = requiredGroups.map((group) => ({
    ...group,
    links: [...group.links],
    sections: group.sections?.map((section) => ({ ...section, links: [...section.links] })),
  }));

  for (const cmsGroup of cmsGroups) {
    const existing = groups.find((group) => group.label.toLowerCase() === cmsGroup.label.toLowerCase());
    if (!existing) {
      groups.push(cmsGroup);
      continue;
    }

    existing.links = mergeLinks(existing.links, cmsGroup.links);
  }

  return groups;
}

function withRequiredCompanyLinks(groups: NavGroup[]): NavGroup[] {
  const hasCaseStudies = groups.some((group) => group.links.some((link) => link.href === caseStudiesNavLink.href));
  if (hasCaseStudies) return groups;

  const companyGroup = groups.find((group) => group.label.toLowerCase() === "company");
  const staticCompanyGroup = navGroups.find((group) => group.label.toLowerCase() === "company");
  if (!companyGroup) {
    return staticCompanyGroup ? [...groups, staticCompanyGroup] : groups;
  }

  return groups.map((group) =>
    group === companyGroup
      ? {
          ...group,
          links: [...group.links, caseStudiesNavLink],
        }
      : group,
  );
}

function withRequiredNavigationGroups(groups: NavGroup[]): NavGroup[] {
  const companySafeGroups = withRequiredCompanyLinks(groups);
  const groupLabels = new Set(companySafeGroups.map((group) => group.label.toLowerCase()));
  const missingStaticGroups = navGroups.filter((group) => !groupLabels.has(group.label.toLowerCase()));
  return [...companySafeGroups, ...missingStaticGroups];
}

function withRequiredQuickLinks(links: NavLink[]): NavLink[] {
  const linkHrefs = new Set(links.map((link) => link.href));
  const missingQuickLinks = quickLinks.filter((link) => !linkHrefs.has(link.href));
  return [...links, ...missingQuickLinks];
}

export async function getSiteNavigation(): Promise<SiteNavigation> {
  const items = (await getCmsNavigation()).filter(isEnabled);
  const headerItems = items.filter((item) => item.location === "header");
  const mobileItems = items.filter((item) => item.location === "mobile");

  if (!headerItems.length && !mobileItems.length) {
    return { navGroups, topLevelLinks, quickLinks };
  }

  const cmsGroups = groupedNavGroups(headerItems);
  const cmsTopLevel = flatLinks(headerItems);
  const cmsQuickLinks = flatLinks(mobileItems);

  return {
    navGroups: withRequiredNavigationGroups(mergeGroups(navGroups, cmsGroups)),
    topLevelLinks: mergeLinks(topLevelLinks, cmsTopLevel),
    quickLinks: withRequiredQuickLinks(mergeLinks(quickLinks, cmsQuickLinks)),
  };
}
