import type { NavGroup, NavLink } from "@/types/content";
import { products } from "./products";
import { erpModules } from "./modules";
import { industries } from "./industries";
import { solutions } from "./solutions";
import { integrations } from "./integrations";

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
      href: `/modules/${m.slug}`,
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
    secondary: {
      title: "Integrations",
      links: integrations.map((i) => ({
        label: i.name,
        href: `/integrations/${i.slug}`,
        icon: i.icon,
      })),
    },
  },
  {
    label: "Resources",
    href: "/resources",
    tagline: "Learn, compare, decide",
    links: [
      { label: "Blog", href: "/blog", icon: "Newspaper", description: "Retail operations and product updates" },
      { label: "Guides", href: "/guides", icon: "BookOpen", description: "In-depth buyer and how-to guides" },
      { label: "Case Studies", href: "/case-studies", icon: "FileBarChart", description: "How retailers run on RetailPOS" },
      { label: "Comparisons", href: "/comparisons", icon: "Scale", description: "POS vs ERP, cloud vs on-premise" },
      { label: "FAQ", href: "/faq", icon: "CircleHelp", description: "Answers to common questions" },
      { label: "Glossary", href: "/glossary", icon: "BookMarked", description: "Retail and ERP terms explained" },
    ],
    secondary: {
      title: "Company",
      links: [
        { label: "About", href: "/about", icon: "Building2" },
        { label: "Customers", href: "/customers", icon: "Users" },
        { label: "Partners", href: "/partners", icon: "Handshake" },
        { label: "Security", href: "/security", icon: "ShieldCheck" },
        { label: "Implementation", href: "/implementation", icon: "Route" },
        { label: "Support", href: "/support", icon: "LifeBuoy" },
      ],
    },
  },
];

export const topLevelLinks: NavLink[] = [{ label: "Pricing", href: "/pricing" }];

export const quickLinks: NavLink[] = [
  { label: "Pricing", href: "/pricing", icon: "Tag" },
  { label: "Book Demo", href: "/book-demo", icon: "CalendarCheck" },
  { label: "Contact", href: "/contact", icon: "Phone" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Products",
    links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
  },
  {
    title: "Modules",
    links: erpModules.slice(0, 8).map((m) => ({ label: m.name, href: `/modules/${m.slug}` })),
  },
  {
    title: "Industries",
    links: industries.slice(0, 8).map((i) => ({ label: i.name, href: `/industries/${i.slug}` })),
  },
  {
    title: "Solutions",
    links: solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Partners", href: "/partners" },
      { label: "Security", href: "/security" },
      { label: "Implementation", href: "/implementation" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/guides" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Comparisons", href: "/comparisons" },
      { label: "FAQ", href: "/faq" },
      { label: "Glossary", href: "/glossary" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];
