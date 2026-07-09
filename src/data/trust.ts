export interface TrustMetric {
  value: string;
  label: string;
  detail: string;
}

export const trustMetrics: TrustMetric[] = [
  {
    value: "500+",
    label: "Businesses Served",
    detail: "Retail and business customers supported by CrystalPro delivery teams.",
  },
  {
    value: "15+",
    label: "Years Experience",
    detail: "Software delivery experience behind RetailPOS.biz and CrystalPro Technologies.",
  },
  {
    value: "100+",
    label: "Successful Software Projects",
    detail: "Completed business software initiatives across operational workflows.",
  },
  {
    value: "24/7",
    label: "Customer Support",
    detail: "Support availability for customers running critical retail operations.",
  },
];

export interface ClientLogo {
  name: string;
  alt: string;
  logoSrc?: string;
  website?: string;
}

/**
 * Centralized client proof data.
 * Logo URLs can later be replaced by Laravel-admin managed media paths.
 */
export const clientLogos: ClientLogo[] = [
  {
    name: "Welcare",
    alt: "Welcare logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=welcare.com&sz=128",
    website: "https://welcare.com",
  },
  {
    name: "Vcare",
    alt: "Vcare logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=vcaretrichology.com&sz=128",
    website: "https://vcaretrichology.com",
  },
  {
    name: "Ananda Corporation",
    alt: "Ananda Corporation logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=anandacorporation.com&sz=128",
    website: "https://anandacorporation.com",
  },
  {
    name: "Home Need Corp",
    alt: "Home Need Corp logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=homeneedcorp.com&sz=128",
    website: "https://homeneedcorp.com",
  },
  {
    name: "LIC",
    alt: "LIC logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=licindia.in&sz=128",
    website: "https://licindia.in",
  },
  {
    name: "Newrie",
    alt: "Newrie logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=newrie.com&sz=128",
    website: "https://newrie.com",
  },
  {
    name: "Twinbirds",
    alt: "Twinbirds logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=twinbirds.co.in&sz=128",
    website: "https://twinbirds.co.in",
  },
  {
    name: "Salona Cotspin",
    alt: "Salona Cotspin logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=salonagroup.com&sz=128",
    website: "https://salonagroup.com",
  },
  {
    name: "Shristhi Cotspin",
    alt: "Shristhi Cotspin logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=shristhicotspin.com&sz=128",
    website: "https://shristhicotspin.com",
  },
  {
    name: "Mothercare",
    alt: "Mothercare logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=mothercare.com&sz=128",
    website: "https://mothercare.com",
  },
  {
    name: "Best Corp",
    alt: "Best Corp logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=bestcorp.in&sz=128",
    website: "https://bestcorp.in",
  },
  {
    name: "RIT",
    alt: "RIT logo",
    logoSrc: "https://www.google.com/s2/favicons?domain=ritchennai.edu.in&sz=128",
    website: "https://ritchennai.edu.in",
  },
  {
    name: "and many more",
    alt: "and many more RetailPOS customers",
  },
];
