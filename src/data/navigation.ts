import type { NavGroup, NavLink } from "@/types/content";
import { products } from "./products";
import { erpModules } from "./modules";
import { industries } from "./industries";
import { solutions } from "./solutions";
import { isImplemented } from "@/lib/landing-pages/registry";
import { groupedIndustries } from "./industry-groups";

export const navGroups: NavGroup[] = [
  {
    label: "Products",
    href: "/products",
    tagline: "The complete retail platform",
    links: products.map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
      description: p.tagline,
      icon: p.icon,
      featured: p.featured,
    })),
  },
  {
    label: "Modules",
    href: "/modules",
    tagline: "ERP modules that switch on as you grow",
    links: erpModules.map((m) => ({
      label: m.name,
      href: isImplemented("modules", m.slug) ? `/modules/${m.slug}` : `/modules#${m.slug}`,
      description: m.description,
      icon: m.icon,
    })),
  },
  {
    label: "Industries",
    href: "/industries",
    tagline: "Built-in workflows for your vertical",
    links: industries.map((i) => ({
      label: i.name,
      href: `/industries/${i.slug}`,
      description: i.description,
      icon: i.icon,
    })),
    sections: groupedIndustries().map(({ group, items }) => ({
      title: group.title,
      links: items.map((i) => ({ label: i.name, href: `/industries/${i.slug}`, icon: i.icon })),
    })),
  },
  {
    label: "Solutions",
    href: "/solutions",
    tagline: "Matched to your stage and scale",
    links: solutions.map((s) => ({
      label: s.name,
      href: `/solutions/${s.slug}`,
      description: s.description,
      icon: s.icon,
      featured: s.slug === "ai-powered-retail" || s.slug === "cloud-pos",
    })),
  },
  {
    label: "Company",
    href: "/about",
    tagline: "Who we are and how to reach us",
    links: [
      { label: "About RetailPOS", href: "/about", icon: "Building2", description: "The product, the principles and the company behind it" },
      { label: "Contact", href: "/contact", icon: "Phone", description: "Sales, support and regional offices" },
      { label: "Pricing", href: "/pricing", icon: "Tag", description: "What shapes a quote for your setup" },
      { label: "Book a Demo", href: "/book-demo", icon: "CalendarCheck", description: "30 minutes, your items, your questions" },
    ],
  },
];

export const topLevelLinks: NavLink[] = [{ label: "Pricing", href: "/pricing" }];

export const quickLinks: NavLink[] = [
  { label: "Pricing", href: "/pricing", icon: "Tag" },
  { label: "Book Demo", href: "/book-demo", icon: "CalendarCheck" },
  { label: "Talk to Sales", href: "/contact", icon: "Phone" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  {
    title: "Modules",
    links: erpModules.filter((m) => isImplemented("modules", m.slug)).map((m) => ({ label: m.name, href: `/modules/${m.slug}` })),
  },
  {
    title: "Industries",
    links: industries.filter((i) => isImplemented("industries", i.slug)).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Solutions",
    links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a Demo", href: "/book-demo" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
