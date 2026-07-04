export const company = {
  name: "RetailPOS.biz",
  parent: "CrystalPro Technologies",
  foundedYear: 2012,
  headquarters: "Coimbatore, India",
  offices: ["Coimbatore, India", "Singapore", "Malaysia", "Bahrain"],
  email: "hello@retailpos.biz",
  address: {
    streetAddress: "CrystalPro Technologies",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
} as const;

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/crystalpro" },
  { label: "X (Twitter)", href: "https://x.com/retailposbiz" },
  { label: "YouTube", href: "https://www.youtube.com/@crystalpro" },
  { label: "Instagram", href: "https://www.instagram.com/crystalpro" },
] as const;
