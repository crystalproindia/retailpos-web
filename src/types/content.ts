/** Shared content types. The future CMS will hydrate these shapes via API. */

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string; // lucide icon name resolved by the nav components
  featured?: boolean;
}

export interface NavGroup {
  label: string;
  href: string; // index page for the group
  tagline?: string;
  links: NavLink[];
  /** Secondary column shown in the mega menu (e.g. highlights). */
  secondary?: { title: string; links: NavLink[] };
}

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export interface ErpModule {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Industry {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Solution {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Integration {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Marked true until real customer quotes are loaded from the admin panel. */
  placeholder: boolean;
}

export interface Stat {
  value: string;
  label: string;
  /** Marked true until verified figures are loaded from the admin panel. */
  placeholder: boolean;
}

export interface ResourceItem {
  slug: string;
  type: "blog" | "guide" | "case-study";
  title: string;
  excerpt: string;
  readMinutes: number;
}

export interface Cta {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost" | "inverted";
}
